(function () {
    'use strict';

    let orig_eval = eval;
    let orig_toString = Function.prototype.toString;

    Function.prototype.toString = function () {
        if (this === eval) {
            return 'function eval() { [native code] }';
        }
        else if (this === Function.prototype.toString) {
            return 'function toString() { [native code] }';
        }
        return orig_toString.apply(this, arguments);
    }

    window.eval = function () {
        if (typeof arguments[0] == "string") {
            var dbg_array = arguments[0].match(/debugger/g);
            if (dbg_array != null) {
                dbg_len = dbg_array.length;
                var reg = /debugger/;
                while (dbg_len) {
                    arguments[0] = arguments[0].replace(reg, "");
                    dbg_len--;
                }
            }
        }
        return orig_eval(...arguments);
    }
})();