import { TClientDTO, TUpdateClientDTO } from "../../clients/clients.dto";
import { Client as _Client } from "../entities";
import { getPostgresErrorMessage } from "../../utils/pqErrors";
import { sendNotify } from "../../utils/app";

// TODO: сделать выборку по строкам, для пагинации
export namespace ClientsNamespace {
  
  export const createClient = async (clientData: TClientDTO) => {
    try {
      const user = await dbConnection(_Client).create();
      user.first_name = clientData.first_name
      user.sure_name = clientData.sure_name
      user.last_name = clientData.last_name
      user.email = clientData.email
      user.phone = clientData.phone
      return await dbConnection(_Client).save(user);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const updateClient = async (id: number, updates: Partial<_Client>): Promise<_Client | null> => {
    try {
      const userRepository = await dbConnection(_Client);
      const user = await userRepository.findOne({ where: { id } });
      if (!user) {
        return null;
      }
      Object.assign(user, updates);
      return await userRepository.save(user);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
  

  export const deleteClient = async (id: number): Promise<boolean> => {
    try {
      const userRepository = await dbConnection(_Client);
      const result = await userRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
  
  export const getCountClientsByUser = async (userId: number): Promise<number> => {
    try {
      return await dbConnection(_Client).countBy({
        realtor_id: userId
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getUserClientsByPage = async (userId: number, page: number, limit: number) => {
    try {
      return await dbConnection(_Client).find({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
        where: {
          realtor_id: userId
        }
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getAllClients = async (): Promise<_Client[]> => {
    try {
      return await dbConnection(_Client).find();
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getClientsById = async (id: number): Promise<_Client | null> => {
    try {
      const userRepository = await dbConnection(_Client);
      return await userRepository.findOne({ where: { id } });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
  
  export const getClientByEmail = async (email: string): Promise<_Client | null> => {
    try {
      const userRepository = await dbConnection(_Client)
      return await userRepository.findOne({ where: { email } });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
}
