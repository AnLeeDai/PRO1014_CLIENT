import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost/source_code/PRO1014/server/routes/",
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
