import React from "react";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Articles = React.lazy(() => import("./Articles/Articles"));
const ArticleDetails = React.lazy(() => import("./Articles/ArticleDetails"));
const Profile = React.lazy(() => import("./Profile/Profile"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/user", exact: true, name: "Home" },
  { path: "/user/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user/articles", name: "Articles", component: Articles },
  {
    path: "/user/article/:id",
    name: "Article Details",
    component: ArticleDetails,
  },
  {
    path: "/user/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
];

export default routes;
