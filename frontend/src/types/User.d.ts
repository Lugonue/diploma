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
    addresses: [
      {
        street: string;
        house: string;
        building: string;
        apartment: string;
        entrance: string;
        floor: string;
      },
    ];
    phones: [
      {
        number: string;
      },
    ];
  } | null;
  hasAuth: boolean;
}

export type Phone = string
