'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   ERP API Attribute Mapping  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getErpApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getErpApiList);
    
    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getApiAttributes',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.getApiAttributesAuth, Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getApiAttributes);

    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getEvolveTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getEvolveTableList);
    
    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getTableFields', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.getTableFieldsAuth, Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getTableFields);
        
    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/addErpAttrMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.addErpAttrMappingAuth,Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.addErpAttrMapping);

    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getAttrmappingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.getAttrmappingListAuth,Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getAttrmappingList);
    
    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/getSingleMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.getSingleMappingDetailsAuth,Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.getSingleMappingDetails);

    Evolve.Router.post('/api/v1/evolve/ErpAttrMapping/updateMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ErpApiAttrMapping.MidErpApiAttrMapping.updateMappingDetailsAuth,Evolve.App.Controllers.Evolve.ErpApiAttrMapping.ConList.updateMappingDetails);
    /** End  : ERP API Attribute Mapping  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve ERP API Attribute Mapping Router :", error)
}
module.exports = Evolve.Router