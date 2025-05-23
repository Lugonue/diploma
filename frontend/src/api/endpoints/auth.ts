import { Phone, User, UserData } from "@/types/User";
import apiClient from "../apiClient";

export default {
  login: (body: LoginBody) => apiClient.post("auth/login", body),
  register: (body: Partial<RergisterBody>) =>
    apiClient.post("/auth/register", body),
  getMe: () => apiClient.get<UserData>("/auth/me"),
};

export type LoginBody = { email: string; password: string };

export type RergisterBody = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  avatarUrl: string;
  role: string;
  addresses: Address[];
  phones: Phone[];
};

export type Address = {
  id?: number;
  street: string;
  house?: string;
  building?: string;
  apartment?: string;
  entrance?: string;
  floor?: string;
};
