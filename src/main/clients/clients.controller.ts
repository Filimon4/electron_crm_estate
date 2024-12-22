import { ipcMain } from "electron";
import { TClientDTO, TFilterClientDTO } from "./clients.dto";
import { ClientsService } from "./clients.service";
import { ClientsNamespace } from "../db/actions/actionsClients";

export class ClientController {

  constructor () {
    ipcMain.handle('getClientsByPage', this.getClientsByPage.bind(this))
    ipcMain.handle('createClient', this.createClient.bind(this))
    ipcMain.handle('updateClient', this.updateClient.bind(this))
    ipcMain.handle('deleteClient', this.deleteClient.bind(this))
    ipcMain.handle('searchClients', this.searchClients.bind(this))
  }

  async searchClients(event: any, input: string) {
      const result = await ClientsService.searchClients(input)
      return result
  }

  async getClientsByPage(event: any, userId: number, page: number, limit: number, filters: TFilterClientDTO) {
    return await ClientsService.getClientsByPage(userId, page, limit, filters)
  }
  
  async createClient(event: any, userId: number, client: TClientDTO) {
    return await ClientsNamespace.createClient(userId, client)
  }
  
  async updateClient(event: any, client: TClientDTO) {
    return await ClientsNamespace.updateClient(client.id, client)
  }
  
  async deleteClient(event: any, id: number) {
    return await ClientsNamespace.deleteClient(id)
  }

}
