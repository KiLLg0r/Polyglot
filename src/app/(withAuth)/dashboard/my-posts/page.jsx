import styles from "./my-posts.module.scss";
import { cookies } from "next/headers";
import Posts from "@components/Posts/posts";

const MyPosts = () => {
  const cookieStore = cookies();
  const email = cookieStore.get("email");

  return (
    <main className={styles.myPosts}>
      <h1>My Posts</h1>
      <div className="blog__posts">
        <Posts email={email.value} />
      </div>
    </main>
  );
};

export default MyPosts;
