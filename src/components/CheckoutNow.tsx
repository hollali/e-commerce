"use client";

import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";
import { PaystackButton } from "react-paystack";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";
import { useEffect, useState } from "react";

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
        className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  if (!userEmail) {
    return (
      <button
        disabled
        className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed"
      >
        Please login to checkout
      </button>
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
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-500"
      />

      {/* Stripe Checkout (future use) */}
      {/*<button
        onClick={() => buyNow(product.price_id)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Pay with Stripe
      </button>*/}
    </div>
  );
}
