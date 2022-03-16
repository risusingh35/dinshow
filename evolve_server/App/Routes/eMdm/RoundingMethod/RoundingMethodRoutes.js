'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  RoundingMethod API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/RoundingMethod/getRoundingMethodList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.RoundingMethod.ConList.getRoundingMethodList);
    
    
    /** End  :RoundingMethod  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router