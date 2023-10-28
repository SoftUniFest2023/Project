import Link from "next/link";
import styles from "../styles/buy.module.css";

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`../post/${post.id}`} as={`../post/${post.id}`}>
            <div>
              <img
                className={styles.image}
                src={post.imageUrl}
                alt={post.title}
              />
              <p>{post.title}</p>
              <p>Price: ${post.price}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
