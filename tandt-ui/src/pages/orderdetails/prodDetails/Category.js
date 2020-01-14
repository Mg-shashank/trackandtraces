import React from 'react';
var a = localStorage.getItem('orderdetails')
var b = JSON.parse(a)
console.log(b)
var c = JSON.parse(b.OrderDetails.S)
console.log(c)
var e = c.Category

function Category() {
      return <h1>{e}</h1>;
  }
  export default Category;
