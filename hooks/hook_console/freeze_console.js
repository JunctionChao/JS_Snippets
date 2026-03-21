// 通过冻结console对象来禁止js重写console中的方法

(function() {
    'use strict';

    Object.freeze(console);
})();