
(function () {
    'use strict';

    let orig_toString = Function.prototype.toString;

    Function.prototype.toString = function () {
        if (this === Function.prototype.toString) {
            return 'function toString() { [native code] }';
        } else if (this === xxx) { // 将xxx修改为要hook的方法
            return ''; // 在控制台执行xxx.toString()，将输出的内容替换掉空字符串
        }
        return orig_toString.apply(this, arguments);
    }
})();