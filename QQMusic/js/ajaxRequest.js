function ajaxRequest() {
    // 存储默认值
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function () { },
        error: function () { }
    };
    // 用options对象中的属性覆盖默认的defaults对象中的属性
    // object.assign方法会影响原对象，故不接收也不赋值
    Object.assign(defaults, options);
    var xhr = new XMLHttpRequest();
    var params = '';  // 拼接请求参数的变量
    // 循环传递进来的对象格式参数
    for (var attr in defaults.data) {
        // 将参数转化为字符串
        params += attr + '=' + defaults.data[attr] + '&';
    }
    // 把参数最后&截掉
    params = params.substring(0, params.length - 1);
    // get则把参数拼接到url后
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    xhr.open('defaults.type', defaults.url);
    // post则把参数送进send方法
    if (defaults.type == 'post') {
        var contentType = defaults.header['Content-Type'];
        // 设置请求参数格式的类型
        xhr.setRequestHeader('Content-Type', contentType);
        // 判断用户希望的请求参数格式的类型
        if (contentType == 'application/json') {
            // 传递json格式的请求参数
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 传递普通格式的请求参数
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    // xhr接收完响应数据后触发
    xhr.onload = function () {
        // 获取响应头的数据，参数为响应头中的属性
        var contentType = xhr.getResponseHeader('Content-Type');
        // 服务端返回的数据
        var responseText = xhr.responseText;
        // 判断响应类型中，字符串是否包含application/json
        if (contentType.includes('application/json')) {
            // 把json字符串转换为json对象
            responseText = JSON.parse(responseText);
        }
        // 分离请求成功与失败的处理，把xhr对象也返回出去（xhr包含更多信息）
        if (xhr.status == 200) {
            // 请求成功，调用处理成功的函数
            defaults.success(responseText, xhr);
        } else {
            // 请求成功，调用处理成功的函数
            defaults.error(responseText, xhr);
        }
    }
}