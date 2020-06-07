import React from "react";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const Articles = React.lazy(() => import("./Articles/Articles"));
const ArticleDetails = React.lazy(() => import("./Articles/ArticleDetails"));
const Profile = React.lazy(() => import("./Profile/Profile"));
const AddProduct = React.lazy(() => import("./Product/AddProduct"));
const MyProducts = React.lazy(() => import("./Product/MyProducts"));
const EditProduct = React.lazy(() => import("./Product/EditProduct"));
const ProductDetails = React.lazy(() => import("./Product/ProductDetails"));
const MarketPlace = React.lazy(() => import("./Product/MarketPlace"));

const routes = [
  { path: "/user", exact: true, name: "Home" },
  { path: "/user/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user/articles", name: "Articles", component: Articles },
  { path: "/user/add-product", name: "Add Product", component: AddProduct },
  { path: "/user/my-products", name: "My Products", component: MyProducts },
  { path: "/user/edit-product/:id", name: "Edit Products", component: EditProduct },
  { path: "/user/product/:id", name: "Product Details", component: ProductDetails },
  { path: "/user/marketplace", name: "Market Place", component: MarketPlace },
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
