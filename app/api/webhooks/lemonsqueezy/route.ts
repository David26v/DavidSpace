import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  inviteCollaborator,
  removeCollaborator,
  isGitHubConfigured,
} from "@/utils/github";

/**
 * Lemon Squeezy Webhook Handler
 *
 * Set up in Lemon Squeezy Dashboard → Settings → Webhooks:
 * - URL: https://www.davidfajardo.space/api/webhooks/lemonsqueezy
 * - Events: order_created, order_refunded, license_key_created
 * - Signing secret → paste into LEMONSQUEEZY_WEBHOOK_SECRET in .env
 *
 * On purchase: auto-invites the buyer to the private GitHub SDK repo
 * On refund:   removes their GitHub access
 */
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

        console.log(
          `[SALE] Order #${orderId} — ${total} by ${customerName} (${email}) — Status: ${status}`
        );

        // Only grant access on successful payment
        if (status === "paid") {
          // Auto-invite buyer to private GitHub repo
          if (isGitHubConfigured()) {
            const result = await inviteCollaborator(email, "pull");
            console.log(
              `[DELIVERY] GitHub invite for ${email}: ${result.success ? "✅" : "❌"} — ${result.message}`
            );
          } else {
            console.warn(
              "[DELIVERY] GitHub not configured — skipping auto-invite. Set GITHUB_TOKEN in .env"
            );
          }
        }

        // TODO: Save order to database
        // await prisma.order.create({
        //   data: {
        //     email,
        //     orderId: orderId,
        //     amount: attrs.total,
        //     status: status === "paid" ? "COMPLETED" : "PENDING",
        //     provider: "lemonsqueezy",
        //     customerName,
        //   },
        // });

        break;
      }

      case "order_refunded": {
        const order = payload.data;
        const email = order.attributes.user_email;
        const orderId = order.id;

        console.log(`[REFUND] Order #${orderId} refunded for ${email}`);

        // Revoke GitHub access on refund
        if (isGitHubConfigured()) {
          const result = await removeCollaborator(email);
          console.log(
            `[REVOKE] GitHub access for ${email}: ${result.success ? "✅ Removed" : "⚠️ " + result.message}`
          );
        }

        // TODO: Update order status in database
        // await prisma.order.update({
        //   where: { orderId },
        //   data: { status: "REFUNDED" },
        // });

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
