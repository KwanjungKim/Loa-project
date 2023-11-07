import { createBrowserRouter } from "react-router-dom";

// routes
import HomeRoute from "./routes/HomeRoute";
import TestRoute from "./routes/Test";
import TestComponents from "./routes/Test/Components";
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
            path: "components",
            element: <TestComponents />,
          },
        ],
      },
    ],
  },
]);

export default router;
