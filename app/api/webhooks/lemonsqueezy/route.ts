import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  inviteCollaborator,
  removeCollaborator,
  getRepoForTier,
  isGitHubConfigured,
} from "@/utils/github";
import type { LicenseType } from "@/constants/products";

/**
 * Lemon Squeezy Webhook Handler
 *
 * Set up in Lemon Squeezy Dashboard → Settings → Webhooks:
 * - URL: https://www.davidfajardo.space/api/webhooks/lemonsqueezy
 * - Events: order_created, order_refunded, license_key_created
 * - Signing secret → paste into LEMONSQUEEZY_WEBHOOK_SECRET in .env
 *
 * On purchase: auto-invites the buyer to the correct tier-specific GitHub repo
 *   Student    → SDK-Student
 *   Starter    → SDK-Starter
 *   Pro        → SDK-Pro
 *   Enterprise → SDK-Pro (same code + services)
 *
 * On refund: removes their GitHub access
 */

// ─── Tier Detection ─────────────────────────────────────

/**
 * Map Lemon Squeezy variant IDs to license tiers.
 */
function getTierFromVariant(variantId: string): LicenseType | null {
  const variantMap: Record<string, LicenseType> = {};

  if (process.env.LS_VARIANT_STUDENT) variantMap[process.env.LS_VARIANT_STUDENT] = "student";
  if (process.env.LS_VARIANT_STARTER) variantMap[process.env.LS_VARIANT_STARTER] = "starter";
  if (process.env.LS_VARIANT_PRO) variantMap[process.env.LS_VARIANT_PRO] = "pro";
  if (process.env.LS_VARIANT_ENTERPRISE) variantMap[process.env.LS_VARIANT_ENTERPRISE] = "enterprise";

  return variantMap[variantId] || null;
}

/**
 * Extract tier from webhook payload.
 * Tries: custom data → variant ID → null
 */
function extractTier(payload: Record<string, unknown>): LicenseType | null {
  // Try custom data first (set during checkout)
  const meta = payload.meta as Record<string, unknown> | undefined;
  const customData = (meta?.custom_data || {}) as Record<string, string>;
  if (customData.license_tier) {
    const tier = customData.license_tier;
    if (["student", "starter", "pro", "enterprise"].includes(tier)) {
      return tier as LicenseType;
    }
  }

  // Fallback: try variant ID from order data
  const data = payload.data as Record<string, unknown> | undefined;
  const attrs = (data?.attributes || {}) as Record<string, unknown>;
  const firstItem = (attrs.first_order_item || {}) as Record<string, unknown>;
  const variantId =
    firstItem.variant_id?.toString() ||
    attrs.variant_id?.toString();

  if (variantId) {
    return getTierFromVariant(variantId);
  }

  return null;
}

// ─── Webhook Handler ────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing x-signature header" },
      { status: 400 }
    );
  }

  // Verify webhook signature
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (secret) {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(body).digest("hex");

    if (signature !== digest) {
      console.error("Webhook signature verification failed");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }
  }

  try {
    const payload = JSON.parse(body);
    const eventName = payload.meta?.event_name;

    switch (eventName) {
      case "order_created": {
        const order = payload.data;
        const attrs = order.attributes;
        const email = attrs.user_email;
        const total = attrs.total_formatted;
        const status = attrs.status;
        const orderId = order.id;
        const customerName = attrs.user_name || "Customer";
        const tier = extractTier(payload);

        console.log(
          `[SALE] Order #${orderId} — ${total} by ${customerName} (${email}) — Status: ${status} — Tier: ${tier || "unknown"}`
        );

        // Only grant access on successful payment
        if (status === "paid" && tier) {
          const repoName = getRepoForTier(tier);

          if (repoName && isGitHubConfigured()) {
            const result = await inviteCollaborator(repoName, email, "pull");
            console.log(
              `[DELIVERY] GitHub invite for ${email} to ${repoName}: ${result.success ? "✅" : "❌"} — ${result.message}`
            );
          } else if (!repoName) {
            console.warn(
              `[DELIVERY] No GitHub repo configured for tier "${tier}". Set GITHUB_REPO_${tier.toUpperCase()} in .env`
            );
          } else {
            console.warn(
              "[DELIVERY] GitHub not configured — skipping auto-invite. Set GITHUB_TOKEN in .env"
            );
          }
        } else if (status === "paid" && !tier) {
          console.warn(
            `[DELIVERY] Could not determine tier for order #${orderId}. Check LS_VARIANT_* and checkout custom data.`
          );
        }

        break;
      }

      case "order_refunded": {
        const order = payload.data;
        const email = order.attributes.user_email;
        const orderId = order.id;
        const tier = extractTier(payload);

        console.log(`[REFUND] Order #${orderId} refunded for ${email} — Tier: ${tier || "unknown"}`);

        // Revoke GitHub access on refund
        if (isGitHubConfigured()) {
          if (tier) {
            const repoName = getRepoForTier(tier);
            if (repoName) {
              const result = await removeCollaborator(repoName, email);
              console.log(
                `[REVOKE] GitHub access for ${email} on ${repoName}: ${result.success ? "✅ Removed" : "⚠️ " + result.message}`
              );
            }
          } else {
            // Unknown tier — remove from all repos to be safe
            console.log(`[REVOKE] Unknown tier — removing ${email} from all repos...`);
            const allRepos = [
              process.env.GITHUB_REPO_STUDENT,
              process.env.GITHUB_REPO_STARTER,
              process.env.GITHUB_REPO_PRO,
            ].filter(Boolean) as string[];

            for (const repo of allRepos) {
              const result = await removeCollaborator(repo, email);
              if (result.success) {
                console.log(`[REVOKE] Removed ${email} from ${repo}`);
              }
            }
          }
        }

        break;
      }

      case "license_key_created": {
        const license = payload.data;
        const key = license.attributes.key;
        console.log(`[LICENSE] Key created: ${key.substring(0, 8)}...`);
        break;
      }

      default:
        console.log(`[WEBHOOK] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error("Webhook processing error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
