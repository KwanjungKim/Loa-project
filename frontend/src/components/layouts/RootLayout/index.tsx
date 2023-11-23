// styles
import styles from "./index.module.scss";

// utils
import Header from "./Header";
import Content from "./Content";

const RootLayout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <div />
      <Content />
      {/* <div className={styles.content}>
        <div className={styles.nav}>hi</div>
        <Outlet />
      </div> */}
      {/* <div>
        <Outlet />
      </div>
      <div>
        <div>
          <MenuRoundedIcon />
        </div>
        <div>
          <HomeRoundedIcon />
        </div>
        <div>레이드 모집</div>
        <div>
          <CalendarMonthRoundedIcon />
        </div>
        <div>공략?</div>
      </div> */}
    </main>
  );
};

export default RootLayout;
