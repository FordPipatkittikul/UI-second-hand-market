import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://ui-second-hand-market.onrender.com/api",
    withCredentials: true
});

export default apiRequest

//http://localhost:8000/api
//https://ui-second-hand-market.onrender.com/api