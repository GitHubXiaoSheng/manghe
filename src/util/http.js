import axios from "axios";
//axios.defaults.baseURL=localStorage.getItem("api");
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        if (!config.url.includes("http") && !config.url.includes("https")) {
            config.baseURL = localStorage.getItem("baseApi") ? localStorage.getItem("baseApi") : 'http://zhou-lin.cn:9991/';
        }
        if (config.data) {
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
    res => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        //config.headers.Authorization = token
        if (res.data.Code != 1) {
            showToast(res.data.Message)
            throw new Error(res.data.Message)
        } else {
            return res.data.Data;
        }
    },
    error => {
        console.log("错误", error)
        return error;
    })
export default axios;
