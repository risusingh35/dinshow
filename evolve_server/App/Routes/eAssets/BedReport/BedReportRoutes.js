'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Assets Bed Type API List
      *  Desc  :     
      */

    Evolve.Router.post('/api/v1/eAssets/bedReport/getBedHistoryReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.BedReport.MidList.getBedHistoryReport , Evolve.App.Controllers.eAssets.BedReport.ConList.getBedHistoryReport);


    /** End  : Assets Bed Type  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Assets Room Router :", error)
}


module.exports = Evolve.Router