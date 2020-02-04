import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Error from "../pages/error/Error";
//import Login from "../pages/login/Login";
import Login1 from "../pages/login/Login1";
import { useUserState } from "../context/UserContext";
import landingPage from "../pages/landingPage/landingPage";
import dashboard from "../pages/dashboard/dashboard";
import help from "../pages/help/help";
import createorder from "../pages/createorder/createorder";
import orderdetails from "../pages/orderdetails/orderdetails";
import Unknown from "../pages/login/Unknown";
import trackorder from "../pages/trackorder/trackorder";
import traceorder from "../pages/traceorder/traceorder";
import createbatch from "../pages/createbatch/createbatch";
import batchdetails from "../pages/batchdetails/batchdetails";
import { useLedgerDispatch, fetchContracts } from "../context/LedgerContext";
import CompletedOrders from '../pages/orderdetails/CompletedOrders'
import config from "../config";
import OrderID from "../pages/orderdetails/OrderDetailsUI";
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
          {/*<PublicRoute path="/login" component={Login} />*/}
        <PublicRoute path="/login" component={Login1} />
        <PublicRoute path="/landingPage" component={landingPage} />
        <PublicRoute path="/dashboard" component={dashboard} />
        <PublicRoute path="/help" component={help} />
        <PublicRoute path="/createorder" component={createorder} />
        <PublicRoute path="/orderdetails" component={OrderID} />
        <PublicRoute path="/trackorder" component={trackorder} />import React, { useEffect } from "react";
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
import CreateBatch from '../pages/createbatch/createbatch'
import BatchDetails from '../pages/batchdetails/batchdetails'
import {isLogin} from "../pages/login/Login1";
import CompletedOrders from '../pages/orderdetails/CompletedOrders'
// import PagiTable from '../pages/orderdetails/PagiTable'
var role = localStorage.getItem('role')
var name = localStorage.getItem('name')
var roles
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
        {/* <Route exact path="/" render={() => <Redirect to="/app/default" />} /> */}
        {/* <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/default" />}
        /> */}
        {/* <PrivateRoute path="/app" component={Layout} /> */}
        {/*<PublicRoute path="/login" component={Login}/>*/}
        {/* <PublicRoute  path="/login"  component={Login1} exact/> */}
        <Route  path="/login"  component={Login1} exact/>
        <PrivateRoute path="/landingPage"  component={landingPage} exact/>
        <PrivateRoute path="/dashboard"  component={dashboarddisplay} exact/>
                {/* <PublicRoute path="/dashboard" component={LandingPage} /> */}
        <PrivateRoute path="/help"  component={help} exact/>
        <PrivateRoute path="/createorder"  component={createorder} exact/>
                {/* <PublicRoute path="/orderdetails" component={orderdetails}/>*/}
        <PrivateRoute path="/orderdetails"  component={OrderID} exact/>
        <PrivateRoute path="/trackorder"  component={trackorder} exact/>
        <PrivateRoute path="/traceorder"  component={traceorder} exact /> 
        <PrivateRoute path="/options" component={Options} exact /> 
        <PrivateRoute path="/unknown" component={Unknown}  exact/>    
                {/* <PublicRoute path="/orderss" component={Orders}/> */}
        <PrivateRoute path="/orders" component={Orders} exact/>
        <PrivateRoute path="/createbatch" component={CreateBatch} exact/>
        <PrivateRoute path="/batchdetails" component={BatchDetails} exact/>
        <PrivateRoute path="/completedrecords" component={CompletedOrders} exact/>
        <PrivateRoute path="/orders?ordid=" render={(props) => <Orders {...props} />}exact/>
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    console.log(role)
    return (
      <Route
        {...rest}
        render={props =>
          (role && name? (
            // userState.isAuthenticated ?(
              React.createElement(component, props)
             ) :
             (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}/>)
          )}/>
         );
      }

// function PrivateRoute ({component: Component, ...rest}){
  //   return(
  //     <Route {...rest} render={props =>(Options() ?<Component {...props}/>:<Redirect to="/login"/>)} />
  //   )
  // }

  function PublicRoute({ component, restricted, ...rest }) {  
     return (
      <Route
        {...rest}
        render={props =>
        (role && name ? (
          //    userState.isAuthenticated ?(
            React.createElement(component, props)  
          ) : (
            <Redirect
              to='/login'
            />
          )
         )
        }
      />
    );
  

//   const PublicRoute = ({component: Component, restricted, ...rest}) => {
//     return (
//         // restricted = false meaning public route
//         // restricted = true meaning restricted route
//         <Route {...rest} render={props => (
//             isLogin() && restricted ?
//                 <Redirect to="/dashboard" />
//             : <Component {...props} />
//         )} />
//     );
// };
  }
}

        <PublicRoute path="/traceorder" component={traceorder}  /> 
        <PublicRoute path="/createbatch" component={createbatch} />
        <PublicRoute path="/batchdetails" component={batchdetails} />
        <PrivateRoute path="/completedrecords" component={CompletedOrders} exact/>
        <PublicRoute path="/unknown" component={Unknown}  />
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
