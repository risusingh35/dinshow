'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    
    Evolve.Router.post('/api/v1/eDoa/creditTerms/getCreditTermsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.creditTerms.ConList.getCreditTermsList);
    
    Evolve.Router.post('/api/v1/eDoa/creditTerms/addCreditTerms', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.creditTerms.ConList.addCreditTerms);

    Evolve.Router.post('/api/v1/eDoa/creditTerms/updateCreditTerms', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.creditTerms.ConList.updateCreditTerms);

    Evolve.Router.post('/api/v1/eDoa/creditTerms/onUploadCreditTermsFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.creditTerms.ConList.onUploadCreditTermsFile);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router