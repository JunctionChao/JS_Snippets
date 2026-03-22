
// 回调地狱
setTimeout(() => {
    console.log("等待三秒");

    setTimeout(() => {
        console.log("再等待三秒");

        setTimeout(() => {
            console.log("又再等待三秒");
        }, 3000);
    }, 3000);
}, 3000);




