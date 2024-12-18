import { TUserDTO } from "../auth/auth.dto";
import { UsersNamespace } from "../db/actions/actionsUsers";
import { User as _User } from "../db/entities";
import { TRealtorDTO } from "./realtors.dto";

export class RealtorsService {

  static async getRealtorsByPage(page: number, limit: number) {
    const [realtors, count] = await UsersNamespace.getRealtorsByPage(page, limit)
    return {
      realtors: realtors,
      count: count
    }
  }

  static async createRealtor(estate: TUserDTO) {
    return await UsersNamespace.createUser(estate)
  }

  static async updateRealtor(state: TUserDTO) {
    return await UsersNamespace.updateUser(state.id, state)
  }

  static async deleteRealtor(id: number) {
    return await UsersNamespace.deleteUser(id)
  }

}
