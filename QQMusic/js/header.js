// 默认url头部
const defaultUrlHeader = 'http://localhost:3000';

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

    // 选取元素
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
    const loginBtn = document.querySelector('.login-confirm');
    // 关闭按钮
    let closeBtn = document.querySelector('.login').querySelector('.close-button');

    // 关闭登录窗口和遮罩层的函数
    function closeLogin() {
        loginBox.style.display = 'none';
        bgMask.style.display = 'none';
        // 同时清除输入框内容
        phoneNumberBox.value = '';
        passwordBox.value = '';
    }

    // 显示登录窗口和遮罩层的函数
    function openLogin() {
        loginBox.style.display = 'block';
        bgMask.style.display = 'block';
    }

    // 点击"登录"弹出登录窗口
    loginFont.addEventListener('click', openLogin)

    // 点击"x"关闭登录窗口
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

    // 给"提交按钮"绑定事件
    loginBtn.addEventListener('click', loginAccount)

    // 获取输入信息并进行登录验证的函数
    function loginAccount() {
        // 手机号码/邮箱
        let phoneOrEmail = phoneNumberBox.value;
        // 密码
        let pwd = passwordBox.value;
        // 判断手机输入是否为空
        if (phoneOrEmail == '') {
            phoneWarning.style.visibility = 'visible';
            phoneWarning.innerHTML = '你还没有输入手机号！';
            phoneNumberBox.addEventListener('focus', function () {
                phoneWarning.style.visibility = 'hidden';
            })
        }

        // 判断密码输入是否为空
        if (pwd == '') {
            pwdWarning.style.visibility = 'visible';
            pwdWarning.innerHTML = '你还没有输入密码！';
            passwordBox.addEventListener('focus', function () {
                pwdWarning.style.visibility = 'hidden';
            })
        }

        if (phoneOrEmail !== '' && pwd !== '') {
            // 调用Ajax登录验证函数
            ajaxLoginTest(phoneOrEmail, pwd);
        }
    }

    // Ajax登陆验证函数
    function ajaxLoginTest(phoneOrEmail, pwd) {
        // 手机登录接口地址
        const phonePortUrl = '/login/cellphone';
        // 邮箱登录接口
        const emailPortUrl = '/login';

        // 1. 创建对象
        let xhr = new XMLHttpRequest();

        // 2.3. 配置对象、发送请求
        if (phoneOrEmail.includes('com')) {
            // 输入邮箱则调用邮箱登录接口
            let emailUrl = defaultUrlHeader + emailPortUrl + '?email=' + phoneOrEmail + '&' + 'password=' + pwd;
            xhr.open('get', emailUrl);
        } else {
            // 输入电话则调用手机登录接口
            let phoneUrl = defaultUrlHeader + phonePortUrl + '?phone=' + phoneOrEmail + '&' + 'password=' + pwd;
            xhr.open('get', phoneUrl);
        }

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
                    // 调用 关闭登录窗口和遮罩层的函数
                    closeLogin();
                    // 调用 渲染用户基本信息的函数
                    userInf(responseText.profile.avatarUrl, responseText.profile.nickname);
                    // 若登陆成功，则移除loginFont(此时为一级头像)弹出登录框事件
                    loginFont.removeEventListener('click', openLogin)
                    console.log(responseText.profile.userId);
                    // 调用 获取歌单基本信息的函数
                    userPlaylist(responseText.profile.userId);
                } else {
                    // 调用 登陆异常的函数
                    loginAbnormally(responseText.message);
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

    // 全局变量，可被后面的退出登录函数使用
    var displayHead = document.createElement('div');

    // 渲染用户基本信息框的函数
    function userInf(headUrl, nickname) {
        // 让“登录字样消失”
        loginFont.innerHTML = '';

        // 一级头像节点
        // 添加节点 父元素为loginFont
        loginFont.appendChild(displayHead);
        displayHead.className = 'user-login';
        displayHead.style.backgroundImage = 'url(' + headUrl + ')';

        // 用户信息框节点
        let userLogin = document.createElement('div');
        userLogin.className = 'user-inf';
        // 添加节点 父元素为loginFont
        loginFont.appendChild(userLogin);
        // 鼠标经过/离开时，显示/隐藏用户信息框
        loginFont.addEventListener('mouseover', function () {
            userLogin.style.display = 'block';
        })
        loginFont.addEventListener('mouseout', function () {
            userLogin.style.display = 'none';
        })
        userLogin.addEventListener('mouseover', function () {
            this.style.display = 'block';
        })
        userLogin.addEventListener('mouseout', function () {
            this.style.display = 'none';
        })

        // 创建二级头像节点
        let userHead = document.createElement('div');
        // 添加节点到用户信息框
        userLogin.appendChild(userHead);
        userHead.className = 'user-head';
        userHead.style.backgroundImage = displayHead.style.backgroundImage;

        // 创建昵称节点
        let userName = document.createElement('span');
        // 添加节点 到用户信息框中的头像旁边
        userLogin.appendChild(userName);
        userName.className = 'user-name';
        userName.innerHTML = nickname;

        // 创建退出按钮节点
        let logout = document.createElement('button');
        // 添加节点到用户信息框
        userLogin.appendChild(logout);
        logout.className = 'user-logout';
        logout.innerHTML = '退出登录';

        // 为退出按钮绑定点击事件
        logout.addEventListener('click', exitLogin)
    }

    // 退出登录的函数
    function exitLogin() {
        // 退出登录接口地址
        const exitPortUrl = '/logout';

        // 1. 创建对象
        let xhr = new XMLHttpRequest();
        // 地址拼接
        let exitUrl = defaultUrlHeader + exitPortUrl;
        // 2. 配置对象
        xhr.open('get', exitUrl);
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
                    console.log('退出成功');
                    // 再给"登录"重新绑定点击弹出登录框事件
                    loginFont.addEventListener('click', openLogin)
                    // 抹除一级头像
                    // 退出登录函数操作此祖父节点，可把用户信息框一并抹除
                    displayHead.className = '';
                    loginFont.innerHTML = '登录';
                } else {
                    // 调用 退出异常的函数
                    exitAbnormally(responseText.message);
                }
            } else {
                // 请求失败
                console.log('请求失败');
                console.log(xhr.readyState);
                console.log(xhr.status);
            }
        }
    }

    // 退出异常的函数
    function exitAbnormally() {
        console.log('退出失败，请稍后重试');
    }

})