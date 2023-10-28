import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

// ProductPage.js
// ...
export default function ProductPage({ post }) {
  const [clientSecret, setClientSecret] = useState(null);
  const router = useRouter();

  // When a user clicks the Buy button, generate a random orderId
  const handleBuyClick = async () => {
    try {
      const id = window.location.pathname.split("/").pop();
      const price = post.price; // Ensure price is a number

      // Redirect to the dynamic payment page with postId and price as query parameters
      router.push(`/payment/${id}?price=${price}`);
    } catch (error) {
      toast.error("Error while creating a payment intent:", error);
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
}
