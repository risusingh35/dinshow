'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    
    Evolve.Router.post('/api/v1/eDoa/customerSupplier/addNewCustomerSupplier', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.Customer_Supplier.ConList.addNewCustomerSupplier);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router