import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE == "production" ? "https://studosphere-2.onrender.com/api" : "http://localhost:5000/api",
    withCredentials: true
})