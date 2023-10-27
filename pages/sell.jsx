import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0); // Initialize price as 0
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value)); // Parse the input to a floating-point number
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

    // Initialize Firestore and Storage
    const db = getFirestore();
    const storage = getStorage();

    try {
      // 1. Upload the image to the storage bucket
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // 2. Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Save the post in the Firestore database
      const post = {
        title: title,
        content: content,
        price: price, // Add the price field
        imageUrl: imageUrl,
      };

      const postRef = collection(db, "posts");
      await addDoc(postRef, post);

      console.log("Post created successfully");

      // Reset form fields
      setTitle("");
      setContent("");
      setPrice(0); // Reset price to 0
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />

        <label>Content:</label>
        <textarea value={content} onChange={handleContentChange} rows="4" />
        <br />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          step="0.01" // Specify the step for floating-point numbers
        />
        <br />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
