import styles from "./blog.module.scss";
import Posts from "@components/Posts/posts";
import { cookies } from "next/headers";

const Blog = () => {
  const cookieStore = cookies();
  const name = cookieStore.get("username");

  return (
    <main className={styles.blog}>
      <input type="hidden" value={name.value} />
      <h1>Blogs</h1>
      <div className="blog__posts">
        <Posts email={null} />
      </div>
    </main>
  );
};

export default Blog;
