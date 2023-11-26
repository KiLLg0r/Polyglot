"use client";

// Components
import Editor from "@components/Editor";
import usePostStore from "@/context/post";
import useAuthStore from "@authStore";
import { useRouter } from "next/navigation";

// Styles
import styles from "./new-post.module.scss";

import { useState } from "react";

// Firebase
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@firebase";

const NewPost = () => {
  const [width, setWidth] = useState(16);
  const postBody = usePostStore((state) => state.postBody);
  const updateBody = usePostStore((state) => state.updateBody);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const changeHandler = (evt) => {
    setWidth(evt.target.value.length);
  };

  const post = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists())
        await setDoc(docRef, {
          posts: [],
        });

      const postRef = await addDoc(collection(db, "posts"), {
        title: e.target[0].value,
        body: postBody,
        author: user.displayName,
        authorEmail: user.email,
        createDate: serverTimestamp(),
      });

      await updateDoc(docRef, {
        posts: arrayUnion(postRef.id),
      });

      updateBody(null);
      await router.push("/blog/" + postRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className={styles.new_post}>
      <form onSubmit={post}>
        <input
          required={true}
          placeholder="New post title"
          className={styles.new_post__title}
          onChange={changeHandler}
          style={{ width: width + "ch" }}
        />
        <button type={"submit"}>Post</button>
      </form>
      <Editor />
    </div>
  );
};

export default NewPost;
