'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/shipTo/getShipToList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.getShipToList);
    
    Evolve.Router.post('/api/v1/eDoa/shipTo/addShipTo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.addShipTo);

    Evolve.Router.post('/api/v1/eDoa/shipTo/updateShipTo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.updateShipTo);

    Evolve.Router.post('/api/v1/eDoa/shipTo/deleteShipTo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.deleteShipTo);

    Evolve.Router.get('/api/v1/eDoa/shipTo/getCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.getCustomerList);

    Evolve.Router.post('/api/v1/eDoa/shipTo/uploadShipToCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.shipTo.ConList.uploadShipToCsv);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Ship To Router :", error)
}
module.exports = Evolve.Router