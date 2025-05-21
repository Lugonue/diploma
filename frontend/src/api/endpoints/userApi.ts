import { User, UserData } from "@/types/User";
import apiClient from "../apiClient";
import { get } from "http";
import { Product } from "hooks/stores/useProductStor";
import { OrderStatus } from "hooks/stores/useOrderStore";

export default {
  patch: (body: Partial<User["data"]>) =>
    apiClient.patch<User["data"]>("users/profile", body),
  delUser: (id: number) => apiClient.delete("users/" + id),
  postOrder: (body: PostOrderType) => apiClient.post("orders", body),
  getOrders: () => apiClient.get<Order[]>("orders"),
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
  items: {
    id: number;
    order: string;
    product: Product;
  }[];
  createdAt: string;
  status: OrderStatus;
};
