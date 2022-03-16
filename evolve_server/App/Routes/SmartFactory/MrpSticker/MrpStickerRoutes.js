'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Delivery Order  API List
     *  Desc  :    
     */


 // Do print router

  
  Evolve.Router.get("/api/v1/smartFactory/MrpSticker/getAllDoSup",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.MrpSticker.ConIndex.getAllDoSup);

  
  Evolve.Router.post("/api/v1/smartFactory/MrpSticker/getSingleDOSOData",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.SmartFactory.MrpSticker.MidMrpSticker.getSingleDOSOData,Evolve.App.Controllers.SmartFactory.MrpSticker.ConIndex.getSingleDOSOData);

  Evolve.Router.post("/api/v1/smartFactory/MrpSticker/getDoLine",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.MrpSticker.MidMrpSticker.getDoLine,Evolve.App.Controllers.SmartFactory.MrpSticker.ConIndex.getDoLine);

  Evolve.Router.post("/api/v1/smartFactory/MrpSticker/printMrpSticker",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.MrpSticker.ConIndex.printMrpSticker);

     /** End  : Delivery Order   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Delivery Order  Router :", error)
}


module.exports = Evolve.Router