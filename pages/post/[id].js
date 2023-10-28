import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

export async function getServerSideProps({ params }) {
  const postId = params.id;

  // Initialize Firestore
  const db = getFirestore();

  // Fetch the post data from Firestore
  const postDocRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postDocRef);
  const postData = postDoc.data();

  // Check if a post with the given ID exists
  if (!postData) {
    return {
      notFound: true, // Return a 404 error if the post doesn't exist
    };
  }

  // Convert the date string to a JavaScript Date object
  const date = postData.date.toDate().toISOString();

  return {
    props: {
      post: {
        ...postData,
        date,
      },
    },
  };
}

// pages/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductPage = ({ post }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const router = useRouter();

  const handleBuyClick = async () => {
    try {
      // Fetch the price from Firebase (Use the same code to fetch data from Firebase)
      const price = post.price; // Assuming you've already fetched the price
      console.log();
      // Make an API call to generate a Stripe Payment Intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ price }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.clientSecret) {
        // Redirect to the payment page with the client secret
        router.push(`/payment?clientSecret=${data.clientSecret}`);
      }
    } catch (error) {
      console.error("Error while creating a payment intent:", error);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Price: ${post.price}</p>
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>
      <p>Date: {new Date(post.date).toLocaleString()}</p>
      <button onClick={handleBuyClick}>Buy</button>
    </div>
  );
};

export default ProductPage;
