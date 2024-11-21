import { ipcMain } from "electron";
import { TEstateDTO } from "./estates.dto";
import { EstateService } from "./estates.service";

export class EstateController {

  constructor () {
    ipcMain.handle('getEstate', this.getEstates.bind(this))
    ipcMain.handle('createEsate', this.createEstate.bind(this))
    ipcMain.handle('updateEsate', this.updateEstate.bind(this))
    ipcMain.handle('deleteEsate', this.deleteEstate.bind(this))
  }

  async getEstates() {
    const data = await EstateService.getAllEstate()
    return [...data]
  }
  
  async createEstate(estate: TEstateDTO) {
    console.log('createEstate backend')
  }
  
  async updateEstate(estate: TEstateDTO) {
    console.log('updateEstate backend')
  }
  
  async deleteEstate(id: number) {
    console.log('deleteEstate backend')
  }

}
