'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /* Title :  Ready To Export Serial Numbers */
    /* Desc  :  Ready to export those serial number which are done PDI */
    
    Evolve.Router.get("/api/v1/smartFactory/ReadyToExportSrNo/getCompletedWoList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ReadyToExportSrNo.ConIndex.getCompletedWoList);

    Evolve.Router.get("/api/v1/smartFactory/ReadyToExportSrNo/getAllItem",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ReadyToExportSrNo.ConIndex.getAllItem);

    Evolve.Router.post("/api/v1/smartFactory/ReadyToExportSrNo/getReadySerialNumberList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ReadyToExportSrNo.MidIndex.getReadySerialNumberList,Evolve.App.Controllers.SmartFactory.ReadyToExportSrNo.ConIndex.getReadySerialNumberList);

    Evolve.Router.post("/api/v1/smartFactory/ReadyToExportSrNo/exportSerialNumber",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.ReadyToExportSrNo.MidIndex.exportSerialNumber,Evolve.App.Controllers.SmartFactory.ReadyToExportSrNo.ConIndex.exportSerialNumber);

    Evolve.Router.post("/api/v1/smartFactory/ReadyToExportSrNo/exportSerialBulkNumber",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.ReadyToExportSrNo.MidIndex.exportSerialBulkNumber,Evolve.App.Controllers.SmartFactory.ReadyToExportSrNo.ConIndex.exportSerialBulkNumber);

        
    /* End  :  Ready To Export Serial Numbers */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Ready to Export serial routes Router :", error)
}


module.exports = Evolve.Router