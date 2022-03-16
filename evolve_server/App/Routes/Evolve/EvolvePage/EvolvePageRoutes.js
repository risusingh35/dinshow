'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/EvolvePage/getEvolvePageList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePage.ConList.getEvolvePageList);

    Evolve.Router.post('/api/v1/evolve/EvolvePage/deleteEvolvePageList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePage.ConList.deleteEvolvePageList);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router