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
            <p
              style={{
                position: "absolute",
                bottom: "16px",
                left: "24px",
                fontSize: "8px",
                color: "rgba(var(--font-faded), 1)",
              }}
            >
              LOA IN. &copy; 2024. All rights reserved.
            </p>
          </div>
          <div className={styles.outletWrapper}>
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}
