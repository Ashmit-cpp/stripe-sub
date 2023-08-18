"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-custom-blue">
      <div className="shadow-lg p-9 rounded-lg border-t-4 border-blue-300 bg-white">
        <h1 className="text-xl font-semibold my-4 text-center">Login to your account</h1>
       
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <h2 className="text-s font-semibold text-left mb-[-0.77rem]">Email</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />

          <h2 className="text-s font-semibold text-left mb-[-0.77rem]">Password</h2>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2"
          />

          <button className="bg-custom-blue text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-center" href={"/register"}>
            New to site? <span className="underline">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
