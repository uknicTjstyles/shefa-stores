import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedProducts(5);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryTiles />

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl">Featured Products</h2>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-medium text-orange hover:text-orange-600"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No products yet. Run <code>npm run seed</code> to add some.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
