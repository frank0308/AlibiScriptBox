import axios from 'axios'
import store from '../store';

var axiosInstance = axios.create({
    baseURL:'https://localhost:44382/api'
});

axiosInstance.interceptors.request.use((config) => {
    const token = store.state.auth.token;
    if(token != null){
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}), (error) => {
    console.log(error);
}

export default function(method, url, data=null){
    method = method.toLowerCase();
    switch(method){
        case 'post':
            return axiosInstance.post(url, data);
        case 'get':
            return axiosInstance.get(url, {params:data});
        case 'put':
            return axiosInstance.put(url, data);
        case 'delete':
            return axiosInstance.delete(url, {params:data});
        default:
            console.error('未知的method' + method);
            return false;
    }
}