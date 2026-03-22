const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('setTimeout after 2s');
        resolve('success1');
    }, 2000);
});

p2.then((r1) => {
    console.log(r1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout after 3s');
            resolve('success2');
        }, 3000);
    });
}).then((r2) => {   // 上一层成功结果返回的还是一个promise，因此可以链式调用
    console.log(r2);
})


// fetch("https://jsonplaceholder.typicode.com/posts/1")
//     .then((response) => response.json())  // 这里response.json()返回的也是一个promise
//     .then((json) => console.log(json));


