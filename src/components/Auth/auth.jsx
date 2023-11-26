"use client";
import { useState } from "react";

import styles from "./auth.module.scss";
import Login from "@components/Auth/login";
import Register from "@components/Auth/register";
import useAuthStore from "@authStore";
import { redirect } from "next/navigation";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const user = useAuthStore((store) => store.user);

  if (user) {
    redirect("/");
    return;
  }

  return (
    <section className={styles.auth}>
      <div
        className={`${styles.auth__block} ${
          isLogin ? styles.auth__block__login : styles.auth__block__register
        }`}
      >
        <h1 className={styles.auth__block__title}>Polyglot</h1>
        <div className={styles.auth__block__svg}></div>
      </div>
      <Login isLogin={isLogin} changeIsLogin={setIsLogin} />
      <Register isLogin={isLogin} changeIsLogin={setIsLogin} />
    </section>
  );
};

export default Auth;
