'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Tax Environment API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/taxEnvironment/getTaxEnvList', Evolve.App.Controllers.eMdm.TaxEnvironment.ConList.getTaxEnvList);
    
    
    
    /** End  :Tax Environment  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router  Tax Environment Router:", error)
}
module.exports = Evolve.Router