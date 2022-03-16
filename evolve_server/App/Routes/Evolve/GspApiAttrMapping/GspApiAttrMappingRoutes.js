'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getGspApiList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getGspApiList);

    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getApiAttributes',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.getApiAttributesAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getApiAttributes);

    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getEvolveTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getEvolveTableList);

    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getTableFields', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.getTableFieldsAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getTableFields);


        
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/addGspApiAttrMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.addGspApiAttrMappingAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.addGspApiAttrMapping);

    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getAttrmappingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.getAttrmappingListAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getAttrmappingList);
    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/getSingleMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.getSingleMappingDetailsAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.getSingleMappingDetails);
    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/updateMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.updateMappingDetailsAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.updateMappingDetails);
    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/deleteGspApiAttributesMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.deleteGspApiAttributesMappingAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.deleteGspApiAttributesMapping);
    
    Evolve.Router.post('/api/v1/evolve/gspApiAttrMapping/CheckApiAttribute', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.GspApiAttrMapping.GspApiAttrMappingMid.CheckApiAttributeAuth, Evolve.App.Controllers.Evolve.GspApiAttrMapping.ConList.CheckApiAttribute);
    /** End  : Process  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process Router :", error)
}
module.exports = Evolve.Router