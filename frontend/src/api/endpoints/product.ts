import { Product } from "hooks/stores/useProductStor";
import apiClient from "../apiClient";

const productApi = {
  getAll: (params?: ProductsRequestParams) =>
    apiClient.get("/products/filter", { params }),
  getById: (id: number) => apiClient.get(`/products/${id}`),
  create: (productData: FormData) =>
    apiClient.post("/products", productData),
  update: (id: number, productData: Record<string, string>) =>
    apiClient.put(`/products/${id}`, productData),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
  getPopular: () => apiClient.get<Product[]>("/products/popular"),
};

export default productApi;

export type ProductsRequestParams = {
  categoryId?: number;
  typeId?: number;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};
