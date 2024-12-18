import { ClientsNamespace } from "../db/actions/actionsClients";
import { Client as _Client } from "../db/entities";

export class ClientsService {

  static async getClientsByPage(userId: number, page: number, limit: number) {
    const data = await ClientsNamespace.getUserClientsByPage(userId, page, limit)
    const count = await ClientsNamespace.getCountClientsByUser(userId)
    return {
      clients: data,
      count: count
    }
  }

}
