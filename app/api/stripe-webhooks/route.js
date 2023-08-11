// api/stripe-webhooks.js

import { buffer } from 'micro';
import Stripe from 'stripe';

// Make sure to replace 'YOUR_STRIPE_SECRET_KEY' with your actual Stripe secret key
const stripe = new Stripe('STRIPE_SECRET_KEY', {
  apiVersion: '2022-11-15',
});

const webhookSecret = 'STRIPE_WEBHOOK_SECRET';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), signature, webhookSecret);
  } catch (err) {
    console.error('Error verifying Stripe webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    // Handle the checkout.session.completed event here
    // This is where you can perform actions when a checkout session is completed
    console.log('Webhook connected: true');
  }
  console.log('Webhook : true');


  res.status(200).json({ received: true });
};

export default handler;
