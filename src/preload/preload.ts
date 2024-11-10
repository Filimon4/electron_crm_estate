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
  
  createEsate: (...args: any) => ipcRenderer.invoke('createEstate', ...args),
  updateEsate: (...args: any) => ipcRenderer.invoke('updateEstate', ...args),
  deleteEsate: (...args: any) => ipcRenderer.invoke('deleteEstate', ...args),
  getEstate: () => ipcRenderer.invoke('getEstate'),
  
  createDeal: (...args: any) => ipcRenderer.invoke('createDeal', ...args),
  updateDeal: (...args: any) => ipcRenderer.invoke('updateDeal', ...args),
  deleteDeal: (...args: any) => ipcRenderer.invoke('deleteDeal', ...args),
}

try {
  contextBridge.exposeInMainWorld('context', {
    ...frontApi,
  })
} catch (error) {
  console.log(error)
}
