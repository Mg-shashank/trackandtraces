import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Error from "../pages/error/Error";
import Login1 from "../pages/login/Login1";
import { useUserState } from "../context/UserContext";
import landingPage from "../pages/landingPage/landingPage";
import dashboard from "../pages/dashboard/dashboard";
import LandingPage from "../pages/dashboard/dashboard";
import help from "../pages/help/help";
import createorder from "../pages/createorder/createorder";
import OrderID from "../pages/orderdetails/OrderDetailsUI";
import Unknown from "../pages/login/Unknown";
import trackorder from "../pages/trackorder/trackorder";
// import LandingPage from "../pages/trackorder/trackorder";
import traceorder from "../pages/traceorder/traceorder";
import dashboarddisplay from "../pages/dashboard/dashboarddisplay";
import Orders from '../pages/orderdetails/Orders';
import { useLedgerDispatch, fetchContracts } from "../context/LedgerContext";
import config from "../config";
import Options from "../pages/login/Dialogbox";
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
        {/* <PrivateRoute path="/app" component={Layout} /> */}
        {/*<PublicRoute path="/login" component={Login}/>*/}
        <PublicRoute path="/login" component={Login1} />
        <PublicRoute path="/landingPage" component={landingPage} />
        <PublicRoute path="/dashboard" component={dashboarddisplay} />
        {/* <PublicRoute path="/dashboard" component={LandingPage} /> */}
        <PublicRoute path="/help" component={help} />
        <PublicRoute path="/createorder" component={createorder} />
        {/* <PublicRoute path="/orderdetails" component={orderdetails}/>*/}
        <PublicRoute path="/orderdetails" component={OrderID} />
        <PublicRoute path="/trackorder" component={trackorder} />
        <PublicRoute path="/traceorder" component={traceorder}  /> 
        <PublicRoute path="/options" component={Options}  /> 
        <PublicRoute path="/unknown" component={Unknown}  />    
        {/* <PublicRoute path="/orderss" component={Orders}/> */}
        <PublicRoute path="/orders" component={Orders}/>
        <PublicRoute path="/orders?ordid=" render={(props) => <Orders {...props} />}/>
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
