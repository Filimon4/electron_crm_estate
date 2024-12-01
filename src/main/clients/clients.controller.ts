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
  
  async createClient(event: any, client: TClientDTO) {
    console.log('createClient backend: ', JSON.stringify(client, null, 2))
  }
  
  async updateClient(event: any, client: TClientDTO) {
    console.log('updateClient backend: ', JSON.stringify(client, null, 2))
  }
  
  async deleteClient(event: any, email: string) {
    console.log('deleteClient backend: ', email)
  }

}
