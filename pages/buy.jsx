import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebase";
import PostList from "../components/buyList";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = ({ posts }) => {
  const initialPosts = posts || []; // Provide an initial empty array if `posts` is undefined
  const [sortedPosts, setSortedPosts] = useState(initialPosts);
  const [sortBy, setSortBy] = useState("titleAsc"); // Default sorting option

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Define your sorting and ordering options here
  const sortingOptions = {
    titleAsc: orderBy("title", "asc"),
    titleDesc: orderBy("title", "desc"),
    priceAsc: orderBy("price", "asc"),
    priceDesc: orderBy("price", "desc"),
    dateAsc: orderBy("date", "asc"),
    dateDesc: orderBy("date", "desc"),
  };

  // Create a query with the selected sorting option
  const postQuery = query(collection(db, "posts"), sortingOptions[sortBy]);

  useEffect(() => {
    // Fetch posts based on the selected sorting option
    const fetchPosts = async () => {
      try {
        const postSnapshot = await getDocs(postQuery);
        const updatedPosts = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSortedPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [sortBy]);

  return (
    <div>
      <h1>All Posts</h1>
      <label>Sort By:</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="titleAsc">Title (A-Z)</option>
        <option value="titleDesc">Title (Z-A)</option>
        <option value="priceAsc">Price (Low to High)</option>
        <option value="priceDesc">Price (High to Low)</option>
        <option value="dateAsc">Date (Old to New)</option>
        <option value="dateDesc">Date (New to Old)</option>
      </select>
      <PostList posts={sortedPosts} />
    </div>
  );
};

export default Home;
