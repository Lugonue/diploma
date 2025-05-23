import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.status === 500) {
    if (window.location.href.includes("/500")) return;
    window.location.href = "/500";
    throw response;
  }
  if (response.status === 401) {
    toast.error(response.data?.message || "Пользователь не авторизован");
  } else if (response.status === 403) {
    toast.error("Доступ запрещен. Вы не администратор");
  } else {
    toast.error(response.data?.message || "Ошибка сервера");
  }

  throw response;
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
