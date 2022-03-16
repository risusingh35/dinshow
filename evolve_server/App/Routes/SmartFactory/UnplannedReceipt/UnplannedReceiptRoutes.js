'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : UnplannedReceipt API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/UnplannedReceipt/getItemSearch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.UnplannedReceipt.ConList.getItemSearch);

    Evolve.Router.post("/api/v1/smartFactory/UnplannedReceipt/getItemData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.UnplannedReceipt.MidUnplannedReceipt.getItemData, Evolve.App.Controllers.SmartFactory.UnplannedReceipt.ConList.getItemData);

    Evolve.Router.post("/api/v1/smartFactory/UnplannedReceipt/addUnplannedReceipt", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.UnplannedReceipt.MidUnplannedReceipt.addUnplannedReceipt, Evolve.App.Controllers.SmartFactory.UnplannedReceipt.ConList.addUnplannedReceipt);

    Evolve.Router.get("/api/v1/smartFactory/UnplannedReceipt/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.UnplannedReceipt.ConList.getLocationList);

    Evolve.Router.get("/api/v1/smartFactory/UnplannedReceipt/getReasonList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.UnplannedReceipt.ConList.getReasonList);



        /** End  :UnplannedReceipt  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory UnplannedReceipt Router :", error)
}


module.exports = Evolve.Router