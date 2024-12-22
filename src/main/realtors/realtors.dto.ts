import { User } from "../db/entities";

export type TRealtorDTO = {
  phone: string,
  email: string,
  first_name: string;
  sure_name: string;
  last_name: string;
  password: string;
}

export type TUpdateClientDTO = Partial<TRealtorDTO> & {
  id: number
}

// export type TFilterRealtorDTO = {
//   phone: string,
//   emial: string,
//   first_name: string,
//   sure_name: string,
//   last_name: string
// }

export type TFilterRealtorDTO = Pick<User, 'email' | 'phone' | 'first_name' | 'sure_name' | 'last_name'>