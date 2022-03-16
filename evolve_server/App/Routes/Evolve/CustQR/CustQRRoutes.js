'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process  API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/evolve/CustQR/getCustQRTempList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.CustQR.ConList.getCustQRTempList);

    Evolve.Router.post('/api/v1/evolve/CustQR/getCustQRList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQR.CustQRMid.getCustQRListAuth, Evolve.App.Controllers.Evolve.CustQR.ConList.getCustQRList);

    Evolve.Router.post('/api/v1/evolve/CustQR/getEvolveTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.CustQR.ConList.getEvolveTableList);

    Evolve.Router.post('/api/v1/evolve/CustQR/getTableFields', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQR.CustQRMid.getTableFieldsAuth, Evolve.App.Controllers.Evolve.CustQR.ConList.getTableFields);
        
    Evolve.Router.post('/api/v1/evolve/CustQR/addCustQR', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQR.CustQRMid.addCustQRAuth, Evolve.App.Controllers.Evolve.CustQR.ConList.addCustQR);
    
    Evolve.Router.post('/api/v1/evolve/CustQR/getSingleCustQR', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.CustQR.CustQRMid.getSingleCustQRAuth, Evolve.App.Controllers.Evolve.CustQR.ConList.getSingleCustQR);
    
    Evolve.Router.post('/api/v1/evolve/CustQR/updateCustQR', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.CustQR.CustQRMid.updateCustQRAuth, Evolve.App.Controllers.Evolve.CustQR.ConList.updateCustQR);
    
   
    /** End  : Process  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process Router :", error)
}
module.exports = Evolve.Router