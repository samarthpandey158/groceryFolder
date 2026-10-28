import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest){

    try {
        await connectDb();
        const {role,mobile} = await req.json()
        const session = await auth();
        const getUser = await User.findOneAndUpdate({email:session?.user?.email},{
            role,
            mobile
        },{new:true})
        if(!getUser)
        {
            return NextResponse.json(
                {message:"user don't exists"},
                {status:400}
            )
        }
        console.log(getUser)
         return NextResponse.json(
                getUser,
                {status:200}
            )
    } catch (error) {
         return NextResponse.json(
               {message:"edit role & mobile error ${error}"},
                {status:500}
            )
    }
}