import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import styles from "../styles/sell.module.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Please fill in all fields.");
      return;
    }

    if (price < 0) {
      alert("Price cannot be lower than zero!");
      return;
    }

    // Initialize Firestore and Storage
    const db = getFirestore();
    const storage = getStorage();

    try {
      // Check if a post with the same title and content already exists
      const postRef = collection(db, "posts");
      const queryCondition = query(
        postRef,
        where("title", "==", title),
        where("content", "==", content)
      );
      const querySnapshot = await getDocs(queryCondition);

      if (!querySnapshot.empty) {
        alert("A post with the same title and content already exists.");
        return;
      }

      // 1. Upload the image to the storage bucket
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // 2. Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Get the current date and time
      const currentDate = new Date();

      // 4. Save the post in the Firestore database with the date field
      const post = {
        title: title,
        content: content,
        price: price,
        imageUrl: imageUrl,
        date: currentDate, // Add the date field
      };

      await addDoc(postRef, post);

      alert("Post created successfully");
      // Reset form fields
      setTitle("");
      setContent("");
      setPrice(0);
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.newOffer}>
        <h1 className={styles.formTitle}>Make a new sale</h1>
        <form onSubmit={handleSubmit} className={styles.newOfferForm}>
          <label className={styles.textShadow}>Title:</label>
          <input
            required
            className={styles.inputArea}
            placeholder="Product name"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <br />

          <label className={styles.textShadow}>Content:</label>
          <textarea
            required
            placeholder="Description"
            className={styles.inputArea}
            value={content}
            onChange={handleContentChange}
            rows="4"
          />
          <br />

          <label className={styles.textShadow}>Price in dollars:</label>
          <input
            placeholder="Price"
            required
            className={styles.inputArea}
            type="number"
            value={price}
            onChange={handlePriceChange}
            step="0.01" // Specify the step for floating-point numbers
          />
          <br />

          <label className={styles.textShadow}>Image:</label>
          <input
            required
            className={styles.inputArea}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />

          <button type="submit">Upload</button>
        </form>
      </div>

      <p className={styles.formDesc}>
        Welcome to our Product Offer Submission Form, where you can effortlessly
        share your exciting product offerings with the community. Whether you're
        a supplier, manufacturer, or just have an exceptional product to
        propose, this user-friendly form makes it easy for you to showcase your
        offerings and connect with potential buyers.
      </p>
    </div>
  );
}

export default CreatePost;
