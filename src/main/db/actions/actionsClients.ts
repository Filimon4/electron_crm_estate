import { TClientDTO, TUpdateClientDTO } from "src/main/clients/clients.dto";
import { Client as _Client } from "../entities";

export namespace ClientsNamespace {
  
  export const createClient = async (clientData: TClientDTO) => {
    const user = await dbConnection(_Client).create(clientData);
    return await dbConnection(_Client).save(user);
  }

  export const updateClient = async (id: number, updates: Partial<_Client>): Promise<_Client | null> => {
    const userRepository = await dbConnection(_Client);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    Object.assign(user, updates);
    return await userRepository.save(user);
  };
  

  export const deleteClient = async (id: number): Promise<boolean> => {
    const userRepository = await dbConnection(_Client);
    const result = await userRepository.delete(id);
    return result.affected !== 0;
  };
  

  export const getAllClients = async (): Promise<_Client[]> => {
    const userRepository = await dbConnection(_Client);
    return await userRepository.find();
  };

  export const getClientById = async (id: number): Promise<_Client | null> => {
    const userRepository = await dbConnection(_Client);
    return await userRepository.findOne({ where: { id } });
  };
  
  export const getClientByEmail = async (email: string): Promise<_Client | null> => {
    const userRepository = await dbConnection(_Client)
    return await userRepository.findOne({ where: { email } });
  };
  

}
