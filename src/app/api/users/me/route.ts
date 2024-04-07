import {connect} from "@/config/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

connect()

export const GET = async (request: NextRequest) => {
    try{
        const userId = await getDataFromToken(request) 
    const user = await User.findOne({_id:userId})
    return NextResponse.json({
        message : "user found",
        data : user
    })
    }catch(err:any){
        return NextResponse.json({
            message : err.message
        })
    }
}   