import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import useTheme from "./hooks/useTheme";

const App = () => {
  // const theme = useTheme();

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      {/* <CssBaseline /> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </>
  );
};

export default App;
