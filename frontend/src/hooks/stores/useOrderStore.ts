import { create } from "zustand";
import { Product } from "./useProductStor";
import { Phone } from "@/types/User";
import { Order } from "@/api/endpoints/userApi";

export type OrderStatus =
  | "Новый"
  | "В обработке"
  | "Отменен"
  | "Завершен"
  | "Отправлен";

type Store = {
  orders: Order[];
  setOrders: (items: Order[]) => void;
};

const useOrderStore = create<Store>((set) => ({
  orders: [],
  setOrders: async (items) => {
    set((state) => ({ ...state, orders: items }));
  },
}));
export default useOrderStore;
