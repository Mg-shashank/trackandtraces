import React from 'react';
var a = localStorage.getItem('orderdetails')
console.log(a)
var b = JSON.parse(a)
console.log(b)
var c = JSON.parse(b.OrderDetails.S)
console.log(c)
var f = c.Distributor

function Distributor() {
      return <h1>{f}</h1>;
  }
  export default Distributor;