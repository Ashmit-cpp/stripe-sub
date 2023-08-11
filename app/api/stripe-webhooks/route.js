// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from "mongodb";
import getRawBody from 'raw-body';

require('dotenv').config();
let mongodbServer = process.env.MONGODB_URI;
const stripe = require("stripe")(process.env.stripe_sk);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(request,response) {

  console.log("WEBHOOK CALLED BY STRIPE");
  console.log("headers ", JSON.stringify(request.headers));

  const sig = request.headers['stripe-signature'];

  let event;
  console.log("body ", JSON.stringify(request.body));

  try {
    const rawBody = await getRawBody(request);
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.log("Error occured ", err)
    response.status(200).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("event ", JSON.stringify(event));

  // Handle the event
  switch (event.type) {

     case 'checkout.session.completed':
      const sessionCheckoutCompleted = event.data.object;
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
      // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  console.log("Event handled");

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send(`Event ${event.type} handled successfully ${JSON.stringify(event)}`);

}

export const config = {
  api: {
    bodyParser: false,
  },
};
