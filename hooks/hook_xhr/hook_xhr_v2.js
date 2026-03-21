

(function () {
    'use strict';

    let assign_url = '';            // 指定需要监控的url
    let assign_RequestHeader = '';  // 指定需要监控的请求头

    let hook_open = XMLHttpRequest.prototype.open;
    let hook_setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    let hook_send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function () {
        this.method = arguments[0];
        this.url = arguments[1];
        return hook_open.call(this, ...arguments);
    }

    XMLHttpRequest.prototype.setRequestHeader = function () {
        if ((assign_url !== '' && this.url.indexOf(assign_url) !== -1) && (assign_RequestHeader !== '' && arguments[0].indexOf(assign_RequestHeader) !== -1)) {
            console.log(
                "请求 " + this.url + " 时请求头被设置\n" +
                "请求头：" + arguments[0] + ": " + arguments[1]
            )
            console.log(new Error().stack); // 当指定了请求头和请求URL时，如果想断点可以在此处写入debugger。
            return hook_setRequestHeader.call(this, ...arguments);
        } else if (assign_url !== '' && this.url.indexOf(assign_url) !== -1) {
            console.log(
                "请求 " + this.url + " 时请求头被设置\n" +
                "请求头：" + arguments[0] + ": " + arguments[1]
            )
            console.log(new Error().stack); // 当指定了请求URL时，如果想断点可以在此处写入debugger。
        } else if (assign_RequestHeader !== '' && arguments[0].indexOf(assign_RequestHeader) !== -1) {
            console.log(
                "请求 " + this.url + " 时请求头被设置\n" +
                "请求头：" + arguments[0] + ": " + arguments[1]
            )
            console.log(new Error().stack); // 当指定了请求头时，如果想断点可以在此处写入debugger。
        }
        return hook_setRequestHeader.call(this, ...arguments);
    }

    XMLHttpRequest.prototype.send = function () {
        if (assign_url !== '' && this.url.indexOf(assign_url) !== -1) {
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
        }
        return hook_send.call(this, ...arguments);
    }
})();