import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const client = await clientPromise;
        const db = client.db("e-commerce_db"); // ✅ choose your DB name
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
