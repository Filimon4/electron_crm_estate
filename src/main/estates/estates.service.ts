import { ClientsNamespace } from "../db/actions/actionsClients";
import { EstateNamespace } from "../db/actions/actionsEstate";
import { House } from "../db/entities";
import { Complex } from "../db/entities/Complex";
import { TFilterComplexDTO, TFilterFlatDTO, TFilterHouseDTO, TFlatDTO } from "./estates.dto";

export class EstateService {
  static async createComplex(data: Complex) {
    return await EstateNamespace.createComplex(data)
  }
  static async updateComplex(data: Complex) {
    return await EstateNamespace.updateComplex(data.id, data)
  }
  static async deleteComplex(id: number) {
    return await EstateNamespace.deleteComplex(id)
  }
  static async searchComplex(input: string) {
    return await EstateNamespace.searchComplex(input)
  }
  static async getComplexesByPage(page: number, limit: number, filters: TFilterComplexDTO) {
    const complexes = await EstateNamespace.getComplexesByPage(page, limit, filters)
    return {
      complexes: complexes,
      count: complexes.length ?? 0
    }
  }

  static async createHouse(data: House) {
    return await EstateNamespace.createHouse(data)
  }
  static async updateHouse(data: House) {
    return await EstateNamespace.updateHouse(data.id, data)
  }
  static async deleteHouse(id: number) {
    return await EstateNamespace.deleteHouse(id)
  }
  static async searchHouses(input: string) {
    return await EstateNamespace.searchHouses(input)
  }
  static async getHousesByPage(page: number, limit: number, filters: TFilterHouseDTO) {
    const houses = await EstateNamespace.getHousesByPage(page, limit, filters)
    return {
      houses: houses,
      count: houses?.length ?? 0
    }
  }


  static async getFlatesByPage(page: number, limit: number, filters: TFilterFlatDTO) {
    const flats = await EstateNamespace.getFlatsByPage(page, limit, filters)
    return {
      flats: flats,
      count: flats?.length ?? 0
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
