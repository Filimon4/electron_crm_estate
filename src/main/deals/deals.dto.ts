import { DealStatus } from "../db/entities"

export interface TDealDto {
  user_id: number,
  client_id: number,
  flat_id: number,
  status: DealStatus
}

export interface TDealInfoDto {
  status: DealStatus,
  opened: Date,
  closed: Date,
  client: {
    phone: string,
    email: string,
  },
  flat: {
    size: number,
    flat: number,
    floor: number,
    room_amount: number,
    house: {
      street: string,
      house_number: number,
    }
  }
}
