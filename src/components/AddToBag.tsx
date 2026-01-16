"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ReactNode } from "react";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  icon?: ReactNode; // 👈 allow optional icon
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  icon,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  return (
    <Button
      className="flex items-center gap-2 bg-gradient-to-br from-pink-700 via-purple-600 to-blue-800 hover:from-pink-600 hover:via-blue-500 hover:to-pink-700 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:via-pink-500 dark:hover:to-blue-500 text-white"
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      {icon && icon} {/* 👈 render icon if provided */}
      Add To Cart
    </Button>
  );
}
