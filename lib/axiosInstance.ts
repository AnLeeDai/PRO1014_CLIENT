import axios from "axios";
import Cookies from "js-cookie";

import { siteConfig } from "@/config/site";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/PRO1014_SERVER/",
  headers: {
    "Content-Type": "application/json",
  },
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
    const code = error.response?.data?.code;

    if (
      code === "TOKEN_EXPIRED" ||
      code === "INVALID_TOKEN" ||
      status === 440
    ) {
      Cookies.remove("token");
      Cookies.remove("expires_in");
      Cookies.remove("isLogin");
      Cookies.remove("user_id");

      window.location.href = siteConfig.routes.login;

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
