'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Reports Analytics API List
    *  Desc  :     
    */

  Evolve.Router.post('/api/v1/eAnalytics/report/getReportData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Analytics.Report.MidList.getReportData, Evolve.App.Controllers.Analytics.Report.ConList.getReportData);


  /** End  : Reports Analytics  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Assets Room Router :", error)
}


module.exports = Evolve.Router