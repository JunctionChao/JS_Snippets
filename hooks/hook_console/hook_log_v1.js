
// 核心逻辑：双重保障检测 console.log 是否被篡改
(function () {
    'use strict';

    let waiting_time = 3;        // 等待时间，单位为秒
    let temp_log = console.log;
    let flag = 0;

    function judge_overwrite() {
        if (console.log.toString() !== 'function log() { [native code] }') {
            console.log = temp_log;
        }
    }

    // 保障1：load 事件触发时立即检查
    window.addEventListener("load", () => {
        judge_overwrite();
        flag = 1;
    });

    // 保障2：如果3秒后 load 还没触发（页面加载慢），也执行检查
    setTimeout(() => {
        if (flag === 0) {
            judge_overwrite();
        }
    }, waiting_time * 1000);
})();