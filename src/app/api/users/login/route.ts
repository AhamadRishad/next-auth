
import {connect} from "@/dbConfig/dbConfig"

import User from "@/models/userModerl"

import {  NextRequest, NextResponse } from "next/server"

import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password } = reqBody
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({ error: "User does not exist"  }, 
                { status: 404 }
            )
        }

        //check password and check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({ error: "Invalid password"  }, 
                { status: 401 }
            )

        }

        //generate JWT token

        const tokenData = {
            id: user._id ,
            username : user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "User logged in successfully",
            success:true,

            token
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message  }, 
            { status: 500 }
        )
    }
}