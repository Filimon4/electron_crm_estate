import { ClientsNamespace } from "../db/actions/actionsClients";
import { EstateNamespace } from "../db/actions/actionsEstate";
import { House } from "../db/entities";
import { Complex } from "../db/entities/Complex";
import { TFlatDTO } from "./estates.dto";

export class EstateService {
  static async createComplex(data: Complex) {
    return await EstateNamespace.createComplex(data)
  }
  static async updateComplex(data: Complex) {
    return await EstateNamespace.updateComplex(data.id, data)
  }
  static async deleteCopmlex(id: number) {
    return await EstateNamespace.deleteComplex(id)
  }
  static async searchComplex(input: string) {
    return await EstateNamespace.searchComplex(input)
  }
  static async getComplexesByPage(page: number, limit: number) {
    const [complexes, count] = await EstateNamespace.getComplexesByPage(page, limit)
    return {
      complexes: complexes,
      count: count
    }
  }

  static async createHous(data: House) {
    return await EstateNamespace.createHouse(data)
  }
  static async updateHouse(data: House) {
    return await EstateNamespace.updateHouse(data.id, data)
  }
  static async deleteHouse(id: number) {
    return await EstateNamespace.deleteHouse(id)
  }
  static async searchHouses(input: string) {
    console.log(input)
    return await EstateNamespace.searchHouses(input)
  }
  static async getHousesByPage(page: number, limit: number) {
    const [houses, count] = await EstateNamespace.getHousesByPage(page, limit)
    return {
      houses: houses,
      count: count
    }
  }


  static async getFlatesByPage(page: number, limit: number) {
    const [flats, count] = await EstateNamespace.getFlatsByPage(page, limit)
    return {
      flats: flats,
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
  static async searchFlats(input: string) {
    return await EstateNamespace.searchFlats(input)
  }
}
