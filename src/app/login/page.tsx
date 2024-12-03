"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function LogIn() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/users/login",
        user
      );
      console.log("Login Successful", response.data);
      toast.success("Login Successful");
      router.push("/profile");
       
    } catch (error: any) {
      console.log("Login Failed: ", error.message);
      toast.error(`Failed to login. ${error.message}`);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    // <form>
    //     <input type="text" placeholder="Email" />
    //     <input type="password" placeholder="Password" />
    //     <input type="submit" value="Sign Up" />
    // </form>
    <div
      className="flex flex-col items-center justify-center
          min-h-screen py-2 bg-black"
    >
      <h1 className="border rounded-full text-white p-4 mb-5">{loading? "processign ":"Login"}</h1>
      <hr />
      <hr />

     

      <label className="text-white" htmlFor="email">
        email
      </label>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4
              focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label className="text-white" htmlFor="password">
        password
      </label>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4
              focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
       onClick={onLogin}
        className=" p-2 border text-white border-gray-300 rounded-lg 
                          mb-4 focus:outline-none focus:border-gray-600   "
      >
      Login here
      </button>
      <Link  className="text-white" href="/signup">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
}
