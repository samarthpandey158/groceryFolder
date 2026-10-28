import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectDb();
        const {name,email,password} = await req.json();

        const existingUser = await User.findOne({email:email})
        if(existingUser)
        {
            return NextResponse.json(
                {message:"email already exists"},
                {status:400}
            )
        }
        if(password.length<6)
        {
            return NextResponse.json(
                {message:"password must be at least 6 length"},
                {status:400}
            )
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password:hashedPassword
        })
        
        return NextResponse.json(
                 user,
                {status:200}
            )
    } catch (error) {
        return NextResponse.json(
                {message:`user creation side error &{error}`},
                {status:500}
            )
    }
    
}