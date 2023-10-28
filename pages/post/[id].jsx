import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import HeaderStyles from "../../styles/header.module.css";
import styles from "../../styles/productPage.module.css";

const ProductPage = ({ post }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const router = useRouter();

  const handleBuyClick = async () => {
    const id = window.location.pathname.split("/").pop();
    try {
      const price = post ? post.price : null;
      const response = await fetch(`/api/create-payment-intent?id=${id}`, {
        method: "POST",
        body: JSON.stringify(price),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.clientSecret) {
        router.push(`/payment?clientSecret=${data.clientSecret}`);
      }
    } catch (error) {
      console.error("Error while creating a payment intent:", error);
    }
  };

  if (!post || !post.title) {
    return <div>Error: Post not found</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={HeaderStyles.header}>
        <a href="#">
          <img
            className={HeaderStyles.headerLogo}
            src="../devt-mag-high-resolution-logo-transparent.png"
            alt="Logo"
          />
        </a>

        <span className={HeaderStyles.pageDescriber}>{post.title}</span>

        <div className={HeaderStyles.headerNav}>
          <a className={HeaderStyles.headerLink} href="../buy">
            Buy
          </a>
          <a className={HeaderStyles.headerLink} href="../sell">
            Sell
          </a>
          <a className={HeaderStyles.headerLink} href="../account">
            Profile
          </a>
        </div>
      </header>
      <div className={styles.main}>
        <button className={styles.backBTN} onClick={handleBuyClick}>
          <i className="fa-solid fa-angles-left" /> Back
        </button>

        <div className={styles.productInfo}>
          <div className={styles.imageSection}>
            <img
              className={styles.image}
              src={post.imageUrl}
              alt={post.title}
            />
            <p className={styles.date}>
              Post made on: {new Date(post.date).toLocaleString()}
            </p>
          </div>
          <div className={styles.productDesc}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.price}>Price: ${post.price}</p>
            <p className={styles.content}>
              Description: <span>{post.content}</span>
            </p>
            <button className={styles.BuyButton} onClick={handleBuyClick}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  const postId = params.id;

  // Initialize Firestore
  const db = getFirestore();

  try {
    // Fetch the post data from Firestore
    const postDocRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postDocRef);

    if (!postDoc.exists()) {
      console.error("Post not found");
      return {
        notFound: true,
      };
    }

    const postData = postDoc.data();

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
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
}
