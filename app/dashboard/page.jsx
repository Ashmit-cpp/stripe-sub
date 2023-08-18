"use client";
import StripePricingTable from "@/components/Plans";
import UserInfo from "@/components/UserInfo";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const customermail = session?.user?.email;

  const [userPlan, setUserPlan] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null); // Initialize subscriptionEndDate as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUser?search=${customermail}`);
        const result = await response.json();
        console.log(result);
        setUserPlan(result.user.plan);
        console.log(result.user.stripeCurrentPeriodEnd);

        // Set subscription end date
        setSubscriptionEndDate(new Date(result.user.stripeCurrentPeriodEnd));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [customermail]);

  const subscriptionStatus = userPlan ? "Active" : "Inactive";
  return (
    <div>
      <div className="max-w-l mx-auto bg-white ">
        <div className="text-l font-bold md:px-2 lg:px-2 bg-blue-100">
          <UserInfo />
          <div className="p-16 pt-0 pb-4 bg-red flex justify-between items-center">
            <div>
              <p>Subscription Status: {subscriptionStatus}</p>
              {subscriptionStatus === "Active" && (
                <p>
                  Subscription Expires on: {subscriptionEndDate.toLocaleDateString()}
                </p>
              )}
            </div>
            {subscriptionStatus === "Active" && (
              <a 
                href="https://billing.stripe.com/p/login/test_3csaHS5XQbu64jmdQQ"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
              >
                Manage Subscription
              </a>
            )}
          </div>
        </div>
        {subscriptionStatus === "Inactive" && <StripePricingTable />}
      </div>
      {subscriptionStatus === "Active" && (<h1 className="text-xl font-bold text-center pb-9 pt-14">Premium Content</h1>)}
    </div>
  );
}  
