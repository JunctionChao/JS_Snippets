/* 强烈建议 Hook Document.prototype.cookie
*  网页中经常包含 <iframe>，每个 iframe 都有自己独立的 document 实例，但它们共享同一个 Document.prototype
* ✅ 效果：无论是 document.cookie 还是 iframe.contentDocument.cookie 都会被拦截
* 
*/


(function() {
    'use strict';

    const docProto = Document.prototype;
    const desc = Object.getOwnPropertyDescriptor(docProto, 'cookie');
    const originalGetter = desc.get;
    const originalSetter = desc.set;

    Object.defineProperty(docProto, 'cookie', {
        ...desc,
        get: function() {
            console.log('🍪 Hook 读取，当前域名:', location.hostname);
            console.trace();
            // 关键：必须用 call(this) 保持上下文
            return originalGetter.call(this); 
        },
        set: function(val) {
            // group 用于分组输出，方便查看
            console.group('🍪 Hook 写入拦截');
            console.log('🍪 Hook 写入:', val);
            console.groupEnd();
            // debugger
            // 关键：必须用 call(this) 保持上下文
            return originalSetter.call(this, val);
        }
    });
})