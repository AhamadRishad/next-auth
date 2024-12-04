// import { getDaraFromToken } from "@/helpers/getDataFromToken";



// import { NextRequest , NextResponse } from "next/server";
// import User from "@/models/userModerl";
// import { connect } from "@/dbConfig/dbConfig";



// connect();

// export async function Get(request: NextRequest){
//     console.log("hitted to route ts request")
//     try {
//         const userId = await getDaraFromToken(request);
//         const user = await User.findById(userId)
//         .select('-password ');
//         console.log(user)
//         return NextResponse.json({
//             message: 'User Found',
//             data : user
//         })
        
//     } catch (error:any) {
//         console.log("thsis si a")
//         return NextResponse.json({ error: error.message }, { status: 400 });
//     }
// }



import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModerl";// Ensure correct path
import { connect } from "@/dbConfig/dbConfig";
import { getDaraFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDaraFromToken(request);
        console.log("User ID:", userId); // Debugging

        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }

        console.log("User:", user); // Debugging
        return NextResponse.json({
            message: "User Found",
            data: user,
        });
    } catch (error: any) {
        console.error(error.message); // Debugging
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
