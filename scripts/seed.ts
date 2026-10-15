/**
 * Seeds the database with demo products and the first admin user.
 * Run: npm run seed
 * WARNING: this deletes all existing products first.
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../lib/db";
import { slugify } from "../lib/slug";
import { CATEGORY_SLUGS, Product } from "../models/Product";
import { User } from "../models/User";

type Seed = {
  name: string;
  brand: string;
  category: (typeof CATEGORY_SLUGS)[number];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: "best-seller" | "new" | "hot";
  featured?: boolean;
  soldCount: number;
  description: string;
};

const products: Seed[] = [
  {
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "electronics",
    price: 320000,
    compareAtPrice: 360000,
    rating: 4.8,
    reviewCount: 124,
    stock: 25,
    badge: "best-seller",
    featured: true,
    soldCount: 480,
    description:
      "Crystal-clear sound and all-day comfort. Active noise cancellation, adaptive transparency and spatial audio make these perfect for work, travel and everyday use.",
  },
  {
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung",
    category: "electronics",
    price: 180000,
    compareAtPrice: 204500,
    rating: 4.6,
    reviewCount: 98,
    stock: 18,
    featured: true,
    soldCount: 260,
    description:
      "A sharp AMOLED display, sleep and heart-rate tracking, and a battery that lasts through the day. Pairs with any recent Android phone.",
  },
  {
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "fashion",
    price: 140000,
    rating: 4.7,
    reviewCount: 203,
    stock: 40,
    badge: "new",
    featured: true,
    soldCount: 390,
    description:
      "The classic leather sneaker with cushioned Air-Sole comfort. Easy to style and built to last.",
  },
  {
    name: "HP Pavilion Laptop",
    brand: "HP",
    category: "electronics",
    price: 580000,
    rating: 4.5,
    reviewCount: 78,
    stock: 10,
    featured: true,
    soldCount: 120,
    description:
      "A dependable everyday laptop with a fast SSD, a crisp full HD display and plenty of memory for study, work and streaming.",
  },
  {
    name: "Lenovo Backpack",
    brand: "Lenovo",
    category: "fashion",
    price: 45000,
    compareAtPrice: 48900,
    rating: 4.5,
    reviewCount: 76,
    stock: 60,
    featured: true,
    soldCount: 210,
    description:
      "Water-resistant backpack with a padded laptop sleeve and organised pockets. Fits laptops up to 15.6 inches.",
  },
  {
    name: "iPhone 15 (128GB)",
    brand: "Apple",
    category: "electronics",
    price: 730000,
    rating: 4.8,
    reviewCount: 242,
    stock: 14,
    badge: "hot",
    soldCount: 340,
    description:
      "A16-class performance, a 48MP main camera and USB-C. A great all-round smartphone.",
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "electronics",
    price: 250000,
    compareAtPrice: 277800,
    rating: 4.7,
    reviewCount: 96,
    stock: 20,
    soldCount: 150,
    description:
      "Industry-leading noise cancelling headphones with up to 30 hours of battery and a comfortable lightweight fit.",
  },
  {
    name: "Bed Sheet Set",
    brand: "Shefa Home",
    category: "home-living",
    price: 26000,
    compareAtPrice: 29500,
    rating: 4.5,
    reviewCount: 45,
    stock: 80,
    soldCount: 175,
    description:
      "Soft, breathable cotton-blend sheet set with a fitted sheet, flat sheet and two pillowcases.",
  },
  {
    name: "Philips Blender",
    brand: "Philips",
    category: "home-living",
    price: 40000,
    rating: 4.8,
    reviewCount: 88,
    stock: 35,
    soldCount: 140,
    description:
      "A powerful 600W blender for smoothies, soups and sauces, with a 1.5L jug and stainless steel blades.",
  },
  {
    name: "Non-Stick Cookware Set (5 pcs)",
    brand: "Tefal",
    category: "home-living",
    price: 65000,
    compareAtPrice: 72000,
    rating: 4.4,
    reviewCount: 52,
    stock: 22,
    soldCount: 90,
    description:
      "Five-piece non-stick set with heat-resistant handles. Easy to clean and suitable for most hobs.",
  },
  {
    name: "Shea Butter Body Lotion (400ml)",
    brand: "Nature's Glow",
    category: "beauty",
    price: 6500,
    rating: 4.6,
    reviewCount: 130,
    stock: 150,
    soldCount: 310,
    description:
      "Rich, fast-absorbing body lotion with raw shea butter for 24-hour moisture.",
  },
  {
    name: "Vitamin C Face Serum",
    brand: "Nature's Glow",
    category: "beauty",
    price: 12000,
    compareAtPrice: 14000,
    rating: 4.4,
    reviewCount: 61,
    stock: 70,
    badge: "new",
    soldCount: 95,
    description:
      "Brightening serum that helps even skin tone and reduce dark spots. Suitable for daily use.",
  },
  {
    name: "Long Grain Parboiled Rice (50kg)",
    brand: "Mama Gold",
    category: "groceries",
    price: 78000,
    rating: 4.7,
    reviewCount: 210,
    stock: 40,
    soldCount: 420,
    description:
      "Clean, stone-free parboiled rice that cooks fluffy every time. Sold in a 50kg bag.",
  },
  {
    name: "Pure Groundnut Oil (5L)",
    brand: "Kings",
    category: "groceries",
    price: 14500,
    rating: 4.5,
    reviewCount: 84,
    stock: 90,
    soldCount: 230,
    description:
      "Light, pure groundnut oil for frying and cooking. 5 litre container.",
  },
  {
    name: "Yoga Mat (6mm)",
    brand: "Shefa Fit",
    category: "sports",
    price: 12500,
    rating: 4.5,
    reviewCount: 57,
    stock: 55,
    soldCount: 80,
    description:
      "Non-slip, cushioned 6mm mat with a carry strap. Ideal for yoga, stretching and floor workouts.",
  },
  {
    name: "Adjustable Dumbbell Set (20kg)",
    brand: "Shefa Fit",
    category: "sports",
    price: 48000,
    compareAtPrice: 54000,
    rating: 4.6,
    reviewCount: 39,
    stock: 16,
    badge: "hot",
    soldCount: 60,
    description:
      "Adjustable dumbbell pair that goes up to 20kg total, with secure collars and a carry case.",
  },
  {
    name: "Wooden Building Blocks (100 pcs)",
    brand: "PlayTime",
    category: "toys",
    price: 15000,
    rating: 4.7,
    reviewCount: 66,
    stock: 45,
    soldCount: 70,
    description:
      "Colourful, smooth-edged wooden blocks that help children build coordination and creativity. Ages 3 and up.",
  },
  {
    name: "Remote Control Car",
    brand: "PlayTime",
    category: "toys",
    price: 22000,
    compareAtPrice: 25000,
    rating: 4.3,
    reviewCount: 41,
    stock: 30,
    soldCount: 55,
    description:
      "Rechargeable 2.4GHz remote control car with off-road tyres. Ages 6 and up.",
  },
];

async function main() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany(
      products.map((product) => ({
        ...product,
        slug: slugify(product.name),
        images: [],
      })),
    );
    console.log(`Seeded ${products.length} products`);

    const email = (
      process.env.SEED_ADMIN_EMAIL ?? "admin@shefastores.com"
    ).toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({
        name: "Shefa Admin",
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role: "admin",
      });
      console.log(`Created admin user: ${email}`);
    } else {
      console.log(`Admin user already exists: ${email}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
