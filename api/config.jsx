import stripePackage from "stripe";

const stripe = new stripePackage(
  "sk_test_51O5qfYKbUyiQH75jn83sB5pFcG9exv99CCXarItHpSvy07OkvrOxyf1GtnneWnuLiGl64LBzTws0R4pbPd8Jn5EX00U6g4yUdV",
  {
    apiVersion: "2023-10-16",
  }
);

export default async function handler(req, res) {
  if (req.method === "POST" || req.method === "GET") {
    try {
      res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
