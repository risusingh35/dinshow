'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  ERP api Attributes API List
     *  Desc  :    
     */



    Evolve.Router.get('/api/v1/evolve/ErpApiAttributes/getErpApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.getErpApiList);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/getERPApiAttributesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.getERPApiAttributesList, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.getERPApiAttributesList);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/addErpApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.addErpApiAttributes, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.addErpApiAttributes);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/getSingleErpApiAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.getSingleErpApiAttributesData, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.getSingleErpApiAttributesData);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/updateERPApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.updateERPApiAttributes, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.updateERPApiAttributes);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/checkAttributesCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.checkAttributesCode, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.checkAttributesCode);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/getParentAttributeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.getParentAttributeList, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.getParentAttributeList);

    Evolve.Router.post('/api/v1/evolve/ErpApiAttributes/deleteERPApiAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttributes.MidErpApiAttributes.deleteERPApiAttributes, Evolve.App.Controllers.Evolve.ErpApiAttributes.ConList.deleteERPApiAttributes);










    /** End  : gsp Api Attributes */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve ERP Api Attributes Router :", error)
}


module.exports = Evolve.Router