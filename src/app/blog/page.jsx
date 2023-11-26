import styles from "./blog.module.scss";
import Posts from "@components/Posts/posts";

const Blog = () => {
  return (
    <main className={styles.blog}>
      <h1>Blogs</h1>
      <div className={styles.blog__posts}>
        <Posts email={null} />
      </div>
    </main>
  );
};

export default Blog;
