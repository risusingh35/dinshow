'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
   *  Title : Reports API List
   *  Desc  :    
   */

  Evolve.Router.post("/api/v1/smartFactory/Reports/getComponentScrapReport", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getComponentScrapReport, Evolve.App.Controllers.SmartFactory.Reports.ConComponentScrapReport.getComponentScrapReport);

  //Rejected serial no report route
  Evolve.Router.post("/api/v1/smartFactory/Reports/getRejectedSrNo", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getRejectedSrNo, Evolve.App.Controllers.SmartFactory.Reports.ConRejectedSrReport.getRejectedSrNo);

  //production report route
  Evolve.Router.post("/api/v1/smartFactory/Reports/getProductionReports", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getProductionReports, Evolve.App.Controllers.SmartFactory.Reports.ConProductionReport.getProductionReports);

  // Evolve.Router.get("/api/v1/smartFactory/Reports/getItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProductionReport.getItem);
  Evolve.Router.post("/api/v1/smartFactory/Reports/getItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProductionReport.getItem);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getProcessList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProductionReport.getProcessList);

  Evolve.Router.get("/api/v1/smartFactory/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProductionReport.getMachineList);

  //Production History Report
  Evolve.Router.post("/api/v1/smartFactory/Reports/getProductionHistoryReport", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getProductionHistoryReport, Evolve.App.Controllers.SmartFactory.Reports.ConProdHistoryReport.getProductionHistoryReport);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProdHistoryReport.getMachineList);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getProcessList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProdHistoryReport.getProcessList);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getshiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConProdHistoryReport.getshiftList);

  //machine wise production report route
  Evolve.Router.post("/api/v1/smartFactory/Reports/getMachineWiseProdReports", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getMachineWiseProdReports, Evolve.App.Controllers.SmartFactory.Reports.ConMachineWiseProductionReport.getMachineWiseProdReports);


  Evolve.Router.post("/api/v1/smartFactory/Reports/getMachine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConMachineWiseProductionReport.getMachine);

  // history tracking report 
  Evolve.Router.post("/api/v1/smartFactory/Reports/getHistoryTrackReport", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getHistoryTrackReport, Evolve.App.Controllers.SmartFactory.Reports.ConHistoryTrackingReport.getHistoryTrackReport);

  // do status report
  Evolve.Router.post("/api/v1/smartFactory/Reports/getDoStatusReport", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getDoStatusReport, Evolve.App.Controllers.SmartFactory.Reports.ConDoStatusReport.getDoStatusReport);

  // Evolve.Router.get("/api/v1/smartFactory/Reports/getCustCode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConDoStatusReport.getCustCode);
  
  Evolve.Router.post("/api/v1/smartFactory/Reports/getCustCode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConDoStatusReport.getCustCode);

  // customer wise axle report 
  Evolve.Router.post("/api/v1/smartFactory/Reports/getCustomerWiseReport", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.SmartFactory.Reports.MidReports.getCustomerWiseReport, Evolve.App.Controllers.SmartFactory.Reports.ConCustomerWiseAxleReport.getCustomerWiseReport);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConCustomerWiseAxleReport.getMachineList);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getshiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConCustomerWiseAxleReport.getshiftList);

  Evolve.Router.get("/api/v1/smartFactory/Reports/getProcessList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConCustomerWiseAxleReport.getProcessList);

  // Milling Vibration Report

  Evolve.Router.post('/api/v1/smartFactory/Reports/getMillingVibrationReport',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConMillingVibrationReport.getMillingVibrationReport);

  // Vibration  Report

  Evolve.Router.post('/api/v1/smartFactory/Reports/getVibrationMachineReport',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConVibrationMachineReport.getVibrationMachineReport);

  // Console Assembly Report

  Evolve.Router.post('/api/v1/smartFactory/Reports/getConsoleAssyReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConConsoleAssemblyReport.getConsoleAssyReport);

  //Knee Bolster Report

  Evolve.Router.post('/api/v1/smartFactory/Reports/getKneeBolsterReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConKneeBolsterReport.getKneeBolsterReport);

  // Door Assembly Report
  Evolve.Router.post('/api/v1/smartFactory/Reports/getDoorAssyReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConDoorAssemblyReport.getDoorAssyReport);

  // IP Trace Report
  
  Evolve.Router.post('/api/v1/smartFactory/Reports/getIpTraceReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.Reports.ConIpTraceReport.getIpTraceReport);

  //Rejection Report

  Evolve.Router.post('/api/v1/smartFactory/Reports/getRejectionReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConRejectionReport.getRejectionReport);

  // Report Dump

  Evolve.Router.post('/api/v1/smartFactory/Reports/getReportDump',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConReportDump.getReportDump);

  // XML Reports
  Evolve.Router.post('/api/v1/smartFactory/Reports/getXmlReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConXmlReport.getXmlReport);

  // FG Manufacturing  Reports

  Evolve.Router.post('/api/v1/smartFactory/Reports/getFGManufacturingReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.Reports.ConFGMFReport.getFGManufacturingReport);








  /** End  :  Reports  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Smart Factory  Reports Router :", error)
}


module.exports = Evolve.Router