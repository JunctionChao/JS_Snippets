(function () {
    'use strict';

    let hook_open = XMLHttpRequest.prototype.open;
    let hook_setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    let hook_send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function () {
        this.method = arguments[0];
        this.url = arguments[1];
        return hook_open.call(this, ...arguments);
    }

    XMLHttpRequest.prototype.setRequestHeader = function () {
        console.log(
            "请求 " + this.url + " 时请求头被设置\n" +
            "请求头：" + arguments[0] + ": " + arguments[1]
        )
        console.log(new Error().stack);
        return hook_setRequestHeader.call(this, ...arguments);
    }

    XMLHttpRequest.prototype.send = function () {
        this.data = arguments[0];
        if (this.data != null) {
            console.log(
                "请求方式：" + this.method + "\n" +
                "请求url：" + this.url + "\n" +
                "请求内容：" + this.data + "\n"
            );
        } else {
            console.log(
                "请求方式：" + this.method + "\n" +
                "请求url：" + this.url + "\n"
            );
        }
        console.log(new Error().stack);
        return hook_send.call(this, ...arguments);
    }
})();