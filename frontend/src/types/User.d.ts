import { Address } from "@/api/endpoints/auth";

export type UserData = {
  id?: number;
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

export interface User {
  data: UserData | null;
  hasAuth: boolean;
}

export type Phone = {
  number: string;
};
