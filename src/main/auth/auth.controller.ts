import { ipcMain } from "electron";
import { AuthService } from "./auth.service";

export class AuthController {

  constructor() {

    ipcMain.handle('login', this.login.bind(this))
    ipcMain.handle('logout', this.logout.bind(this))
    ipcMain.handle('signup', this.signup.bind(this))
  }

  private async login(event: any, data: any) {
    return AuthService.login(data.email, data.phone, data.password)
  }

  private async logout(event: any, data: any) {
    console.log('logout')
    AuthService.logout()
  }

  private async signup(event: any, data: any) {
    return AuthService.signup(data)
  }

}
