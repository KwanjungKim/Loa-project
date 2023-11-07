import {
  Button,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useMemo } from "react";

// recoil
import { useRecoilState } from "recoil";
import paletteModeState, { paletteModeActions } from "./atoms/paletteMode";

// routes
import HomeRoute from "./routes/HomeRoute";
import TestRoute from "./routes/Test";
import TestComponents from "./routes/Test/Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
  },
  {
    path: "/test",
    element: <TestRoute />,
  },
  {
    path: "/test/components",
    element: <TestComponents />,
  },
]);

const getPalette = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#E3D026",
            contrastText: "white",
          },
        }
      : {
          primary: {
            main: "#E3D026",
            contrastText: "black",
          },
        }),
  },
});

const App = () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  const theme = useMemo(
    () => createTheme(getPalette(paletteMode)),
    [paletteMode],
  );

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
