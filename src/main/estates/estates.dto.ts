import { House } from "../db/entities";

export type TEstateDTO = {
  id?: number;
  description?: string;
  flat: number;
  room_amount: number;
  floor: number;
  price: number;
  house: House;
  size: number
}
