import { ipcMain } from "electron";
import { RealtorsService } from "./realtors.service";

export class RealtorController {

  constructor() {
    ipcMain.handle('getRealtor', this.getRealtor.bind(this))
  }

  async getRealtor() {
    const realtors = await RealtorsService.getAllRealtors()
    if (!realtors || realtors.length === 0) return []
    return  realtors
  }



}
