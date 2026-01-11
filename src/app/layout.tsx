import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartProvider from "@/components/provider";
import ShoppingCartModal from "@/components/shoppingCartModal";

import { ThemeProvider } from "next-themes";

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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <CartProvider>
            <Navbar />
            <ShoppingCartModal />
            {children}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
