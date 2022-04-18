
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
            localStorage.setItem("getCodeCount", 0);//获取code次数
            return getwxopenId()
        } else {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxade4033fe0c87b1e&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        }
    }
}
const getCode = () => {
    var code = ''
    document.location.search.split('?').map(url => {
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
    return post("api/Sys_User/GetWxUserInfo", { code: getCode() }).then(res => {
        if (res && res.OpenId) {
            localStorage.setItem("openId", res.OpenId);
        }
    })
}

export default {
    wxmpLogin, getwxopenId
}