import axios from "axios";

// you can change it to your local host for development process
const apiRequest = axios.create({
    baseURL: "https://ui-second-hand-market.onrender.com/api",
    withCredentials: true
});

export default apiRequest

//http://localhost:8000/api
//https://ui-second-hand-market.onrender.com/api