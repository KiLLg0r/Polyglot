"use client";

import PostEditor from "@components/PostEditor/postEditor";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@firebase";
import usePostStore from "@/context/post";
import useAuthStore from "@authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoBack from "@components/GoBack/goBack";

const EditPost = ({ params }) => {
  const postBody = usePostStore((state) => state.postBody);
  const updateBody = usePostStore((state) => state.updateBody);
  const router = useRouter();
  const [content, setContent] = useState({ title: "", body: "", img: "" });

  const savePost = async (e, id, img = "") => {
    e.preventDefault();

    try {
      const docRef = doc(db, "posts", id);

      await updateDoc(docRef, {
        title: e.target[0].value,
        body: postBody,
        createDate: serverTimestamp(),
        ...(img.length > 0 && { img: img }),
      });

      updateBody(null);
      await router.push("/blog/" + id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const getPost = async (id) => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) return docSnap.data();
      } catch (e) {
        console.error("Error getting document: ", e);
        return { title: "", body: "", img: "" };
      }
    };

    getPost(params.id).then((res) => setContent(res));
  }, [params.id]);

  return (
    <>
      <GoBack />
      <PostEditor
        onSubmit={savePost}
        id={params.id}
        title={content.title}
        body={content.body}
        img={content.img}
      />
    </>
  );
};

export default EditPost;
