import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST → Save order
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db("e-commerce_db");
        const orders = db.collection("orders");

        const result = await orders.insertOne({
            ...body,
            createdAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            order: { _id: result.insertedId, ...body },
        });
    } catch (error: any) {
        console.error("❌ Error saving order:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// GET → Fetch orders by user email
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("e-commerce_db");
        const orders = db.collection("orders");

        const userOrders = await orders
            .find({ userEmail: email })
            .sort({ createdAt: -1 }) // newest first
            .toArray();

        return NextResponse.json({ success: true, orders: userOrders });
    } catch (error: any) {
        console.error("❌ Error fetching orders:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
