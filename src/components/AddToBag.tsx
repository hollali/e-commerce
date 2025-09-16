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
      className="flex items-center gap-2 bg-blue-800 hover:bg-blue-600"
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
