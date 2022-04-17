// 文档内容完全加载完成后触发
window.addEventListener('load', function () {
    // 鼠标经过五个li，跟随鼠标移动的span内显示对应li里链接的文字
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
})