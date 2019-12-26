/* global gapi */
import React, {Component} from 'react';
import './login.scss';
import LandingPage from '../dashboard/dashboard';
//import { GoogleLogin } from 'react-google-login';
import dashboard from '../dashboard/dashboard';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
import './blogo.png';
import brillio from './brillio.svg';
import brillio1 from './brillio1.png';
import login from './login.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogButton from '../buttoncomponent/LogButton';
import image1 from './image1.png';
import './site.scss';
const tstyle = {
  width:500,
  height:380,
  align:'justify',
  top:250,
  left:200
};

 const introimg = {
   height:'100vh',
   width : '58vw',
  //backgroundImage : "url(" + { image1 } + ")",
 	backgroundRepeat: 'no-repeat',
 	backgroundSize: 'cover'
  }

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
          {/* <header>
                <div className="userBlock collapse navbar-collapse">
                <Link to="/help">Help</Link>&nbsp;
                </div>
            </header>
            <section>*/ }
        <div className="col-lg-12 col-md-12">
         {/*<Link to="/dashboard"><div className="btn btn-prim pull-right">Go to Dashboard</div></Link>*/}
         <Redirect to='/dashboard'/>
        </div>
            {/*</section>*/}
        </div>
  );
      } else {
      return (
        <div>
        {/*<button type="button" id="loginButton" className="btn btn-primary" data-toggle="modal" data-target="#login-type">Login</button>*/}
          <button id="loginButton" className="button1">Login with Google</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container-fluid padding0">
    		<div className="col-lg-7 col-md-7 padding0 introimg">
    			{/*<img src={brillio} alt="img" className=""/>*/}
          <img src={brillio1} alt='image1' style={introimg}/>
          </div>
    		<div className="col-lg-5 col-md-5 login-container">
    			<p className="text-center"><img src={login} alt="login" /></p>
    			<div class="text-center">
            <div class="col-md-5">{this.getContent()}</div>
          </div>
    		</div>
    	</div>
    );
  }
}

export default Login;

{/*<div>
  <div class="row">
   <div style={tstyle} class="col-md-5">
    <div>
     <img src={brillio} alt="logo" />
    </div>
   </div>
   <div class="col-md-5" style={tstyle} >{this.getContent()}</div>
 </div>
</div>*/}
