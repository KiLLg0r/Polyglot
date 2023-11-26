"use client";

// Styles
import styles from "./layout.module.scss";

// Auth store
import useAuthStore from "@authStore";

// Navigation
import { redirect } from "next/navigation";

// Components
import Sidebar from "@components/Sidebar";

export default function Layout({ children }) {
  const currentUser = useAuthStore((state) => state.user);

  if (!currentUser) redirect("/");

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
