/* 保持原生状态
    Function.prototype.constructor === Function
    Function.prototype.constructor.prototype === Function.prototype

    Math.random.constructor === Function
    Function.prototype.constructor === Function
*/


(function() {
    let origFunction = Function;
    let orig_toString = Function.prototype.toString;

    Function.prototype.toString = function() {
        if (this === Function)
            return 'function Function() { [native code] }';
        else if (this === Function.prototype.toString)
            return 'function toString() { [native code] }';

        return orig_toString.apply(this, arguments);
    };

    // Function 显式调用
    Function = function() {                
        let reg = /debugger/;
        for (let i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "string") {
                // 替换掉所有debugger, 不干扰其他逻辑
                let dbg_array = arguments[i].match(/debugger/g);
                if (dbg_array != null) {
                    dbg_len = dbg_array.length;
                    while (dbg_len) {
                        arguments[i] = arguments[i].replace(reg, "");
                        dbg_len--;
                    }
                }
            }
        }
        return origFunction(...arguments);
    }
    Function.prototype = origFunction.prototype;


    // Math.random.constructor('s', 'i', Math.random() + 0 + ';' + " debugger;return s['charCodeAt'](0);")('T', 0)
    // 虽然 Math.random.constructor 是 Function，但这里实际会调用 Function.prototype.constructor
    // Function.prototype.constructor = function() {
    //     let reg = /debugger/;
    //     for (let i = 0; i < arguments.length; i++) {
    //         if (typeof arguments[i] == "string") {
    //             // 替换掉所有debugger, 不干扰其他逻辑
    //             let dbg_array = arguments[i].match(/debugger/g);
    //             if (dbg_array != null) {
    //                 dbg_len = dbg_array.length;
    //                 while (dbg_len) {
    //                     arguments[i] = arguments[i].replace(reg, "");
    //                     dbg_len--;
    //                 }
    //             }
    //         }
    //     }
    //     return origFunction(...arguments);
    // }


    /* 这里指定 Function.prototype.constructor 为 Function，
        使得 Math.random.constructor 调用的Function.prototype.constructor 指向 Function，
        同时也保持 Function.prototype.constructor.toString的原生状态
    */
    Function.prototype.constructor = Function;  // Function.prototype.constructor.toString()
    Function.prototype.constructor.prototype = Function.prototype;
    

})();



// for test

// Function.prototype.toString.toString()
// Function.prototype.constructor.toString()
// Function.prototype.constructor.prototype.toString()

