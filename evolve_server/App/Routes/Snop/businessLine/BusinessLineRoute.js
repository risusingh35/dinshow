'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Business line  API List
     *  Desc  :    
     */



    Evolve.Router.post("/api/v1/Snop/BusinessLine/getbusinessLineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.businessLine.ConBusinessLine.getbusinessLineList);

    Evolve.Router.post("/api/v1/Snop/BusinessLine/addBusinessLine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.businessLine.MidBusinessLine.addBusinessLineAuth, Evolve.App.Controllers.Snop.businessLine.ConBusinessLine.addBusinessLine);

    Evolve.Router.post("/api/v1/Snop/BusinessLine/getSingleBusinessLine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.businessLine.MidBusinessLine.getSingleBusinessLineAuth, Evolve.App.Controllers.Snop.businessLine.ConBusinessLine.getSingleBusinessLine);

    Evolve.Router.post("/api/v1/Snop/BusinessLine/updateBusinessLine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.businessLine.MidBusinessLine.updateBusinessLineAuth, Evolve.App.Controllers.Snop.businessLine.ConBusinessLine.updateBusinessLine);

    Evolve.Router.post("/api/v1/Snop/BusinessLine/deleteBusinessLine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.businessLine.MidBusinessLine.deleteBusinessLineAuth, Evolve.App.Controllers.Snop.businessLine.ConBusinessLine.deleteBusinessLine);





    /** End  : budgeting  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Business Line  Router :", error)
}


module.exports = Evolve.Router