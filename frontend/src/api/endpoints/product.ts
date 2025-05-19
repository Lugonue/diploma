import useProductStore, { Product } from "hooks/stores/useProductStor";
import apiClient from "../apiClient";
import { ProductAPIResponse } from "@/types/Product";

const productApi = {
  getAll: (params: ProductsRequestParams) => {
    return apiClient.get<ProductAPIResponse>("/products/filter", { params });
  },
  getById: (id: number) => apiClient.get(`/products/${id}`),
  create: (productData: FormData) => apiClient.post("/products", productData),
  update: (id: number, productData: FormData) =>
    apiClient.patch(`/products/${id}`, productData),
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
  page?: number;
  limit?: number;
};
