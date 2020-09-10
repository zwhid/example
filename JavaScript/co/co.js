const fs = require("fs").promises;

function* read() {
  const path = yield fs.readFile("./path.txt", "utf8");
  console.log("path", path);
  const name = yield fs.readFile(path, "utf8");
  console.log("name", name);
  return name;
}

// const it = read();
// const { value, done } = it.next();
// value.then((data) => {
//   console.log("data1", data);

//   const { value, done } = it.next(data);
//   value.then((data) => {
//     console.log("data2", data);

//     const { value, done } = it.next(data);
//     console.log("data3", value, done);
//   });
// });
const co = require('co');

co(read()).then(data=>{
  console.log('data', data)
});