import React from "react";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Users = React.lazy(() => import("./Users/Users"));
const Suppliers = React.lazy(() => import("./Suppliers/Suppliers"));
const Administrators = React.lazy(() =>
  import("./Administrators/Administrators")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/admin/users",
    exact: true,
    name: "Users",
    component: Users,
  },
  {
    path: "/admin/suppliers",
    exact: true,
    name: "Suppliers",
    component: Suppliers,
  },
  {
    path: "/admin/admins",
    name: "Administrators",
    component: Administrators,
  },
];

export default routes;
