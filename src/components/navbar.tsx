"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useDebounce } from "@/hooks/useDebounce";
import Logo from "@/components/logo";

const links = [
  { name: "Home", href: "/" },
  { name: "Women", href: "/Women" },
  { name: "Men", href: "/Men" },
  { name: "Accessories", href: "/Accessories" },
  { name: "Sign up", href: "/sign-up" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleCartClick, cartCount = 0 } = useShoppingCart();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // 🔍 Navigate when user stops typing
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
  }, [debouncedSearch, router]);

  return (
    <header className="mb-16 border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6">
        {/* Mobile menu button */}
        <button
          className="lg:hidden z-50 p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>

        {/* Mobile drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            {/* Mobile Search */}
            <div className="mt-10 mb-6 flex items-center border rounded-md px-3 py-2">
              <SearchIcon className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="ml-2 w-full outline-none"
              />
            </div>

            <nav>
              <ul>
                {links.map((link, idx) => (
                  <li key={idx} className="my-4">
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <nav className="hidden lg:flex gap-12">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-semibold ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center border rounded-md px-3 py-2 w-64">
          <SearchIcon className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="ml-2 w-full outline-none"
          />
        </div>

        {/* Cart */}
        <Button
          variant="outline"
          onClick={handleCartClick}
          className="relative h-12 w-12 border-none rounded-none"
        >
          <ShoppingBagIcon />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
