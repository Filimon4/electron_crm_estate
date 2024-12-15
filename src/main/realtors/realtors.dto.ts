
export type TRealtorDTO = {
  phone: string,
  email: string,
  first_name: string;
  second_name: string;
  last_name: string;
  password: string;
}

export type TUpdateClientDTO = Partial<TRealtorDTO> & {
  id: number
}