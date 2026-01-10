"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useDebounce } from "@/hooks/useDebounce";
import Logo from "@/components/logo";

const links = [
  { name: "Home", href: "/" },
  { name: "Women", href: "/Women" },
  { name: "Men", href: "/Men" },
  { name: "Accessories", href: "/Accessories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { handleCartClick, cartCount = 0 } = useShoppingCart();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const closeSearch = () => {
    setSearch("");
    setIsSearchOpen(false);
  };

  // Navigate when user stops typing
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
  }, [debouncedSearch, router]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 lg:static border-b bg-white mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-24">
            {/* Left Section */}
            <div className="flex items-center lg:gap-6">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>

              <div className="hidden lg:block">
                <Logo />
              </div>
            </div>

            {/* Center */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <div className="lg:hidden">
                <Logo />
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      pathname === link.href
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Desktop Search (always visible) */}
              <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20">
                <SearchIcon className="text-gray-400" fontSize="small" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm w-56 text-gray-900 placeholder:text-gray-500"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <CloseIcon fontSize="small" />
                  </button>
                )}
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="text-gray-600" />
              </button>

              {/* Sign Up */}
              <Link href="/sign-up" className="hidden lg:block">
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Sign up"
                >
                  <PersonOutlineIcon className="text-gray-600" />
                </button>
              </Link>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBagIcon className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Expandable Search */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-20 pb-4" : "max-h-0"
            }`}
          >
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20">
              <SearchIcon className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-500"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 lg:h-0" />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t">
            <Link href="/sign-up" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
