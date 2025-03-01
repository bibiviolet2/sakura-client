import { Link } from "react-router-dom";
import styles from "@styles/Home.module.scss"; // Sass styl pro stránku

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

	  <p><strong>Běžně vnímáme realitu skrze vztah příčiny a následku:</strong> něco se stane, a to způsobí něco dalšího.<br /> Co kdybychom teď tento pohled otočili a přemýšleli o světě jednak?</p>
<p><strong>Jednak jako staronový pojem</strong></p>
<p>Jestli jste lehce zmateni slovem "jednak" ve výše zmíněné větě, správně vnímáte, že se jedná o část párové konstrukce: <strong>„jednak… jednak…“</strong> – tedy spojení dvou rovnocenných i nerovnocenných věcí. Například: „Chci se učit nový jazyk, jednak abych si rozšířil obzory, jednak abych mohl cestovat.“ Očekáváte tedy druhou stranu.</p>
<p>Co by ale znamenalo, kdybychom ho použili jen jednou?</p>
<p>"Jednak" znamená, že nevolíme mezi možnostmi, ale že si přejeme danou věc naprosto celou, bez ohledu na to, co obsahuje, protože víme, že její části jsou „jednak“. Běžně tak říkáme „jednak… jednak…“, protože známe významové složky, na které si přejeme ono „jednak“ rozložit. Například nový jazyk pro nás znamená <strong>jednak</strong> rozšíření obzorů, <strong>jednak</strong> možnost cestování.</p>
<p>Co když ale takový rozklad neznáme? Víme, že danou věc si přejeme, ale netušíme, jaký význam pro nás má?</p>
<p>Pak bychom řekli například: <strong>„Chci vidět, vnímat, cítit svět jednak.“</strong> To by znamenalo, že mu chceme naprosto porozumět, pochopit všechny jeho části a mít je správně roztříděné podle významu, který pro nás nese.</p>
<p><strong>Historický význam slova „jednak“</strong></p>
<p>"Jednak" je ve skutečnosti příslovce, které se ve staročeštině používalo k vyjádření jednoty. Vzniklo spojením předpony <strong>„jed-“</strong>, což znamená <strong>„jeden“</strong>, a přípony <strong>„-nak“</strong>, která se užívá k vyjádření způsobu nebo stavu.</p>
<p>V historickém kontextu se slovo používalo k vyjádření jednotlivosti nebo specifikace, což se zachovalo i v moderní češtině, kde se však momentálně užívá téměř výhradně ve spojení <strong>„jednak – jednak“</strong>.</p>
<p>Dnes se slovo „jednak“ používá především k oddělování nebo spojování myšlenek a vět, čímž zdůrazňuje pluralitu nebo různé aspekty daného tématu.</p>
<p><strong>Jednak v Sakuře</strong></p>
<p>My ale budeme svět "otáčet" a ze všech těch dvoj a víceznačností slov nacházet jednoznačnost, ve které je možno si porozumět a shodnout se na tom, co dané slovo vlastně znamená. Protože to je základ každé pravé komunikace. Rozumíme si?</p>
<p>Ano - Ne</p>
<p>Pokud ano, dovoluji si tímto propůjčit staronové slovo <strong>„jednak“</strong> a dát mu nový význam, který budu užívat pouze v rámci <strong>Sakury</strong>, což je můj <strong>osobní projekt hledání skutečných významů a definic</strong>. Doufám, že mi všichni jazyk znalci odpustí tento prohřešek vůči úctě k českému jazyku, který ovládám tak, jako člověk, který tady žije s vámi a dívá se na svět stejnýma očima. A pokud vám díky tomu mohu přiblížit, jak by se dal vidět svět jednak, bude to snad i jedna věc, která by nám pomohla si lépe rozumět.</p>
<p>Takže, jak jsme na tom nyní?</p>

      <section className={styles.categories}>
        <h2>Prozkoumej kategorie</h2>
        <ul>
          <li>
            <Link to="/hodnoty">💖 Hodnoty</Link>
          </li>
          <li>
            <Link to="/filozofie">📖 Filozofie</Link>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <p aria-hidden="true">🌿 Sakura Online – laskavost, výklad a zkoumání 🌿</p>
      </footer>
    </div>
  );
};

export default Home;
