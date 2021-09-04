import React from "./react";
import ReactDom from "./react-dom";

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }
  getFocus = () => {
    this.inputRef.current.focus()
  }
  render() {
    return <input ref={this.inputRef} />
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef() // { current: null }
  }
  getFocus = () => {
    this.inputRef.current.getFocus() // { current: TextInput }
  }

  render() {
    return (
      <div>
        <TextInput ref={this.inputRef} />
        <button onClick={this.getFocus}>获取Input焦点</button>
      </div>
    )
  }
}

ReactDom.render(<Form />, document.getElementById('root'))