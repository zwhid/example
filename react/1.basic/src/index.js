import React from "./react";
import ReactDom from "./react-dom";

// let element1 = <h1 className="title" style={{color:'red'}}>hello<span>world</span></h1>

// let element2 = React.createElement("h1", {
//   className: "title",
//   style: {
//     color: 'red'
//   }
// }, "hello", React.createElement("span", null, "world"));

// console.log(element2)
// console.log(JSON.stringify(element2, null, 2))

// function FunctionComponent(props) {
//   return <h1>{props.title}</h1>
// }

// let element3 = <FunctionComponent title={'标题'} />
// babel => let element3 = React.createElement(FunctionComponent, { title: '标题' })


class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 相当于执行了 this.props = props
  }
  render() {
    return <h1>{this.props.title}</h1>
  }
}

let element4 = <ClassComponent title={'标题'} />
// babel => let element3 = React.createElement(ClassComponent, { title: '标题' })


ReactDom.render(element4, document.getElementById('root'))