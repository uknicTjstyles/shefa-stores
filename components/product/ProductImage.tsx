import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function ProductImage({ src, alt, className, priority }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden bg-warm-white",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain p-4"
          priority={priority}
          unoptimized
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={56}
            height={63}
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
