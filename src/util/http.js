import axios from "axios";
import author from './author'
//axios.defaults.baseURL=localStorage.getItem("api");
axios.interceptors.request.use(
    async config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        var token = localStorage.getItem("token");
        if (!token && !config.url.includes("WxLogin")) {
            var data = await author.wxmpLogin()
            localStorage.setItem("token", data.token);
            token = data.token;
        }
        config.headers.Authorization = `Bearer ${token}`;

        if (!config.url.includes("http") && !config.url.includes("https")) {
            config.baseURL = localStorage.getItem("baseApi") ? localStorage.getItem("baseApi") : 'http://zhou-lin.cn:9991/';
        }
        if (config.data && !(config.data instanceof FormData)) {
            for (var item in config.data) {
                if (config.url.includes("?")) {
                    config.url += `&${item}=${config.data[item]}`
                } else {
                    config.url += `?${item}=${config.data[item]}`
                }
            }
        }

        config.headers.post['Content-Type'] = 'application/json'

        console.log("配置", config)
        return config;
    },
    error => {
        return Promise.error(error);
    })
axios.interceptors.response.use(
    async res => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        //config.headers.Authorization = token
        console.log("返回")
        if (res.data.Code == 1) {
            return res.data.Data;
        } else if (res.data.Code == 202) {
            var openId = localStorage.getItem("openId");
            var loginres = await post("api/Sys_User/WxLogin", { openId: openId })
            localStorage.setItem("token", loginres.token)
            return post(res.config.url, res.config.data)
        } else {
            showToast(res.data.Message)
            throw new Error(res.data.Message)
        }
    },
    async error => {
        console.log("错误", error)
        return error;
    })
export default axios;
