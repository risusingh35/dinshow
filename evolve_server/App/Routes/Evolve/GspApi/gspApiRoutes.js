'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  GPS api API List
     *  Desc  :    
     */



    Evolve.Router.get('/api/v1/evolve/gpsApi/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GspApi.ConList.getDocumentList);

    Evolve.Router.get('/api/v1/evolve/gpsApi/getGSPList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GspApi.ConList.getGSPList);

    Evolve.Router.post('/api/v1/evolve/gpsApi/getGSPApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApi.MidGspApi.getGSPApiList, Evolve.App.Controllers.Evolve.GspApi.ConList.getGSPApiList);

    Evolve.Router.post('/api/v1/evolve/gpsApi/addGspApi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApi.MidGspApi.addGspApi, Evolve.App.Controllers.Evolve.GspApi.ConList.addGspApi);

    Evolve.Router.post('/api/v1/evolve/gpsApi/getSingleGSPApiData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApi.MidGspApi.getSingleGSPApiData, Evolve.App.Controllers.Evolve.GspApi.ConList.getSingleGSPApiData);

    Evolve.Router.post('/api/v1/evolve/gpsApi/updateGspApi', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApi.MidGspApi.updateGspApi, Evolve.App.Controllers.Evolve.GspApi.ConList.updateGspApi);

    Evolve.Router.post('/api/v1/evolve/gpsApi/getGspApiUrldata', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApi.MidGspApi.getGspApiUrldata, Evolve.App.Controllers.Evolve.GspApi.ConList.getGspApiUrldata);










    /** End  : gsp Api  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve gsp Api Router :", error)
}


module.exports = Evolve.Router