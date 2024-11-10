import { TClientDTO, TUpdateClientDTO } from "src/main/clients/clients.dto";
import { Client as _Client } from "../entities";

export namespace ClientsNamespace {
  
  export const createClient = async (clientData: TClientDTO) => {
    const client = new _Client()
    client.email = clientData.email
    client.phone = clientData.phone
    client.first_name = clientData.firstName
    client.sure_name = clientData.secondName
    client.last_name = clientData.lastName
    await dbConnection(_Client).save(client)
  }

  export const updateClient = async (client: TUpdateClientDTO) => {

  }

  export const deleteClient = async (id: number) => {
    await dbConnection(_Client).delete(id)
  }

  export const getAll = async () => {
    return dbConnection(_Client).find()
  }

}
