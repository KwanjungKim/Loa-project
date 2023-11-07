import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

// styles
import styles from "./RootLayout.module.scss";

const RootLayout = () => {
  return (
    <Grid container columnSpacing={2} className={styles.layout}>
      <Grid item md={1} lg={2}>
        navigation
      </Grid>
      <Grid item md={11} lg={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RootLayout;
