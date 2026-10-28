import connectDb from "@/lib/db";
import User from "@/models/user.model";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    try {
        await connectDb()
        const {userId,location} = await req.json()
        if(!userId || !location){
            return NextResponse.json(
                {message:"Data is insufficient"},
                {status:400}
            )
        }

        const user = await User.findByIdAndUpdate(userId,{location})

        if(!user)
        {
            return NextResponse.json(
                {message:"user not found"},
                {status:400}
            )
        }

         return NextResponse.json(
                {message:"location updated"},
                {status:200}
            )

    } catch (error) {
         return NextResponse.json(
                {message:"error from /socket/update-location"},
                {status:500}
            )
    }
}