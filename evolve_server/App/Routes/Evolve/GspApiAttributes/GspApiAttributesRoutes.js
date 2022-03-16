'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  GPS api Attributes API List
     *  Desc  :    
     */



    Evolve.Router.get('/api/v1/evolve/gpsApiAttributes/getGSPApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.getGSPApiList);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/getGSPApiAttributesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.getGSPApiAttributesList, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.getGSPApiAttributesList);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/addGspApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.addGspApiAttributes, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.addGspApiAttributes);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/getSingleGSPApiAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.getSingleGSPApiAttributesData, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.getSingleGSPApiAttributesData);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/updateGspApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.updateGspApiAttributes, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.updateGspApiAttributes);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/checkAttributesCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.checkAttributesCode, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.checkAttributesCode);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/getParentAttributeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.getParentAttributeList, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.getParentAttributeList);

    Evolve.Router.post('/api/v1/evolve/gpsApiAttributes/deleteGspApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttributes.MidGspApiAttributes.deleteGspApiAttributes, Evolve.App.Controllers.Evolve.GspApiAttributes.ConList.deleteGspApiAttributes);










    /** End  : gsp Api Attributes */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve gsp Api Attributes Router :", error)
}


module.exports = Evolve.Router