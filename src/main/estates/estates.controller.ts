import { ipcMain } from "electron";
import { TFilterComplexDTO, TFilterFlatDTO, TFilterHouseDTO, TFlatDTO } from "./estates.dto";
import { EstateService } from "./estates.service";
import { Complex, House } from "../db/entities";

export class EstateController {
  constructor () {
    ipcMain.handle('createFlat', this.createFlat.bind(this))
    ipcMain.handle('updateFlat', this.updateFlat.bind(this))
    ipcMain.handle('deleteFlat', this.deleteFlat.bind(this))
    ipcMain.handle('getFlatesByPage', this.getFlatesByPage.bind(this))
    ipcMain.handle('searchFlats', this.searchFlats.bind(this))
    
    ipcMain.handle('createHouse', this.createHouse.bind(this))
    ipcMain.handle('updateHouse', this.updateHouse.bind(this))
    ipcMain.handle('deleteHouse', this.deleteHouse.bind(this))
    ipcMain.handle('getHousesByPage', this.getHousesByPage.bind(this))
    ipcMain.handle('searchHouses', this.searchHouses.bind(this))
    
    ipcMain.handle('createComplex', this.createComplex.bind(this))
    ipcMain.handle('updateComplex', this.updateComplex.bind(this))
    ipcMain.handle('deleteComplex', this.deleteComplex.bind(this))
    ipcMain.handle('searchComplex', this.searchComplex.bind(this))
    ipcMain.handle('getComplexesByPage', this.getComplexesByPage.bind(this))
  }

  async createComplex(event: any, data: Complex) {
    return await EstateService.createComplex(data)
  }
  async updateComplex(event: any, data: Complex) {
    return await EstateService.updateComplex(data)
  }
  async deleteComplex(event: any, id: number) {
    return await EstateService.deleteComplex(id)
  }
  async searchComplex(event: any, input: string) {
    return await EstateService.searchComplex(input)
  }
  async getComplexesByPage(eventL: any, page: number, limit: number, filters: TFilterComplexDTO) {
    return await EstateService.getComplexesByPage(page, limit, filters)
  }


  async createHouse(event: any, data: House) {
    return await EstateService.createHouse(data)
  }
  async updateHouse(event: any, data: House) {
    return await EstateService.updateHouse(data)    
  }
  async deleteHouse(event: any, id: number) {
    return await EstateService.deleteHouse(id)    
  }
  async searchHouses(event: any, input: string) {
    return await EstateService.searchHouses(input)
  }
  async getHousesByPage(event: any, page: number, limit: number, filters: TFilterHouseDTO) {
    return await EstateService.getHousesByPage(page, limit, filters)
  }

  async searchFlats(event: any, input: string) {
    const result = await EstateService.searchFlats(input)
    return result
  }
  async createFlat(event: any, data: TFlatDTO) {
    return await EstateService.createFlat(data)
  }
  async updateFlat(event: any, data: TFlatDTO) {
    return await EstateService.updateFlat(data)
  }
  
  async deleteFlat(event: any, id: TFlatDTO['id']) {
    return await EstateService.deleteFlat(id) 
  }
  async getFlatesByPage(event: any, page: number, limit: number, filters: TFilterFlatDTO) {
    return await EstateService.getFlatesByPage(page, limit, filters)
  }
  
}
