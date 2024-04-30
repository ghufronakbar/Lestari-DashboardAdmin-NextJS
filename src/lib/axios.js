import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/v1/web"
})

