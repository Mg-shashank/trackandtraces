import React from 'react';
var a = localStorage.getItem('orderdetails')
var b = JSON.parse(a)
console.log(b)
var c = JSON.parse(b.OrderDetails.S)
console.log(c)
var h = c.Upgrade

function Upgrade() {
     return <h1>{h}</h1>;
  }
  export default Upgrade;