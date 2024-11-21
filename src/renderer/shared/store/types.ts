
export type TRealtorDB = {
  phone: string;
  email: string;
  first_name: string;
  sure_name: string;
  last_name: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  REALTOR = "realtor",
}