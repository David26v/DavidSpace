import type { LicenseType } from "@/constants/products";

/**
 * Lemon Squeezy API Integration
 *
 * Everything is managed from code — no manual dashboard product setup needed.
 * Just run `npx tsx scripts/setup-lemonsqueezy.ts` once to create your products.
 *
 * Lemon Squeezy acts as Merchant of Record — no business registration required.
 * They handle all taxes, refunds, and payment processing worldwide.
 * You get paid via PayPal or bank transfer.
 */

const API_BASE = "https://api.lemonsqueezy.com/v1";
const API_KEY = process.env.LEMONSQUEEZY_API_KEY!;
const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;

// ─── Helpers ───────────────────────────────────────────────

function headers() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function lsApi(endpoint: string, options?: RequestInit): Promise<any> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...headers(), ...options?.headers },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Lemon Squeezy API error (${res.status}): ${error}`);
  }

  return res.json();
}

// ─── Store / Products ──────────────────────────────────────

/**
 * Get all stores for this account.
 * Usually you only have one — the ID is what you put in LEMONSQUEEZY_STORE_ID.
 */
export async function getStores() {
  const data = await lsApi("/stores");
  return data.data;
}

/**
 * Get all products in the store.
 */
export async function getProducts() {
  const data = await lsApi(`/products?filter[store_id]=${STORE_ID}`);
  return data.data;
}

/**
 * Get all variants for a product.
 */
export async function getVariants(productId: string) {
  const data = await lsApi(`/variants?filter[product_id]=${productId}`);
  return data.data;
}

/**
 * Create a product in the store.
 */
export async function createProduct(name: string, description: string) {
  const data = await lsApi("/products", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "products",
        attributes: {
          name,
          description,
        },
        relationships: {
          store: {
            data: { type: "stores", id: STORE_ID },
          },
        },
      },
    }),
  });
  return data.data;
}

/**
 * Create a variant (pricing tier) for a product.
 */
export async function createVariant(
  productId: string,
  name: string,
  priceInCents: number,
  description: string
) {
  const data = await lsApi("/variants", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "variants",
        attributes: {
          name,
          price: priceInCents,
          is_subscription: false,
          description,
          has_license_keys: true,
          license_activation_limit: 3,
          license_length_value: 0, // Lifetime
          license_length_unit: "years",
        },
        relationships: {
          product: {
            data: { type: "products", id: productId },
          },
        },
      },
    }),
  });
  return data.data;
}

// ─── Checkout ──────────────────────────────────────────────

/**
 * Variant IDs from environment (set after running setup script).
 */
const variantIds: Record<Exclude<LicenseType, "custom">, string | undefined> = {
  student: process.env.LS_VARIANT_STUDENT,
  starter: process.env.LS_VARIANT_STARTER,
  pro: process.env.LS_VARIANT_PRO,
  enterprise: process.env.LS_VARIANT_ENTERPRISE,
};

/**
 * Create a checkout session via the Lemon Squeezy API.
 * Returns the checkout URL to redirect the buyer to.
 */
export async function createCheckout(
  license: Exclude<LicenseType, "custom">,
  email: string,
  successUrl: string
): Promise<string> {
  const variantId = variantIds[license];

  if (!variantId) {
    throw new Error(
      `Variant ID not configured for "${license}" plan. Run: npx tsx scripts/setup-lemonsqueezy.ts`
    );
  }

  const data = await lsApi("/checkouts", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email,
            custom: {
              license_tier: license,
            },
          },
          checkout_options: {
            dark: true,
            embed: false,
            logo: true,
          },
          product_options: {
            enabled_variants: [parseInt(variantId)],
            redirect_url: successUrl,
            receipt_link_url: successUrl,
            receipt_button_text: "Get Started",
            receipt_thank_you_note:
              "Thank you for your purchase! Check your email for the download link and license key.",
          },
        },
        relationships: {
          store: {
            data: { type: "stores", id: STORE_ID },
          },
          variant: {
            data: { type: "variants", id: variantId },
          },
        },
      },
    }),
  });

  const checkoutUrl = data.data.attributes.url;
  if (!checkoutUrl) {
    throw new Error("Failed to create checkout — no URL returned");
  }

  return checkoutUrl;
}

/**
 * Check if Lemon Squeezy is fully configured.
 */
export function isConfigured(): boolean {
  return !!(API_KEY && STORE_ID && Object.values(variantIds).some(Boolean));
}

/**
 * Get the checkout URL for a plan (convenience wrapper).
 * Returns null if the variant isn't configured.
 */
export function getCheckoutUrl(
  license: Exclude<LicenseType, "custom">,
  email?: string
): string | null {
  // For static checkout URLs (fallback)
  const staticUrls: Record<string, string | undefined> = {
    student: process.env.NEXT_PUBLIC_LS_CHECKOUT_STUDENT,
    starter: process.env.NEXT_PUBLIC_LS_CHECKOUT_STARTER,
    pro: process.env.NEXT_PUBLIC_LS_CHECKOUT_PRO,
    enterprise: process.env.NEXT_PUBLIC_LS_CHECKOUT_ENTERPRISE,
  };

  const baseUrl = staticUrls[license];
  if (!baseUrl) return null;

  if (email) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}checkout[email]=${encodeURIComponent(email)}`;
  }

  return baseUrl;
}
