'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  IO History API List
     *  Desc  :    
     */



    Evolve.Router.post('/api/v1/evolve/IoHistory/getIoReportData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoHistory.MidIoHistory.getIoReportData, Evolve.App.Controllers.Evolve.IoHistory.ConIoHistory.getIoReportData);

    Evolve.Router.post('/api/v1/evolve/IoHistory/getSingleIoCodeData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoHistory.MidIoHistory.getSingleIoCodeData, Evolve.App.Controllers.Evolve.IoHistory.ConIoHistory.getSingleIoCodeData);








    /** End  : IO History  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve IO History Router :", error)
}


module.exports = Evolve.Router