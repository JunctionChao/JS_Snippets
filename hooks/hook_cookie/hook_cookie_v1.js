/**
 * cookie 是一个访问器属性（Getter/Setter），它的执行依赖于 this 上下文（即具体的 document 实例）
 * 手动调用 Getter 并指定正确的 this
    const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    console.log(descriptor.get.call(document));
 * 
 * 直接 hook document.cookie 的缺陷
 *  🚫 缺陷 1：无法监控 iframe
 *  🚫 缺陷 3：容易被覆盖
        如果页面后续有其他脚本（或反调试代码）再次对 document.cookie 进行 defineProperty，
        它会直接覆盖你的实例属性，导致 Hook 失效。而原型属性通常只会被修改一次，更稳定
 */

(function() {
    'use strict';
    
    let cookie_accessor = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
    const cookieGetter = cookie_accessor.get;
    const cookieSetter = cookie_accessor.set;

    Object.defineProperty(document, "cookie", {
        get: function () {
            console.log('🍪 Hook 读取，当前域名:', location.hostname);
            console.trace();
            return cookieGetter.call(document);
        },
        set: function (val) {
            console.log('🍪 Hook 写入:', val);
            console.log(new Error().stack);
            return cookieSetter.call(document, val);
        }
    });
})();