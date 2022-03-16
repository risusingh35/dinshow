'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Quality Check Process API List
     *  Desc  :    
     */

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/getQCBarcodeData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getQCBarcodeData);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QcProcessOky", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.QcProcessOky);

    // Evolve.Router.get("/api/v1/smartFactory/qualityCheck/getAllLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getAllLocationList);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QcProcessReject", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.QcProcessReject);


    // // start Check 

    // Evolve.Router.get("/api/v1/smartFactory/qualityCheck/getAllLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheck.getAllLocation);

    

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/getLotTabelData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.getLotTabelData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheck.getLotTabelData);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/saveQCData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.saveQCData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheck.saveQCData);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/getQCPalletParamData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.getQCPalletParamData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheck.getQCPalletParamData);

    // // end Check   

    // // start Check Cooper  
    // Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCCooper/getQCLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.getQCLocationList);

    // Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCCooper/getQCTableLotSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.getQCTableLotSerialList);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCCooper/getQCTabelData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.getQCTabelData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.getQCTabelData);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCCooper/saveQCTableData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.saveQCTableData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.saveQCTableData);


    // // location
    // Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCCooper/getQcLocationLotSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.getQcLocationLotSerialList);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCCooper/getQCLocationTableList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.getQCLocationTableList, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.getQCLocationTableList);

    // Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCCooper/saveQCLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheck.saveQCLocation, Evolve.App.Controllers.SmartFactory.QualityCheck.ConCheckCooper.saveQCLocation);

    




    // end Check Cooper

    /** End  :Quality Check Process  */


    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/getQCTableReceiptList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getQCTableReceiptList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/getQcLotSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getQcLotSerialList);

    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/getQcOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getQcOrderList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/getQcOrderDetailsList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getQcOrderDetailsList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/SaveQCTableDataNew", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.SaveQCTableDataNew);

    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.getLocationList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/SaveQCTransferLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConList.SaveQCTransferLocation);


    



} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart FactoryQuality Check Process Router :", error)
}


module.exports = Evolve.Router