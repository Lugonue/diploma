import { User } from "@/types/User";
import apiClient from "../apiClient";
import { Product } from "hooks/stores/useProductStor";

export default {
  getAllUsers: () => apiClient.get<User["data"][]>("users"),
  getAllProducts: () => apiClient.get<Product[]>("products"),
};
