import { ipcMain } from "electron";
import { AuthService } from "./auth.service";

export class AuthController {

  constructor() {

    ipcMain.handle('login', this.login.bind(this))
    ipcMain.handle('logout', this.logout.bind(this))
    ipcMain.handle('signup', this.signup.bind(this))
  }

  private async login(...args: any) {
    console.log('login')
    AuthService.login()
  }

  private async logout(...args: any) {
    console.log('logout')
    AuthService.logout()
  }

  private async signup(...args: any) {
    console.log('signup')
    AuthService.signup()
  }

}
