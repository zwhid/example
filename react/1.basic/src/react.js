/*

输入：
let jsx_babel = 
React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "hello", React.createElement("span", null, "world"));


输出：
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

*/

import { wrapToVdom } from "./utils"
function createElement(type, config, children) {
  let ref
  let key
  if (config) {
    ref = config.ref
    key = config.key
    delete config.ref
    delete config.key
    delete config.__source
    delete config.__self
  }
  let props = { ...config }
  if (arguments.length > 3) { // 可能有多个子元素
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom) // 如果有多个子元素，外面包一层数组
  } else {
    props.children = wrapToVdom(children) // children可能是react元素对象，也可能是字符串、数字、null
  }
  return { type, ref, key, props }
}

const React = {
  createElement
}

export default React