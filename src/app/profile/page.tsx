"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfilePage() {
 const router = useRouter()
  const logout =async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success("Logged out successfully");
      router.push('/login')
    } catch (error:any) {
      console.log("Failed to logout: ", error.message);
      toast.error(`Failed to logout. ${error.message}`);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center text-white  bg-black min-h-screen py-2">
     <button
      onClick={logout}
      className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-5">
          Logout
     </button>
     <hr />
      <h1
        className="border rounded-full shadow-2xl  shadow-white
             hover:shadow-lg hover:transition delay-100 duration-500   hover:shadow-orange-500 hover:translate-x-2
             hover:translate-y-2
               p-5"
      >
        prfile page
      </h1>
      
    </div>
  )
}
