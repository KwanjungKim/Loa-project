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
    </main>
  );
};

export default RootLayout;
