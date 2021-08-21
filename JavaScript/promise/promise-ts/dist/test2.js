
const Promise = require('./bundle');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok1')
    reject('err1')
  }, 50)
})


p.finally(() => {
  console.log('finally')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('ok2')
      reject('err2')
    }, 500)
  })
}).then(data => {
  console.log('success', data)
}, err => {
  console.log('faild', err)
})

// finally
// faild err2