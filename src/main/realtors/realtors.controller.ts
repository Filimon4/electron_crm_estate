import { ipcMain } from "electron";
import { RealtorsService } from "./realtors.service";
import { UsersNamespace } from "../db/actions/actionsUsers";
import { TUserDTO } from "../auth/auth.dto";

export class RealtorController {

  constructor() {
    ipcMain.handle('getRealtor', this.getRealtor.bind(this))
    ipcMain.handle('createRealtor', this.createRealtor.bind(this))
    ipcMain.handle('updateRealtor', this.updateRealtor.bind(this))
    ipcMain.handle('deleteRealtor', this.deleteRealtor.bind(this))
  }

  async getRealtor() {
    const realtors = await RealtorsService.getAllRealtors()
    if (!realtors || realtors.length === 0) return []
    return  realtors
  }

  async createRealtor(event: any, estate: TUserDTO) {
    console.log(estate)
    return await UsersNamespace.createUser(estate)
  }

  async updateRealtor(event: any, estate: TUserDTO) {
    return await UsersNamespace.updateUser(estate.id, estate)
  }

  async deleteRealtor(event: any, id: number) {
    return await UsersNamespace.deleteUser(id)
  }

}
