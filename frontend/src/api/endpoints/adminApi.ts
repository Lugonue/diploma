import { User, UserData } from "@/types/User";
import apiClient from "../apiClient";
import { Product } from "hooks/stores/useProductStor";

export default {
  getAllUsers: () => apiClient.get<UserData[]>("users"),
  getAllProducts: () => apiClient.get<Product[]>("products"),
  patchUser: (id: number, body: Partial<User["data"]>) =>
    apiClient.patch<User["data"]>("users/" + id, body),
};
