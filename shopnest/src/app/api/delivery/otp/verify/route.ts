import connectDb from "@/lib/db";
import emitEventHandler from "@/lib/emitEventHandler";
import DeliveryAssignment from "@/models/deliveryAssignment.model";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const { orderId, otp } = await req.json();

        if (!orderId || !otp) {
            return NextResponse.json(
                { message: "orderId or OTP not found" },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json(
                { message: "order not found" },
                { status: 400 }
            );
        }

        if (String(order.deliveryOtp).trim() !== String(otp).trim()) {
            return NextResponse.json(
                { message: "incorrect or expired otp" },
                { status: 400 }
            );
        }

        order.status = "Delivered"
        order.deliveryOtpVerification = true
        order.deliveredAt = new Date()
        await order.save()
         await order.populate("user");
        await emitEventHandler("order-status-update", {
        orderId: order._id,
        status: order.status
        });
        await DeliveryAssignment.updateOne(
            { order: orderId },
            { $set: { assignedTo: null, status: "completed" } }
        )

        return NextResponse.json(
            { message: "Delivery successfully completed" },
            { status: 200 }
        )
    } catch (error) {
         return NextResponse.json(
            { message:`verification error ${error} ` },
            { status: 500 }
        )
    }
}