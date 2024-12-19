import DB from "./db";
import { AuthController } from "./auth/auth.controller";
import { ClientController } from "./clients/clients.controller";
import { EstateController } from "./estates/estates.controller";
import { EventsController } from "./events/events.controller";
import { RealtorController } from "./realtors/realtors.controller";
import { createWindow } from "./utils/app";
import { DealsController } from "./deals/deals.controller";

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
    new DealsController()
    createWindow()
  }

}

export default App