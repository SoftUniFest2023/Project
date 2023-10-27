import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebase";
import PostList from "../components/buyList";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = ({ posts }) => {
  return (
    <div>
      <h1>All Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const postCollection = collection(db, "posts");
    const postSnapshot = await getDocs(postCollection);
    const posts = postSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default Home;
