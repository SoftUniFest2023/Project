import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import stripePackage from "stripe";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../lib/firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(req, res) {
  if (req.method === "POST" || req.method === "GET") {
    try {
      // Extract the ID from the query parameters
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ error: "Product ID is missing" });
        return;
      }

      const postRef = doc(db, "posts", id);
      const postSnapshot = await getDoc(postRef);

      if (!postSnapshot.exists()) {
        res.status(404).json({ error: "Product not found for ID: " + id });
        return;
      }

      const price = postSnapshot.data()?.price;

      if (price === undefined) {
        res.status(400).json({ error: "Price is missing for ID: " + id });
        return;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: price * 100,
        automatic_payment_methods: { enabled: true },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
