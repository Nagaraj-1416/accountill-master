import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user?.result && user?.result?.role === 1) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/not-authorized" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
