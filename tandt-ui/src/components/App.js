import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import Error from "../pages/error/Error";
import Login1 from "../pages/login/Login1";
import { useUserState } from "../context/UserContext";
import landingPage from "../pages/landingPage/landingPage";
import dashboard from "../pages/dashboard/dashboard";
// import trackorderUI from "../pages/dashboard/trackorderUI"
import OrderPlaced from '../pages/dashboard/OrderPlaced';
// import OrderAccepted from '../pages/dashboard/OrderAccepted';
import OrderRec from '../pages/dashboard/OrderRec';
import createneworder from "../pages/createorder/createneworder";
import LandingPage from "../pages/dashboard/dashboard";
import createorder from "../pages/createorder/createorder";
import CompletedOrders from '../pages/orderdetails/CompletedOrders'
import OrderID from "../pages/orderdetails/OrderDetailsUI";
import Unknown from "../pages/login/Unknown";
import trackorder from "../pages/trackorder/trackorder";
import track1 from "../pages/trackorder/track1";
import disTrack from "../pages/trackorder/disTrack";
import traceorder from "../pages/traceorder/traceorder";
import Orders from '../pages/orderdetails/Orders';
import OrdersforSP from '../pages/orderdetails/OrdersforSP';
import OrdersforRec from '../pages/orderdetails/OrdersforRec';
import { useLedgerDispatch, fetchContracts } from "../context/LedgerContext";
import config from "../config";
import Options from "../pages/login/Dialogbox";
import CreateBatch from '../pages/createbatch/createbatch'
import BatchDetails from '../pages/batchdetails/batchdetails'
import {isLogin} from "../pages/login/Login1";
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
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        {/* <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/default" />}
        /> */}
        {/* <PrivateRoute path="/app" component={Layout} /> */}
        {/*<PublicRoute path="/login" component={Login}/>*/}
        {/* <PublicRoute  path="/login"  component={Login1} exact/> */}
        <Route  path="/login"  component={Login1} exact/>
        <PublicRoute path="/landingPage"  component={landingPage} exact/>
        {/* <PrivateRoute path="/dashboard"  component={dashboarddisplay} exact/> */}
        <PublicRoute path="/dashboard" component={dashboard} />
        {/* <PublicRoute path="/trackorderUI" component={trackorderUI} exact /> */}
        <PublicRoute path="/OrderPlaced" component={OrderPlaced} exact />
        <PublicRoute path="/OrderAccepted" component={OrderAccepted} exact/>
        <PublicRoute path="/OrderRec" component={OrderRec} exact />
        <PublicRoute path="/createorder"  component={createorder} exact/>
        <PublicRoute path="/createneworder"  component={createneworder} exact/>
        <PublicRoute path="/completedrecords" component={CompletedOrders} exact/>
   {/* <PublicRoute path="/orderdetails" component={orderdetails}/>*/}
        <PublicRoute path="/orderdetails"  component={OrderID} exact/>
        <PublicRoute path="/trackorder"  component={trackorder} exact/>
        <PublicRoute path="/track1"  component={track1} exact/>
        <PublicRoute path="/disTrack"  component={disTrack} exact/>
        <PublicRoute path="/traceorder"  component={traceorder} exact /> 
        <PublicRoute path="/options" component={Options} exact /> 
        <PublicRoute path="/unknown" component={Unknown}  exact/>    
        {/* <PublicRoute path="/orderss" component={Orders}/> */}
        <PublicRoute path="/orders" component={Orders} exact/>
        <PublicRoute path="/ordersforsp" component={OrdersforSP} exact/>
        <PublicRoute path="/ordersforRec" component={OrdersforRec} exact/>
        <PublicRoute path="/createbatch" component={CreateBatch} exact/>
        <PublicRoute path="/batchdetails" component={BatchDetails} exact/>
        <PublicRoute path="/orders?ordid=" render={(props) => <Orders {...props}/>}exact/>
        <PublicRoute path ="/ordersforsp?ordid=" render={(props) => <OrdersforSP {...props}/>} exact/>
        <PublicRoute path ="/ordersforRec?ordid=" render={(props) => <OrdersforRec {...props}/>} exact/>
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
              }}/>
            )
          )}/>
         );
      }


  function PublicRoute({ component, restricted, ...rest }) {  
     return (
      <Route
        {...rest}
        render={props =>
        (role && name ? (
            //  userState.isAuthenticated ?(
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

  }
}
