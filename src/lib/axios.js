import axios from "axios";

const axiosInstance = axios.create({    
    baseURL: "https://lestari-backend-alt.vercel.app/v1/web"
    // baseURL: "http://localhost:5000/v1/web"
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

module.exports = { axiosInstance }
