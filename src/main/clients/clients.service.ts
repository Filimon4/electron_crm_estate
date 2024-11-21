import { ClientsNamespace } from "../db/actions/actionsClients";
import { Client as _Client } from "../db/entities";
import { TClientDTO } from "./clients.dto";

export class ClientsService {

  static async getAll(): Promise<TClientDTO[]> {
    const clients: _Client[] = await ClientsNamespace.getAll()
    const pipedClients: TClientDTO[] = clients.map(c => ({
      email: c.email,
      firstName: c.first_name,
      lastName: c.last_name,
      secondName: c.sure_name,
      phone: c.phone
    }))
    return pipedClients
  }

}
