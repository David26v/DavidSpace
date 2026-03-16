/**
 * Lemon Squeezy Setup Script
 *
 * Run this to detect your products/variants on Lemon Squeezy
 * and get the IDs to add to your .env file.
 *
 * Usage:
 *   npx tsx scripts/setup-lemonsqueezy.ts
 *
 * Prerequisites:
 *   1. Create a Lemon Squeezy account at https://lemonsqueezy.com
 *   2. Get your API key from Settings → API
 *   3. Create a product called "SDK-TURBOREPO-STARTUP-EDITION" in the dashboard
 *   4. Add 4 variants: Student ($50), Starter ($100), Pro ($129), Enterprise ($2,000)
 *
 * This script will:
 *   - Find your store ID
 *   - Detect your product and variants
 *   - Print the .env values you need
 */

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const API_BASE = "https://api.lemonsqueezy.com/v1";
const API_KEY = process.env.LEMONSQUEEZY_API_KEY;

if (!API_KEY) {
  console.error("❌ LEMONSQUEEZY_API_KEY not found in .env");
  console.error("   Get it from: https://app.lemonsqueezy.com/settings/api");
  process.exit(1);
}

function headers() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function api(endpoint: string): Promise<any> {
  const res = await fetch(`${API_BASE}${endpoint}`, { headers: headers() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

// Plan name → env key mapping
const PLAN_MAP: Record<string, string> = {
  student: "LS_VARIANT_STUDENT",
  starter: "LS_VARIANT_STARTER",
  pro: "LS_VARIANT_PRO",
  enterprise: "LS_VARIANT_ENTERPRISE",
};

async function main() {
  console.log("🍋 Lemon Squeezy Setup\n");

  // Step 1: Get store
  console.log("1️⃣  Finding your store...");
  const storesRes = await api("/stores");
  const stores = storesRes.data;

  if (!stores || stores.length === 0) {
    console.error("❌ No stores found. Create one at https://app.lemonsqueezy.com");
    process.exit(1);
  }

  const store = stores[0];
  const storeId = store.id;
  const storeName = store.attributes.name;
  const storeUrl = store.attributes.url;
  console.log(`   ✅ Store: "${storeName}" (ID: ${storeId})`);
  console.log(`   🔗 URL: ${storeUrl}\n`);

  // Step 2: Get products
  console.log("2️⃣  Looking for products...");
  const productsRes = await api(`/products?filter[store_id]=${storeId}`);
  const products = productsRes.data || [];

  if (products.length === 0) {
    console.log("\n   ⚠️  No products found!\n");
    console.log("   Please create a product in the Lemon Squeezy dashboard:");
    console.log("   1. Go to https://app.lemonsqueezy.com/products");
    console.log('   2. Click "New Product"');
    console.log('   3. Name it: SDK-TURBOREPO-STARTUP-EDITION');
    console.log("   4. Add 4 variants:");
    console.log("      - Student: $50");
    console.log("      - Starter: $100");
    console.log("      - Pro: $129");
    console.log("      - Enterprise: $2,000");
    console.log("\n   Then run this script again!\n");

    console.log("──────────────────────────────────────────────");
    console.log("📋 For now, add this to your .env:\n");
    console.log(`LEMONSQUEEZY_STORE_ID="${storeId}"`);
    console.log("──────────────────────────────────────────────\n");
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products.forEach((p: any) => {
    console.log(`   📦 "${p.attributes.name}" (ID: ${p.id})`);
  });
  console.log();

  // Step 3: Get variants for each product
  console.log("3️⃣  Finding variants...\n");

  const envLines: string[] = [
    `LEMONSQUEEZY_STORE_ID="${storeId}"`,
    "",
  ];

  let foundVariants = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const product of products) {
    const variantsRes = await api(`/variants?filter[product_id]=${product.id}`);
    const variants = variantsRes.data || [];

    if (variants.length === 0) {
      console.log(`   ${product.attributes.name}: No variants found`);
      continue;
    }

    console.log(`   ${product.attributes.name}:`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variants.forEach((v: any) => {
      const price = v.attributes.price / 100;
      const name = v.attributes.name;
      const nameKey = name.toLowerCase();
      const envKey = PLAN_MAP[nameKey];

      console.log(`     - ${name}: $${price} (ID: ${v.id})`);

      if (envKey) {
        envLines.push(`${envKey}="${v.id}"`);
        foundVariants = true;
      } else {
        envLines.push(`# Unknown variant: ${name} ($${price}) → ID: ${v.id}`);
      }
    });
    console.log();
  }

  // Add missing variant placeholders
  const foundKeys = envLines.map((l) => l.split("=")[0]);
  for (const [plan, envKey] of Object.entries(PLAN_MAP)) {
    if (!foundKeys.includes(envKey)) {
      envLines.push(`# ${envKey}="" # Missing! Create "${plan}" variant in dashboard`);
    }
  }

  // Step 4: Print results
  console.log("──────────────────────────────────────────────");
  console.log("📋 Add these to your .env file:\n");
  console.log(envLines.join("\n"));
  console.log("\n──────────────────────────────────────────────");

  if (foundVariants) {
    console.log("\n✅ Setup complete! Copy the values above into your .env\n");
  } else {
    console.log("\n⚠️  No matching variants found.");
    console.log("    Make sure your variants are named: Student, Starter, Pro, Enterprise\n");
  }

  console.log("Next steps:");
  console.log("  1. Copy the .env values above");
  console.log("  2. (Optional) Set up webhook: Dashboard → Settings → Webhooks");
  console.log("     URL: https://www.davidfajardo.space/api/webhooks/lemonsqueezy");
  console.log("  3. Run: npm run dev");
  console.log("  4. Test: http://localhost:3000/store/pricing/student\n");
}

main().catch((err) => {
  console.error("\n❌ Failed:", err.message);
  process.exit(1);
});
