import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
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
    createdAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
    {
        userEmail: { type: String, required: true },
        userName: { type: String },
        items: [
            {
                id: String,
                name: String,
                price: Number,
                quantity: Number,
                image: String,
            },
        ],
        total: { type: Number, required: true },
        paymentReference: { type: String, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.models.Order ||
    mongoose.model<IOrder>("Order", OrderSchema);
