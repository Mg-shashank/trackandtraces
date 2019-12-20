import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class LogButton extends React.Component{
  render(){
    return(
      <div>
      <Link to="/dashboard"> <button className="btn btn-small btn-primary"> Log In </button> </Link>
      </div>
    )
  }
}
