'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
   *  Title :  Manufactioring Process API List
   *  Desc  :    
   */

    Evolve.Router.get("/api/v1/smartFactory/soPickListGenerate/getSalesOrderList",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.SoPickList.ConGenerate.getSalesOrderList);

    Evolve.Router.post("/api/v1/smartFactory/soPickListGenerate/getPickListBySoNumberCount", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.SoPickList.ConGenerate.getPickListBySoNumberCount);

    Evolve.Router.post("/api/v1/smartFactory/soPickListGenerate/generateSoPickList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.SoPickList.ConGenerate.generateSoPickList);

    Evolve.Router.post("/api/v1/smartFactory/soPickListGenerate/getPickListBySalesOrder",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.SoPickList.ConGenerate.getPickListBySalesOrder);

//   Evolve.App.Middlewares.SmartFactoryApiValidator.getPickListBySalesOrder,




  /** End  : Manufactioring Process  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Smart Factory Sales Order PickList Router :", error)
}


module.exports = Evolve.Router