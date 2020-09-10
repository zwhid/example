const fs = require("fs").promises;

function* read() {
  try {
    const path = yield fs.readFile("./path1.txt", "utf8");
    const name = yield fs.readFile(path, "utf8");
    return name;
  } catch (error) {
    console.log("===\n", error);
  }
}

const it = read();
const { value, done } = it.next();
value.then((data) => {
  console.log("data1", data);

  const { value, done } = it.next(data);
  value.then((data) => {
    console.log("data2", data);

    const { value, done } = it.next(data);
    console.log("data3", value, done);
  });
}).catch((err) => {
  it.throw(err); //迭代器手动抛出错误，可以被try catch捕获到
});