"use client";

import StripePricingTable from '@/components/Plans'
import UserInfo from '@/components/UserInfo'
import SubStatus from '@/components/SubStatus';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // const { data: userData } = SubStatus();
  // const subscriptionStatus = userData.plan === 'true' ? 'Active' : 'Inactive';

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {/* <p>Subscription Status: {subscriptionStatus}</p> */}
       <UserInfo /> 
      <SubStatus />
      <StripePricingTable /> 
    </div>
  );
}





