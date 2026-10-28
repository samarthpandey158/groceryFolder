import connectDb from "@/lib/db";
import emitEventHandler from "@/lib/emitEventHandler";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectDb()
        const {userId,paymentMethod,totalAmount,items,address}= await req.json()
        if(!userId || !paymentMethod || !totalAmount || !items || !address)
        {
            return NextResponse.json(
                {message:"send all credentials"},
                {status:400}
            )
        }
        const user = await User.findById(userId)
        if(!user){
            return NextResponse.json(
                {message:"user noyt found"},
                {status:400}
            )
        }

        const newOrder = await Order.create({user:userId,paymentMethod,totalAmount,items,address})
        await emitEventHandler("new-order", newOrder)
        return NextResponse.json(
                newOrder,
                {status:200}
            )
    } catch (error) {
        console.error("Order placement error:", error);
        return NextResponse.json(
                {message:"error from user/cart"},
                {status:500}
            )
    }
}