"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./goBack.module.scss";

const GoBack = ({ path = "/" }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(path)} className={styles.goBack}>
      <FaArrowLeft />
      Back
    </button>
  );
};

export default GoBack;
