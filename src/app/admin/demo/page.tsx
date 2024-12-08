"use client";

import axios from "axios";
// import toast from "react-hot-toast";

export default function Demo() {
  const action = async () => {
    try {
      const result = await axios.get("/api/admin/tokenvarify");
      console.log("Success: ", result.data);
    } catch (error: any) {
      console.error("Failed: ", error);
    }
  };
  return (
    <div className="min-h-screen">
      <h1>Dashboard Page</h1>
      <p>Welcome to DEmo Page </p>
      <button
        onClick={action} // Alert function to
        className="p-1 rounded border m-5 bg-green-500 w-36
              hover:bg-green-700 text-white"
      >
        Click Me
      </button>
    </div>
  );
}
