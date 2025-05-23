import auth from "@/api/endpoints/auth";
import { ProductAPIResponse } from "@/types/Product";
import { User, UserData } from "@/types/User";
import { create } from "zustand";
import { Product } from "./useProductStor";
import { Order } from "@/api/endpoints/userApi";
import { useEffect } from "react";

type Store = {
  user: User;
  userForm: Partial<UserData>;
  userCart: Product[];
  userOrders: Order[];
  setOrders: (items: Order[]) => void;
  setUser: (data?: UserData) => void;
  setUserForm: (data: Partial<UserData>) => void;
  resetUserForm: () => void;
  logout: () => void;
  updateCart: (
    action: "addOne" | "removeOne" | "removeAll" | "removeMany",
    data?: Product | number | number[]
  ) => void;
};

const useUserStore = create<Store>((set) => ({
  user: {
    data: null,
    hasAuth: localStorage.getItem("authToken") ? true : false,
  },
  userForm: {},
  userCart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
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
    if (action === "removeMany")
      set((state) => ({
        ...state,
        userCart: state.userCart.filter(
          (item) => !(data as number[]).includes(item.id)
        ),
      }));
  },
}));

export const useCartWatcher = () => {
  const { userCart } = useUserStore();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(userCart));
  }, [userCart]);
};

export default useUserStore;
