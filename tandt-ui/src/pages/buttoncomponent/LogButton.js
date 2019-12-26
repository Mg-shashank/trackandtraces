import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class LogButton extends React.Component{
  render(){
    return(
      <div>
      <Link to="/dashboard"> <button className="btn btn-large btn-primary"> Login to Track And Trace</button> </Link>
      </div>
    )
  }
}
