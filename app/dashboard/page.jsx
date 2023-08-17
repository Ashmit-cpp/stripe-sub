"use client";
import StripePricingTable from "@/components/Plans";
import UserInfo from "@/components/UserInfo";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const customermail = session?.user?.email;

  const [userPlan, setUserPlan] = useState(false); // Initialize userPlan as false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUser?search=${customermail}`);
        const result = await response.json();
        console.log(result);
        setUserPlan(result.user.plan); // Store user's plan in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [customermail]); // Run the effect whenever customermail changes

  const subscriptionStatus = userPlan ? "Active" : "Inactive";

  return (
    <div>
      <UserInfo />
      <h1>Welcome to Your Dashboard</h1>
      <p>Subscription Status: {subscriptionStatus}</p>
      {subscriptionStatus === "Inactive" && <StripePricingTable />}
      {subscriptionStatus === "Active" && <h1>Thank you for subscribing</h1>}
    </div>
  );
}
