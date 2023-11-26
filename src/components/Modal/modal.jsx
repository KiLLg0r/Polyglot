"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";
import styles from "./modal.module.scss";

export default function Modal({ children }) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") router.back();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className={styles.modal} onClick={() => router.back()}>
      <div
        className={styles.modal__wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modal__close} onClick={() => router.back()}>
          <FaXmark />
        </button>
        {children}
      </div>
    </div>
  );
}
