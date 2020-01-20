import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {Button, MenuItem, Menu} from "@material-ui/core";
// import { Menu, Dropdown, Icon } from 'antd';
import logo from "./images/brillio-logo.png";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import usericon from "./images/user-icon.svg";
import dots from "./images/dots.svg";
import router from "./images/router.png";
import router2 from "./images/router2.jpg";
import router3 from "./images/router3.jpg"
import "./dashboard.scss";
var https = require("https");
var image = localStorage.getItem('profile-picture');
var ordcounts = localStorage.getItem('ordcount');
var ordcounts1 = localStorage.getItem('ordcount1');
var ordcounts2 = localStorage.getItem('ordcount2');
var recentact= localStorage.getItem('recentact');
var image=localStorage.getItem('profile-picture');
var name=localStorage.getItem('name');

class Landingpage extends React.Component {
constructor(props){
super(props);
this.toggle= this.toggle.bind(this);
	
this.state = {
dropdownOpen:false,
anchorEl:null
}; 
}

	componentDidMount() {
    https.get("https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchordercount",
      function (response) {
        if (response.statusCode !== 200) {
          console.log("Error while getting the data.");
        }
        response.on('data', function (data) {

          console.log(JSON.parse(data));
          ordcounts = localStorage.setItem('ordcount', data);
        });
      })

    https.get("https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountaccept",
      function (response) {
        if (response.statusCode !== 200) {
          console.log("Error while getting the data.");
        }
        response.on('data', function (data) {

          console.log(JSON.parse(data));
           ordcounts1 = localStorage.setItem('ordcount1', data);
        }
        )
      })

    https.get("https://pf1g1lmjel.execute-api.us-east-1.amazonaws.com/dev/fetchcountrec",
      function (response) {
        if (response.statusCode !== 200) {
          console.log("Error while getting the data");
        }
        response.on('data', function (data) {
          //  console.log(data2);
          console.log(JSON.parse(data));
           ordcounts2 = localStorage.setItem('ordcount2', data);
        }
        )
      })
}
	
toggle=()=>{
this.setState((prevState)=>{
return{dropdownOpen:!prevState.dropdownOpen};
});
			} 
  handleClick = e => {
    this.setState({anchorEl:e.target.value})
  };
  eve1 =()=> {
    window.location.reload(false)
    var r="Asus ROG Rapture GT-AC5300";
    localStorage.setItem('router',r);
  };
  eve2 =()=> {
    window.location.reload(false)
    var r="D-Link AC2600 (DIR-2680)";
    localStorage.setItem('router',r);
  };
  eve3 =()=> {
    window.location.reload(false)
    var r="Asus RT-AC66U B1";
    localStorage.setItem('router',r);
  };
 handleClose = () => {
  this.setState({anchorEl:null});
  };
 
  render(){
      return( 
        <div className="wrapper">
         <header>
              <span className="logo"><img className="logoImage" src={logo} alt="Brillio logo" width="125px"/></span>
            
              <div className="userBlock collapse navbar-collapse">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
			<span>
		Welcome &nbsp;
			<img src={image} className ="img-circle" alt={usericon} width="40" height="40"/>		
			</span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Options</DropdownItem>
        <DropdownItem><Link to="/help"><button type="style" className="btn btn-block btn-primary">Help</button></Link></DropdownItem>
        {/*<DropdownItem divider />*/}
        <DropdownItem><GoogleLogout render={renderProps => (
				<Link to="/login"><button type="style" className="btn btn-block btn-primary" onClick={renderProps.onClick}>Logout</button></Link>)}
        /></DropdownItem>
        </DropdownMenu>
    </Dropdown>
          		</div>               
              </header>
          <section>    
            <div className="container">

            <div className="col-lg-9 col-md-9 padding0">
  <div className="col-lg-9 col-md-9">
    <div className="col-lg-12 col-md-12">
      <h3 className="section-header">Track Orders</h3>
    </div>
    <div className="col-lg-12 col-md-12 padding0">
      <div className="col-lg-4 col-md-4">
        <div className="track-order">
          <h3>Order Received</h3>
          <p className="order-number"><b>{ordcounts2}</b></p>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="track-order">
          <h3>Order Accepted</h3>
          <p className="order-number"><b>{ordcounts1}</b></p>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="track-order">
          <h3>Order Placed</h3>
          <p className="order-number"><b><strong>{ordcounts}</strong></b></p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12 col-lg-12">
        <span className="section-header">Recommended Orders </span>
        <Link to="/createorder"><div className="&nbsp;&nbsp;&nbsp;&nbsp;btn btn-prim pull-right">&nbsp;&nbsp;&nbsp;&nbsp;+ Create New Order</div></Link>
      </div>
    </div>
  </div>
</div>           

                <div className="col-lg-3 col-mt-3  float-right  recent-activities">
              <div className="col-lg-12 col-mt-12 col-mt-5 padding0">
                <h3 className="section-header">Recent Activities</h3>
                
                <div className="activity-card">
                  <p className="act-head">Order Accepted</p>
                  <p className="act-content">Order accepted for for Netgear Nightwalk X10 AD7200 from Hirthe Group Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
               
                <div className="activity-card">
                  <p className="act-head">Order Accepted</p>
                  <p className="act-content">Order received for D-Link DWR-2010 5G Router from Schuster Ltd Enterprise.</p>
                  <p className="text-right"><Link to="/traceorder"><div className="view-more">View more</div></Link></p>
                </div>
              </div>
            </div>
             
                  <div className="col-lg-9 col-md-9 padding0">
                    <div className="col-lg-4 col-md-4">
                      <div className="device-card " onClick={this.eve1}>
                        <div className="dropdown dots">
                          
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                              <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={Boolean(this.state.anchorEl)}
                             // open={this.state.anchorEl}
                              onClose={this.handleClose}
                            >
                              <MenuItem onClick={this.handleClose}>Device Model: AC5300</MenuItem>
                              <MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
                              <MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
                            </Menu>
                         
                          </div>
                        <img src={router} width="100" height="100" alt="s1" className="s1" />
                        <h3 className="title">Asus ROG Rapture GT-AC5300</h3>
                        <p className="sub-title">Router</p>
                        <p className="card-label"><label>End of Warranty:</label> March</p>
                        <p className="attribute">MAC Address: D4:05:15:35:4A:11</p>
                        <p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
                        <p className="attribute">IPv6 Compatible: yes</p>
                        <p className="attribute">Data Transfer Rate: 1200 Mbps</p>
                        <p className="attribute">Frequency Band : Dual Band</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="device-card " onClick={this.eve2}>
                        <div className="dropdown dots">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                            //  open={Boolean(anchorEl)}
                              onClose={this.handleClose}
                            >
                              <MenuItem onClick={this.handleClose}>Device Model: AC2600</MenuItem>
                              <MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
                              <MenuItem onClick={this.shandleClose}>Device Vendor: Abbot</MenuItem>
                            </Menu>                             
                        </div>
                        <img src={router2} alt="s1" width="100" height="100" className="s1" />
                        <h3 className="title">D-Link AC2600 (DIR-2680)</h3>
                        <p className="sub-title">Router</p>
                        <p className="card-label"><label>End of Warranty:</label> June</p>
                        <p className="attribute">MAC Address: D2:65:75:87:A7:05</p>
                        <p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
                        <p className="attribute">IPv6 Compatible: yes</p>
                        <p className="attribute">Data Transfer Rate: 3600 Mbps</p>
                        <p className="attribute">Frequency Band : TriBand</p>
                      </div>
                    </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="device-card" onClick={this.eve3}>
                      <div className="dropdown dots">
                          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                          <b>...</b>
                            </Button>
                            <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                           //   open={Boolean(anchorEl)}
                              onClose={this.handleClose}
                            >
                              <MenuItem onClick={this.handleClose}>Device Model: AC66U</MenuItem>
                              <MenuItem onClick={this.handleClose}>Device Type: Router</MenuItem>
                              <MenuItem onClick={this.handleClose}>Device Vendor: Asus</MenuItem>
                            </Menu>
                        </div>
                      <img src={router3} width="100" height="100" alt="s1" className="s1" />
                      <h3 className="title">Asus RT-AC66U B1</h3>
                      <p className="sub-title">Router</p>
                      <p className="card-label"><label>End of Warranty:</label> June</p>
                      <p className="attribute">MAC Address: A4:02:33:93:7A:83</p>
                      <p className="card-label"><label>You can include below parameters to make your device 5G- Ready:</label></p>
                       <p className="attribute">IPv6 Compatible: yes</p>
                      <p className="attribute">Data Transfer Rate: 4600 Mbps</p>
                      <p className="attribute">Frequency Band : Dual Band</p>
                    </div>
                  </div>
                </div>
              
            

            </div>
          </section>  
        </div>  
         
);}
      }
export default (Landingpage);
                    
