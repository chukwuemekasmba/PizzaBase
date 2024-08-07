import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { stripe } from '../_utils/stripe.ts';
import { createOrRetrieveCustomer } from "../_utils/stripe.ts";

serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization")!;
    
    const customer = await createOrRetrieveCustomer(authHeader);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer }
    );

    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer,
    });
    const res = {
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});


// To invoke:
// curl -i --request POST 'http://localhost:54321/functions/v1/payment-sheet' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"amount": 1150 }'