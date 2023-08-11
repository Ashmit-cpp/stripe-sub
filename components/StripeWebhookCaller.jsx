"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

const Webhook = () => {
  const [webhookSecret, setWebhookSecret] = useState("");
  const [received, setReceived] = useState(false);
  const router = useRouter();

  const handleWebhook = async () => {
    const response = await fetch("/api/stripe-webhooks", {
      method: "POST",
      body: JSON.stringify({
        
        webhookSecret: webhookSecret,
      }),
    });

    if (response.status === 200) {
      setReceived(true);
      router.push("/");
    } else {
      console.error("Error calling webhook API:", response.statusText);
    }
  };

  return (
    <div>
      <h1>Webhook</h1>
      <p>
        Enter the Stripe webhook secret here:
      </p>
      <input
        type="text"
        placeholder="Webhook Secret"
        onChange={(event) => setWebhookSecret(event.target.value)}
      />
      <button onClick={handleWebhook}>Call Webhook</button>
      <p>
        Received: {received ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default Webhook;
