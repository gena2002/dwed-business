import axios from "axios";

const $api = axios.create({
    // withCredentials: true,
    // baseURL: process.env.REACT_APP_API_HOST || 'http://91.213.99.169:3000',
})

$api.interceptors.request.use((config) => {
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers.Authorization = `Token ${localStorage.getItem('access')}`;
    return config;
})

// export const $auth = axios.create({
//     withCredentials: true,
//     baseURL: process.env.REACT_APP_API_HOST,
// })
//
//
// $auth.interceptors.request.use((config) => {
//     config.headers['Content-Type'] = 'multipart/form-data';
//     return config;
// })


export default $api;