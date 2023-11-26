"use client";

// Styles
import styles from "./sidebar.module.scss";

// Icons
import { FaSquarePlus, FaRegNewspaper, FaArrowLeft } from "react-icons/fa6";

// React / Next
import { useState } from "react";

// Auth store
import useAuthStore from "@authStore";

// Navigation
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [open, setOpen] = useState({
    sidebar: true,
    projects: false,
  });

  const links = [
    {
      name: "My blog posts",
      icon: <FaRegNewspaper />,
      path: "/dashboard/my-posts",
    },
    { name: "New post", icon: <FaSquarePlus />, path: "/dashboard/new-post" },
  ];

  const path = usePathname();

  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const username = currentUser?.displayName;

  const toggleSidebar = () => setOpen({ ...open, sidebar: !open.sidebar });

  return (
    <div className={`${styles.sidebar} ${!open.sidebar ? styles.closed : ""}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/dashboard">
            <div className={styles.name}>Polyglot</div>
          </Link>
        </div>
        <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
          <div className={styles.hline}></div>
          <div className={styles.hline}></div>
          <div className={styles.hline}></div>
        </div>
      </div>
      <div className={styles.links}>
        {links.map((link, i) => {
          return (
            <Link
              href={link.path}
              className={`${styles.link} ${
                link.path === path ? styles.active : ""
              }`}
              key={i}
            >
              <div className={styles.icon}>{link.icon}</div>
              <div className={styles.text}>{link.name}</div>
              <div
                className={`${styles.tooltip} ${
                  link.path === path ? styles.active : ""
                }`}
              >
                <div className={styles.tooltipText}>{link.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles.footer}>
        <button onClick={logout} className={styles.logOut}>
          <div className={styles.icon}>
            <FaArrowLeft />
          </div>
          <div className={styles.text}>Log Out</div>
          <div className={`${styles.tooltip} ${styles.logOutTooltip}`}>
            <div className={styles.tooltipText}>Log out</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
