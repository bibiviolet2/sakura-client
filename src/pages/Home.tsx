import styles from "@styles/Home.module.scss"; // Sass styl pro stránku

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Blank :)</h1>
      </header>

      <footer className={styles.footer}>
        <p>🌿 Sakura Online – cesta k pravdě a laskavosti 🌿</p>
      </footer>
    </div>
  );
};

export default Home;
