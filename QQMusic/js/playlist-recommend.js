window.addEventListener('load', function () {
    // “歌单推荐”下的六个item切换效果
    // 1. 选取元素
    // 选取六个item
    var playlistItems = document.querySelector('.playlist-tab').querySelectorAll('a');

    // 2. 绑定事件
    for (var i = 0; i < playlistItems.length; i++) {
        playlistItems[i].addEventListener('click', function () {
            // 排他思想
            for (var i = 0; i < playlistItems.length; i++) {
                playlistItems[i].className = '';
            }
            this.className = 'playlist-tab-current';
        })
    }



    // 轮播图
    // 1. 选取元素
    // 选出三个小圆点
    const points = document.querySelectorAll('.carousel-point');
    // 选出轮播图（300%，轮播的是这个）
    const carousel = document.querySelector('.carousel');
    // 选出单页轮播图
    const carouselArea = document.querySelector('.carousel-area');
    // 单页轮播图宽度 1200
    const carouselWidth = carouselArea.offsetWidth;
    // 选出右按钮
    const arrowRight = document.querySelector('.arrow-right-box');
    // 选出左按钮
    const arrowLeft = this.document.querySelector('.arrow-left-box');
    // 给每个小圆点设置自定义index属性，值依次为0、1、2
    for (var i = 0; i < points.length; i++) {
        points[i].setAttribute('data-index', i);
    }


    // 2. 给圆点绑定事件
    for (var i = 0; i < points.length; i++) {
        points[i].addEventListener('click', function () {
            // 排他思想（点击变色）
            for (var i = 0; i < points.length; i++) {
                points[i].className = 'carousel-point';
            }
            this.className = 'carousel-point current-point';
            // 轮播效果
            var indexValue = this.getAttribute('data-index');
            // 点击了某个小圆点后，需要把其索引号给num和count，值才不会有差异
            num = indexValue;
            count = indexValue;
            animate(carousel, -indexValue * carouselWidth);
        })
    }

    var num = 0;
    var count = 0;
    // 节流阀控制变量
    // var flag = true;

    // 3. 给右按钮绑定事件
    arrowRight.addEventListener('click', function () {
        if (num == points.length - 1) {
            carousel.style.left = 0;
            num = -1;
        }
        num++;
        animate(carousel, -num * carouselWidth);

        count++;
        if (count == points.length) {
            count = 0;
        }
        pointChange();
    });

    // 给左按钮绑定事件
    arrowLeft.addEventListener('click', function () {

        if (num == 0) {
            num = points.length;
            carousel.style.left = -num * carouselWidth + 'px';
        }
        num--;
        animate(carousel, -num * carouselWidth);
        count--;
        // if (count < 0) {
        //     count = points.length - 1;
        // }
        count = count < 0 ? (points.length - 1) : count;
        pointChange();
    })

    // 圆点样式变化函数
    function pointChange() {
        // 点击按钮，小圆点也会变化
        for (var i = 0; i < points.length; i++) {
            points[i].className = 'carousel-point';
        }
        points[count].className = 'carousel-point current-point';
    }
})