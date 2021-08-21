const Promise = require('./bundle');


const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1秒')
  }, 1000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2秒')
  }, 2000)
})

Promise.all([p1, p2, 4, 5]).then(data => {
  console.log(data);
})
