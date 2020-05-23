import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("isUser") !== true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/register",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
