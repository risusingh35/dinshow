'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Delivery Order  API List
     *  Desc  :    
     */


Evolve.Router.get(
    "/api/v1/smartFactory/DeliveryOrder/getDoList",
      Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getDoList
    );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getSingleDoData",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getSingleDoData,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getSingleDoData
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getdoidpdftabledata",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getdoidpdftabledata
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getDoDataTable",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getDoDataTable,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getDoDataTable
  );

  
  Evolve.Router.get(
    "/api/v1/smartFactory/DeliveryOrder/getallCustomer",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getallCustomer
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getSingleDoSoLine",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getSingleDoSoLine,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getSingleDoSoLine
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getSalesOrderDetails",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getSalesOrderDetails,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getSalesOrderDetails
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getDoDetails",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getDoDetails,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getDoDetails
  );

  Evolve.Router.get(
    "/api/v1/smartFactory/DeliveryOrder/getSoNumberList",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.getSoNumberList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/addDoList",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.addDoList,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.addDoList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/updateDoList",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.updateDoList,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.updateDoList
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/deleteDoLine",
   Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.deleteDoLine,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.deleteDoLine
  );

//   Evolve.Router.post("/api/v1/smartFactory/DeliveryOrder/deleteDoData",
//       Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
//    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.deleteDoData
//   );

    Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/deleteDoData",
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDo.deleteDoData
  );


  // Do print router

  
  Evolve.Router.get(
    "/api/v1/smartFactory/DeliveryOrder/getAllDoSup"
    ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDoPrint.getAllDoSup
  );

  
  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getSingleDOSOData"
    ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getSingleDOSOData,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDoPrint
      .getSingleDOSOData
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/getDoLine"
    ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.SmartFactory.DeliveryOrder.MidDo.getDoLine,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDoPrint.getDoLine
  );

  Evolve.Router.post(
    "/api/v1/smartFactory/DeliveryOrder/printDoLable"
    ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
   Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDoPrint.printDoLable
  );


  Evolve.Router.post("/api/v1/smartFactory/DeliveryOrder/getMrpPrintData" ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.DeliveryOrder.ConDoPrint.getMrpPrintData);





     
   

   
     /** End  : Delivery Order   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Delivery Order  Router :", error)
}


module.exports = Evolve.Router