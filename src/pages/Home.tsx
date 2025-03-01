import Text from "@components/Text/Text";
import { removeIndentation } from "@utils/removeIndentation";

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

      <div className="layout">
        <main>
          <Text>
          {removeIndentation(`
            ## **Jednak jako staronový pojem**

            Jestli jste lehce zmateni slovem „jednak“ ve výše zmíněné větě, správně vnímáte, že se jedná o část párové konstrukce: **„jednak… jednak…“** – tedy spojení dvou rovnocenných i nerovnocenných věcí.  
            Například: „Chci se učit nový jazyk, jednak abych si rozšířil obzory, jednak abych mohl cestovat.“  
            Očekáváte tedy druhou stranu.

            Co by ale znamenalo, kdybychom ho použili jen jednou?

            **„Jednak“ znamená, že nevolíme mezi možnostmi, ale že si přejeme danou věc naprosto celou, bez ohledu na to, co obsahuje, protože víme, že její části jsou „jednak“.“**  
            Běžně tak říkáme „jednak… jednak…“, protože známe významové složky, na které si přejeme ono „jednak“ rozložit.  
            Například nový jazyk pro nás znamená **jednak** rozšíření obzorů, **jednak** možnost cestování.

            Co když ale takový rozklad neznáme?  
            Víme, že danou věc si přejeme, ale netušíme, jaký význam pro nás má?

            Pak bychom řekli například:  
            **„Chci vidět, vnímat, cítit svět jednak.“**  
            To by znamenalo, že mu chceme naprosto porozumět, pochopit všechny jeho části a mít je správně roztříděné podle významu, který pro nás nese.

            ## **Historický význam slova „jednak“**

            „Jednak“ je ve skutečnosti příslovce, které se ve staročeštině používalo k vyjádření jednoty.  
            Vzniklo spojením předpony **„jed-“**, což znamená **„jeden“**, a přípony **„-nak“**, která se užívá k vyjádření způsobu nebo stavu.

            V historickém kontextu se slovo používalo k vyjádření jednotlivosti nebo specifikace, což se zachovalo i v moderní češtině, kde se však momentálně užívá téměř výhradně ve spojení **„jednak – jednak“**.

            Dnes se slovo „jednak“ používá především k oddělování nebo spojování myšlenek a vět, čímž zdůrazňuje pluralitu nebo různé aspekty daného tématu.

            ### **Jednak v Sakuře**

            My ale budeme svět „otáčet“ a ze všech těch dvoj a víceznačností slov nacházet jednoznačnost, ve které je možno si porozumět a shodnout se na tom, co dané slovo vlastně znamená.  
            Protože to je základ každé pravé komunikace. **Rozumíme si?**

            Pokud ano, dovoluji si tímto propůjčit staronové slovo **„jednak“** a dát mu nový význam, který budu užívat pouze v rámci **Sakury**, což je můj **osobní projekt hledání skutečných významů a definic**.  
            Doufám, že mi všichni jazykoví znalci odpustí tento prohřešek vůči úctě k českému jazyku, který ovládám tak, jako člověk, který tady žije s vámi a dívá se na svět stejnýma očima.  
            A pokud vám díky tomu mohu přiblížit, jak by se dal vidět svět jednak, bude to snad i jedna věc, která by nám pomohla si lépe rozumět.

            **Takže, jak jsme na tom nyní?**
            `)}
          </Text>
          </main>
          <aside>
          {/* <section className={styles.categories}>
            <h2>Prozkoumej kategorie</h2>
            <ul>
              <li>
                <Link to="/hodnoty">💖 Hodnoty</Link>
              </li>
              <li>
                <Link to="/filozofie">📖 Filozofie</Link>
              </li>
            </ul>
          </section> */}
          </aside>
      </div>
      <footer className="footer">
        <p aria-hidden="true">🌿 Sakura Online – laskavost, výklad a zkoumání 🌿</p>
      </footer>
    </div>
  );
};

export default Home;
