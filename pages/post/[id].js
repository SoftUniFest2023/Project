import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>Price: ${post.price}</p>
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const postId = params.id;

  // Initialize Firestore
  const db = getFirestore();

  // Fetch the post data from Firestore
  const postDocRef = doc(db, "posts", postId);
  const postDoc = await getDoc(postDocRef);
  const postData = postDoc.data();

  // Check if a post with the given ID exists
  if (!postData) {
    return {
      notFound: true, // Return a 404 error if the post doesn't exist
    };
  }

  return {
    props: {
      post: postData,
    },
  };
}

export default Post;
