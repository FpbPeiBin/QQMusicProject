// 获取歌单基本信息的函数(无法获取歌单里歌曲)
// 利用此函数可获取该用户所有歌单的ID，但无法获取里边的歌曲ID
function userPlaylist(userId) {
    // 歌单信息接口地址
    const playlistPortUrl = '/user/playlist';
    // 1. 创建对象
    let xhr = new XMLHttpRequest();
    // 2. 配置对象
    let playlistUrl = defaultUrlHeader + playlistPortUrl + '?uid=' + userId;
    xhr.open('get', playlistUrl);
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
                // 传入此歌单ID，获取歌单详细信息
                for (let i = 0; i < responseText.playlist.length; i++) {
                    // 调用 获取歌单详细信息的函数
                    userPlaylistDetail(responseText.playlist[i].id);
                }
            } else {
                console.log('歌单基本信息获取失败');
            }
        } else {
            // 请求失败
            console.log('请求失败');
            console.log(xhr.readyState);
            console.log(xhr.status);
        }
    }
}

// 获取歌单详细信息的函数(可获取歌单里的歌曲)
function userPlaylistDetail(playlistId) {
    // 歌单详情信息接口地址
    const playlistDetailPortUrl = '/playlist/detail';
    // 1. 创建对象
    let xhr = new XMLHttpRequest();
    // 2. 配置对象
    let playlistDetailUrl = defaultUrlHeader + playlistDetailPortUrl + '?id=' + playlistId;
    xhr.open('get', playlistDetailUrl);
    // 3. 发送请求
    xhr.send();
    // 4.获取响应
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
            // 判断登录状态
            if (responseText.code == 200) {
                // 请求成功
                console.log(responseText);
                console.log('歌单ID为' + playlistId);
            } else {
                console.log('歌单详细信息获取失败');
            }
        } else {
            // 请求失败
            console.log('请求失败');
            console.log(xhr.readyState);
            console.log(xhr.status);
        }
    }
}