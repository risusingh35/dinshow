'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Quality Check Process API List
     *  Desc  :    
     */

   

    // start Check Cooper  
    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCV2/getDepartmentList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getDepartmentList);    
    
    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/getQCMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.getQCMachineList, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCMachineList);  

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/getQCLotSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.getQCLotSerialList, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCLotSerialList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/getQCTabelData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.getQCTabelData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCTabelData);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/saveQCTableData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.saveQCTableData, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.saveQCTableData);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/getQCLocationTableList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.getQCLocationTableList, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCLocationTableList);

    Evolve.Router.post("/api/v1/smartFactory/qualityCheck/QCV2/saveQCLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.QualityCheck.MidQualityCheckV2.saveQCLocation, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.saveQCLocation);

    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCV2/getQCBADLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCBADLocationList);

    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCV2/getQCGOODLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQCGOODLocationList);

    Evolve.Router.get("/api/v1/smartFactory/qualityCheck/QCV2/getQcLocationLotSerialList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QualityCheck.ConQualityCheckV2.getQcLocationLotSerialList);




    // end Check Cooper

    /** End  :Quality Check Process  */



} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart FactoryQuality Check Process Router :", error)
}


module.exports = Evolve.Router