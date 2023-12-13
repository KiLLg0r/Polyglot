import styles from "./post.module.scss";
import Link from "next/link";

const Post = ({ id, title, author, authorEmail }) => {
  const titleLength = Math.ceil(title.length / 70);
  const cls = `post_${titleLength}`;

  return (
    <Link href={`/blog/${id}`} className={`${styles.post} ${styles[cls]}`}>
      <h1 className={styles.post__title}>{title}</h1>
      <p className={styles.post__author}>
        Author: <span>{author}</span>
      </p>
      <p className={styles.post__author_email}>
        Email: <span>{authorEmail}</span>
      </p>
    </Link>
  );
};

export default Post;
