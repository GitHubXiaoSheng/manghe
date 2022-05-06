import axios from "axios";
import author from './author'
import { Loading } from 'element-ui';
//axios.defaults.baseURL=localStorage.getItem("api");
var load = null;
axios.interceptors.request.use(
    async config => {
        console.log("配置", config)
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        var token = localStorage.getItem("token");
        if (!token && !config.url.includes("WxLogin") && !config.url.includes("GetWxUserInfo")) {
            var data = await wxlogin()
            token = data.token;
        }
        config.headers.Authorization = `Bearer ${token}`;

        if (!config.url.includes("http") && !config.url.includes("https")) {
            var baseapi = localStorage.getItem("baseApi");
            if (!baseapi) {
                baseapi = 'https://zhou-lin.cn:9991/';
                localStorage.setItem("baseApi", baseapi);
            } else if (baseapi == 'http://zhou-lin.cn:9991/') {
                baseapi = 'https://zhou-lin.cn:9991/';
                localStorage.setItem("baseApi", baseapi);
            }
            config.baseURL = baseapi;
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
        if (config.load) {
            load = Loading.service({
                lock: typeof config.load === 'string' ? config.load : "Loading",
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
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
            closeLoad()
            return res.data.Data;
        } else if (res.data.Code == 401 || res.data.Code == 202) {
            await wxlogin()
            return post(res.config.url, res.config.data)
        } else {
            showToast(res.data.Message)
            closeLoad()
            throw new Error(res.data.Message)
        }
    },
    async error => {
        debugger
        console.log("错误", error.response)
        if (error.response.status == 401) {
            await wxlogin()
            debugger
            var data = error.config.data;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (error) { }
            }
            return post(error.config.url, data)
        }
        closeLoad()
        return error;
    })
const closeLoad = () => {
    if (load != null) {
        load.close()
    }
}
const wxlogin = () => {
    return new Promise((resolve, reject) => {
        author.wxmpLogin().then(res => {
            localStorage.setItem("token", res.token);
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
export default axios;
