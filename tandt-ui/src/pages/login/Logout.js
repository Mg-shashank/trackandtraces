import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "./images/brillio-logo.png";
import usericon from "./images/user-icon.svg";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { withRouter, Link, Route } from "react-router-dom";
export default class Logout extends React.Component{
    constructor(props) {    
		super(props);
		this.state = {
            dropdownOpen:false,
            };
            this.toggle= this.toggle.bind(this);
        }
        toggle=()=>{
            this.setState((prevState)=>{
            return{dropdownOpen:!prevState.dropdownOpen};
            });
            } 
    render(){
        return(
            <React.Fragment>
            <header>
      		<span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/>
      		</span>				
      		<div className="userBlock collapse navbar-collapse">	
	  		<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      		<DropdownToggle caret>
				<span>
				Welcome &nbsp;
				<img src={localStorage.getItem('profile-picture')} className ="img-circle" alt={usericon} width="40" height="40"/>		
				</span>
      		</DropdownToggle>
      			<DropdownMenu>
        		<DropdownItem header>Options</DropdownItem>
        		<DropdownItem><Link to="/help">
				<button type="style" className="btn btn-block btn-primary">Help</button></Link></DropdownItem>
        		<DropdownItem><GoogleLogout render={renderProps => (
			<Link to="/login">
			<button type="style"
			className="btn btn-block btn-primary"
			onClick={()=>{renderProps.onClick(); localStorage.removeItem('role')}}>Logout</button></Link>)}/>
			</DropdownItem>
       		</DropdownMenu>
       		</Dropdown>
			</div>				
        	</header>
            </React.Fragment>
        )
    }
}