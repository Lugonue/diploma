import { InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const responseInterceptor = ({ response }: any) => {
  toast.error(response.data?.message || "Ошибка сервера");

  return response;
};
export const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  //  Логирование исходящих запросов (только в development)
  if (process.env.NODE_ENV === "development") {
    console.log("Outgoing Request:", {
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
    });
  }

  // Обработка Content-Type для FormData
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
};
