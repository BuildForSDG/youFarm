import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.scss";
import { UserServices } from "./services/userServices";
import { AdminServices } from "./services/adminServices";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const AdminDashboard = React.lazy(() =>
  import("./components/admin/CommonLayouts/DefaultLayout")
);
const UserArticles = React.lazy(() =>
  import("./components/user/CommonLayouts/DefaultLayout")
);

// Pages
const Home = React.lazy(() => import("./components/Home"));
const AdminLogin = React.lazy(() => import("./components/admin/Login/Login"));
const UserLogin = React.lazy(() => import("./components/user/Login/Login"));
const Register = React.lazy(() =>
  import("./components/user/Register/Register")
);
const Page404 = React.lazy(() => import("./components/misc/Page404/Page404"));

toast.configure();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home"
              render={(props) => <Home {...props} />}
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <UserLogin {...props} />}
            />

            <Route
              exact
              path="/admin/login"
              name="Admin Login Page"
              render={(props) => <AdminLogin {...props} />}
            />

            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              path="/admin"
              name="Dashboard"
              render={(props) =>
                (AdminServices.adminLoggedIn() ?
                  <AdminDashboard {...props} /> :
                  (<Redirect to="/admin/login" />))}
            />
            <Route
              path="/user"
              name="Articles"
              render={(props) =>
                (UserServices.userLoggedIn() ?
                  <UserArticles {...props} /> :
                  (<Redirect to="/login" />))}
            />
            <Route
              path="*"
              name="Page Not Found"
              render={(props) => <Page404 {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
