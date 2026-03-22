// fetch("https://jsonplaceholder.typicode.com/posts/1")
//     .then((response) => response.json())  // 这里response.json()返回的也是一个promise
//     .then((json) => console.log(json));


// async await 语法糖格式
async function fetchJson() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const json = await response.json();
    return json;
}

const promise = fetchJson()
console.log(promise)
promise.then((json) => console.log(json))
