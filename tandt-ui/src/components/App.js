import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Error from "../pages/error/Error";
import Login from "../pages/googlelogin/Login";
import { useUserState } from "../context/UserContext";
import landingPage from "../pages/landingPage/landingPage";
import dashboard from "../pages/dashboard/dashboard";
import createorder from "../pages/createorder/createorder";
import orderdetails from "../pages/orderdetails/orderdetails";
import trackorder from "../pages/trackorder/trackorder";
import { useLedgerDispatch, fetchContracts } from "../context/LedgerContext";
import config from "../config";

export default function App() {
  const userState = useUserState();
  const ledgerDispatch = useLedgerDispatch();
  
  useEffect(() => {
    var timer = null;
    if (userState.isAuthenticated && !!userState.token) {
      fetchContracts(ledgerDispatch, userState.token, () => {}, () => {}); 
      if (config.continuousUpdate) {
        timer = setInterval(() => fetchContracts(ledgerDispatch, userState.token, () => {}, () => {}), 1000)
      }
    }

    if (config.continuousUpdate) {
      return () => {
        clearInterval(timer);
        timer = null;
      }
    }
  });

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/default" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/default" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/landingPage" component={landingPage} />
        <PublicRoute path="/dashboard" component={dashboard} />
        <PublicRoute path="/createorder" component={createorder} />
        <PublicRoute path="/orderdetails" component={orderdetails} />
        <PublicRoute path="/trackorder" component={trackorder} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          userState.isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}