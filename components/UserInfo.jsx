"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function UserInfo() {
  const { data: session } = useSession();

  return (
<div className="bg-gray-100 flex flex-row justify-end">
  <nav className="flex items-center p-2">
    <div className="flex items-center space-x-4">
      <div className="flex flex-row">
        <span className="font-semibold">Name:</span>
        <span className="font-bold">{session?.user?.name}</span>
      </div>
      <div className="flex flex-row">
        <span className="font-semibold">Email:</span>
        <span className="font-bold">{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-2 py-2 rounded-md"
      >
        Log Out
      </button>
    </div>
  </nav>
</div>


  );
}
