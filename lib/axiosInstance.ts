import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost/PRO1014_SERVER/routes/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
