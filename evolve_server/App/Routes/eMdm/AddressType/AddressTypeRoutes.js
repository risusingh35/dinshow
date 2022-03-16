'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  AddressType API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/AddressType/getAddressTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.AddressType.ConList.getAddressTypeList);
    
    
    /** End  :AddressType  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router