import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebase";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import "../styles/reset.css";
import "../styles/global.css";

initializeApp(firebaseConfig);

// Function to check if the user's email is verified
const isEmailVerified = async (user) => {
  if (user) {
    await user.reload();
    return user.emailVerified;
  }
  return false;
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Check email verification status when the user changes
    if (user) {
      isEmailVerified(user).then((verified) => {
        if (!verified && router.pathname !== "/ConfirmEmail") {
          // If the user's email is not verified and they are not on the login, "/" or "/ConfirmEmail" page, redirect to login
          router.push("/ConfirmEmail");
        }
      });
    }
  }, [user, router]);

  if (loading) {
    // Show loading indicator while checking authentication state
    return <p>Loading...</p>;
  }

  if (
    !user &&
    router.pathname !== "/register" &&
    router.pathname !== "/" &&
    router.pathname !== "/ConfirmEmail"
  ) {
    // User is not signed in and not on the login page or the "/" page, redirect to login
    router.push("/");
    return null;
  }

  if (user && router.pathname === "/register") {
    router.push("/");
    return null;
  }

  return (
    <>
      <Component {...pageProps} user={user} username={username} />
      <Toaster />
    </>
  );
}
