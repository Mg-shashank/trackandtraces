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

const tstyle = {
    width:200,
    height:70,
    align:'justify',
    fontSize:25,
    fontFamily:' Zapf Chancery,',
    top:250,
    left:500
  };
  
   const introimg = {
     height:'100vh',
     width : '58vw',
    backgroundRepeat: 'no-repeat',
       backgroundSize: 'cover'
    }
    
 var email;
 let signout;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }

  responseGoogle = response => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
  };

  
 /* getRoleByEmailId(emailid) {
    return roles.filter(function(roles){return (roles.emailId == emailid)});
  }*/
 /* logout = () => {
    this.setState({isUserLoggedIn: false})
  };*/ 

   render() {    
        var name=this.state.userDetails.givenName;
        //var surname=this.state.userDetails.familyName;
        //var email=this.state.userDetails.email;        
        var loggedInUsersEmailId = email;
        localStorage.setItem('name', name); 
        localStorage.setItem('logged-in-user-email-id', loggedInUsersEmailId);
        
        if(email==="shashank30051997@gmail.com"&&"4mc15cs050@gmail.com"){            
            console.log(email);
            localStorage.setItem('role', 'service provider');            
        }  
        else if(email==="abcd1@gmail.com"){            
            console.log(email);
            localStorage.setItem('role','ditributor' ); 
           }
        else if(email=="abcd@gmail.com"){            
            console.log(email);
            localStorage.setItem('role','manufacturer' );             
            }
    
    return (
      <div className="App">      
        {!this.state.isUserLoggedIn && (
        <div className="container-fluid padding0">
    		<div className="col-lg-7 col-md-7 padding0 introimg">    			
          <img src={brillio1} alt='image1' style={introimg}/>
          </div>
    		<div className="col-lg-5 col-md-5 login-container">
    			<p className="text-center"><img src={login} alt="login" /></p>
    			<div class="text-center">
            <div class="col-md-5">
            <GoogleLogin            
            clientId="252338212303-eku5e56140e59uhvqeq36fl8neetega2.apps.googleusercontent.com" //TO BE CREATED
            render={renderProps => (              
              <span className="btn btn-info btn-lg glyphicon glyphicon-log-in" onClick={renderProps.onClick} disabled={renderProps.disabled}>&nbsp;
              Log
              into
              Track
              And
              Trace
              </span>             
               )}
            onSuccess={ this.responseGoogle}
            onFailure={this.responseGoogle}
            />
          </div>{/*****************/}
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
                <Redirect to="/dashboard"/>
              <button className="logout-button" onClick={renderProps.onClick}>Log Out </button>
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



/* const emailIds = ['shashank30051997@gmail.com', 'abcd1@gmail.com', 'abcd@gmail.com']
  const roles = [{
                    "role": "serviceProvider",
                    "emailId":"shashank30051997@gmail.com"
                },
                {
                    "role": "distributor",
                    "emailId":"4mc15cs050@gmail.com"
                },
                {
                    "role": "manuacturer",
                    "emailId":"abcd3@gmail.com"
                }];*/
//var roleData = this.getRoleByEmailId(loggedInUsersEmailId);
//console.log(roleData[0].role);      
//console.log(this.state.isUserLoggedIn)
//console.log(this.state.userDetails.familyName)
//var roleData = this.getRoleByEmailId(loggedInUsersEmailId);
        //console.log(roleData[0].role);
        //console.log(roleData)
        //console.log(this.state.userDetails.email)