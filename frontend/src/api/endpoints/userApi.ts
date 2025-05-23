import { Phone, User, UserData } from "@/types/User";
import { OrderStatus } from "hooks/stores/useOrderStore";
import { Product } from "hooks/stores/useProductStor";
import apiClient from "../apiClient";

export default {
  patch: (body: Partial<User["data"]>) =>
    apiClient.patch<User["data"]>("users/profile", body),
  delUser: (id: number) => apiClient.delete("users/" + id),
  postOrder: (body: PostOrderType) => apiClient.post("orders", body),
  getOrders: () => apiClient.get<Order[]>("orders"),
  getOrder: (id: number) => apiClient.get<Order>("orders/" + id),
};

export type PostOrderType = {
  user_id: number;
  address_id: number;
  phone_id: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
};

export type Order = {
  id: number;
  user: UserData;
  address_id: number;
  phone_id: number;
  phone?: Phone;
  
  items: {
    id: number;
    quantity: number;
    product: Product;
  }[];
  createdAt: string;
  status: OrderStatus;
};
