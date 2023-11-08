import { createBrowserRouter } from "react-router-dom";

// routes
import HomeRoute from "./routes/HomeRoute";
import TestRoute from "./routes/Test";
import ButtonsRoute from "./routes/Test/ButtonsRoute";
import RootLayout from "./components/layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeRoute />,
      },
      {
        path: "/test",
        children: [
          {
            path: "",
            element: <TestRoute />,
          },
          {
            path: "buttons",
            element: <ButtonsRoute />,
          },
        ],
      },
    ],
  },
]);

export default router;
