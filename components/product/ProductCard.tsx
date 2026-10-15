import Link from "next/link";
import { Star } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { formatNaira, productBadges } from "@/lib/brand";
import type { ProductView } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductView }) {
  const badge = product.badge ? productBadges[product.badge] : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <ProductImage src={product.images[0]} alt={product.name} />

        {badge ? (
          <span
            className={cn(
              "absolute left-2 top-2 rounded-md px-2 py-0.5 text-[11px] font-semibold",
              badge.className,
            )}
          >
            {badge.label}
          </span>
        ) : product.discountPercent > 0 ? (
          <span className="absolute left-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-[11px] font-semibold text-white">
            -{product.discountPercent}%
          </span>
        ) : null}

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm font-semibold text-charcoal">
            Out of stock
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium text-charcoal group-hover:text-orange">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="font-bold text-navy">
            {formatNaira(product.price)}
          </span>
          {product.compareAtPrice && product.discountPercent > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatNaira(product.compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-orange text-orange" />
          <span className="font-medium text-charcoal">
            {product.rating.toFixed(1)}
          </span>
          <span>({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
