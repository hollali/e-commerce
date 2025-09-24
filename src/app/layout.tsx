import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartProvider from "@/components/provider";
import ShoppingCartModal from "@/components/shoppingCartModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Anet's Beads",
  description:
    "Discover the latest trends and timeless styles at Nadia's Collections",
  icons: {
    icon: "/favicon.ico", // regular favicon
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png", // for iOS devices
  },
  openGraph: {
    title: "Anet's Beads",
    description:
      "Discover the latest trends and timeless styles at Annette's Beads",
    url: "https://www.africvouge.com",
    type: "website",
    images: [
      {
        url: "https://www.africvouge.com/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Annette's Beads",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <ShoppingCartModal />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
