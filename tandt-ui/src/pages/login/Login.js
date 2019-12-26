/* global gapi */
import React, {Component} from 'react';
import './login.scss';
import LandingPage from '../dashboard/dashboard';
import dashboard from '../dashboard/dashboard';
//import { GoogleLogin } from 'react-google-login';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
import './blogo.png';
//import brillio from './brillio.svg';
import brillio1 from './brillio1.png';
import login from './login.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogButton from '../buttoncomponent/LogButton';
import image1 from './image1.png';
import './site.scss';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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

  firebase.initializeApp({
    apiKey: "AIzaSyCICEsUIfXhpYMwasSxphU9PbhLuMtpyoo",
    authDomain:"fir-tuto-a6fd4.firebaseapp.com"
  })

class Login extends Component {
  state={isSignedIn:false}
  uiConfig = {
    signInFlow: 'popup',
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess: () => false
    }
  }

  componentDidMount =()=>{
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({isSignedIn:!!user})
    })
  }


  render() {
    return (
      <div>
        {this.state.isSignedIn
          ?
          <div>
          {/*<Redirect to='/dashboard' back={()=>firebase.auth().signOut()}/>*/}
            <Redirect to='/dashboard'/>
          </div>
          :
           <div className="container-fluid padding0">
         		<div className="col-lg-7 col-md-7 padding0 introimg">
         			{/*<img src={brillio} alt="img" className=""/>*/}
               <img src={brillio1} alt='image1' style={introimg}/>
               </div>
         		<div className="col-lg-5 col-md-5 login-container">
         			<p className="text-center"><img src={login} alt="login" /></p>
         			<div class="text-center">
                 <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
               </div>
         		</div>
         	</div>
       }
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
