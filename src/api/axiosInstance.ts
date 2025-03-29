import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const checkdomain = (): string => {
  const currentUrl = window.location.href;

  return currentUrl.includes("localhost")
    ? "http://localhost/PRO1014_SERVER/routes/"
    : // "http://localhost/source_code/PRO1014_SERVER/routes/"
      baseURL;
};

const axiosInstance = axios.create({
  baseURL: checkdomain(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// / Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

// // Thêm interceptor cho response (tuỳ chọn)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Xử lý lỗi: Ví dụ, nếu token hết hạn thì redirect đăng nhập
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
