import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithPopup,
  GoogleAuthProvider,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link"; // Import the Link component from Next.js
import { useRouter } from "next/router";
import { app } from "../lib/firebase";
import { signOut, reauthenticateWithCredential } from "firebase/auth";
import toast from "react-hot-toast";
import styles from "../styles/account.module.css";
import HeaderStyles from "../styles/header.module.css";
import FooterStyles from "../styles/footer.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter(app);

  useEffect(() => {
    // Check if the user is authenticated
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);

        // Set the username to the email if no username is available
        const username = currentUser.displayName || currentUser.email;

        // Query user's posts by username
        const userPostsQuery = query(
          collection(db, "posts"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(userPostsQuery);

        if (!querySnapshot.empty) {
          const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserPosts(posts);
        }
      } else {
        // User is not signed in
        setUser(null);
        setUserPosts([]);
      }
    });
  }, [auth, db]);

  const handleSignOut = async () => {
    try {
      await signOut(auth).then(toast.success("Sign out successful"));
    } catch (error) {
      console.log(error.message);
      toast.error("error");
    }
  };

  // Function to delete the user's profile and username document
  const deleteUserProfile = async (user, router) => {
    const auth = getAuth();
    const firestore = getFirestore();

    try {
      // Check the user's sign-in provider
      const providerId = user.providerData[0].providerId;
      let credential;

      if (providerId === "password") {
        // If the user is signed in with email/password, prompt for password
        const password = prompt("Please enter your password");
        if (!password) {
          toast.error("Password not provided. Profile not deleted.");
          return;
        }
        credential = EmailAuthProvider.credential(user.email, password);
      } else if (providerId === "google.com") {
        // If the user is signed in with Google, reauthenticate with Google sign-in provider
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(auth.currentUser, provider);
      } else {
        // Unsupported sign-in provider, show error or handle as needed
        toast.error("Unsupported sign-in provider. Profile not deleted.");
        return;
      }

      // If we have a credential, reauthenticate the user
      if (credential) {
        await reauthenticateWithCredential(auth.currentUser, credential);
      }

      // Delete the user's profile document
      await deleteDoc(doc(firestore, "users", user.uid));

      // Delete the user from Firebase Authentication
      await auth.currentUser.delete();

      // Redirect the user to the home page or another appropriate page
      router.push("/");
    } catch (error) {
      toast.error("Error deleting user profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && currentUser.emailVerified) {
      try {
        await auth.currentUser.reload();
        const refreshedUser = auth.currentUser;
        if (refreshedUser.emailVerified) {
          deleteUserProfile(refreshedUser, router);
        } else {
          toast.error(
            "User email verification state expired. Please sign in again."
          );
        }
      } catch (error) {
        toast.error("Error refreshing user authentication state:", error);
      }
    } else {
      toast.error("User authentication state expired. Please sign in again.");
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
            <span className={HeaderStyles.pageDescriberLow}>Your Account</span>
            <div className={HeaderStyles.headerNavLow}>
              <a className={HeaderStyles.headerLink} href="./">
                Home
              </a>
              <a className={HeaderStyles.headerLink} href="./buy">
                Buy
              </a>
              <a className={HeaderStyles.headerLink} href="./sell">
                Sell
              </a>
              <a
                className={`${HeaderStyles.selected} ${HeaderStyles.headerLink}`}
                href="#"
              >
                Profile
              </a>
            </div>
          </div>
        </div>

        <span className={HeaderStyles.pageDescriberHigh}>Your Account</span>

        <div className={HeaderStyles.headerNavHigh}>
          <a className={HeaderStyles.headerLink} href="./">
            Home
          </a>
          <a className={HeaderStyles.headerLink} href="./buy">
            Buy
          </a>
          <a className={HeaderStyles.headerLink} href="./sell">
            Sell
          </a>
          <a
            className={`${HeaderStyles.selected} ${HeaderStyles.headerLink}`}
            href="#"
          >
            Profile
          </a>
        </div>
      </header>

      {user ? (
        <div className={styles.userInfo}>
          <h1>Welcome, {user.displayName || user.email || user.uid}</h1>
          <div>
            <button className={styles.button} onClick={handleSignOut}>
              Sign Out
            </button>
            <button className={styles.button} onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div>
          <div className={styles.userPosts}>
            <h2 className={styles.userPostsName}>Your Posts</h2>
            <ol type="I">
              {userPosts.map((post) => (
                <li key={post.id} className={styles.post}>
                  <div>
                    <Link className={styles.link} href={`/post/${post.id}`}>
                      <p className={styles.link}>
                        <h3 className={styles.desc}>
                          <span className={styles.descTitle}>
                            Product Name:{" "}
                          </span>
                          <span className={styles.descContent}>
                            {post.title}
                          </span>
                        </h3>
                      </p>
                    </Link>
                    <p className={styles.desc}>
                      <span className={styles.descTitle}>Description: </span>
                      <span className={styles.descContent}>{post.content}</span>
                    </p>
                  </div>
                  <img
                    className={styles.descImg}
                    src={post.imageUrl}
                    alt="post IMG"
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}

      <footer className={FooterStyles.footer}>
        <div
          className="container grid grid--footer"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 15fr)" }}
        >
          <div className="logo-col col" style={{ marginRight: "20px" }}>
            <a href="#">
              <img
                className={FooterStyles.img}
                alt=" logo"
                src="/devt-mag-high-resolution-logo-transparent.png"
              />
            </a>
          </div>
          <div className="address-col col" style={{ flex: 2 }}>
            <p className="footer-heading">Contact us on:</p>
            <address className="contacts">
              <p>
                <a className="footer-link" href>
                  softunifest@gmail.com
                </a>
              </p>
            </address>
          </div>

          <div className="nav-col col" style={{ flex: 1 }}>
            <p className="footer-heading">Pages</p>
            <ul className={HeaderStyles.ul} type="none">
              <li>
                <a className={FooterStyles.link} href="./">
                  Home
                </a>
              </li>
              <li>
                <a className={FooterStyles.link} href="./sell">
                  Sell
                </a>
              </li>
              <li>
                <a className={FooterStyles.link} href="./buy">
                  Buy
                </a>
              </li>
              <li>
                <a className={FooterStyles.link} href="#">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-col col" style={{ flex: 1 }}>
            <p className="footer-heading">Follow us</p>
            <ul className={HeaderStyles.ul} type="none">
              <li>
                <a
                  className={FooterStyles.link}
                  href="https://www.facebook.com"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a className={FooterStyles.link} href="https://www.twitter.com">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className={FooterStyles.link}
                  href="https://www.instagram.com"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
