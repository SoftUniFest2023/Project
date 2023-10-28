import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import HeaderStyles from "../../styles/header.module.css";
import styles from "../../styles/productPage.module.css";
import Link from "next/link";

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

        <div className={HeaderStyles.barsSection}>
          <span className={HeaderStyles.bars}>
            <i className="fa-solid fa-bars" />
          </span>
          <div className={HeaderStyles.dropMenu}>
            <span className={HeaderStyles.pageDescriberLow}>{post.title}</span>
            <div className={HeaderStyles.headerNavLow}>
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
          </div>
        </div>

        <span className={HeaderStyles.pageDescriberHigh}>{post.title}</span>

        <div className={HeaderStyles.headerNavHigh}>
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
        <Link className={styles.backBTN} href="../buy">
          <i className="fa-solid fa-angles-left" /> Back
        </Link>

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
}
