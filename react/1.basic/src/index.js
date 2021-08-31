import React from "./react";
import ReactDom from "./react-dom";


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 1,
      name: 'zwh'
    }
  }
  handleClick = (event) => {
    this.setState({ number: this.state.number + 1 })
    console.log(this.state)
    this.setState({ number: this.state.number + 1 })
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

ReactDom.render(<Counter />, document.getElementById('root'))