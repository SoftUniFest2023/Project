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

import { signOut, reauthenticateWithCredential } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter();

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
      await signOut(auth);
      console.log("Sign out successful");
    } catch (error) {
      console.log(error.message);
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
          console.log("Password not provided. Profile not deleted.");
          return;
        }
        credential = EmailAuthProvider.credential(user.email, password);
      } else if (providerId === "google.com") {
        // If the user is signed in with Google, reauthenticate with Google sign-in provider
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(auth.currentUser, provider);
      } else {
        // Unsupported sign-in provider, show error or handle as needed
        console.error("Unsupported sign-in provider. Profile not deleted.");
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
      console.error("Error deleting user profile:", error);
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
          console.error(
            "User email verification state expired. Please sign in again."
          );
        }
      } catch (error) {
        console.error("Error refreshing user authentication state:", error);
      }
    } else {
      console.error("User authentication state expired. Please sign in again.");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.username || user.email || user.uid}</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
          <h2>Your Posts</h2>
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <p>
                    <h3>{post.title}</h3>
                  </p>
                </Link>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
