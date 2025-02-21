import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootStoreContext } from "@viewmodels/RootStore";

const Sidebar = observer(() => {
  const { uiStore } = useContext(RootStoreContext);

  return (
    <div>
      <button onClick={() => uiStore.toggleSidebar()}>
        {uiStore.isSidebarOpen ? "Zavřít" : "Otevřít"} Sidebar
      </button>
      {uiStore.isSidebarOpen && <p>Obsah Sidebaru</p>}
    </div>
  );
});

export default Sidebar;
