import React from 'react';
import { withRouter,Link } from "react-router-dom";
import ttConfig from '../../config.js'
var role = localStorage.getItem('role')
class TrackDetails extends React.Component{
    constructor(props){	
		super(props);	
		this.state = {
		}; 
	}
    render(){
        var val,val1,val2,val4,val5,val6,val7,val8,val9;
         if(localStorage.getItem('role')===ttConfig.roleassign.serv.role){
            val = 'node finished'
            val1= 'node'
            val2= 'node'
        }
        else if(localStorage.getItem('role')===ttConfig.roleassign.manu.role){   
            val4 = 'node progressing'
            val5 = 'node'
            val6 = 'node finished'
        }
        else if(localStorage.getItem('role')===ttConfig.roleassign.dist.role){
            val7 = 'node finished'
            val8 = 'node'
            val9 = 'node progressing'
        }
        return(<React.Fragment>
            <div class="col-lg-3 col-md-3 activity-log">
				<h2 class="section-header">Track Details</h2>
				<div class="timeline-wrapper">
					<div class='node finished'>
					<h6>Order Initiated</h6>
				<p class="sub-title">{this.props.create}</p>
				  </div>
				  <div class={val1||val4||val7} >					
					<h6>Order Accepted</h6>					
				  </div>
				  <div class={val2||val5||val7}>
					<h6>Order Shipped</h6>		
				  </div>
				  <div class="node">
					<h6>Order Delivered</h6>					
				  </div>
				</div>
			</div>
        </React.Fragment>)
    }
}
export default TrackDetails;