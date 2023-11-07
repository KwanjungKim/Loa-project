import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

// recoil
import { useSetRecoilState } from "recoil";
import paletteModeState, { paletteModeActions } from "./atoms/paletteMode";

// router
import router from "./router";
import useTheme from "./hooks/useTheme";

const App = () => {
  const theme = useTheme();

  const setPaletteMode = useSetRecoilState(paletteModeState);
  const handleClickChangeTheme = () => {
    setPaletteMode(paletteModeActions.toggle);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickChangeTheme}
      >
        테마 변경
      </Button>
    </ThemeProvider>
  );
};

export default App;
