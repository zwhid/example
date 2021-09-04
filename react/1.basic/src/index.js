import React from "./react";
import ReactDom from "./react-dom";


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.aRef = React.createRef() // { current: null }
    this.bRef = React.createRef() // { current: null }
    this.resRef = React.createRef() // { current: null }
  }
  handleClick = () => {
    let a = this.aRef.current.value
    let b = this.bRef.current.value
    this.resRef.current.value = a + b
  }

  render() {
    return (
      <div>
        <input ref={this.aRef} /> + <input ref={this.bRef} />
        <button onClick={() => this.handleClick()}>=</button>
        <input ref={this.resRef} />
      </div>
    )
  }
}

ReactDom.render(<Counter />, document.getElementById('root'))