import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    try {
        await connectDb()
        const {userId,socketId} = await req.json()
        const user = await User.findByIdAndUpdate(userId,{
            socketId,
            isOnline:true
        },{new:true}) 
        if(!user) return NextResponse.json({msg:"user don't exists"},{status:200})
        return NextResponse.json({msg:'done'},{status:200})
    } catch (error) {
        return NextResponse.json({msg:`error ${error}`},{status:500})
    }
}