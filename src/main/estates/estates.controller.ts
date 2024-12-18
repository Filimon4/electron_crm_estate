import { ipcMain } from "electron";
import { TFlatDTO } from "./estates.dto";
import { EstateNamespace } from "../db/actions/actionsEstate";
import { EstateService } from "./estates.service";

export class EstateController {
  constructor () {
    ipcMain.handle('createFlat', this.createFlat.bind(this))
    ipcMain.handle('createHouse', this.createHouse.bind(this))
    ipcMain.handle('updateFlat', this.updateFlat.bind(this))
    ipcMain.handle('updateHouse', this.updateHouse.bind(this))
    ipcMain.handle('deleteFlat', this.deleteFlat.bind(this))
    ipcMain.handle('deleteHouse', this.deleteHouse.bind(this))
    ipcMain.handle('getFlatesByPage', this.getFlatesByPage.bind(this))
    ipcMain.handle('getHousesByPage', this.getHousesByPage.bind(this))
    ipcMain.handle('findHouses', this.findHouses.bind(this))
  }

  async findHouses(event: any, input: string) {
    
  }

  async createFlat(event: any, data: TFlatDTO) {
    return await EstateService.createFlat(data)
  }
  async createHouse(event: any) {
  }
  async updateFlat(event: any, data: TFlatDTO) {
    return await EstateService.updateFlat(data)
  }
  async updateHouse(event: any) {

  }
  async deleteFlat(event: any, id: TFlatDTO['id']) {
    return await EstateService.deleteFlat(id) 
  }
  async deleteHouse(event: any) {

  }
  async getFlatesByPage(event: any, page: number, limit: number) {
    return await EstateService.getFlatesByPage(page, limit)
  }
  async getHousesByPage(event: any, page: number, limit: number) {
    return await EstateService.getHousesByPage(page, limit)
  }
}
