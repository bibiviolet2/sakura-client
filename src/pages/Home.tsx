import CalendarTable from "@components/CalendarTable/CalendarTable";
import styles from "@styles/Home.module.scss"; // Sass styl pro stránku

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Hlídací teta</h1>
      </header>

      <CalendarTable />

      <footer className={styles.footer}>
        <p>🌿 Sakura Online – cesta k pravdě a laskavosti 🌿</p>
      </footer>
    </div>
  );
};

export default Home;
