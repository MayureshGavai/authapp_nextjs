import {connect} from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect()

export const GET =  () => {
    try{

        const response = NextResponse.json({
            message : "Logout Successful",
            success : true
        })

        response.cookies.set("Token","",{
            httpOnly:true,
            expires : new Date(0)
        })

        return response

    }catch(err:any){
        return NextResponse.json({
            message : err.message
        })
    }
}