import Link from "next/link";
import { iconMap } from "@/components/icons";
import { categories } from "@/lib/brand";

export function CategoryTiles() {
  const MoreIcon = iconMap.Ellipsis;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-8">
        {categories.map(({ slug, label, icon }) => {
          const Icon = iconMap[icon];
          if (!Icon) return null;

          return (
            <Link
              key={slug}
              href={`/shop?category=${encodeURIComponent(slug)}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-xl bg-white text-navy shadow-card transition-colors group-hover:bg-orange group-hover:text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="text-xs font-medium text-charcoal">{label}</span>
            </Link>
          );
        })}

        <Link
          href="/shop"
          className="group flex flex-col items-center gap-2 text-center"
        >
          <span className="flex size-14 items-center justify-center rounded-xl bg-white text-navy shadow-card transition-colors group-hover:bg-orange group-hover:text-white">
            {MoreIcon && <MoreIcon className="size-6" aria-hidden />}
          </span>
          <span className="text-xs font-medium text-charcoal">More</span>
        </Link>
      </div>
    </section>
  );
}
