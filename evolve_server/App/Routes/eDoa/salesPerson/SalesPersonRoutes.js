'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/salesPerson/getSalesPersonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.salesPerson.ConList.getSalesPersonList);
    
    Evolve.Router.post('/api/v1/eDoa/salesPerson/addSalesPerson', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.salesPerson.ConList.addSalesPerson);

    Evolve.Router.post('/api/v1/eDoa/salesPerson/updateSalesPerson', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.salesPerson.ConList.updateSalesPerson);

    Evolve.Router.post('/api/v1/eDoa/salesPerson/deleteSalesPerson', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.salesPerson.ConList.deleteSalesPerson);

    Evolve.Router.post('/api/v1/eDoa/salesPerson/uploadSalesPersonCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.salesPerson.ConList.uploadSalesPersonCsv);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Ship To Router :", error)
}
module.exports = Evolve.Router