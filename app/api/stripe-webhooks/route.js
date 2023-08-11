// api/webhooks.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Assuming you have set up your Stripe webhook secret and handling logic
        // Make sure to replace 'YOUR_STRIPE_WEBHOOK_SECRET' with your actual webhook secret
        const stripe = require('stripe')('STRIPE_SECRET_KEY');
        const endpointSecret = 'STRIPE_WEBHOOK_SECRET';
        console.log('Webhook kuch toh hua: true');

        // Verify the signature of the incoming webhook payload
        const sig = req.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  
        // Handle the specific event types you're interested in
        if (event.type === 'checkout.session.completed') {
          // Perform necessary actions when account is updated
          console.log('Webhook connected: true');
        }
  
        res.status(200).json({ received: true });
      } catch (error) {
        console.error('Error handling Stripe webhook:', error.message);
        res.status(400).end();
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }
  