import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import { supplierNav, defaultNav } from './_nav'
import { UserServices } from '../../../services/userServices'
// routes config
import routes from "../user_routes";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier_status: ''
    };
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  getSupplierStatus() {
    UserServices.userDetails(localStorage.getItem('userId')).then((response) => {
      if (response.status) {
        this.setState({
          supplier_status: response.data.is_supplier,
        })
      }
    })
  }

  signOut(e) {
    e.preventDefault();
    UserServices.logout();
    window.location = '/';
  }

  componentDidMount() {
    this.getSupplierStatus()
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <Suspense>
              <AppSidebarNav
                navConfig={this.state.supplier_status ? supplierNav : defaultNav}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/user" to="/user/marketplace" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
