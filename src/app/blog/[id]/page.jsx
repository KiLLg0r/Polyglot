import styles from "./blog_post.module.scss";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebase";
import GoBack from "@components/GoBack/goBack";

const BlogPost = async ({ params }) => {
  const docRef = doc(db, "posts", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return <div className={styles.blog_post}>Post not found</div>;

  const post = docSnap.data();

  return (
    <div className={styles.blog_post}>
      <GoBack />
      <div
        className={styles.img_preview}
        style={{ backgroundImage: `url(${post.img})` }}
      />
      <h1>{post.title}</h1>
      <h4 className={styles.author}>
        Author: <span>{post.author}</span>
      </h4>
      <div
        className={styles.blog_body}
        dangerouslySetInnerHTML={{ __html: post.body }}
      ></div>
    </div>
  );
};

export default BlogPost;
