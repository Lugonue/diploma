import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения в зависимости от режима (development, production и т.д.)
  const env = loadEnv(mode, process.cwd(), "");

  // Получаем адрес бэкенда из переменной окружения VITE_BACKEND_URL
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:5000";

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        // Проксирование всех запросов, начинающихся с /api
        "/api": {
          target: backendUrl, // Используем адрес бэкенда из переменной окружения
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        "@": resolve(__dirname, "src"),
      },
    },
  };
});