// 文档内容完全加载完成后触发
window.addEventListener('load', function () {
    // 鼠标经过头部导航栏的五个li，跟随鼠标移动的span内显示对应li里链接的文字

    // 1. 选取元素
    // 头部
    const header = document.querySelector('header');
    // ul导航栏
    const topNavUl = document.querySelector('.header-top-nav');
    // 所有li
    const topNavLis = document.querySelector('.header-top-nav').querySelectorAll('li');
    // 所有li里的所有链接a
    const topNavLiA = document.querySelectorAll('.music-text');
    // span
    const topNavSpan = document.querySelector('.top-nav-span');

    // 2. 绑定事件
    // 此处循环变量的声明用let而非var
    for (let i = 0; i < topNavLis.length; i++) {
        topNavLis[i].addEventListener('mousemove', function (e) {
            // 让span显示
            topNavSpan.style.display = 'block';
            // 让span跟随鼠标移动
            topNavSpan.style.left = e.clientX - header.offsetLeft - topNavUl.offsetLeft + 10 + 'px';
            topNavSpan.style.top = e.clientY - header.offsetTop - topNavUl.offsetTop + 20 + 'px';
            // 让span里的内容即为经过li里的链接里的内容
            topNavSpan.innerHTML = topNavLiA[i].innerHTML;
        })
        topNavLis[i].addEventListener('mouseout', function () {
            topNavSpan.style.display = 'none';
        })
    }



    // 点击“登录”，弹出登录窗口，进行登陆验证

    // 1. 选取元素
    // “登录”
    const loginFont = document.querySelector('.login-font');
    // 遮罩层
    const bgMask = document.querySelector('.login-mask');
    // 登录窗口
    const loginBox = document.querySelector('.login');
    // 手机号码输入框
    const phoneNumberBox = document.querySelector('.phone-number');
    // 密码输入框
    const passwordBox = document.querySelector('.password');
    // 手机号码提示框
    var phoneWarning = document.querySelector('.phone-warning');
    // 密码提示框
    var pwdWarning = document.querySelector('.pwd-warning');
    // 登录按钮
    const loginBtn = this.document.querySelector('.login-confirm');
    // 关闭按钮
    let closeBtn = document.querySelector('.login').querySelector('.close-button');

    // 关闭登录窗口和遮罩层的函数
    function closeLogin() {
        loginBox.style.display = 'none';
        bgMask.style.display = 'none';
    }

    // 点击登录弹出登录窗口
    loginFont.addEventListener('click', function () {
        bgMask.style.display = 'block';
        loginBox.style.display = 'block';
    })

    // 点击关闭按钮即可关闭登录窗口
    closeBtn.addEventListener('click', closeLogin)

    // 手机输入框获得焦点事件
    phoneNumberBox.addEventListener('focus', function () {
        this.style.borderColor = '#8fb7ff';
    })

    // 手机输入框失去焦点事件
    phoneNumberBox.addEventListener('blur', function () {
        this.style.borderColor = '';
        phoneWarning.style.visibility = 'none';
    })

    // 密码框获得焦点事件
    passwordBox.addEventListener('focus', function () {
        this.style.borderColor = '#8fb7ff';
    })

    // 密码框失去焦点事件
    passwordBox.addEventListener('blur', function () {
        this.style.borderColor = '';
        pwdWarning.style.visibility = 'none';
    })

    // 点击登录
    loginBtn.addEventListener('click', function () {
        // 手机号码
        let phoneValue = phoneNumberBox.value;
        // 密码
        let passwordValue = passwordBox.value;
        // 判断手机输入输入是否为空
        if (phoneValue == '') {
            phoneWarning.style.visibility = 'visible';
            phoneWarning.innerHTML = '你还没有输入手机号！';
            phoneNumberBox.addEventListener('focus', function () {
                phoneWarning.style.visibility = 'hidden';
            })
        }
        if (passwordValue == '') {
            pwdWarning.style.visibility = 'visible';
            pwdWarning.innerHTML = '你还没有输入密码！';
            passwordBox.addEventListener('focus', function () {
                pwdWarning.style.visibility = 'hidden';
            })
        }
        if (phoneValue !== '' && passwordValue !== '') {
            // 发送请求，登陆验证
            ajaxLoginTest(phoneValue, passwordValue);
        }
    })

    // Ajax登陆验证函数
    function ajaxLoginTest(phone, pwd) {
        // 1. 创建对象
        let xhr = new XMLHttpRequest();
        // 默认url头部
        const defaultUrlHeader = 'http://localhost:3000';
        // 接口地址
        let portUrl = '/login/cellphone';
        // 拼接
        let url = defaultUrlHeader + portUrl + '?phone=' + phone + '&' + 'password=' + pwd;
        // 2. 配置对象
        xhr.open('get', url);
        // 3. 发送请求
        xhr.send();
        // 4. 获取响应
        xhr.onload = function () {
            // 获取响应头的Content-Type属性的数据
            var contentType = xhr.getResponseHeader('Content-Type');
            // 服务端返回的数据
            var responseText = xhr.responseText;

            // 判断响应类型中的字符串是否包含application/json
            if (contentType.includes('application/json')) {
                // 把json字符串转换为json对象
                responseText = JSON.parse(responseText);
            }

            // 响应处理
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 请求成功
                console.log(responseText);
                // 判断登录状态
                if (responseText.code == 200) {
                    // 关闭登录窗口和遮罩层的函数
                    closeLogin();
                } else if (responseText.msg == '密码错误') {
                    // 调用登陆异常的函数
                    loginAbnormally(responseText.msg);
                } else if (responseText.msg == '密码错误超过限制') {
                    // 调用登录异常的函数
                    let responseTextMsg = responseText.msg + '，请稍后刷新重试';
                    loginAbnormally(responseTextMsg);
                }
            } else {
                // 请求失败
                console.log('请求失败');
                console.log(xhr.readyState);
                console.log(xhr.status);
            }
        }
    }

    // 登陆异常的函数，反馈异常原因
    function loginAbnormally(message) {
        pwdWarning.style.visibility = 'visible';
        pwdWarning.innerHTML = message;
    }
})