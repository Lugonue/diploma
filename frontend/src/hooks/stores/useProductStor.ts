import { create } from "zustand";
import { Category } from "./useCatalogtore";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: Category;
  type: {
    id: number;
    name: string;
    products: [string];
  };
  color: string;
  description: string;
  image_url: string;
  number_of_purchases: number;
};
type Store = {
  productList: Product[] | null;
  setProductList: (items: Product[]) => void;
};

const useProductStore = create<Store>((set) => ({
  productList: null,
  setProductList: async (items) => {
    set((state) => ({ ...state, productList: items }));
  },
}));
export default useProductStore;
