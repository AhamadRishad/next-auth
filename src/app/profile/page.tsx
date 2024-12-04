// "use client"
// import axios from "axios"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import toast from "react-hot-toast"

// export default function ProfilePage() {
//  const router = useRouter()
//  const [data , setData] = useState('Nothing')
//   const logout =async () => {
//     try {
//       const response = await axios.get('/api/users/logout')
//       toast.success("Logged out successfully");
//       router.push('/login')
//     } catch (error:any) {
//       console.log("Failed to logout: ", error.message);
//       toast.error(`Failed to logout. ${error.message}`);
//     }
//   }

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.get('/api/users/me')
      
//       console.log("res.data", res.data)
//       setData(res.data.data._id)

//     } catch (error:any) {
//       console.log("Failed to get user details: ", error.message);
//     }
//   }
//   return (
//     <div className="flex flex-col items-center justify-center text-white  bg-black min-h-screen py-2">
//      <button
//       onClick={logout}
//       className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-5">
//           Logout
//      </button>

//      <hr />
//       <h1
//         className="border rounded-full shadow-2xl  shadow-white
//              hover:shadow-lg hover:transition delay-100 duration-500   hover:shadow-orange-500 hover:translate-x-2
//              hover:translate-y-2
//                p-5"
//       >
//         prfile page
//       </h1>
//       <br /><br /><br />

//       <h2 >{data === "Nothing" ? "Nothing" :<Link href={`/profile/${data}`}> {data}</Link>}</h2>
     
//       <button
//       onClick={getUserDetails}
//       className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded mb-5">
//           Get User Details
//      </button>
//     </div>
//   )
// }




"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Failed to logout:", error.message);
      toast.error(`Failed to logout. ${error.message}`);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("res.data", res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.error("Failed to get user details:", error.message);
      toast.error("Failed to fetch user details.");
    }
  };

  const navigateToProfile = () => {
    if (data !== "Nothing") {
      router.push(`/profile/${data}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white bg-black min-h-screen py-2">
      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-5"
      >
        Logout
      </button>

      <hr />

      {/* Page Title */}
      <h1 className="border rounded-full shadow-2xl shadow-white hover:shadow-lg hover:transition delay-100 duration-500 hover:shadow-orange-500 hover:translate-x-2 hover:translate-y-2 p-5">
        Profile Page
      </h1>

      <br />
      <br />
      <br />

      {/* User Details */}
      <h2>
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`} className="text-blue-400 underline">
            {data}
          </Link>
        )}
      </h2>

      {/* Fetch User Details Button */}
      <button
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded mb-5"
      >
        Get User Details
      </button>

      {/* Navigate to Profile Button */}
      <button
        onClick={navigateToProfile}
        className="bg-purple-500 hover:bg-purple-700 font-bold py-2 px-4 rounded"
      >
        Go to Profile
      </button>
    </div>
  );
}
