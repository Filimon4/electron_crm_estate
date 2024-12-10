import { contextBridge, ipcRenderer } from "electron"
import { PreloadNamespace } from "./preload.types"

if (!process.contextIsolated) {
  throw new Error("Context isn't isoleted")
}

export const frontApi: PreloadNamespace.IFrontApi = {
  signin: (...args: any) => ipcRenderer.invoke('login', ...args),
  signup: (...args: any) => ipcRenderer.invoke('signup', ...args),

  createClient: (...args: any) => ipcRenderer.invoke('createClient', ...args),
  updateClient: (...args: any) => ipcRenderer.invoke('updateClient', ...args),
  deleteClient: (...args: any) => ipcRenderer.invoke('deleteClient', ...args),
  getClients: () => ipcRenderer.invoke('getClients'),
  
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

  onNotify: (callback: Function) =>
    ipcRenderer.on('onNotify',  (_event: any, ...args: any) => {
      callback(args)
    }
  ),
}

try {
  contextBridge.exposeInMainWorld('context', {
    ...frontApi,
  })
} catch (error) {
  console.log(error)
}
