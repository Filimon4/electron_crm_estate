import { ipcMain } from "electron";
import { TDealDto, TDealInfoDto } from "./deals.dto";
import { DealsService } from "./deals.service";


export class DealsController {

  constructor() {
    ipcMain.handle('createDeal', this.createDeal.bind(this))
    ipcMain.handle('updateDeal', this.updateDeal.bind(this))
    ipcMain.handle('deleteDeal', this.deleteDeal.bind(this))
    ipcMain.handle('getDealsByPage', this.getDealsByPage.bind(this))
    ipcMain.handle('countDeals', this.countDeals.bind(this))
  }

  async createDeal(event: any, user_id: number, data: TDealDto) {
    return await DealsService.createDeal(user_id, data)
  }

  async updateDeal(event: any, data: TDealDto) {
    return await DealsService.updateDeal(data)
  }

  async deleteDeal(event: any, id: number) {
    return await DealsService.deleteDeal(id)
  }

  async getDealsByPage(event: any, user_id: number, page: number, limit: number) {
    const [deals, count] = await DealsService.getDealsByPage(user_id, page, limit)
    deals.map(deal => this.parseDealToDto(deal))
    console.log(deals)
    return {
      deals: deals,
      count: count
    }
  }

  async countDeals(event: any, user_id: number) {
    return await DealsService.countDeals(user_id)
  }

  public parseDealToDto(deal: any): TDealInfoDto {
    return {
      status: deal.status,
      opened: new Date(deal.created_at),
      closed: deal.closed_at ? new Date(deal.closed_at) : null,
      client: {
        phone: deal.client.phone,
        email: deal.client.email,
      },
      flat: {
        size: deal.flat.size,
        flat: deal.flat.flat,
        floor: deal.flat.floor,
        room_amount: deal.flat.room_amount,
        house: {
          street: deal.flat.house.street || '',
          house_number: deal.flat.house.house_number || 0,
        },
      },
    };
  }
  
}
