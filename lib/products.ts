import { connectDB } from "@/lib/db";
import { Product, type ProductDoc } from "@/models/Product";

export type ProductView = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  discountPercent: number;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  badge: "best-seller" | "new" | "hot" | null;
};

type LeanProduct = ProductDoc & { _id: { toString(): string } };

// Convert database documents into plain objects safe to pass to components.
export function toProductView(product: LeanProduct): ProductView {
  const compareAtPrice = product.compareAtPrice ?? null;
  const discountPercent =
    compareAtPrice && compareAtPrice > product.price
      ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
      : 0;

  return {
    id: product._id.toString(),
    slug: product.slug,
    name: product.name,
    brand: product.brand ?? "",
    category: product.category,
    price: product.price,
    compareAtPrice,
    discountPercent,
    images: product.images ?? [],
    stock: product.stock,
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    badge: (product.badge ?? null) as ProductView["badge"],
  };
}

export async function getFeaturedProducts(limit = 5): Promise<ProductView[]> {
  await connectDB();
  const products = await Product.find({ featured: true })
    .sort({ soldCount: -1 })
    .limit(limit)
    .lean<LeanProduct[]>();

  return products.map(toProductView);
}
