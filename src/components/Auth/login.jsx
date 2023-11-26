"use client";

import styles from "./auth.module.scss";
import errorStyles from "@styles/error.module.scss";

import useAuthStore from "@authStore";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import validateError from "@errors";

const Login = ({ isLogin, changeIsLogin }) => {
  const login = useAuthStore((store) => store.login);
  const router = useRouter();
  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e?.preventDefault();

    try {
      await login(data.email, data.password);
      router.back();
    } catch (error) {
      const validatedError = validateError(error.code);
      if (validatedError.type === "email")
        setError("email", { type: "custom", message: validatedError.error });
      else if (validatedError.type === "password")
        setError("password", { type: "custom", message: validatedError.error });
    }
  };

  return (
    <div className={styles.auth__login}>
      <form className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.auth__title}>Login</h1>
        <div className={styles.auth__form__inputs}>
          <div className={styles.auth__form__wrapper}>
            <label className={styles.auth__form__label}>Email</label>
            <input
              className={styles.auth__form__input}
              autoFocus={true}
              placeholder="Enter your email"
              type="text"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              })}
            />
            <AnimatePresence>
              {errors.email?.type === "required" && (
                <motion.p
                  role="alert"
                  className={errorStyles.error}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  The email is required
                </motion.p>
              )}
              {errors.email?.type === "pattern" && (
                <motion.p
                  role="alert"
                  className={errorStyles.error}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  Enter a valid email address
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.auth__form__wrapper}>
            <label className={styles.auth__form__label}>Password</label>
            <input
              className={styles.auth__form__input}
              placeholder="Enter your password"
              type="password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", { required: true, minLength: 8 })}
            />
            <AnimatePresence>
              {errors.password?.type === "required" && (
                <motion.p
                  role="alert"
                  className={errorStyles.error}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  The password is required
                </motion.p>
              )}
              {errors.password?.type === "custom" && (
                <motion.p
                  role="alert"
                  className={errorStyles.error}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  {errors.password?.message}
                </motion.p>
              )}
              {errors.password?.type === "minLength" && (
                <motion.p
                  role="alert"
                  className={errorStyles.error}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  The password must be at least 8 characters
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.auth__form__buttons}>
          <button className={styles.auth__form__button} type="submit">
            Login
          </button>
          <div className={styles.auth__helper}>
            Don&apos;t have an account ?{" "}
            <button
              type={"button"}
              className={styles.auth__button}
              onClick={() => {
                reset();
                changeIsLogin(!isLogin);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
