import styles from "./hero.module.scss";

const Hero = () => {
  return (
    <main className={styles.hero}>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>Polyglot</h1>
        <p className={styles.hero__description}></p>
      </div>
    </main>
  );
};

export default Hero;
