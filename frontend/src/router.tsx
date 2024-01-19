import { createBrowserRouter } from "react-router-dom";

// layouts
import RootLayout from "./components/layouts/RootLayout";

// routes
import HomeRoute from "./routes/HomeRoute";
import RaidRoute from "./routes/RaidRoute";
import TestRoute from "./routes/Test";
import ButtonsRoute from "./routes/Test/ButtonsRoute";
import ModalsRoute from "./routes/Test/ModalsRoute";
import Auth from "./components/kakaoLogin/Auth";

import ErrorPage from "./error-page";
import CalendarRoute from "./routes/Test/CalendarRoute";
import MyCalendarRoute from "./routes/MyCalendarRoute";
import MyPage from "./components/MyPage";
import PingPongRoute from "./routes/Test/PingPongRoute";

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
        path: "my-calendar",
        element: <MyCalendarRoute />,
      },
      {
        path: "oauth/kakao/callback",
        element: <Auth />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      {
        path: "raid",
        element: <RaidRoute />,
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
          {
            path: "calendar",
            element: <CalendarRoute />,
          },
          {
            path: "pingpong",
            element: <PingPongRoute />,
          },
        ],
      },
    ],
  },
]);

export default router;
