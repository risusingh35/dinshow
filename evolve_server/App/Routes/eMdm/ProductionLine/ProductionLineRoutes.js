'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  ProductLine API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/ProductLine/getProductLineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.ProductLine.ConList.getProductLineList);
    
    
    
    /** End  :ProductLine  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router