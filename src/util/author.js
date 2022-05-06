
const wxmpLogin = () => {
    var openId = localStorage.getItem("openId");
    if (openId) {
        return post("api/Sys_User/WxLogin", { openId: openId })
    } else {
        var getCodeCount = Number(localStorage.getItem("getCodeCount"));
        localStorage.setItem("getCodeCount", getCodeCount + 1);//获取code次数
        if (getCodeCount > 1) {
            localStorage.setItem("getCodeCount", 0);//获取code次数
            showToast("微信登陆失败,请退出重试")
            return
        }
        console.log('open')
        if (getCode()) {
            return getwxopenId()
        } else {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxade4033fe0c87b1e&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
            //window.location.href = `${window.location.href}&code=123456`
        }
    }
}
const getCode = () => {
    var code = ''
    document.location.href.split('?').map(url => {
        if (url.includes('code')) {
            var query = url.split('&')
            query.map(param => {
                if (param.includes('code')) {
                    var key = param.split('=')
                    if (key && key.length > 1) {
                        code = key[1]
                    }
                }
            })
        }
    })
    return code
}

const getwxopenId = () => {
    return new Promise((resolve, reject) => {
        post("api/Sys_User/GetWxUserInfo", { code: getCode() }).then(res => {
            if (res && res.OpenId) {
                localStorage.setItem("openId", res.OpenId);
                localStorage.setItem("getCodeCount", 0);//获取code次数
            }
            var url = window.location.href;
            window.location.href = url.replace('&code=', '&invcode=').replace('?code=', '?invcode=')
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const wxConfig = () => {
    if (window.wxisload) {
        SetWxConfig()
    } else {
        loadWxJs(SetWxConfig)
    }
}
const SetWxConfig = () => {
    // var href = location.href.split('#')[0]
    var href = `/`
    post("api/userCard/GetWxConfig", { href: encodeURIComponent(href) }).then(res => {
        wx.config(res);
    }).catch(err => { })

}
const loadWxJs = (callback) => {
    var script = document.createElement('script');
    // 处理ie的兼容
    if (script.readyState) {
        script.onreadystatechange = () => {
            // 如果script已经下载完成
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                window.wxisload = true;
                callback();
            }
        }
    } else {
        // 监听script的下载的状态 当状态变为下载完成后 再执行callback
        script.onload = () => {
            window.wxisload = true;
            callback();
        }
    }
    script.src = "http://res.wx.qq.com/open/js/jweixin-1.6.0.js";
    script.id = "wxjssdk";
    document.body.appendChild(script);
}

export default {
    wxmpLogin, getwxopenId, wxConfig
}