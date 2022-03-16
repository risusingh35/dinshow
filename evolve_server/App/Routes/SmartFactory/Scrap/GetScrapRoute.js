'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Scrap API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/Scrap/getScrap",Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.Scrap.MidGetScrap.getScrap,Evolve.App.Controllers.SmartFactory.Scrap.ConGetScrap.getScrap);

      Evolve.Router.post(
        "/api/v1/smartFactory/Scrap/changeScrapStatus"
       ,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
       Evolve.App.Middlewares.SmartFactory.Scrap.MidGetScrap.changeScrapStatus,
       Evolve.App.Controllers.SmartFactory.Scrap.ConGetScrap
          .changeScrapStatus
      );



   
     /** End  :Scrap  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory Scrap Router :", error)
}


module.exports = Evolve.Router