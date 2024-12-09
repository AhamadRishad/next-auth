

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModerl";

import { connect } from "@/dbConfig/dbConfig";

type DecodedToken = {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.cookies.get("token");
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//    const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET_KEY!  )as DecodedToken;  ;
//     console.log("this is token ",decodedToken)

//     const { email } = decodedToken;
   
//     console.log("Email from token:", email);
//     await connect();

//     const findUserByEmail = await User.findOne({ email });

//     console.log("findUserByEmail",findUserByEmail)
//     if (!findUserByEmail) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "User found", findUserByEmail });

//   } catch (error: any) {
    
//     console.error("Error:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }





export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      console.error("Token not found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET_KEY!) as DecodedToken;
    } catch (jwtError: any) {
      console.error("JWT verification failed:", jwtError.message);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    console.log("Decoded token:", decodedToken);

    const { email } = decodedToken;
    if (!email) {
      console.error("Email not found in token");
      return NextResponse.json({ message: "Invalid token payload" }, { status: 400 });
    }

    await connect();
    const findUserByEmail = await User.findOne({ email });
    console.log("findUserByEmail:", findUserByEmail);

    if (!findUserByEmail) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", user: findUserByEmail });

  } catch (error: any) {
    console.error("Unhandled error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


