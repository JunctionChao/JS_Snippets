// 重写native函数，保留原始toString特征

(function () {
    "use strict";
    
    // 1. 备份原始的 toString 方法
    const originalToString = Function.prototype.toString;
    
    // 2. 创建一个唯一标识符，用于在目标函数上打标记
    const NATIVE_SYMBOL = Symbol('native');
    
    // 3. 自定义新的 toString 逻辑
    const newToString = function toString() {
        // 如果当前调用的函数带有我们的特殊标记，则返回伪造的原生字符串
        if (typeof this === 'function' && this[NATIVE_SYMBOL]) {
            return this[NATIVE_SYMBOL];
        }
        if (this === Function.prototype.toString) {
            return 'function toString() { [native code] }';
        }
        // 否则，使用原始逻辑
        return originalToString.call(this);
    };
    
    // 4. 覆盖原型链上的 toString 方法
    Object.defineProperty(Function.prototype, 'toString', {
        value: newToString,
        writable: true,
        configurable: true,
        enumerable: false
    });
    
    
    // 6. 伪装工具函数，或者暴露给全局 globalThis.setNative
    const setNative = function (func, funcName) {
        const name = funcName || func.name || '';
        Object.defineProperty(func, NATIVE_SYMBOL, {
            value: `function ${name}() { [native code] }`,
            writable: true,
            configurable: true,
            enumerable: false
        });
    };

    close = function(){}; setNative(close, 'close');
    clear = function(){}; setNative(clear, 'clear');
    console.clear = function(){}; setNative(console.clear, 'clear');
    console.table = function(){}; setNative(console.table, 'table');

})();


// FOR TEST
// Function.toString  === Function.prototype.toString
// Function.toString() === ''function Function() { [native code] }'

