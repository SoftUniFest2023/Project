import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../lib/firebase";
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [showUsernameField, setShowUsernameField] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // Add state for login/signup switch

  const router = useRouter();

  const toggleLoginSignup = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        } else {
          setShowUsernameField(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter a username.");
      return;
    }

    const selectedRole = prompt("Choose your role (customer or seller):");
    if (selectedRole !== "customer" && selectedRole !== "seller") {
      setError("Invalid role selection.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful");

      // Set the user's chosen role during sign-up
      const userDocRef = doc(collection(db, "users"), userCredential.user.uid);
      const userData = {
        username: username,
        email: userCredential.user.email,
        role: selectedRole,
      };
      await setDoc(userDocRef, userData);

      setShowUsernameField(false);

      // Send the email verification link to the user
      await sendEmailVerification(userCredential.user);

      // Redirect to the email confirmation page
      router.push("/ConfirmEmail");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful");

      const user = userCredential.user;

      const userDocRef = doc(collection(db, "users"), user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        // User already exists in the database, so treat them as an existing user
        // You can add any additional logic here for existing users
      } else {
        // User does not exist in the database, so treat them as a new user
        const selectedRole = prompt("Choose your role (customer or seller):");

        if (selectedRole !== "customer" && selectedRole !== "seller") {
          setError("Invalid role selection.");
          return;
        }

        const username = prompt("Enter a username:");

        if (!username) {
          setError("Please enter a username.");
          return;
        }

        // Set the user's chosen role during sign-up
        const userData = {
          username: username,
          email: user.email,
          role: selectedRole,
        };
        await setDoc(userDocRef, userData);
      }

      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out successful");
    } catch (error) {
      setError(error.message);
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

  if (!user) {
    return (
      <div>
        {isLogin ? (
          <>
            <form onSubmit={handleSignup}>
              <h2>Signup</h2>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showUsernameField && (
                  <>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {error && <p>{error}</p>}
                  </>
                )}
                <button type="submit">Signup</button>
                <p>
                  Имате акаунт?{" "}
                  <a onClick={toggleLoginSignup}>
                    {isLogin ? "Впишете се!" : "Направете си акаунт!"}
                  </a>
                </p>
                {error && <p>{error}</p>}
              </div>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>

              <div>
                <button onClick={handleGoogleSignIn}>Google Sign-In</button>
              </div>
              <p>
                Нямате акаунт?{" "}
                <a onClick={toggleLoginSignup}>
                  {isLogin ? "Впишете се!" : "Създайте си!"}
                </a>
              </p>
            </form>

            {error && <p>{error}</p>}
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={handleDeleteProfile}>Delete account</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
