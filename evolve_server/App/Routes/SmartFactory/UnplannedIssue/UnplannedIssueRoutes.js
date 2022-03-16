'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : UnplannedIssue API List
     *  Desc  :    
     */


    Evolve.Router.post("/api/v1/smartFactory/UnplannedIssue/getPalletData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.UnplannedIssue.MidUnplannedIssue.getPalletData, Evolve.App.Controllers.SmartFactory.UnplannedIssue.ConList.getPalletData);

    Evolve.Router.get("/api/v1/smartFactory/UnplannedIssue/getReasonList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.UnplannedIssue.ConList.getReasonList);

    Evolve.Router.post("/api/v1/smartFactory/UnplannedIssue/addUnplannedIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.UnplannedIssue.MidUnplannedIssue.addUnplannedIssue, Evolve.App.Controllers.SmartFactory.UnplannedIssue.ConList.addUnplannedIssue);

        /** End  :UnplannedIssue  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory UnplannedReceipt Router :", error)
}


module.exports = Evolve.Router