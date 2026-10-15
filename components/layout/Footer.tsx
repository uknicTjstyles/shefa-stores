import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { brand, footerLinks } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image
            src="/brand/logo-dark.png"
            alt={brand.name}
            width={170}
            height={58}
          />
          <p className="text-sm text-white/70">{brand.tagline}</p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-orange">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange">
            Customer Care
          </h2>
          <ul className="space-y-2 text-sm text-white/80">
            {footerLinks.customerCare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange">
            Get in Touch
          </h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-orange" />
              <a href={`mailto:${brand.contact.email}`}>
                {brand.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-orange" />
              <a href={`tel:${brand.contact.phone.replaceAll(" ", "")}`}>
                {brand.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="size-4 text-orange" />
              <a
                href={`https://${brand.contact.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {brand.contact.website}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>{footerLinks.legal.join("  |  ")}</p>
        </div>
      </div>
    </footer>
  );
}
