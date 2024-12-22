import { TUserDTO } from "../auth/auth.dto";
import { UsersNamespace } from "../db/actions/actionsUsers";
import { User as _User } from "../db/entities";
import { TFilterRealtorDTO, TRealtorDTO } from "./realtors.dto";

export class RealtorsService {

  static async resetPassword(user_id: number, realtor_id: number, password: string) {
    return await UsersNamespace.resetPassword(user_id, realtor_id, password)
  }

  static async getRealtorsByPage(page: number, limit: number, filters: TFilterRealtorDTO) {
    console.log(JSON.stringify(filters, null, 2))
    const realtors = await UsersNamespace.getRealtorsByPage(page, limit, filters)
    return {
      realtors: realtors,
      count: realtors.length ?? 0
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
