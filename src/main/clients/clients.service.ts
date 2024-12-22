import { ClientsNamespace } from "../db/actions/actionsClients";
import { Client as _Client } from "../db/entities";
import { TFilterClientDTO } from "./clients.dto";

export class ClientsService {

  static async getClientsByPage(userId: number, page: number, limit: number, filters: TFilterClientDTO) {
    const data = await ClientsNamespace.getClientsByPage(userId, page, limit, filters)
    console.log(JSON.stringify(data, null, 2))
    return {
      clients: data,
      count: data.length ?? 0
    }
  }

  static async searchClients(input: string) {
    return await ClientsNamespace.searchClient(input)
  }

}
