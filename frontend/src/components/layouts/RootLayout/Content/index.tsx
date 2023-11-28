import { Outlet } from "react-router-dom";

// components
import LeftNav from "./LeftNav";

// styles
import styles from "./index.module.scss";
import BottomNav from "./BottomNav";

const Content = () => {
  return (
    <div className={styles.content_wrapper}>
      {/* left nav */}
      <LeftNav />
      {
        // main content
      }
      <section className={styles.section}>
        <Outlet />
      </section>
      {/* bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Content;
