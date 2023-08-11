"use client";

import React, { useEffect } from "react";

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
    <div className="bg-gray-900 p-4"> 
      <stripe-pricing-table
        pricing-table-id="prctbl_1Ndai8SCSiTFNLWTkpox0wE8"
        publishable-key="pk_test_51NdZGrSCSiTFNLWTvkV8gHmGVMCwnabecK6YPKwx26CBPJUmeRx81Nm1LGuGP0OLTdMHOAPeA1gcNViRMyhEpRI500Doa7lu6C"
      />
    </div>
  );
};

export default StripePricingTable;
