import { UsersNamespace } from "../db/actions/actionsUsers";
import { User as _User } from "../db/entities";
import { TRealtorDTO } from "./realtors.dto";

export class RealtorsService {

  static async getAllRealtors(): Promise<TRealtorDTO[]> {
    const users: _User[] = await UsersNamespace.getAllRealtors()
    const realtors: TRealtorDTO[] = users.map(u => ({
      email: u.email,
      firstName: u.first_name,
      lastName: u.last_name,
      secondName: u.sure_name,
      password: u.password,
      phone: u.phone
    }))
    return realtors
  }

  static async getAll() {
    return await UsersNamespace.getAll()
  }

}
