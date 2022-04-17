// 封装动画函数
function animate(obj, target) {
    // 当连续多次点击时，元素会因为多个定时器叠加而越来越快
    // 故每次进入函数前先清除上一次的定时器
    clearInterval(obj.timer);
    // 采用对象属性的方法给定时器命名，防止多次调用反复开辟内存空间以及名字相同而引起歧义
    obj.timer = setInterval(function () {
        // 每次都要计算步长，写进定时器
        let step = (target - obj.offsetLeft) / 10;
        // 正的往上取整，负的往下取整（不会超过，因为只要到达target定时器就被清除了）
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 停止定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // // 回调函数写到定时器里
            // if(callback) {
            //     // 调用函数
            //     callback();
            // }
            // // 短路运算 左边判断有无传入参数
            // callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}