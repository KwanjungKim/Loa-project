import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import TestRoute from "./routes/Test";
import HomeRoute from "./routes/HomeRoute";
import TestComponents from "./routes/Test/Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
      },
      {
        path: "/test",
        children: [
          {
            path: "/test",
            element: <TestRoute />,
          },
          {
            path: "/test/components",
            element: <TestComponents />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
