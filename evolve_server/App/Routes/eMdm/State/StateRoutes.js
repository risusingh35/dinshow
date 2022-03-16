'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  State API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/State/getStateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.State.ConList.getStateList);
    
    
    
    /** End  :State  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router