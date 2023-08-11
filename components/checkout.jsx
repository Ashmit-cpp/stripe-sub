import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.STRIPE_PUBLISHABLE_KEY
);

export default function Checkout({cart}) {
    const handleCheckout = async () => {
      try {
        const stripe = await stripePromise;
  
        const checkoutSession = await axios.post("/api/checkout-session", {
          cart,
        });
  
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
  
        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
      </div>
    );
  }