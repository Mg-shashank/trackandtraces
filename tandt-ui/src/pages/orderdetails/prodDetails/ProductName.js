import React from 'react';
var a = localStorage.getItem('orderdetails')
var b = JSON.parse(a)
console.log(b)
var c = JSON.parse(b.OrderDetails.S)
console.log(c)
var d = c.Product

export default class ProductName extends React.Component {
    render(){
        return <h1>{d}</h1>;
    }        
  }
