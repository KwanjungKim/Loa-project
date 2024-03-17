import { Outlet } from "react-router-dom";

// styles
import styles from "./Layout.module.scss";

// layout components
import InitScreenMode from "./inits/InitScreenMode";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout() {
  return (
    <>
      <InitScreenMode />
      <main>
        <Header />
        <section className={styles.section}>
          <div className={styles.navWrapper}>
            <div>
              <Nav />
            </div>
          </div>
          <div className={styles.outletWrapper}>
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}
