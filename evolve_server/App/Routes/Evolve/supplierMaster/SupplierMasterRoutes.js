'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Customer Master
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/customerMaster/uploadCustCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.CustomerMaster.ConList.uploadCustCsv);

    Evolve.Router.post('/api/v1/evolve/supplierMaster/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustomerMaster.CustomerMasterMiddleware.getCustomerListAuth, Evolve.App.Controllers.Evolve.supplierMaster.ConList.getSupplierList);



    /** End  : Role  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router