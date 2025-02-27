import styles from "@styles/Home.module.scss";

const Home = () => {
  return (
    <div className="container container--main">
      <header className="header">
        <h1 className="header__title">Sakura <span className="hidden">Online</span></h1>
        <p>
          Běžně vnímáme realitu skrze vztah příčiny a následku:
          Něco se stane, a to způsobí něco dalšího.
        <br />
          Co kdybychom tento pohled otočili a začali přemýšlet o světě jednak?
        </p>
      </header>

      <div className={styles.layout}>
        <main className={styles.layoutMain} role="main">
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Jednak jako staronový pojem</h2>
            <p>
              Možná vás překvapilo slovo <em>jednak</em> v předchozí větě.
              Obvykle se vyskytuje ve dvojici: <strong>„jednak… jednak…“</strong>.
              Například: „Chci se učit nový jazyk jednak abych si rozšířil
              obzory, jednak abych mohl cestovat.“
            </p>
            <p>Co když bychom ho ale použili jen jednou?</p>
          </article>

          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Historický význam slova „jednak“</h2>
            <p>
              „Jednak“ je příslovce, které se ve staročeštině používalo k vyjádření jednoty.
              Vzniklo spojením předpony <strong>„jed-“</strong> (jeden) a přípony
              <strong>„-nak“</strong>, která označuje způsob nebo stav.
            </p>
            <p>
              V moderní češtině se slovo používá hlavně ve spojení
              <strong>„jednak – jednak“</strong>, kde zdůrazňuje různé aspekty tématu.
            </p>
          </article>

          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Jednak v Sakuře</h2>
            <p>
              Cílem Sakury je hledat jednoznačnost ve slovech a myšlenkách.
              Jazyk není jen nástroj – je to prostředek k hlubšímu porozumění světu.
            </p>
            <p>
              Pokud si dokážeme ujasnit, co slova znamenají, můžeme si lépe rozumět.
            </p>
          </article>
        </main>

        <aside className={styles.layoutSidebar}>
          <div className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Doporučené články</h2>
            <ul className={styles.sidebarList}>
              <li className={styles.sidebarItem}>
                <a href="#" className={styles.sidebarLink}>Článek 1</a>
              </li>
              <li className={styles.sidebarItem}>
                <a href="#" className={styles.sidebarLink}>Článek 2</a>
              </li>
              <li className={styles.sidebarItem}>
                <a href="#" className={styles.sidebarLink}>Článek 3</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <p aria-hidden="true">🌿 Sakura Online – laskavost, výklad a zkoumání 🌿</p>
      </footer>
    </div>
  );
};

export default Home;
