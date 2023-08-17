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
      type: Boolean,
      default: false, 
      required: false,
    },
    stripeSubscriptionId: {  
      type: String,
      required: false,
    },
    stripeCustomerId: {  
      type: String,
      required: false,
    },
    stripePriceId: {  
      type: String,
      required: false,
    },
    stripeCurrentPeriodEnd: {  
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
