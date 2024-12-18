import { ipcMain } from "electron";


export class EventsController {

  constructor() {
    ipcMain.handle('createEvent', this.createEvent.bind(this))
    ipcMain.handle('updateEvent', this.updateEvent.bind(this))
    ipcMain.handle('deleteEvent', this.deleteEvent.bind(this))
  }

  async createEvent(event: any, data: any) {
    console.log(data)
  }

  async updateEvent(event: any, data: any) {
    console.log(data)
  }

  async deleteEvent(event: any, data: any) {
    console.log(data)
  }
}
