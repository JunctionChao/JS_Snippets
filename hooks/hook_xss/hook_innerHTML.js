// Hook innerHTML to find XSS

(function () {
    'use strict';

    let property_accessor = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"); // 获取目标属性访问器描述符
    let get_accessor = property_accessor.get; // 获取getter
    let set_accessor = property_accessor.set; // 获取setter

    Object.defineProperty(Element.prototype, "innerHTML", {
        get: function () {
            // 在这里写你想让hook后的属性在被获取值时执行的代码
            return get_accessor.call(this); // 当网站js获取目标属性值时调用原属性getter返回结果
        },
        set: function () {
            set_accessor.call(this, ...arguments);// 将网站js设置目标属性值时所传入的内容传给原setter设置并返回结果
            console.log(this);
        }
    });
})();
