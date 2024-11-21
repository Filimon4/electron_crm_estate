import { ipcMain } from "electron";
import { UsersNamespace } from "../db/actions/actionsUsers";
import { HashPasswordsNamespace } from "../modules/Hash";
import { goFront } from "../utils/app";

export class AuthService {

  static async login(email: string, phone: string, password: string) {
    const user = await UsersNamespace.getUser(email, phone)
    if (!user) {
      goFront('onNotify')
      return
    }
    if (!HashPasswordsNamespace.checkPassword(password, user.password)) {
      goFront('onNotify')
      return
    }
    return user
  }

  static async signup(data: any) {
    return await UsersNamespace.createUser(data)
  }
}
