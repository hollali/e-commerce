"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Order {
  _id: string;
  userEmail: string;
  userName: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  paymentReference: string;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`/api/orders?email=${user.email}`);
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-gray-600 mb-4 text-lg">
          Please login to view your orders
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-gray-600 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} × ₵{item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-600">
                    ₵{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 font-semibold">
              <span>Total:</span>
              <span className="text-lg text-blue-600">₵{order.total}</span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Payment Ref: {order.paymentReference}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
