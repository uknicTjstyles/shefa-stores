/** Shefa Stores brand kit: single source of truth for copy and store data. */
export const brand = {
  name: "Shefa Stores",
  shortName: "Shefa",
  tagline: "More Choice. More Possibilities.",
  heroHeadline: ["More Choice.", "More Possibilities."],
  heroSubtext:
    "Your everyday marketplace for technology, fashion, home essentials and more.",
  description:
    "Shefa Stores is your go-to online marketplace for quality products, great deals and a seamless shopping experience. From the latest tech to fashion, home essentials and more, we bring you more choice and more possibilities.",
  contact: {
    website: "www.shefastores.com",
    email: "support@shefastores.com",
    phone: "+234 812 345 6789",
  },
} as const;

export const valueProps = [
  { title: "Wide Selection", icon: "ShoppingCart" },
  { title: "Secure Shopping", icon: "ShieldCheck" },
  { title: "Fast & Reliable Delivery", icon: "Truck" },
  { title: "Dedicated Support", icon: "Headset" },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop" },
  { label: "Deals", href: "/shop?deals=true" },
  { label: "About", href: "/about" },
] as const;

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/about" },
  ],
  customerCare: ["Help Center", "Shipping Info", "Returns & Refunds", "Track Order"],
  legal: ["Privacy Policy", "Terms of Service"],
} as const;

export const categories = [
  { slug: "electronics", label: "Electronics", icon: "Monitor" },
  { slug: "fashion", label: "Fashion", icon: "Shirt" },
  { slug: "home-living", label: "Home & Living", icon: "House" },
  { slug: "beauty", label: "Beauty", icon: "Sparkles" },
  { slug: "groceries", label: "Groceries", icon: "ShoppingBasket" },
  { slug: "sports", label: "Sports", icon: "Dumbbell" },
  { slug: "toys", label: "Toys", icon: "Puzzle" },
] as const;

export const priceRanges = [
  { label: "Under ₦50,000", min: 0, max: 50_000 },
  { label: "₦50,001 - ₦100,000", min: 50_001, max: 100_000 },
  { label: "₦100,001 - ₦200,000", min: 100_001, max: 200_000 },
  { label: "₦200,001+", min: 200_001, max: null },
] as const;

export const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
] as const;

export const productBadges = {
  "best-seller": { label: "Best Seller", className: "bg-orange text-white" },
  new: { label: "New", className: "bg-navy text-white" },
  hot: { label: "Hot", className: "bg-destructive text-white" },
} as const;

export const accountMenu = [
  { label: "Dashboard", href: "/account" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Address Book", href: "/account/addresses" },
  { label: "Account Settings", href: "/account/settings" },
] as const;

export const adminMenu = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
] as const;

/** Format a number as Nigerian Naira, e.g. 320000 -> "₦320,000" */
export const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
