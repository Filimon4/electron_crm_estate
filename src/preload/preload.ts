import { contextBridge, ipcRenderer } from "electron"
import { PreloadNamespace } from "./preload.types"

if (!process.contextIsolated) {
  throw new Error("Context isn't isoleted")
}

const frotnApiInvokes = {
  signin: (...args: any) => ipcRenderer.invoke('login', ...args),
  signup: (...args: any) => ipcRenderer.invoke('signup', ...args),

  createClient: (...args: any) => ipcRenderer.invoke('createClient', ...args),
  updateClient: (...args: any) => ipcRenderer.invoke('updateClient', ...args),
  deleteClient: (...args: any) => ipcRenderer.invoke('deleteClient', ...args),
  getClientsByPage: (...args: any) => ipcRenderer.invoke('getClientsByPage', ...args),
  
  createFlat: (...args: any) => ipcRenderer.invoke('createFlat', ...args),
  createHouse: (...args: any) => ipcRenderer.invoke('createHouse', ...args),
  updateFlat: (...args: any) => ipcRenderer.invoke('updateFlat', ...args),
  updateHouse: (...args: any) => ipcRenderer.invoke('updateHouse', ...args),
  deleteFlat: (...args: any) => ipcRenderer.invoke('deleteFlat', ...args),
  deleteHouse: (...args: any) => ipcRenderer.invoke('deleteHouse', ...args),
  getFlatesByPage: (...args: any) => ipcRenderer.invoke('getFlatesByPage', ...args),
  getHousesByPage: (...args: any) => ipcRenderer.invoke('getHousesByPage', ...args),
  findHouses: (...args: any) => ipcRenderer.invoke('findHouses', ...args),
  
  createDeal: (...args: any) => ipcRenderer.invoke('createDeal', ...args),
  updateDeal: (...args: any) => ipcRenderer.invoke('updateDeal', ...args),
  deleteDeal: (...args: any) => ipcRenderer.invoke('deleteDeal', ...args),
  getDealsByPage: (...args: any) => ipcRenderer.invoke('getDealsByPage', ...args),
  countDeals: (...args: any) => ipcRenderer.invoke('countDeals', ...args),

  createRealtor: (...args: any) => ipcRenderer.invoke('createRealtor', ...args),
  updateRealtor: (...args: any) => ipcRenderer.invoke('updateRealtor', ...args),
  deleteRealtor: (...args: any) => ipcRenderer.invoke('deleteRealtor', ...args),
  getRealtorsByPage: (...args: any) => ipcRenderer.invoke('getRealtorsByPage', ...args),
  countRealtors: (...args: any) => ipcRenderer.invoke('countRealtors', ...args),

  createEvent: (...args: any) => ipcRenderer.invoke('createEvent', ...args),
  updateEvent: (...args: any) => ipcRenderer.invoke('createEvent', ...args),
  deleteEvent: (...args: any) => ipcRenderer.invoke('createEvent', ...args),
}

const frontApiOns = {
  onNotify: (callback: Function) =>
    ipcRenderer.on('onNotify',  (_event: any, ...args: any) => {
      callback(args)
    }
  ),
}

try {
  contextBridge.exposeInMainWorld('invokes', {
    ...frotnApiInvokes,
  })
  contextBridge.exposeInMainWorld('ons', {
    ...frontApiOns,
  })
} catch (error) {
  console.log(error)
}
