import { useEffect, useState } from "react";
import {
  getAuth,
  applyActionCode,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebase";
const app = initializeApp(firebaseConfig);

export default function ConfirmEmail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const handleConfirmation = async () => {
      const actionCode = router.query.oobCode;

      try {
        await applyActionCode(auth, actionCode);
        console.log("Email confirmation successful");
        setError("");
      } catch (error) {
        console.error("Error confirming email:", error);
        setError("Error confirming email. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (router.query.oobCode) {
      handleConfirmation();
    } else {
      setLoading(false);
    }
  }, [router.query.oobCode, auth]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user && !user.emailVerified && !emailSent) {
      // Send the email verification link
      sendVerificationEmail(user);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setError("Email confirmed successfully. Redirecting to login page...");
        setTimeout(() => {
          router.push("/register");
        }, 3000);
      } else if (user && !user.emailVerified) {
        setError("Email verification is pending. Please check your email.");
      } else {
        setError("User not found. Please sign up or log in.");
      }
    });

    return () => unsubscribe();
  }, [auth, emailSent]);

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <div className="container">{error && <p>{error}</p>}</div>;
}