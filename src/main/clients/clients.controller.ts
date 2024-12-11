import { ipcMain } from "electron";
import { TClientDTO } from "./clients.dto";
import { ClientsService } from "./clients.service";
import { ClientsNamespace } from "../db/actions/actionsClients";

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
    return await ClientsNamespace.createClient(client)
  }
  
  async updateClient(event: any, client: TClientDTO) {
    console.log(client)
    return await ClientsNamespace.updateClient(client.id, client)
  }
  
  async deleteClient(event: any, id: number) {
    return await ClientsNamespace.deleteClient(id)
  }

}
