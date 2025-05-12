import { User } from "@/types/User";
import apiClient from "../apiClient";

export default {
  getAllUsers: () => apiClient.get<User["data"][]>("users"),
};
