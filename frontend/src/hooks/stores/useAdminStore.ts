import adminApi from "@/api/endpoints/adminApi";
import { UserData } from "@/types/User";
import { create } from "zustand";
import { Product } from "./useProductStor";


type Store = {
  users?: UserData[];
  products?: Product[];
  fetchUsers: (u: UserData[]) => Promise<void>;
  fetchProducts: (p?: Product[]) => Promise<void>;
};

const useAdminStore = create<Store>((set) => ({
  users: [],
  products: [],

  fetchUsers: async (users) => {
    if (users.length) return;
    const { data } = await adminApi.getAllUsers();
    set((state) => ({ ...state, users: data }));
  },
  fetchProducts: async (products) => {
    if (products?.length) return;
    const { data } = await adminApi.getAllProducts();
    set((state) => ({ ...state, products: data }));
  }
}));
export default useAdminStore;
