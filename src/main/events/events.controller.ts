import { ipcMain } from "electron";
import { EventsService } from "./events.service";


export class EventsController {

  constructor() {
    ipcMain.handle('createEvent', this.createEvent.bind(this))
    ipcMain.handle('updateEvent', this.updateEvent.bind(this))
    ipcMain.handle('deleteEvent', this.deleteEvent.bind(this))
    ipcMain.handle('getAllEvents', this.getAllEvents.bind(this))
  }

  async createEvent(event: any, user_id: number, data: any) {
    return await EventsService.createEvent(user_id, data)
  }

  async updateEvent(event: any, user_id: number, data: any) {
    return await EventsService.updateEvent(user_id, data)
  }

  async deleteEvent(event: any, user_id: number, data: any) {
    return await EventsService.deleteEvent(user_id, data)
  }

  async getAllEvents(event: any, user_id: number) {
    return await EventsService.getAllEvents(user_id)
  }
}
