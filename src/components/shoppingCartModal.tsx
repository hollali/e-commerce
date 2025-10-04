"use client";

import { useShoppingCart } from "use-shopping-cart";
import { PaystackButton } from "react-paystack";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function ShoppingCartModal() {
  const {
    cartCount = 0,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    totalPrice = 0,
    clearCart,
  } = useShoppingCart();

  const [user, loading] = useAuthState(auth);
  const cedisSign = "\u20B5";
  const router = useRouter();

  // Use Firebase email if logged in
  const userEmail = user?.email || "";
  const userName = user?.displayName || "";

  // Paystack config
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    name: user?.displayName || "",
    amount: totalPrice * 100,
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
    metadata: {
      custom_fields: [
        {
          display_name: "Total Items",
          variable_name: "total_items",
          value: cartCount,
        },
      ],
    },
  };

  const handlePaystackSuccess = (reference: any) => {
    console.log("✅ Payment Success:", reference);
    handleCartClick();
    clearCart();
    // TODO: Save order to DB
  };

  const handlePaystackClose = () => {
    console.log("❌ Payment closed");
  };

  if (loading) return null;

  // If not logged in → prompt login
  if (!userEmail) {
    return (
      <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
        <SheetContent className="sm:max-w-lg w-[100vw]">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-center h-full text-3xl text-black border-b pb-2 border-gray-200 font-bold">
              CART
            </SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-gray-600 mb-4">Please login to checkout</p>
            <Link href="/sign-up">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[100vw]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center w-full text-3xl text-black border-b pb-2 border-gray-200 font-bold">
            <span>CART</span>
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          {/* Cart Items */}
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center mt-36">
                  <h1 className="text-2xl font-semibold">
                    Your cart is empty !!
                  </h1>
                  <Link href="/" onClick={() => handleCartClick()}>
                    <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="line-clamp-1">{entry.name}</h3>
                            <p className="ml-4">
                              {cedisSign}
                              {entry.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500 font-bold">
                            Quantity: {entry.quantity}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => decrementItem(entry.id)}
                              className="font-medium text-2xl text-blue-600 hover:text-blue-300"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => incrementItem(entry.id)}
                              className="font-medium text-2xl text-blue-600 hover:text-blue-300"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-blue-600 hover:text-blue-300"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          {/* ✅ Clear Cart button (only if cart has items) */}
          {cartCount > 0 && (
            <div className="flex justify-center mt-10 mb-3">
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to clear your cart?")
                  ) {
                    clearCart();
                  }
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                <FaTrash size={18} />
              </button>
            </div>
          )}
          {/* Checkout Section */}
          {cartCount > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p className="text-blue-600">
                  {cedisSign}
                  {totalPrice}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Delivery fee is not added at checkout
              </p>
              <div className="mt-6 space-y-3">
                <div
                  onClick={() => {
                    handleCartClick();
                  }}
                >
                  <PaystackButton
                    {...paystackConfig}
                    text="Checkout"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onSuccess={handlePaystackSuccess}
                    onClose={handlePaystackClose}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  OR{" "}
                  <button
                    onClick={() => handleCartClick()}
                    className="font-medium text-blue-600 hover:text-blue-300"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
