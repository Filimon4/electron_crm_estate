import { ipcMain } from "electron";
import { TEstateDTO } from "./estates.dto";
import { EstateNamespace } from "../db/actions/actionsEstate";

export class EstateController {

  constructor () {
    ipcMain.handle('getEstate', this.getEstates.bind(this))
    ipcMain.handle('createEstate', this.createEstate.bind(this))
    ipcMain.handle('updateEstate', this.updateEstate.bind(this))
    ipcMain.handle('deleteEstate', this.deleteEstate.bind(this))
  }

  async getEstates() {
    const data = await EstateNamespace.getAllFlats()
    return data
  }
  
  async createEstate(event: any, estate: TEstateDTO) {
    console.log(estate)
    return await EstateNamespace.createFlat({
      description: ' ',
      flat: +estate.flat,
      floor: +estate.floor,
      house_id: +estate.house,
      price: +estate.price,
      room_amount: +estate.room_amount,
      size: +estate.size
    })
  }
  
  async updateEstate(event: any, estate: TEstateDTO) {
    const flat = await EstateNamespace.getFlatById(estate.id)
    return await EstateNamespace.updateFlat(flat.id, {
      description: estate.description,
      flat: +estate.flat,
      floor: +estate.floor,
      price: +estate.price,
      room_amount: +estate.room_amount,
      size: +estate.size
    })
  }
  
  async deleteEstate(event: any, id: number) {
    return await EstateNamespace.deleteFlat(id)
  }

}
