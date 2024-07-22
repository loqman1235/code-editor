import { MdClose } from "react-icons/md";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p>Files</p>
        <button className={styles.sidebarCloseBtn}>
          <MdClose />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
