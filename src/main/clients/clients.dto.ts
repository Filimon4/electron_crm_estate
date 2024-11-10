
export type TClientDTO = {
  phone: string,
  email: string,
  firstName: string;
  secondName: string;
  lastName: string;
}

export type TUpdateClientDTO = Partial<TClientDTO> & {
  id: number
}
