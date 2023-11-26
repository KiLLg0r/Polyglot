"use client";

import { useEffect, useState, useRef } from "react";

import {
  FaCircleUser,
  FaArrowRightFromBracket,
  FaAngleUp,
  FaXmark,
  FaClipboard,
} from "react-icons/fa6";

import styles from "./dropdown.module.scss";
import useAuthStore from "@authStore";
import Link from "next/link";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const logout = useAuthStore((store) => store.logout);
  const user = useAuthStore((store) => store.user);

  useOnClickOutside(ref, () => setIsOpen(false));

  // @ts-ignore
  return (
    <div
      ref={ref}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        <FaCircleUser />
        <span>{user?.displayName}</span>
        {!isOpen ? (
          <FaAngleUp className={styles.closeBtn} />
        ) : (
          <FaXmark className={styles.closeBtn} />
        )}
      </button>
      <div className={styles.menu}>
        <Link href="/dashboard">
          <button>
            <FaClipboard />
            Dashboard
          </button>
        </Link>
        <button onClick={logout} className={styles.logout}>
          <FaArrowRightFromBracket />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
