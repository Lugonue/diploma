import { create } from "zustand";
import { Category } from "./useCatalogStore";
import { ProductsRequestParams } from "@/api/endpoints/product";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: Category;
  type: {
    id: number;
    name: string;
    products: string[];
  };
  color: string;
  description: string;
  imageUrl: string;
  number_of_purchases: number;
};

export type PaginationType = {
  lastPage?: number;
  page: string;
  total: number;
};
type Store = {
  productList: Product[] | null;
  setProductList: (items: Product[]) => void;
  setRequestProductParams: (params: ProductsRequestParams) => void;
  requestProductParams: ProductsRequestParams;
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
};

const useProductStore = create<Store>((set) => ({
  productList: null,
  setProductList: async (items) => {
    set((state) => ({ ...state, productList: items }));
  },
  requestProductParams: {
    page: 1,
    limit: 9,
  },
  setRequestProductParams: async (params) => {
    set((state) => ({ ...state, requestProductParams: params }));
  },
  pagination: {
    total: 0,
    page: "1",
  },
  setPagination: async (pagination) => {
    set((state) => ({ ...state, pagination: pagination }));
  },
}));
export default useProductStore;
