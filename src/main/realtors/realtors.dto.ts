
export type TRealtorDTO = {
  phone: string,
  email: string,
  firstName: string;
  secondName: string;
  lastName: string;
  password: string;
}

export type TUpdateClientDTO = Partial<TRealtorDTO> & {
  id: number
}