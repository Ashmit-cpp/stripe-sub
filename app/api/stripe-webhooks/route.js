import { headers } from "next/headers";
import Stripe from "stripe";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  await connectMongoDB();
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;
  const email = session.customer;

  if (event.type === "invoice.payment_succeeded") {
    try {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      );

      await User.updateOne(
        { email },
        {
          $set: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        }
      );
    } catch (error) {
      console.log(
        "Error updating user for checkout.session.completed: ",
        error
      );
    }
  }

  return new Response(null, { status: 200 });
}
