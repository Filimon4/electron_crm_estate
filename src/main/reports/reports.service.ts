import { ReportsNamespace } from "../db/actions/actionsReports"

export class ReportsService {
  static async incomeMonthsByUser(user_id: number): Promise<any[]> {
    const result = await ReportsNamespace.incomeMonthsByUser(user_id)
    return result
  }
  static async dealAmountMonthsByUser(user_id: number) {
    const result = await ReportsNamespace.dealAmountMonthsByUser(user_id)
    return result
  }
  static async avgIncomeMonthsByUser(user_id: number) {
    const result = await ReportsNamespace.avgIncomeMonthsByUser(user_id)
    return result
  }


  static async topRealtors() {
    return await ReportsNamespace.topRealtors()
  }
  static async incomeMonths() {
    return await ReportsNamespace.incomeMonths()
  }
  static async dealAmountMonths() {
    return await ReportsNamespace.dealAmountMonths()
  }
  static async avgIncomeMonths() {
    return await ReportsNamespace.avgIncomeMonths()
  }
}
