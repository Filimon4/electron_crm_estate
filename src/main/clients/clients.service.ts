import { ClientsNamespace } from "../db/actions/actionsClients";
import { Client as _Client } from "../db/entities";
import { TClientDTO } from "./clients.dto";

export class ClientsService {

  static async getAll(): Promise<TClientDTO[]> {
    const clients: _Client[] = await ClientsNamespace.getAllClients()
    return clients
  }

}
