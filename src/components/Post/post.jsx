"use client";

import styles from "./post.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { doc, deleteDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "@firebase";
import { useRouter } from "next/navigation";

const Post = ({ id, title, author, authorEmail, img }) => {
  const titleLength = Math.ceil(title.length / 70);
  const cls = `post_${titleLength}`;
  const pathname = usePathname();
  const router = useRouter();

  const deletePost = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget !== e.target) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      await updateDoc(doc(db, "users", authorEmail), {
        posts: arrayRemove(id),
      });
      router.refresh();
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <Link href={`/blog/${id}`} className={`${styles.post} ${styles[cls]}`}>
      <div
        className={styles.post__img}
        style={{ backgroundImage: `url(${img})` }}
      />
      <h1 className={styles.post__title}>{title}</h1>
      <p className={styles.post__author}>
        Author: <span>{author}</span>
      </p>
      <p className={styles.post__author_email}>
        Email: <span>{authorEmail}</span>
      </p>
      {pathname.includes("dashboard") && (
        <div className={styles.btn_group}>
          <Link
            href={`/dashboard/my-posts/edit/${id}`}
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            Edit
          </Link>
          <button
            className={`${styles.btn} ${styles.btn_delete}`}
            onClick={(e) => deletePost(e, id)}
          >
            Delete
          </button>
        </div>
      )}
    </Link>
  );
};

export default Post;
