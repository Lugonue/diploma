import { Address } from "@/api/endpoints/auth";

export interface User {
  data: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    dateOfBirth: string;
    password: string;
    avatarUrl: string;
    role: string;
    addresses: Address[];
    phones: {
      number: string;
    }[];
  } | null;
  hasAuth: boolean;
}

export type Phone = {
  number: string;
};
