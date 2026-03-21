(function() {
    const originalDefineProperty = Object.defineProperty;
    const originalDefineProperties = Object.defineProperties;

    // Hook 单个属性定义
    Object.defineProperty = function(target, property, descriptor) {
        console.log('🔍 检测到属性定义:', {
            target: target === window ? 'window' : target.constructor.name,
            property: property,
            configurable: descriptor.configurable,
            value: descriptor.value,
            hasGetter: !!descriptor.get
        });

        // 示例：强制修改 configurable 为 true (便于后续 Hook)
        // ⚠️ 注意：某些原生对象可能不允许修改描述符本身
        if (property === 'secretToken') {
            descriptor.configurable = true; 
            console.log('🔓 已强制解锁 configurable');
        }

        // 示例：如果是 setter，包裹一层
        if (descriptor.set) {
            const originalSetter = descriptor.set;
            descriptor.set = function(val) {
                console.log('📝 属性写入拦截:', property, val);
                debugger; // 断点调试，方便查看上下文
                return originalSetter.call(this, val);
            };
        }

        return originalDefineProperty.call(this, target, property, descriptor);
    };

    // Hook 批量定义
    Object.defineProperties = function(target, props) {
        console.log('🔍 检测到批量属性定义', props);
        return originalDefineProperties.call(this, target, props);
    };

    console.log('✅ Object.defineProperty 已 Hook');
})();