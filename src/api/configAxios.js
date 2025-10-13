import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://alhuda-library-backend.onrender.com",
  // baseURL: "http://localhost:7000",
});

export default axiosInstance;

