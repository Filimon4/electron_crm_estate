import { ipcMain } from "electron";
import { RealtorsService } from "./realtors.service";
import { TUserDTO } from "../auth/auth.dto";
import { TFilterRealtorDTO } from "./realtors.dto";

export class RealtorController {

  constructor() {
    ipcMain.handle('createRealtor', this.createRealtor.bind(this))
    ipcMain.handle('updateRealtor', this.updateRealtor.bind(this))
    ipcMain.handle('deleteRealtor', this.deleteRealtor.bind(this))
    ipcMain.handle('getRealtorsByPage', this.getRealtorsByPage.bind(this))
    ipcMain.handle('resetPassword', this.resetPassword.bind(this))
  }

  async resetPassword(event: any, user_id: number, realtor_id: number, password: string) {
    return await RealtorsService.resetPassword(user_id, realtor_id, password)
  }

  async getRealtorsByPage(event: any, page: number, limit: number, filters: TFilterRealtorDTO) {
    return await RealtorsService.getRealtorsByPage(page, limit, filters)
  }

  async createRealtor(event: any, estate: TUserDTO) {
    return await RealtorsService.createRealtor(estate)
  }

  async updateRealtor(event: any, state: TUserDTO) {
    return await RealtorsService.updateRealtor(state)
  }

  async deleteRealtor(event: any, id: number) {
    return await RealtorsService.deleteRealtor(id)
  }

}
