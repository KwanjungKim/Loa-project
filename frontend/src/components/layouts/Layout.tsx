import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout() {
  return (
    <main>
      <Header />
      <section className={styles.section}>
        <div className={styles.navWrapper}>
          <Nav />
        </div>
        <Outlet />
      </section>
    </main>
  );
}
