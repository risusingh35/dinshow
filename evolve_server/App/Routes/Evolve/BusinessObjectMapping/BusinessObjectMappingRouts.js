'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/BusinessObjectMappingRouts/getBusinessObjectMappingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.BusinessObjectMapping.BusinessObjectMappingMid.getBusinessObjectMappingList, Evolve.App.Controllers.Evolve.BusinessObjectMapping.ConList.getBusinessObjectMappingList);

    Evolve.Router.post('/api/v1/evolve/BusinessObjectMappingRouts/createBusinessObject', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.BusinessObjectMapping.BusinessObjectMappingMid.createBusinessObject, Evolve.App.Controllers.Evolve.BusinessObjectMapping.ConList.createBusinessObject);

    Evolve.Router.post('/api/v1/evolve/BusinessObjectMappingRouts/updateBusinessObject', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.BusinessObjectMapping.BusinessObjectMappingMid.updateBusinessObject, Evolve.App.Controllers.Evolve.BusinessObjectMapping.ConList.updateBusinessObject);

    Evolve.Router.post('/api/v1/evolve/BusinessObjectMappingRouts/getSingleBusinessObjectMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessObjectMapping.ConList.getSingleBusinessObjectMapping);
    

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Business Object Mapping :", error) 
}
module.exports = Evolve.Router