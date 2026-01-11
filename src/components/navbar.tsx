"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { useDebounce } from "@/hooks/useDebounce";
import Logo from "@/components/logo";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";

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

  // Dark mode
  const { theme, setTheme } = useTheme();

  // Navigate when user stops typing
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
  }, [debouncedSearch, router]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeSearch = () => {
    setSearch("");
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 lg:static border-b bg-background mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-24">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gradient-to-br dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-blue-600 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
              <div className="hidden lg:block">
                <Logo />
              </div>
            </div>

            {/* Center: Links */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <div className="lg:hidden">
                <Logo />
              </div>
              <nav className="hidden lg:flex items-center gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-extrabold rounded-lg transition-colors ${
                      pathname === link.href
                        ? "text-blue-600 dark:bg-gradient-to-br dark:from-green-600 dark:via-teal-600 dark:to-cyan-600 dark:text-white"
                        : "text-gray-700 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gradient-to-br dark:hover:from-green-600 dark:hover:via-teal-600 dark:hover:to-cyan-600 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: Search + Cart + Profile + Dark Mode */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden lg:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-sm w-56 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <SearchIcon className="text-gray-400" fontSize="small" />
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
                className="lg:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="text-gray-600 dark:text-gray-300" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </button>

              {/* Sign Up */}
              <Link href="/sign-up" className="hidden lg:block">
                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <PersonOutlineIcon className="text-gray-600 dark:text-gray-300" />
                </button>
              </Link>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBagIcon className="text-black dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:via-pink-500 dark:hover:to-blue-500">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-20 pb-4" : "max-h-0"
            }`}
          >
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700">
              <SearchIcon className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
        className={`fixed top-0 left-0 h-full w-80 bg-background dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                        ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <Link href="/sign-up" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:via-pink-500 dark:hover:to-blue-500 text-white rounded-lg shadow-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
