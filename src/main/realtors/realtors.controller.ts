import { ipcMain } from "electron";
import { RealtorsService } from "./realtors.service";

export class RealtorController {

  constructor() {
    ipcMain.handle('getRealtor', this.getRealtor.bind(this))
    ipcMain.handle('createRealtor', this.getRealtor.bind(this))
    ipcMain.handle('updateRealtor', this.getRealtor.bind(this))
    ipcMain.handle('deleteRealtor', this.getRealtor.bind(this))
  }

  async getRealtor() {
    const realtors = await RealtorsService.getAllRealtors()
    if (!realtors || realtors.length === 0) return []
    return  realtors
  }

  async createRealtor(event: any, estate: any) {
    console.log(estate)
  }

  async updateRealtor(event: any, estate: any) {
    console.log(estate)
  }

  async deleteRealtor(event: any, id: any) {
    console.log(id)
  }

}
