import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "./components/layouts/RootLayout";

// routes
import HomeRoute from "./routes/HomeRoute";
import TestRoute from "./routes/Test";
import ButtonsRoute from "./routes/Test/ButtonsRoute";
import ModalsRoute from "./routes/Test/ModalsRoute";
import Auth from "./components/kakaoLogin/Auth";
import CharacterAuth from "./components/kakaoLogin/CharacterAuth";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
          {
            path: "modals",
            element: <ModalsRoute />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "oauth/kakao/callback",
        element: <Auth />,
      },
      {
        path: "characterAuth",
        element: <CharacterAuth />,
      },
    ],
  },
]);

export default router;
