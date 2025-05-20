/* eslint-disable consistent-return */
// stipe

import { loadStripe } from '@stripe/stripe-js';

export const getStripe = async () => {
  const stripeApiKey = process.env.NEXT_PUBLIC_PAYMENT_KEY;
  if (!stripeApiKey) {
    console.error('Stripe API Key is not set');
    return;
  }

  const stripe = await loadStripe(stripeApiKey);
  return stripe;
};
