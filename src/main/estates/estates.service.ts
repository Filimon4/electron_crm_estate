import { EstateNamespace } from "../db/actions/actionsEstate";

export class EstateService {

  static async getAllEstate() {
    return await EstateNamespace.getAll()
  }

}