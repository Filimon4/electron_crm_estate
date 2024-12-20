import { ipcMain } from "electron";
import { ReportsService } from "./reports.service";

export class ReoprtsController {
  

  constructor() {
    ipcMain.handle('topRealtors', this.topRealtors.bind(this))
    ipcMain.handle('incomeMonths', this.incomeMonths.bind(this))
    ipcMain.handle('dealAmountMonths', this.dealAmountMonths.bind(this))
    ipcMain.handle('avgIncomeMonths', this.avgIncomeMonths.bind(this))
    ipcMain.handle('incomeMonthsByUser', this.incomeMonthsByUser.bind(this))
    ipcMain.handle('dealAmountMonthsByUser', this.dealAmountMonthsByUser.bind(this))
    ipcMain.handle('avgIncomeMonthsByUser', this.avgIncomeMonthsByUser.bind(this))
  }

  async topRealtors() {
    return await ReportsService.topRealtors()
  }

  async incomeMonthsByUser(event: any, user_id: number) {
    return await ReportsService.incomeMonthsByUser(user_id)
  }
  async dealAmountMonthsByUser(event: any, user_id: number) {
    return await ReportsService.dealAmountMonthsByUser(user_id)
  }
  async avgIncomeMonthsByUser(event: any, user_id: number) {
    return await ReportsService.avgIncomeMonthsByUser(user_id)
  }

  async incomeMonths() {
    return await ReportsService.incomeMonths()
  }
  async dealAmountMonths() {
    return await ReportsService.dealAmountMonths()
  }
  async avgIncomeMonths() {
    return await ReportsService.avgIncomeMonths()
  }
  
}
