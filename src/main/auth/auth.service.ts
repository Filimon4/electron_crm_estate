import { ipcMain } from "electron";
import { UsersNamespace } from "../db/actions/actionsUsers";
import { HashPasswordsNamespace } from "../modules/Hash";
import { goFront, sendNotify } from "../utils/app";

export class AuthService {

  static async login(email: string, phone: string, password: string) {
    const user = await UsersNamespace.getUser(email, phone)
    if (!user) {
      sendNotify('error', 'Пользователь не найден')
      return
    }
    if (!HashPasswordsNamespace.checkPassword(password, user.password)) {
      sendNotify('error', 'Неверный пароль')
      return
    }
    sendNotify('success', 'Авторизация прошла успешна')
    return user
  }

  static async signup(data: any) {
    return await UsersNamespace.createUser(data)
  }
}
