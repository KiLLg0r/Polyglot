// Firebase
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@firebase";

// Components
import Post from "@components/Post/post";

const Posts = async ({ email = null }) => {
  const q = query(
    collection(db, "posts"),
    email !== null && where("authorEmail", "==", email),
    orderBy("createDate", "desc"),
  );
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return posts.map((post) => {
    return <Post key={post.id} {...post} />;
  });
};

export default Posts;
