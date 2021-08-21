'use strict';

// 解析x的类型(第一个then的返回结果)，来决定promise2走成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('类型出错'));
    }
    //兼容其他promise，返回的promise可以是对象和函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        var called_1 = false; // 表示没调过成功和失败。加锁，防止状态的改变
        try {
            var then = x.then; // 取x上的then方法
            if (typeof then === 'function') { // 只要x上有then函数，就认为x是promise
                var y = then.call(x, function (y) {
                    if (called_1)
                        return;
                    called_1 = true;
                    resolvePromise(promise2, y, resolve, reject); // y可能是一个promise，递归解析，直到是一个普通值为止
                }, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(r);
                });
            }
            else {
                resolve(x); // 普通对象{}
            }
        }
        catch (e) {
            if (called_1)
                return;
            called_1 = true;
            reject(e);
        }
    }
    else {
        resolve(x); // 普通值
    }
}
var Promise$1 = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = "PENDING" /* pending */; // 当前状态
        this.value = undefined; // 成功原因
        this.reason = undefined; // 失败原因
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        var resolve = function (value) {
            if (value instanceof Promise) { // 支持resolve promise，递归解析
                return value.then(resolve, reject);
            }
            if (_this.status === "PENDING" /* pending */) { // 只有等待态时才允许修改状态和值，否则不生效
                _this.status = "FULFILLED" /* fulfilled */;
                _this.value = value;
                _this.onResolvedCallback.forEach(function (fn) { return fn(); });
            }
        };
        var reject = function (reason) {
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "REJECTED" /* rejected */;
                _this.reason = reason;
                _this.onRejectedCallback.forEach(function (fn) { return fn(); });
            }
        };
        try { // 如果promise初始执行报错，也走reject状态
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (val) { return val; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err; };
        var promise2 = new Promise(function (resolve, reject) {
            if (_this.status == "FULFILLED" /* fulfilled */) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status == "REJECTED" /* rejected */) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason); // 这里x是普通值
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status == "PENDING" /* pending */) { //如果executor()有异步代码，执行then时还是等待态，就把成功回调和失败回调存起来
                _this.onResolvedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.onRejectedCallback.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason); // 这里x是普通值
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    };
    Promise.prototype.catch = function (errFn) {
        return this.then(null, errFn);
    };
    Promise.prototype.finally = function (callback) {
        return this.then(function (data) {
            return Promise.resolve(callback()).then(function () { return data; }); // finally回调返回普通值(成功)，是不会传递到下一个then的
        }, function (err) {
            // 前一个失败，finally成功，也会返回失败。finally失败会默认抛出错误，先用finally的失败
            return Promise.resolve(callback()).then(function () { throw err; });
        });
    };
    Promise.resolve = function (value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    };
    Promise.reject = function (reason) {
        return new Promise(function (resolve, reject) {
            reject(reason);
        });
    };
    Promise.all = function (values) {
        var isPromise = function (value) {
            if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
                if (typeof value.then === 'function') {
                    return true;
                }
            }
            return false;
        };
        return new Promise(function (resolve, reject) {
            var arr = [];
            var times = 0;
            var collect = function (value, key) {
                arr[key] = value;
                if (++times === values.length) {
                    resolve(arr);
                }
            };
            var _loop_1 = function (i) {
                var value = values[i];
                if (isPromise(value)) {
                    value.then(function (y) {
                        collect(y, i);
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    collect(value, i);
                }
            };
            for (var i = 0; i < values.length; i++) {
                _loop_1(i);
            }
        });
    };
    return Promise;
}());

module.exports = Promise$1;
