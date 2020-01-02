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
//import {roles} from '../../config';
import orderdetails from '../orderdetails/orderdetails';
import Unknown from './Unknown';

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
  backgroundRepeat: 'no-repeat',
 	backgroundSize: 'cover'
  }
  const emailIds = ['shashank30051997@gmail.com', 'abcd1@gmail.com', 'abcd@gmail.com']
  const roles = [{
                    "role": "serviceProvider",
                    "emailId":"shashank30051997@gmail.com"
                },
                {
                    "role": "distributor",
                    "emailId":"abcd1//@gmail.com"
                },
                {
                    "role": "manuacturer",
                    "emailId":"abcd3@gmail.com"
                }];

 var email;
 let signout;
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
        fetch_basic_profile: false,
        scope: 'profile'
      })     

     /* this.auth2.signIn().then(function() {
          console.log(this.auth2.currentUser.get().getId());
        }); */

      this.auth2.then(() => {
        console.log('on init'); 
        console.log(this.state.isSignedIn);
         this.setState({ isSignedIn: this.auth2.isSignedIn.get(),});              
      });  
      
      if (this.auth2.isSignedIn.get()) {
        console.log("Hello")
        var profile = this.auth2.currentUser.get().getBasicProfile();
        //console.log('ID: ' + profile.getId());
        //console.log('Full Name: ' + profile.getName());
        //console.log('Given Name: ' + profile.getGivenName());
        //console.log('Family Name: ' + profile.getFamilyName());
        //console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        email = profile.getEmail();
        console.log(email);
        
      }
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

  getRoleByEmailId(emailid) {
    return roles.filter(function(roles){return (roles.emailId == emailid)});
  }
 
  
  getContent() {
    console.log(email)
    var loggedInUsersEmailId = 'shashank30051997@gmail.com';
    //var loggedInUsersEmailId = email;


    if (this.state.isSignedIn) { 
       //if(emailIds[loggedInUsersEmailId]){
        var roleData = this.getRoleByEmailId(loggedInUsersEmailId);
    
        console.log(roleData[0].role);
        
        localStorage.setItem('logged-in-user-email-id', loggedInUsersEmailId);
        
    
        if(roleData[0].role){
        return(
        <div className="wrapper">          
          <div className="col-lg-12 col-md-12">        
            <Redirect to='/dashboard'/>
            {/*<button onClick={this.Clicked()}>Signout</button>*/}
          </div>           
        </div>      
      );
    } else {
      return (
        <div className="wrapper">          
       <div className="col-lg-12 col-md-12">        
       <Redirect to='/Unknown'/>
       </div>           
       </div>);
    }
  } else {
      return (
        <div>        
          <button id="loginButton" className="button1">Login with Google</button>
        </div>
      );
    }        
}


  render() {
    return (
      <div className="container-fluid padding0">
    		<div className="col-lg-7 col-md-7 padding0 introimg">    			
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
