import React from "react";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Profile = React.lazy(() => import("./Profile/Profile"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/user", exact: true, name: "Home" },
  { path: "/user/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/user/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
];

export default routes;
