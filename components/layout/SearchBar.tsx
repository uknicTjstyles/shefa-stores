"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    router.push(
      trimmedQuery ? `/shop?q=${encodeURIComponent(trimmedQuery)}` : "/shop",
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={cn(
        "flex h-10 w-full overflow-hidden rounded-lg border border-border bg-white",
        className,
      )}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for products, brands and more..."
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex w-11 items-center justify-center bg-orange text-white transition-colors hover:bg-orange-600"
      >
        <Search className="size-4" />
      </button>
    </form>
  );
}
