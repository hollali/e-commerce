"use client";

import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";
import { PaystackButton } from "react-paystack";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  const [user, loading] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (user?.email) setUserEmail(user.email);
  }, [user]);

  // Stripe "Buy Now"
  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  // Paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: product.price * 100, // Paystack expects lowest unit (pesewas)
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
  };

  const handlePaystackSuccessAction = (reference: any) => {
    console.log("✅ Paystack Payment successful:", reference);
    // TODO: Save order to DB, then redirect
  };

  const handlePaystackCloseAction = () => {
    console.log("❌ Payment closed");
  };

  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md cursor-not-allowed text-gray-700 dark:text-gray-400"
      >
        Loading...
      </button>
    );
  }

  if (!userEmail) {
    return (
      <div className="inline-block">
        <Link
          href="/sign-up"
          className="bg-orange-500 hover:bg-orange-600 dark:bg-gradient-to-br dark:from-orange-600 dark:via-red-600 dark:to-pink-600 dark:hover:from-orange-500 dark:hover:via-red-500 dark:hover:to-pink-500 px-4 py-2 rounded-md text-white transition-colors cursor-pointer inline-block text-center no-underline"
        >
          Please login to checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* Paystack Checkout */}
      <PaystackButton
        {...config}
        text="Checkout"
        onSuccess={handlePaystackSuccessAction}
        onClose={handlePaystackCloseAction}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
      />

      {/* Stripe Checkout (future use) */}
      {/*<button
        onClick={() => buyNow(product.price_id)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-gradient-to-br dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:via-indigo-500 dark:hover:to-purple-500"
      >
        Pay with Stripe
      </button>*/}
    </div>
  );
}
