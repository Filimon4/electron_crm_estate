import { DealReport } from "../entities/DealReport";
import { UserReport } from "../entities/UserReport";


export namespace ReportsNamespace {
  async function createDealReport(reportData: {
    flatId: number;
    realtorId: number;
    clientId: number;
    totalPrice: number;
    dealCount: number;
    year: number;
    month: number;
  }) {
    
    const newReport = await dbConnection(DealReport).create({
      flat: { id: reportData.flatId },
      realtor: { id: reportData.realtorId },
      client: { id: reportData.clientId },
      total_price: reportData.totalPrice,
      deal_count: reportData.dealCount,
      year: reportData.year,
      month: reportData.month,
    });

    await dbConnection(DealReport).save(newReport);
    return newReport;
  }

  // Функция для создания отчёта по риелторам
  async function createRealtorReport(reportData: {
    realtorId: number;
    totalSales: number;
    dealCount: number;
    year: number;
    month: number;
  }) {

    const newReport = await dbConnection(UserReport).create({
      realtor: { id: reportData.realtorId },
      total_sales: reportData.totalSales,
      deal_count: reportData.dealCount,
      year: reportData.year,
      month: reportData.month,
    });

    await dbConnection(UserReport).save(newReport);
    return newReport;
  }

  async function getAllDealReports(year: number, month: number) {
    const cachedDealReportRepository = await dbConnection(DealReport)
    const reports = await cachedDealReportRepository.find({
      where: { year, month },
      relations: ["flat", "realtor", "client"],
    });
    return reports;
  }
  
  async function getAllRealtorReports(year: number, month: number) {
    const cachedRealtorReportRepository = await dbConnection(UserReport)
    const reports = await cachedRealtorReportRepository.find({
      where: { year, month },
      relations: ["realtor"],
    });
    return reports;
  }

  async function getAllDealReportsGlobal() {
    const cachedDealReportRepository = await dbConnection(DealReport);
    const reports = await cachedDealReportRepository.find({
      relations: ["flat", "realtor", "client"],
    });
    return reports;
  }
  
  async function getAllRealtorReportsGlobal() {
    const cachedRealtorReportRepository = await dbConnection(UserReport);
    const reports = await cachedRealtorReportRepository.find({
      relations: ["realtor"],
    });
    return reports;
  }

  async function getTop10Realtors() {
    const cachedRealtorReportRepository = await dbConnection(UserReport);
  
    const topRealtors = await cachedRealtorReportRepository
      .createQueryBuilder("report")
      .leftJoinAndSelect("report.realtor", "realtor")
      .select([
        "realtor.id",
        "realtor.first_name",
        "realtor.last_name",
        "report.total_sales",
      ])
      .orderBy("report.total_sales", "DESC")
      .limit(10)
      .getMany();
  
    return topRealtors;
  }

  async function getRealtorReportByMonth(realtorId: number, year: number, month: number) {
    const cachedRealtorReportRepository = await dbConnection(UserReport);
    
    const report = await cachedRealtorReportRepository.findOne({
      where: { realtor: { id: realtorId }, year, month },
      relations: ["realtor"],
    });
  
    return report;
  }

  async function updateDealReport(reportData: {
    id: number;
    totalPrice: number;
    dealCount: number;
    year: number;
    month: number;
  }) {
    const cachedDealReportRepository = await dbConnection(DealReport)
  
    const report = await cachedDealReportRepository.findOne({
      where: {
        id: reportData.id
      }
    });
    if (report) {
      report.total_price = reportData.totalPrice;
      report.deal_count = reportData.dealCount;
      report.year = reportData.year;
      report.month = reportData.month;
      await cachedDealReportRepository.save(report);
    }
    return report;
  }
  
  // Обновление отчёта по риелтору
  async function updateRealtorReport(reportData: {
    id: number;
    totalSales: number;
    dealCount: number;
    year: number;
    month: number;
  }) {
    const cachedRealtorReportRepository = await dbConnection(UserReport);
  
    const report = await cachedRealtorReportRepository.findOne({
      where: {id: reportData.id}
    });
    if (report) {
      report.total_sales = reportData.totalSales;
      report.deal_count = reportData.dealCount;
      report.year = reportData.year;
      report.month = reportData.month;
      await cachedRealtorReportRepository.save(report);
    }
    return report;
  }
}