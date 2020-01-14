import React from 'react';
var a = localStorage.getItem('orderdetails')
var b = JSON.parse(a)
console.log(b)
var c = JSON.parse(b.OrderDetails.S)
console.log(c)
var g = c.Quantity

function Quantity() {
    return <h1>{g}</h1>;
  }
  export default Quantity;