import React from "./react";
import ReactDom from "./react-dom";

// let element1 = <h1 className="title" style={{color:'red'}}>hello<span>world</span></h1>

let element2 = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello", React.createElement("span", null, "world"));

// console.log(element2)
// console.log(JSON.stringify(element2, null, 2))
// debugger

ReactDom.render(element2, document.getElementById('root'));