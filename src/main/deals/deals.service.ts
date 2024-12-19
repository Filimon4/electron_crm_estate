import { Client, Deal, DealStatus, User } from "../db/entities";
import { TDealDto } from "./deals.dto";


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

    // Обновляем данные сделки
    deal.realtor = data.user_id;
    deal.updated_at = new Date();

    return await dealRepository.save(deal);
  }

  static async deleteDeal(id: number) {
    const dealRepository = await dbConnection(Deal);

    const deal = await dealRepository.findOne({where: {id: id}});
    if (!deal) throw new Error('Deal not found');

    return await dealRepository.remove(deal);
  }

  static async getDealsByPage(userId: number, page: number, limit: number) {
    const dealRepository = await dbConnection(Deal);

    return await dealRepository.findAndCount({
      where: { realtor: userId },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        client: true as unknown as never,
        flat: {
          //@ts-ignore
          house: true as unknown as never 
        },
      }
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
