import React from "react";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import './login.scss';
import LandingPage from '../dashboard/dashboard';
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
import orderdetails from '../orderdetails/orderdetails';
import Unknown from './Unknown';
import ttConfig from '../../config.js'
import OrderID from '../orderdetails/OrderDetailsUI'
// import config from 'react-global-configuration';
var role, name;
var email;
let signout;

const tstyle = {
    width:200,
    height:70,
    align:'justify',
    fontSize:25,
    fontFamily:' Zapf Chancery,',
    top:250,
    left:500
  };
  
  const but ={
    align:'center',
    left:1000
  }
   const introimg = {
     height:'100vh',
     width : '55vw',
     backgroundRepeat: 'no-repeat',
     backgroundSize: 'cover'
    }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }
  
  responseGoogle = response => {
      console.log(this.state.isUserLoggedIn)
      this.setState({ userDetails: response.profileObj});
      console.log(this.state.isUserLoggedIn)
    if(this.state.userDetails != undefined){
      name  = this.state.userDetails.givenName
      email = this.state.userDetails.email
      this.setState({ isUserLoggedIn:true})
      console.log(this.state.isUserLoggedIn)
    }
  };

  redirectToOptions(){
    console.log('REDIRECT TO OPTIONS')
    if(this.state.isUserLoggedIn){   
      if(role === 'serviceprovider'){ 
        return <Redirect to="/dashboard" />   
      }
      else if((role === 'distributor')||(role === 'manufacturer')){ 
        var refreshs = localStorage.setItem('refresh',null);
        refreshs = localStorage.getItem('refresh');
        console.log(refreshs);
        if (refreshs === null){
          console.log("REFRESH 1")
          window.location.reload(false);
          localStorage.setItem('refresh', "1");
        }
          return <Redirect to="/orderdetails" />  
       }
    }
  }

  render() { 
       ttConfig.roleassign.assign.name = name  
        
        if( email === ttConfig.roleassign.serv.email ){ 
          // role = config.get()  
           role = ttConfig.roleassign.serv.role;
           name = ttConfig.roleassign.serv.name; 
           email = ttConfig.roleassign.serv.email;
           console.log(name)
           console.log(role)
           localStorage.setItem('role',role)
           localStorage.setItem('name',name)
           }  
        else if( email === ttConfig.roleassign.dist.email ){ 
            role = ttConfig.roleassign.dist.role;
            name = ttConfig.roleassign.dist.name;  
            email = ttConfig.roleassign.dist.email;
            console.log(name)  
            console.log(role)
            localStorage.setItem('role',role)
            localStorage.setItem('name',name)
           }
        else if( email === ttConfig.roleassign.manu.email ){  
            role = ttConfig.roleassign.manu.role;
            name = ttConfig.roleassign.manu.name;  
            email = ttConfig.roleassign.manu.email;
            console.log(name) 
            console.log(role)     
            localStorage.setItem('role',role)
            localStorage.setItem('name',name)
           }
               
    return (  
        <div className="App">      
        {!this.state.isUserLoggedIn && (
        <div className="container-fluid padding0">
    		<div className="col-lg-7 col-md-7 padding0 introimg">    			
          <img src={brillio1} alt='image1' style={introimg}/>
        </div>
    		<div className="col-lg-5 login-container">
        <div className="text-center" style={{fontSize:'30px',fontFamily:'Arial'}}> WELCOME TO TRACK AND TRACE</div>
    			<p className="text-center"><img src={login} alt="login" /></p>
    			<div className="text-center">
            <div className="col-md-5">
            <GoogleLogin            
            clientId="252338212303-eku5e56140e59uhvqeq36fl8neetega2.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (       
              <div className="text-center" style={{width:"260px"}}>       
              <button 
              type="button" 
              className="btn btn-primary btn-lg btn-block" 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled}> 
              Login 
              </button>  
              </div>
            )}                           
              onSuccess={ this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
          </div>
    	</div>
    	</div>          
        )}
        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">            
             <GoogleLogout 
              render={renderProps => ( 
                 <div>
                {this.redirectToOptions()}
                </div>)}
              onLogoutSuccess={this.logout}/>         
            </div>           
            </div>                
        )}
      </div>    
    );
  }
}


export default App;
