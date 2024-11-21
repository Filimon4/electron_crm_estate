import { ipcMain } from "electron";
import { TClientDTO } from "./clients.dto";
import { ClientsService } from "./clients.service";

export class ClientController {

  constructor () {
    ipcMain.handle('getClients', this.getClients.bind(this))
    ipcMain.handle('createClient', this.createClient.bind(this))
    ipcMain.handle('updateClient', this.updateClient.bind(this))
    ipcMain.handle('deleteClient', this.deleteClient.bind(this))
  }

  async getClients() {
    return await ClientsService.getAll()
  }
  
  async createClient(client: TClientDTO) {
    console.log('createClient backend')
  }
  
  async updateClient(client: TClientDTO) {
    console.log('updateClient backend')
  }
  
  async deleteClient(id: number) {
    console.log('deleteClient backend')
  }

}
