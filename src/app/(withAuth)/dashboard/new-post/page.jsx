"use client";

import PostEditor from "@components/PostEditor/postEditor";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@firebase";
import usePostStore from "@/context/post";
import useAuthStore from "@authStore";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const postBody = usePostStore((state) => state.postBody);
  const updateBody = usePostStore((state) => state.updateBody);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const createNewPost = async (e, id = null, img = "") => {
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
        img: img,
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

  return <PostEditor onSubmit={createNewPost} />;
};

export default NewPost;
