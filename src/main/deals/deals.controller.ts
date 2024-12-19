import { ipcMain } from "electron";
import { TDealDto } from "./deals.dto";
import { DealsService } from "./deals.service";


export class DealsController {

  constructor() {
    ipcMain.handle('createDeal', this.createDeal.bind(this))
    ipcMain.handle('updateDeal', this.updateDeal.bind(this))
    ipcMain.handle('deleteDeal', this.deleteDeal.bind(this))
    ipcMain.handle('getDealsByPage', this.getDealsByPage.bind(this))
    ipcMain.handle('countDeals', this.countDeals.bind(this))
  }

  async createDeal(event: any, userId: number, data: TDealDto) {
    return await DealsService.createDeal(userId, data)
  }

  async updateDeal(event: any, data: TDealDto) {
    return await DealsService.updateDeal(data)
  }

  async deleteDeal(event: any, id: number) {
    return await DealsService.deleteDeal(id)
  }

  async getDealsByPage(event: any, userId: number, page: number, limit: number) {
    return await DealsService.getDealsByPage(userId, page, limit)
  }

  async countDeals(event: any, userId: number) {
    return await DealsService.countDeals(userId)
  }
  
}
