import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:NextRequest)
{
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

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: `${process.env.NEXT_BASE_URL}/user/order-success`,
            cancel_url: `${process.env.NEXT_BASE_URL}/user/order-cancel`,
            line_items: [
                {
                price_data: {
                    currency: "inr",
                    product_data: {
                    name: "ShopNest Order Payment",
                    },
                    unit_amount: totalAmount * 100,
                },
                quantity: 1,
                },
            ],
            metadata:{orderId:newOrder._id.toString()}
            });

            return NextResponse.json({url:session.url},{status:200})
    } catch (error) {
         return NextResponse.json(
            {msg:"order payment error" + error},
            {status:500})
    }
}