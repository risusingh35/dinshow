'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/eEdi/EDITransaction/getEDITransactionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.getEDITransactionList);

    Evolve.Router.get('/api/v1/eEdi/EDITransaction/getGlobleVariableEdi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.getGlobleVariableEdi);

    Evolve.Router.post('/api/v1/eEdi/EDITransaction/updateEdi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.updateEdi);

    Evolve.Router.post('/api/v1/eEdi/EDITransaction/onUploadFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.onUploadFile);

    Evolve.Router.post('/api/v1/eEdi/EDITransaction/onClearEdi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.onClearEdi);

    Evolve.Router.post('/api/v1/eEdi/EDITransaction/getEDIDetailsTable', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITransaction.ConList.getEDIDetailsTable);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router