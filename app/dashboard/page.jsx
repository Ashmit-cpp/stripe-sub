"use client"
import React, { useEffect } from "react";
import Webhook from "@/components/StripeWebhookCaller";
const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div >
    <h1 class="text-2xl font-bold text-center pb-9 pt-14">Choose the right plan for you</h1>
        <stripe-pricing-table
            pricing-table-id="prctbl_1Ndai8SCSiTFNLWTkpox0wE8"
            publishable-key="pk_test_51NdZGrSCSiTFNLWTvkV8gHmGVMCwnabecK6YPKwx26CBPJUmeRx81Nm1LGuGP0OLTdMHOAPeA1gcNViRMyhEpRI500Doa7lu6C"
        />
        

</div>


  );
};

export default StripePricingTable;
