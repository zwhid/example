/*

输入：
let element2 = 
{
  "type": "h1",
  "ref": "undefined",
  "key": "undefined",
  "props": {
    "className": "title",
    "style": {
      "color": "red"
    },
    "children": [
      {
        "type": Symbol(REACT_TEXT),
        "props": {
          "content": "hello"
        }
      },
      {
        "type": "span",
        "ref": "undefined",
        "key": "undefined",
        "props": {
          "children": {
            "type": Symbol(REACT_TEXT)
            "props": {
              "content": "world"
            }
          }
        }
      }
    ]
  }
}

输出：
浏览器可识别的标注dom格式

*/

import { REACT_TEXT } from "./constants"

function render(vdom, container) {
  mount(vdom, container)
}

function mount(vdom, parentDOM) {
  let newDOM = createDOM(vdom)
  if (newDOM) {
    parentDOM.appendChild(newDOM)
  }
}

function createDOM(vdom) {
  if (!vdom) return null
  let { type, props } = vdom
  let dom
  if (type === REACT_TEXT) { // 元素是一个文本
    dom = document.createTextNode(props.content)
  } else {
    dom = document.createElement(type) // div p span
  }

  if (props) { // 处理属性
    updateProps(dom, {}, props)
    if (props.children) {
      let children = props.children
      if (typeof children === 'object' && children.type) { //这是一个react元素
        mount(children, dom)
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom) // 处理子元素
      }
    }
  }

  return dom
}

function reconcileChildren(childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => mount(childVdom, parentDOM))
}

function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === 'children') { // children有另外的处理
      continue
    } else if (key === 'style') { // style行内样式的处理
      let styleObj = newProps[key]
      for (const arrt in styleObj) {
        dom.style[arrt] = styleObj[arrt]
      }
    } else {
      dom[key] = newProps[key] // className id title
    }
  }
}

const ReactDom = {
  render
}

export default ReactDom