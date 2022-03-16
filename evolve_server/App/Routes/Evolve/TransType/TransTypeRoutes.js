'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Business line  API List
     *  Desc  :    
     */



    Evolve.Router.post("/api/v1/Evolve/TransType/getTransTypeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.TransType.MidTransType.getTransTypeListAuth, Evolve.App.Controllers.Evolve.TransType.ConTransType.getTransTypeList);

    Evolve.Router.post("/api/v1/Evolve/TransType/addTransType", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.TransType.MidTransType.addTransTypeAuth, Evolve.App.Controllers.Evolve.TransType.ConTransType.addTransType);

    Evolve.Router.post("/api/v1/Evolve/TransType/getSingleTransTypeData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.TransType.MidTransType.getSingleTransTypeDataAuth, Evolve.App.Controllers.Evolve.TransType.ConTransType.getSingleTransTypeData);

    Evolve.Router.post("/api/v1/Evolve/TransType/updateTransType", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.TransType.MidTransType.updateTransTypeAuth, Evolve.App.Controllers.Evolve.TransType.ConTransType.updateTransType);

    Evolve.Router.post("/api/v1/Evolve/TransType/deleteTransType", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.TransType.MidTransType.deleteTransTypeAuth, Evolve.App.Controllers.Evolve.TransType.ConTransType.deleteTransType);





    /** End  : budgeting  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Business Line  Router :", error)
}


module.exports = Evolve.Router