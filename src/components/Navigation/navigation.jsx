"use client";

import styles from "./navigation.module.scss";
import Link from "next/link";
import useAuthStore from "@authStore";
import Dropdown from "@components/Dropdown/dropdown";

const Navigation = () => {
  const user = useAuthStore((store) => store.user);

  return (
    <header className={styles.navigation}>
      <Link href="/" className={styles.logo}>
        Polyglot
      </Link>
      <nav className={styles.navigation__links}>
        <div className={styles.navigation__links__list}>
          <Link href="/" className={styles.navigation__link}>
            Home
          </Link>
          <Link href="/blog" className={styles.navigation__link}>
            Blog
          </Link>
        </div>
        {user ? (
          <Dropdown />
        ) : (
          <Link href="/auth" className={styles.dashboard}>
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
