import React from "react";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Products = React.lazy(() => import("./Product/Products"));
const Articles = React.lazy(() => import("./Articles/Articles"));
const AddArticle = React.lazy(() => import("./Articles/AddArticle"));
const EditArticle = React.lazy(() => import("./Articles/EditArticle"));
const Users = React.lazy(() => import("./Users/Users"));
const Suppliers = React.lazy(() => import("./Suppliers/Suppliers"));
const Administrators = React.lazy(() =>
  import("./Administrators/Administrators")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/admin/products",
    exact: true,
    name: "Products",
    component: Products,
  },
  {
    path: "/admin/articles",
    exact: true,
    name: "Articles",
    component: Articles,
  },
  {
    path: "/admin/add-article",
    name: "Add Article",
    component: AddArticle,
  },
  {
    path: "/admin/edit-article/:id",
    name: "Edit Article",
    component: EditArticle,
  },
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
