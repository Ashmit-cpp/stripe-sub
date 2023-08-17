"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

function SubStatus() {
  const { data: session } = useSession();
  const customermail = session?.user?.email;
  console.log(customermail);

  const fetchData = async () => {
    const response = await fetch(`/api/getUser?search=${customermail}`);

    const result = await response.json();
    console.log(result);
    console.log("email: ", result.user.email);
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return <div>SubStatus</div>;
}

export default SubStatus;
