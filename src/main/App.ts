import { AuthController } from "./auth/auth.controller";
import { ClientController } from "./clients/clients.controller";
import DB from "./db";
import { EstateController } from "./estates/estates.controller";
import { createWindow } from "./utils/app";

class App {
  constructor() {
    this.initDB()
  }
  
  async initDB() {
    DB.initialize().then(() => {
      this.onInitDB()
    })
  }
  
  async onInitDB() {
    new AuthController()
    new ClientController()
    new EstateController()
    createWindow()
  }

}

export default App