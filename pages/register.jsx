import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
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
  const [showUsernameField, setShowUsernameField] = useState(false);
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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful");

      // Send the email verification link to the user
      await sendEmailVerification(userCredential.user);

      // Redirect to the email confirmation page
      router.push("/ConfirmEmail");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        setError("Username already exists. Please try another one.");
        return;
      }

      const userDocRef = doc(collection(db, "users"), user.uid);
      const userData = {
        username: username,
        email: user.email,
      };
      await setDoc(userDocRef, userData);
      setShowUsernameField(false);
      setUsername("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Google sign-in successful");
      const isNewUser = userCredential.additionalUserInfo.isNewUser;
      setUsername("");

      if (isNewUser) {
        // If it's a new user, prompt them to set a password
        const newPassword = prompt("Please enter a password:");
        if (newPassword === null) {
          // User canceled the prompt, handle as needed
          return;
        }

        try {
          // Create the user with the provided password
          await createUserWithEmailAndPassword(
            auth,
            userCredential.user.email,
            newPassword
          );
          console.log("Signup successful with user-set password");

          // Send the email verification link to the user
          await sendEmailVerification(userCredential.user);

          // Redirect to the email confirmation page
          router.push("/ConfirmEmail");
        } catch (error) {
          setError(error.message);
        }
      } else {
        // Handle the case for returning users if necessary
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

  if (showUsernameField) {
    return (
      <div>
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Save Username</button>
        </form>

        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <button onClick={handleSignOut}>Sign Out</button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginForm;
