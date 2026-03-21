// 网站为了防止用户修改代码，会通过toString检测是否修改了代码
// 我们可以记录下网站的检测

(function () {
    'use strict';
    globalThis.funcStrRecord = {}
    let orig_toString = Function.prototype.toString;

    Function.prototype.toString = function () {
        let str = orig_toString.apply(this, arguments);

        if (funcStrRecord[this.name]) {
            if (typeof funcStrRecord[this.name] === 'string') {
                funcStrRecord[this.name] = [funcStrRecord[this.name], str];
            }
            else {
                funcStrRecord[this.name].push(str);
            }
            return str;
        }
        
        funcStrRecord[this.name] = str;
        return str;
    }
})();


// 网页运行完毕，控制台查看funcStrRecord