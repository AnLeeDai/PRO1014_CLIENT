import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost/PRO1014_SERVER/routes/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 || message === "Token has expired") {
      Cookies.remove("token");
      Cookies.remove("expires_in");
      Cookies.remove("isLogin");

      Router.replace("/auth/login");

      return Promise.reject({
        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      });
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
