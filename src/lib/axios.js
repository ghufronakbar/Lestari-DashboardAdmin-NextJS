import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000/v1/web"
    baseURL: "https://lestari-backend-alt.vercel.app"
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

module.exports = { axiosInstance }
