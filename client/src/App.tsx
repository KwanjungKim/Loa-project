import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import theme from "./theme";
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
