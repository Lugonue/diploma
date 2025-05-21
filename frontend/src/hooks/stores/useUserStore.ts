import auth from "@/api/endpoints/auth";
import { ProductAPIResponse } from "@/types/Product";
import { User } from "@/types/User";
import { create } from "zustand";
import { Product } from "./useProductStor";
import { Order } from "@/api/endpoints/userApi";

type Store = {
  user: User;
  userForm: Partial<User["data"]>;
  userCart: Product[];
  userOrders: Order[];
  setOrders: (items: Order[]) => void;
  setUser: (data?: User["data"]) => void;
  setUserForm: (data: Partial<User["data"]>) => void;
  resetUserForm: () => void;
  logout: () => void;
  updateCart: (
    action: "addOne" | "removeOne" | "removeAll",
    data?: Product | number
  ) => void;
};

const useUserStore = create<Store>((set) => ({
  user: {
    data: null,
    hasAuth: localStorage.getItem("authToken") ? true : false,
  },
  userForm: {},
  userCart: [],
  userOrders: [],
  setOrders: async (items) => {
    set((state) => ({ ...state, userOrders: items }));
  },
  setUser: async (userData) => {
    if (!userData) {
      const { data } = await auth.getMe();
      userData = data;
    }
    set((state) => ({
      ...state,
      user: { ...state.user, ...{ data: userData } },
    }));
  },
  setUserForm: async (data) => {
    set((state) => ({ ...state, userForm: { ...state.userForm, ...data } }));
  },
  resetUserForm: async () => {
    set((state) => ({ ...state, userForm: {} }));
  },
  logout: async () => {
    localStorage.removeItem("authToken");
    set((state) => ({
      ...state,
      user: { ...state.user, ...{ hasAuth: false } },
    }));
  },
  updateCart: async (action, data) => {
    if (action === "addOne")
      set((state) => ({
        ...state,
        userCart: [...state.userCart, data as Product],
      }));
    if (action === "removeOne")
      set((state) => ({
        ...state,
        userCart: state.userCart.filter((item) => item.id !== (data as number)),
      }));
    if (action === "removeAll") set((state) => ({ ...state, userCart: [] }));
  },
}));
export default useUserStore;
