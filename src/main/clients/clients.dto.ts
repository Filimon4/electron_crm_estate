import { Client } from "../db/entities";

export type TClientDTO = {
  id: number,
  phone: string,
  email: string,
  first_name: string;
  sure_name: string;
  last_name: string;
}

export type TUpdateClientDTO = Partial<TClientDTO> & {
  id: number
}

export type TFilterClientDTO = Pick<Client, 'email' | 'first_name' | 'sure_name' | 'last_name' | 'phone'>
