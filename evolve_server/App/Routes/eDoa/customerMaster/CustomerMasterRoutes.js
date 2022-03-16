'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/customerMaster/getCustomerMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.customerMaster.ConList.getCustomerMasterList);
    
    Evolve.Router.post('/api/v1/eDoa/customerMaster/addCustomerMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.customerMaster.ConList.addCustomerMaster);

    Evolve.Router.post('/api/v1/eDoa/customerMaster/updateCustomerMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.customerMaster.ConList.updateCustomerMaster);

    Evolve.Router.post('/api/v1/eDoa/customerMaster/deleteCustomer', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.customerMaster.ConList.deleteCustomer);

    Evolve.Router.post('/api/v1/eDoa/customerMaster/onUploadCustomerCsvFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.customerMaster.ConList.onUploadCustomerCsvFile);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Customer Master Router :", error)
}
module.exports = Evolve.Router