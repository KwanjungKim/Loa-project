import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useMemo } from "react";

// recoil
import { useRecoilState } from "recoil";
import paletteModeState from "./atoms/paletteMode";

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
    ...(mode === "light" ? {} : {}),
  },
});

const App = () => {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  const theme = useMemo(
    () => createTheme(getPalette(paletteMode)),
    [paletteMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
