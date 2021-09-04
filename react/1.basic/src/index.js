import React from "./react";
import ReactDom from "./react-dom";

function TextInput(props, forwardRef) { // 父组件传进来的 {current: null}
  return <input ref={forwardRef} /> // {current: dom}
}

const ForwardedTextInput = React.forWardRef(TextInput)

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef() // { current: null }
  }
  getFocus = () => {
    this.inputRef.current.focus() // { current: TextInput }
  }

  render() {
    return (
      <div>
        {/* { $$typeof: REACT_FORWARD, render: TextInput, ref: { current: null }} */}
        <ForwardedTextInput ref={this.inputRef} />
        <button onClick={this.getFocus}>获取Input焦点</button>
      </div>
    )
  }
}

ReactDom.render(<Form />, document.getElementById('root'))