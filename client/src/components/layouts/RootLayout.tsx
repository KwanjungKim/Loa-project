import Grid from "@mui/material/Grid";
import { Link, Outlet } from "react-router-dom";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// styles
import styles from "./RootLayout.module.scss";

// components
import { Button, Typography, useMediaQuery } from "@mui/material";

// recoil
import { useSetRecoilState } from "recoil";
import paletteModeState, { paletteModeActions } from "../../atoms/paletteMode";

const RootLayout = () => {
  const setPaletteMode = useSetRecoilState(paletteModeState);
  const handleClickChangeTheme = () => {
    setPaletteMode(paletteModeActions.toggle);
  };

  const isLg = useMediaQuery("(min-width: 768px)");
  return (
    <Grid container columnSpacing={2} className={styles.layout}>
      <Grid item md={1} lg={1.5}>
        <Link to="/">
          <div className={styles.link_item}>
            <HomeRoundedIcon />
            {isLg && <Typography>Home</Typography>}
          </div>
        </Link>

        <Link to="/search">
          <div className={styles.link_item}>
            <SearchRoundedIcon />
            <Typography>Find Party</Typography>
          </div>
        </Link>

        <Link to="/my">
          <div className={styles.link_item}>
            <AccountCircleRoundedIcon />
            <Typography>My</Typography>
          </div>
        </Link>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickChangeTheme}
        >
          테마 변경
        </Button>
      </Grid>
      <Grid item md={11} lg={10.5}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RootLayout;
