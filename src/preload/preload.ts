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
  
  createEstate: (...args: any) => ipcRenderer.invoke('createEstate', ...args),
  updateEstate: (...args: any) => ipcRenderer.invoke('updateEstate', ...args),
  deleteEstate: (...args: any) => ipcRenderer.invoke('deleteEstate', ...args),
  getEstate: () => ipcRenderer.invoke('getEstate'),
  
  createDeal: (...args: any) => ipcRenderer.invoke('createDeal', ...args),
  updateDeal: (...args: any) => ipcRenderer.invoke('updateDeal', ...args),
  deleteDeal: (...args: any) => ipcRenderer.invoke('deleteDeal', ...args),

  createRealtor: (...args: any) => ipcRenderer.invoke('createRealtor', ...args),
  updateRealtor: (...args: any) => ipcRenderer.invoke('updateRealtor', ...args),
  deleteRealtor: (...args: any) => ipcRenderer.invoke('deleteRealtor', ...args),
  getRealtor: () => ipcRenderer.invoke('getRealtor'),

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
