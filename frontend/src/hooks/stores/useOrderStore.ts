import { create } from "zustand";
import { Product } from "./useProductStor";
import { Phone } from "@/types/User";

export type OrderStatus =
  | "Новый"
  | "В обработке"
  | "Отменен"
  | "Завершен"
  | "Отправлен";

export type Order = {
  id: number;
  user: string; // ???
  address: string[];
  phone: Phone[];
  items: {
    id: number;
    order: string; // ???
    product: Partial<Product>;
    quantity: number;
  }[];
  status: OrderStatus;
  createdAt: string;
};
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
