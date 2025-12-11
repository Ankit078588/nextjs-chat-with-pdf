import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        
        // Extract input data
        const { name, email, password } = await request.json();
        if(!name.trim() || !email.trim() || !password.trim()) {
            return NextResponse.json({success: false, message: 'All fields are required.'}, {status: 400})
        }

        // check if user exists OR not
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            return NextResponse.json({success: false, message: 'Email is already registered.'}, {status: 400})
        }

        // create new user
        await UserModel.create({name, email, password, provider: 'credentials'});

        return NextResponse.json({success: true, message: 'Signup successful.'}, {status: 201})
    } catch(e) {
        console.log('Signup error: ', e);
        return NextResponse.json({success: false, message: 'Internal Server Error.'}, {status: 500})
    }
}