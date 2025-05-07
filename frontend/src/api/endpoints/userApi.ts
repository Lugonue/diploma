import { User } from "@/types/User";
import apiClient from "../apiClient";

export default {
  patch: (body: Partial<User["data"]>) =>
    apiClient.patch<User["data"]>("users/profile", body),
};
