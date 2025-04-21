import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./utils/interceptors";

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем интерсепторы
apiClient.interceptors.request.use(
  (config) => requestInterceptor(config),
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => responseInterceptor(error)
);

export default apiClient;
