console.log('------my-----')

const ENUM = {
  PENDING: 'PENDING', // 等待
  FULFILLED: 'FULFILLED', // 成功
  REJECTED: 'REJECTED' // 失败
}

const resolvePromise = (x, promise2, resolve, reject) => {
  if (x === promise2) { // 如果直接返回了上一个promise，则类型错误
    throw new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]')
  }
  
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') { // 返回值x为对象或函数

    let called;
    try {
      const then = x.then; // 取出then方法
      if (typeof then === 'function') { // 如果有then为函数则返回值x为promise
        then.call(x, y => { // 根据返回值promise的状态，决定promise2的状态
          if (called) return;
          called = true;
          // 有可能y值还是一个promise，递归解析y值是普通值为止
          resolvePromise(y, promise2, resolve, reject)
        }, r => {
          if (called) return;
          called = true;
          reject(r); // 如果走onRejected则直接调reject结束
        })
      } else { // 普通对象
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }

  } else { // 普通值
    resolve(x)
  }
}

class Promise {
  constructor(executor){
    this.status = ENUM.PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      // 如果状态为等待才可以更改
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn()) // 发布
      }
    }

    const reject = (reason) => {
      if (this.status === ENUM.PENDING) {
        this.status = ENUM.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())  // 发布
      }
    }

    try {
      executor(resolve,reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected){
    const promise2 = new Promise((resolve, reject) => {

      if (this.status === ENUM.FULFILLED) {
        // todo...
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.REJECTED) {
        // todo...
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === ENUM.PENDING) { // 订阅
        this.onResolvedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
    
  }
}

module.exports = Promise