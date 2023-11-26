"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import styles from "./goBack.module.scss";

const GoBack = ({ path }) => {
  const router = useRouter();

  const onClick = () => {
    if (!path) router.back();
    else router.push(path);
  };

  return (
    <button onClick={onClick} className={styles.goBack}>
      <FaArrowLeft />
      Back
    </button>
  );
};

export default GoBack;
