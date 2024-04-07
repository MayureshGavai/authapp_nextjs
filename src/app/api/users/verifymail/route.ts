import {connect} from "@/config/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


connect()

export const POST = async(request:NextRequest) => {
    try{
        const reqBody = await request.json()
        const {token}:any = reqBody
        console.log(token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        console.log(user)
        if(!user){
            return NextResponse.json({message : 'Invalid token'})
        }

        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();  
        
        return NextResponse.json({
            message:'Email verified successfully',
            success : true
        })

    }catch(err:any){
        return NextResponse.json({
            message : err.message
        })
    }
}