'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Country API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/keyValue/getKeyValueList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.KeyValue.ConList.getKeyValueList);
    
    
    
    /** End  :Country  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router