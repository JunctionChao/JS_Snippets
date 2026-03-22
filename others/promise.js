// promise基本用法
const success = true;
const p1 = new Promise((resolve, reject) => {
    console.log('enter promise constructor');

    setTimeout(() => {
        console.log('setTimeout after 5s');
        resolve('success');
    }, 5000);

    // if (success) {         // 成功与否由用户控制
    //   resolve('success');  // 状态变为 fulfilled
    // } else {
    //   reject('failed');    // 状态变为 rejected
    // }
});

p1.then((result) => {
    console.log(result); // then接收正确结果
}).catch((error) => {
    console.log(error);  // catch接收失败结果
});

console.log('test promise');

/* 运行结果
    enter promise constructor
    test promise
    setTimeout after 5s
    success
*/



