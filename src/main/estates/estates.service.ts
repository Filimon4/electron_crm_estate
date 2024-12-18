import { ClientsNamespace } from "../db/actions/actionsClients";
import { EstateNamespace } from "../db/actions/actionsEstate";
import { TFlatDTO } from "./estates.dto";

export class EstateService {

  static async getFlatesByPage(page: number, limit: number) {
    const [flats, count] = await EstateNamespace.getFlatsByPage(page, limit)
    return {
      flats: flats,
      count: count
    }
  }

  static async getHousesByPage(page: number, limit: number) {
    const [houses, count] = await EstateNamespace.getHousesByPage(page, limit)
    return {
      houses: houses,
      count: count
    }
  }

  static async createFlat(data: TFlatDTO) {
    const result = await EstateNamespace.createFlat(data)
    console.log(result)
    return result
  }

  static async updateFlat(data: TFlatDTO) {
    return await EstateNamespace.updateFlat(data.id, data)
  }

  static async deleteFlat(id: number) {
    return await EstateNamespace.deleteFlat(id)
  }

  static async searchHouses(input: string) {
    return await EstateNamespace.searchHouses(input)
  }

  static async searchFlats(input: string) {
    return await EstateNamespace.searchFlats(input)
  }

  static async searchClients(input: string) {
    return await ClientsNamespace.searchClient(input)
  }

}
