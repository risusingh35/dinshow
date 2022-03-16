'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getEDITemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getEDITemplateList);

    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getTemplateAttributes',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getTemplateAttributes);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getEvolveTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getEvolveTableList);

    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getTableFields', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getTableFields);


        
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/addEDITemplateAttrMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.addEDITemplateAttrMapping);

            
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getAttrmappingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getAttrmappingList);

    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/getSingleMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.getSingleMappingDetails);
    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/updateMappingDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.updateMappingDetails);
    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/deleteEDITemplateAttributesMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.deleteEDITemplateAttributesMapping);
    
    
    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttrMapping/CheckApiAttribute', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttrMapping.ConList.CheckApiAttribute);
    /** End  : Process  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process Router :", error)
}
module.exports = Evolve.Router