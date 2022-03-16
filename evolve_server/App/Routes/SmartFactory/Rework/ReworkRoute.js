'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Rework  API List
     *  Desc  :    
     */
    Evolve.Router.get(
        "/api/v1/smartFactory/Rework/getRejectionWorkOrder",
       Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Controllers.SmartFactory.Rework.ConRework
          .getRejectionWorkOrder
      );

      Evolve.Router.post(
        "/api/v1/smartFactory/Rework/getSinglePodProceess",
       Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Controllers.SmartFactory.Rework.ConRework
          .getSinglePodProceess
      );

      Evolve.Router.post(
        "/api/v1/smartFactory/Rework/updateEpodErework",
       Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Middlewares.SmartFactory.Rework.MidRework.updateEpodErework,
        Evolve.App.Controllers.SmartFactory.Rework.ConRework
          .updateEpodErework
      );

      Evolve.Router.post(
        "/api/v1/smartFactory/Rework/updateEpodEreworkScrap",
       Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Middlewares.SmartFactory.Rework.MidRework.updateEpodEreworkScrap,
        Evolve.App.Controllers.SmartFactory.Rework.ConRework
          .updateEpodEreworkScrap
      );
    

     
   

   
     /** End  :  Rework   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory  Rework  Router :", error)
}


module.exports = Evolve.Router