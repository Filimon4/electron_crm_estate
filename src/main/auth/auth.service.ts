import { UsersNamespace } from "../db/actions/actionsUsers";
import { HashPasswordsNamespace } from "../modules/Hash";

export class AuthService {

  static async login(email: string, phone: string, password: string) {
    const user = await UsersNamespace.getUser(email, phone)
    console.log(user)
    if (!user) return null
    if (!HashPasswordsNamespace.checkPassword(password, user.password)) return null
    return user
  }

  static async signup(data: any) {
    return await UsersNamespace.createUser(data)
  }

}
