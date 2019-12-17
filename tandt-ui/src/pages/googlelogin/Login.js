/* global gapi */
import React, {Component} from 'react';
import './login.scss';
import LandingPage from '../dashboard/dashboard';
//import { GoogleLogin } from 'react-google-login';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import {Button, MenuItem, Menu} from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';




import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

  componentDidMount() {
    const successCallback = this.onSuccess.bind(this);
    const failureCallback = this.onLoginFailed.bind(this);
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '252338212303-eku5e56140e59uhvqeq36fl8neetega2.apps.googleusercontent.com',
      })

      // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))

      this.auth2.then(() => {
        console.log('on init');
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get(),
        });
      });
    });

    window.gapi.load('signin2', function() {
      // Method 3: render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        client_id: '252338212303-eku5e56140e59uhvqeq36fl8neetega2.apps.googleusercontent.com',
        onSuccess: successCallback,
        onFailure: failureCallback
      }
      gapi.signin2.render('loginButton', opts)
    })
  }

  onSuccess() {
    console.log('on success')
    this.setState({
      isSignedIn: true,
      err: null
    })
  }

 onLoginFailed(err) {
    console.log('on failure')
    this.setState({
      isSignedIn: false
    })
  }

  getContent() {
    if (this.state.isSignedIn) {
    //  return <Switch> <Route path="/mem" render={() => ( <FailedComponent logout={this.onLoginFailed} />)} /> </Switch>
    //  return <FailedComponent logout={this.onLoginFailed}/>
        
        return( 
          <div className="wrapper">
           <header>
   
              
                <div className="userBlock collapse navbar-collapse">
                <Link to="/help">Help</Link>&nbsp;
                </div>  
               
                </header>
            <section>    
       
        <div className="col-lg-12 col-md-12">
         <Link to="/dashboard"><div className="btn btn-prim pull-right">Go to Dashboard</div></Link>
        </div>
     
            </section>  
          </div>  
           
  );
      } else {
      return (
        <div>
          <p style={{fontSize:15}}>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 style={{fontFamily:" Helvetica, sans-serif"}}>Track And Trace</h2>
          {this.getContent()}
        </header>
      </div>
    );
  }
}

export default Login;
