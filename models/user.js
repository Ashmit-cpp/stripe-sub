import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    plan: {
      type: String,
      required: false,
    },
    stripeSubscriptionId: {  // New field for Stripe subscription ID
      type: String,
      required: false,
    },
    stripeCustomerId: {  // New field for Stripe customer ID
      type: String,
      required: false,
    },
    stripePriceId: {  // New field for Stripe price ID
      type: String,
      required: false,
    },
    stripeCurrentPeriodEnd: {  // New field for Stripe current period end
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
