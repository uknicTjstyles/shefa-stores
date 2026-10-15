import { iconMap } from "@/components/icons";
import { valueProps } from "@/lib/brand";

export function ValueProps() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
        {valueProps.map(({ title, icon }) => {
          const Icon = iconMap[icon];
          if (!Icon) return null;

          return (
            <div key={title} className="flex items-center gap-3">
              <Icon className="size-7 shrink-0 text-orange" aria-hidden />
              <span className="text-sm font-semibold text-navy">{title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
