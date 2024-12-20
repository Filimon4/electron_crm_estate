
export type TRealtorDB = {
  phone: string;
  email: string;
  first_name: string;
  sure_name: string;
  last_name: string;
  password: string;
  role: UserRole;
  id: number;
}

export enum UserRole {
  ADMIN = "admin",
  REALTOR = "realtor",
}