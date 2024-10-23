import { contextBridge, ipcRenderer } from "electron"
import { PreloadNamespace } from "./preload.types"

if (!process.contextIsolated) {
  throw new Error("Context isn't isoleted")
}

export const contextApi: PreloadNamespace.IContextApi = {
  signin: (...args: any) => ipcRenderer.invoke('login', ...args),
  logout: (...args: any) => ipcRenderer.invoke('logout', ...args),
  signup: (...args: any) => ipcRenderer.invoke('signup', ...args),
  createClient: (...args: any) => ipcRenderer.invoke('createClient', ...args),
  updateClient: (...args: any) => ipcRenderer.invoke('updateClient', ...args),
  deleteClient: (...args: any) => ipcRenderer.invoke('deleteClient', ...args),
  createEsate: (...args: any) => ipcRenderer.invoke('createEstate', ...args),
  updateEsate: (...args: any) => ipcRenderer.invoke('updateEstate', ...args),
  deleteEsate: (...args: any) => ipcRenderer.invoke('deleteEstate', ...args),
  createDeal: (...args: any) => ipcRenderer.invoke('createDeal', ...args),
  updateDeal: (...args: any) => ipcRenderer.invoke('updateDeal', ...args),
  deleteDeal: (...args: any) => ipcRenderer.invoke('deleteDeal', ...args)
}


try {
  contextBridge.exposeInMainWorld('context', {
    ...contextApi
  })
} catch (error) {
  console.log(error)
}
