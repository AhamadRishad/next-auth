import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDaraFromToken = (request: NextRequest) => {
   
    try {
        const token = request.cookies.get('token')?.value ;
        if (!token) throw new Error("Token is missing");
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET_KEY! ) ;
        return decodedToken.id;
    } catch (error : any) {
        console.log("thsi sis erer")
        throw new Error(error.message)
    }
}

