"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="bg-blue-100">
      <nav className="flex flex-col md:flex-row justify-between items-center p-2 md:px-8 lg:px-16">
        <h1 className="text-2xl font-bold md:mb-0">Welcome {session?.user?.name},</h1>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex flex-row items-center">
            <span className="font-semibold">Email:</span>
            <span className="ml-1 font-bold">{session?.user?.email}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-md"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
  }  
