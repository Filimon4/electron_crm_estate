import { Between, Like } from "typeorm";
import { Client, Deal, DealStatus, User } from "../db/entities";
import { TDealDto, TFiltersDealDto } from "./deals.dto";


export class DealsService {

  static async createDeal(user_id: number, data: TDealDto) {
    const dealRepository = await dbConnection(Deal);

    const deal = dealRepository.create({
      realtor: user_id,
      flat: data.flat_id,
      client: data.client_id,
    });
    
    return await dealRepository.save(deal);
  }

  static async updateDeal(data: TDealDto) {
    const dealRepository = await dbConnection(Deal);

    // Ищем существующую сделку
    const deal = await dealRepository.findOne({
      where: {
        flat: data.flat_id,
        client: data.client_id,
      },
    });

    if (!deal) throw new Error('Deal not found');

    if (deal.status !== data.status) {
      deal.status = data.status
      if (deal.status == DealStatus.close) {
        deal.closed_at = new Date()
      } else {
        deal.closed_at = null
      }
    }

    return await dealRepository.update(deal.id, {
      status: deal.status,
      closed_at: deal.closed_at
    });
  }

  static async deleteDeal(id: number) {
    const dealRepository = await dbConnection(Deal);

    const deal = await dealRepository.findOne({where: {id: id}});
    if (!deal) throw new Error('Deal not found');

    return await dealRepository.remove(deal);
  }

  static async getDealsByPage(userId: number, page: number, limit: number, filters: TFiltersDealDto) {
    const dealRepository = await dbConnection(Deal);
    const whereConditions: {[k in any]: any} = {}
    Object.entries(filters ?? {}).forEach(([k, v]) => {
      if (typeof v == 'string' && k == 'status')
        whereConditions[k] = v == 'open' ? DealStatus.open : DealStatus.close
      if (typeof v == 'object' && 'length' in v && v.length == 2)
        whereConditions[`flat.${k}`] = Between(+v[0], +v[1])
    });
    return await dealRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        client: true as unknown as never,
        flat: {
          //@ts-ignore
          house: true as unknown as never 
        },
      },
      where: {
        ...whereConditions,
        realtor: userId
      },
    });
  }

  static async countDeals(userId: number) {
    const dealRepository = await dbConnection(Deal);

    const count = await dealRepository.count({
      where: { realtor: userId },
    });

    return count;
  }
}
