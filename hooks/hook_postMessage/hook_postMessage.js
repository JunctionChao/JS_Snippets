(function() {
    // const originalPostMessage = window.postMessage;
    // window.postMessage = function(...args) {
    //     console.log('[Hook] postMessage called:', {
    //         target: this,
    //         data: args[0],
    //         origin: args[1]
    //     });
    //     return originalPostMessage.apply(this, args);
    // };

    const originalAddEventListener = Window.prototype.addEventListener;
    Window.prototype.addEventListener = function(type, listener, ...rest) {
        if (type === 'message') {
            const wrapped = function(event) {
                console.log('[Hook] message received:', {
                    origin: event.origin,
                    data: event.data,
                    source: event.source
                });
                return listener.apply(this, arguments);
            };
            return originalAddEventListener.call(this, type, wrapped, ...rest);
        }
        return originalAddEventListener.apply(this, arguments);
    };
})();

