"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
     const response = await axios.post("/api/users/signup", user);
      toast.success("SignUp Successful");
      console.log("Signup sucess",response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("SignUp Failed: ", error.message);
      toast.error(`Failed to sign up. ${error.message}`);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 
      0 && user.username.length > 0){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
  }, [user, setUser]);
  return (
    
    <div
      className="flex flex-col items-center justify-center
          min-h-screen py-2 bg-black"
    >
      <h1 className="border rounded-full text-white p-4 mb-5">{loading? "processing" : "SignUp"}</h1>
      <hr />
      <hr />

      <label className="text-white" htmlFor="username">
        user name
      </label>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4
                    focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="user name"
      />

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
       onClick={onSignUp}
        className=" p-2 border text-white border-gray-300 rounded-lg 
                          mb-4 focus:outline-none focus:border-gray-600   "
      >
        {buttonDisabled? "No signUp" :"signUp" }
      </button>
      <Link  className="text-white" href="/login">
        Already have an account? Login
      </Link>
    </div>
  );
}
