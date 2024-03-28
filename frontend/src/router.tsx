import { createBrowserRouter } from "react-router-dom";

// layouts
import Layout from "./components/layouts/Layout";

// routes
import HomeRoute from "./routes/HomeRoute";
import RaidRoute from "./routes/raid/RaidRoute";
import Auth from "./components/kakaoLogin/Auth";

import ErrorPage from "./error-page";
import MyCalendarRoute from "./routes/MyCalendarRoute";
import MyPage from "./components/MyPage";
import RaidArticleRoute from "./routes/raid/RaidArticleRoute";
import RaidPostingRoute from "./routes/RaidPost";
import ApplyDetailRoute from "./routes/raid/ApplyDetail";

import PostingDetailRoute from "./routes/raid/PostingDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        // element: <MyPage />,
        children: [
          {
            path: "",
            element: <MyPage />,
          },
          {
            path: "posting",
            element: <RaidPostingRoute />,
          },
          {
            path: ":id",
            element: <ApplyDetailRoute />,
          },
          {
            path: "post/:id",
            element: <PostingDetailRoute />,
          },
        ],
      },
      {
        path: "raid",
        // element: <RaidRoute />,
        children: [
          {
            path: "",
            element: <RaidRoute />,
          },
          {
            path: ":id",
            element: <RaidArticleRoute />,
          },
        ],
      },
    ],
  },
]);

export default router;
