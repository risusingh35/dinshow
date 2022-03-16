'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  ERP api API List
     *  Desc  :    
     */



    Evolve.Router.get('/api/v1/evolve/ErpApi/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpApi.ConList.getDocumentList);

    Evolve.Router.get('/api/v1/evolve/ErpApi/getErpList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpApi.ConList.getErpList);

    Evolve.Router.post('/api/v1/evolve/ErpApi/getERPApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApi.MidErpApi.getERPApiList, Evolve.App.Controllers.Evolve.ErpApi.ConList.getERPApiList);

    Evolve.Router.post('/api/v1/evolve/ErpApi/addErpApi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApi.MidErpApi.addErpApi, Evolve.App.Controllers.Evolve.ErpApi.ConList.addErpApi);

    Evolve.Router.post('/api/v1/evolve/ErpApi/getSingleERPApiData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApi.MidErpApi.getSingleERPApiData, Evolve.App.Controllers.Evolve.ErpApi.ConList.getSingleERPApiData);

    Evolve.Router.post('/api/v1/evolve/ErpApi/updateErpApi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApi.MidErpApi.updateErpApi, Evolve.App.Controllers.Evolve.ErpApi.ConList.updateErpApi);

    Evolve.Router.post('/api/v1/evolve/ErpApi/getErpApiUrldata', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApi.MidErpApi.getErpApiUrldata, Evolve.App.Controllers.Evolve.ErpApi.ConList.getErpApiUrldata);










    /** End  : ERP Api  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve ERP Api Router :", error)
}


module.exports = Evolve.Router