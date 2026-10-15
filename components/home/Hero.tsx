import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Laptop,
  ShoppingBag,
  Watch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";

const tiles = [
  { icon: Laptop, label: "Laptops", offset: "" },
  { icon: Headphones, label: "Audio", offset: "translate-y-6" },
  { icon: Watch, label: "Wearables", offset: "-translate-y-2" },
  { icon: ShoppingBag, label: "Fashion", offset: "translate-y-4" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange">
            Welcome to {brand.name}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {brand.heroHeadline[0]}
            <br />
            {brand.heroHeadline[1]}
          </h1>
          <p className="mt-4 max-w-md text-white/80">{brand.heroSubtext}</p>
          <Button
            render={<Link href="/shop" />}
            size="lg"
            className="mt-8 bg-orange px-6 text-white hover:bg-orange-600"
          >
            Shop Now
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="relative hidden items-center justify-center sm:flex">
          <div className="absolute size-72 rounded-full bg-orange md:size-96" />
          <div className="relative grid grid-cols-2 gap-4">
            {tiles.map(({ icon: Icon, label, offset }) => (
              <div
                key={label}
                className={`flex size-28 flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-card md:size-32 ${offset}`}
              >
                <Icon className="size-8 text-navy" />
                <span className="text-sm font-semibold text-navy">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
