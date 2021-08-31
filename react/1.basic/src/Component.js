class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance // 组件实例
    this.pendingStates = [] // 数组存着setState传的对象
  }
  addState(partialState) {
    this.pendingStates.push(partialState)
    this.emitUpdate() // 触发更新
  }
  emitUpdate() {
    this.updateComponent()
  }
  updateComponent() {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState() {
    const { classInstance, pendingStates } = this
    let { state } = classInstance // 组件实例的state
    pendingStates.forEach(pendingState => {
      state = { ...state, ...pendingState }
    })
    pendingStates.length = 0
    return state
  }
}

function shouldUpdate(classInstance, nextState) { // 将要更新的数据
  classInstance.state = nextState
  classInstance.forceUpdate() // 强制更新
}

class Component {
  static isReactComponent = true // 类也是函数，后面为了判断类组件和函数组件，这里加一个静态属性
  constructor(props) {
    this.props = props
    this.state = {}
    this.Updater = new Updater(this) // 观察者模式。每个组件都有自己的更新器
  }
  setState(partialState) {
    this.Updater.addState(partialState)
  }
  forceUpdate() {
    console.log('forceUpdate')
  }
}


export default Component