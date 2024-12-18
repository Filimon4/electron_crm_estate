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
