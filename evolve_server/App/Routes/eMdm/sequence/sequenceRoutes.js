'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  State API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/sequence/getsequenceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.sequence.ConList.getSequenceList);
    
    
    
    /** End  :State  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router