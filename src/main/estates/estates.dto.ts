import { House } from "../db/entities";

export type TEstateDTO = {
  flat: number;
  room_amount: number;
  floor: number;
  price: number;
  house: House
}
