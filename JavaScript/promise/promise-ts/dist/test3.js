
const Promise = require('./bundle');

Promise.prototype.then
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 1000)
  })
).then(data => {
  console.log('success', data);
})
// success ok

Promise.reject(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 1000)
  })
).then(null, err => {
  console.log('faild2', err);
})
// faild2 err