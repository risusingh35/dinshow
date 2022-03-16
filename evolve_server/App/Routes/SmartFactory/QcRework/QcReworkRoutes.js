'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Quality Check Process API List
     *  Desc  :    
     */

    Evolve.Router.get("/api/v1/smartFactory/QcRework/getRejectionQcProcess", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QcRework.ConList.getRejectionQcProcess);

    Evolve.Router.post("/api/v1/smartFactory/QcRework/getReworkLocation", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QcRework.ConList.getReworkLocation);

    Evolve.Router.post("/api/v1/smartFactory/QcRework/updateQcRework", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QcRework.ConList.updateQcRework);

    Evolve.Router.post("/api/v1/smartFactory/QcRework/updateQcScrap", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.QcRework.ConList.updateQcScrap);

    /** End  :Quality Check Process  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart FactoryQuality Check Process Router :", error)
}


module.exports = Evolve.Router