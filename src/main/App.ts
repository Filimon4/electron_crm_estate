import DB from "./db";
import { AuthController } from "./auth/auth.controller";
import { ClientController } from "./clients/clients.controller";
import { EstateController } from "./estates/estates.controller";
import { EventsController } from "./events/events.controller";
import { RealtorController } from "./realtors/realtors.controller";
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
    new RealtorController()
    new EventsController()
    createWindow()
  }

}

export default App