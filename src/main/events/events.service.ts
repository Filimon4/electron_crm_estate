import { EventNamespace } from "../db/actions/actionsEvent";


export class EventsService {

  static async createEvent(user_id: number, data: any) {
    return await EventNamespace.createEvent(data.title, data.start, data.end, data.allDay, user_id)
  }
  static async updateEvent(user_id: number, data: any) {
    return await EventNamespace.updateEvent(data.id, data.title, data.start, data.end, data.allDay, user_id)
  }
  static async deleteEvent(user_id: number, data: any) {
    return await EventNamespace.deleteEvent(data.id, user_id)
  }
  static async getAllEvents(user_id: number) {
    console.log(user_id)
    const result = await EventNamespace.getAllEvents(user_id)
    console.log(result[0])
    return result
  }

}
