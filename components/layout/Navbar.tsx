"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchBar } from "@/components/layout/SearchBar";
import { navLinks } from "@/lib/brand";
import { selectCount, useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCart(selectCount);
  const cartHydrated = useSyncExternalStore(
    (onStoreChange) => {
      const unsubscribe = useCart.persist.onFinishHydration(onStoreChange);
      if (useCart.persist.hasHydrated()) onStoreChange();
      return unsubscribe;
    },
    useCart.persist.hasHydrated,
    () => false,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-warm-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:gap-6">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-warm-white">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Image
                src="/brand/logo-light.png"
                alt="Shefa Stores"
                width={120}
                height={56}
              />
            </SheetHeader>
            <nav className="flex flex-col px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-3 font-medium text-navy"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-3 font-medium text-navy"
              >
                Sign in
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="shrink-0" aria-label="Shefa Stores home">
          <Image
            src="/brand/logo-light.png"
            alt="Shefa Stores"
            width={110}
            height={52}
            priority
          />
        </Link>

        <SearchBar className="hidden max-w-xl flex-1 md:flex" />

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium text-navy transition-colors hover:text-orange",
                pathname === link.href && "text-orange",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Button
            render={<Link href="/account" />}
            variant="ghost"
            size="icon"
            aria-label="Account"
          >
            <User className="size-5" />
          </Button>

          <Button
            render={<Link href="/cart" />}
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Cart"
          >
            <ShoppingCart className="size-5" />
            {cartHydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
