import { ipcMain } from "electron";
import { TClientDTO } from "./clients.dto";

export class ClientController {

  constructor () {
    ipcMain.handle('getClients', this.getClients.bind(this))
    ipcMain.handle('createClient', this.createClient.bind(this))
    ipcMain.handle('updateClient', this.updateClient.bind(this))
    ipcMain.handle('deleteClient', this.deleteClient.bind(this))
  }

  async getClients() {
    console.log('getClient backend')
    return [
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
      ['Рыков',	'Ефим',	'Витальевич',	'+79091304497',	'f.rykov@bk.ru'],
    ]
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
