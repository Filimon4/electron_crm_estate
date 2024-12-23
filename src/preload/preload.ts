import { contextBridge, ipcRenderer } from "electron"

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
  searchClients: (...args: any) => ipcRenderer.invoke('searchClients', ...args),
  
  createFlat: (...args: any) => ipcRenderer.invoke('createFlat', ...args),
  updateFlat: (...args: any) => ipcRenderer.invoke('updateFlat', ...args),
  deleteFlat: (...args: any) => ipcRenderer.invoke('deleteFlat', ...args),
  getFlatesByPage: (...args: any) => ipcRenderer.invoke('getFlatesByPage', ...args),
  searchFlats: (...args: any) => ipcRenderer.invoke('searchFlats', ...args),
  
  createHouse: (...args: any) => ipcRenderer.invoke('createHouse', ...args),
  updateHouse: (...args: any) => ipcRenderer.invoke('updateHouse', ...args),
  deleteHouse: (...args: any) => ipcRenderer.invoke('deleteHouse', ...args),
  getHousesByPage: (...args: any) => ipcRenderer.invoke('getHousesByPage', ...args),
  searchHouses: (...args: any) => ipcRenderer.invoke('searchHouses', ...args),
  
  createComplex: (...args: any) => ipcRenderer.invoke('createComplex', ...args),
  updateComplex: (...args: any) => ipcRenderer.invoke('updateComplex', ...args),
  deleteComplex: (...args: any) => ipcRenderer.invoke('deleteComplex', ...args),
  searchComplex: (...args: any) => {
    console.log('searchComplex: ', args)
    return ipcRenderer.invoke('searchComplex', ...args)
  },
  getComplexesByPage: (...args: any) => ipcRenderer.invoke('getComplexesByPage', ...args),

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
  resetPassword: (...args: any) => ipcRenderer.invoke('resetPassword', ...args),

  createEvent: (...args: any) => ipcRenderer.invoke('createEvent', ...args),
  updateEvent: (...args: any) => ipcRenderer.invoke('updateEvent', ...args),
  deleteEvent: (...args: any) => ipcRenderer.invoke('deleteEvent', ...args),
  getAllEvents: (...args: any) => ipcRenderer.invoke('getAllEvents', ...args),

  topRealtors: (...args: any) => ipcRenderer.invoke('topRealtors', ...args),
  incomeMonths: (...args: any) => ipcRenderer.invoke('incomeMonths', ...args),
  dealAmountMonths: (...args: any) => ipcRenderer.invoke('dealAmountMonths', ...args),
  avgIncomeMonths: (...args: any) => ipcRenderer.invoke('avgIncomeMonths', ...args),
  incomeMonthsByUser: (...args: any) => ipcRenderer.invoke('incomeMonthsByUser', ...args),
  dealAmountMonthsByUser: (...args: any) => ipcRenderer.invoke('dealAmountMonthsByUser', ...args),
  avgIncomeMonthsByUser: (...args: any) => ipcRenderer.invoke('avgIncomeMonthsByUser', ...args),

  testConnect: (...args: any) => ipcRenderer.invoke('testConnect', ...args),

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
