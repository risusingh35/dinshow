'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PDI Inspection   API List
     *  Desc  :    
     */

       Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/getPDISingleData",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getPDISingleData,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection.getPDISingleData
  );

  
  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/getAllPdiTempDetail",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getAllPdiTempDetail,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection
      .getAllPdiTempDetail
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/addRejectSerialNo",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.addRejectSerialNo,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection
      .addRejectSerialNo
  );

  
  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/getPDIData",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getPDIData,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection.getPDIData
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/checkSerialNo",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.checkSerialNo,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection.checkSerialNo
  );

  
  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/addPdiHistory",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.addPdiHistory,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection.addPdiHistory
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/PreDeliveryInspection/pdiImageUpload",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConInspection.pdiImageUpload
  );

  // pre dilevery inspection route

  Evolve.Router.get( "/api/v1/smartFactory/preDeliveryInspection/getAllDoSup",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getAllDoSup);
    
  Evolve.Router.post( "/api/v1/smartFactory/preDeliveryInspection/getSingleDOSOData",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getSingleDOSOData, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getSingleDOSOData);

  Evolve.Router.post( "/api/v1/smartFactory/preDeliveryInspection/getDoLine",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getDoLine, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getDoLine);

  Evolve.Router.post( "/api/v1/smartFactory/preDeliveryInspection/getPDISingleData",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getPDISingleData, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getPDISingleData);

  Evolve.Router.post( "/api/v1/smartFactory/preDeliveryInspection/getAllPdiTempDetail",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getAllPdiTempDetail, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getAllPdiTempDetail);

  Evolve.Router.post( "/api/v1/smartFactory/preDeliveryInspection/getPDIData",  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.PreDeliveryInspection.MidPreDeliveryInspection.getPDIData, Evolve.App.Controllers.SmartFactory.PreDeliveryInspection.ConList.getPDIData);






     

     
   

   
     /** End  : PDI Inspection    */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory PDI Inspection   Router :", error)
}


module.exports = Evolve.Router