import { Flat as _Flat } from "../db/entities";

export type TFlatDTO = Partial<_Flat>

export type TFilterFlatDTO = {
  house_id: number,
  room_amount: [number, number],
  size: [number, number],
  price: [number, number],
}

export type TFilterHouseDTO = {
  complex: number,
  street: string,
  house_number: number
}

export type TFilterComplexDTO = {
  name: string,
  city: string,
  district: string,
}
