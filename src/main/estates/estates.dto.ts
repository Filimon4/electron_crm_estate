import { House } from "../db/entities";

export type TFlatDTO = {
  id: number;
  descriptio: string;
  flat: number;
  room_amount: number;
  floor: number;
  price: number;
  house_id: House;
  size: number
}

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
