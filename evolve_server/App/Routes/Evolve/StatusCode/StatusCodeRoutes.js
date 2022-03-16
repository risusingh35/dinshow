'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/statusCode/getStausCodeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.StatusCode.StatusCodeMid.getStausCodeListAuth, Evolve.App.Controllers.Evolve.StatusCode.ConList.getStausCodeList);

    Evolve.Router.post('/api/v1/evolve/statusCode/addStatusCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.StatusCode.StatusCodeMid.addStatusCodeAuth, Evolve.App.Controllers.Evolve.StatusCode.ConList.addStatusCode);

    Evolve.Router.post('/api/v1/evolve/statusCode/getSingleCodeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.StatusCode.StatusCodeMid.getSingleCodeDetailsAuth, Evolve.App.Controllers.Evolve.StatusCode.ConList.getSingleCodeDetails);

    Evolve.Router.post('/api/v1/evolve/statusCode/updateCodeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.StatusCode.StatusCodeMid.updateCodeDetailsAuth, Evolve.App.Controllers.Evolve.StatusCode.ConList.updateCodeDetails);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router