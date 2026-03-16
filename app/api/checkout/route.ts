import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/constants/products";
import { createCheckout, getCheckoutUrl } from "@/utils/lemonsqueezy";
import type { LicenseType } from "@/constants/products";

export async function POST(req: NextRequest) {
  try {
    const { productId, license, customerEmail, githubUsername } = await req.json();

    if (!productId || !license || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: productId, license, customerEmail" },
        { status: 400 }
      );
    }

    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const validLicenses: LicenseType[] = ["student", "starter", "pro", "enterprise", "custom"];
    if (!validLicenses.includes(license)) {
      return NextResponse.json({ error: "Invalid license type" }, { status: 400 });
    }

    // Custom tier → redirect to contact page
    if (license === "custom") {
      const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      return NextResponse.json({ url: `${origin}/contact?ref=custom` });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ghUser = githubUsername ? `&gh=${encodeURIComponent(githubUsername)}` : "";
    const successUrl = `${origin}/store/success?tier=${license}${ghUser}`;
    const plan = license as Exclude<LicenseType, "custom">;

    // Strategy 1: API-based checkout (preferred — uses variant IDs)
    try {
      const checkoutUrl = await createCheckout(plan, customerEmail, successUrl, githubUsername);
      return NextResponse.json({ url: checkoutUrl });
    } catch {
      // Fallback to static checkout URLs
    }

    // Strategy 2: Static checkout URLs (from NEXT_PUBLIC_LS_CHECKOUT_* env vars)
    const staticUrl = getCheckoutUrl(plan, customerEmail);
    if (staticUrl) {
      return NextResponse.json({ url: staticUrl });
    }

    // Neither configured — friendly error
    return NextResponse.json(
      {
        error:
          "Payment system is being set up. Please contact david.fajardo26v@gmail.com to purchase directly, or check back soon!",
      },
      { status: 503 }
    );
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
