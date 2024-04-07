import {connect} from "@/config/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export const POST = async (request:NextRequest) => {
    try{

        const reqBody = await request.json()
        const {email,password} = reqBody
        
        console.log(reqBody)

        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error:"User does not exists"})
        }

        console.log("user exists")

        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error:"Check your credentials"})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message : 'Logged in success'
        })

        response.cookies.set("Token",token,{httpOnly:true})
        return response

    }catch(err:any){
        return NextResponse.json({
            message : err.message
        })
    }
}