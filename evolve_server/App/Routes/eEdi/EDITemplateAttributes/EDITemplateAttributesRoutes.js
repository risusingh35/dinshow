'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  GPS api Attributes API List
     *  Desc  :    
     */



    Evolve.Router.get('/api/v1/eEDI/EDITemplateAttributes/getEDITempateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.getEDITempateList);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/getEDITemplateAttributesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.getEDITemplateAttributesList, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.getEDITemplateAttributesList);

     Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/addEDITemplateAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.addEDITemplateAttributes, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.addEDITemplateAttributes);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/getSingleEDITemplateAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.getSingleEDITemplateAttributesData, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.getSingleEDITemplateAttributesData);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/updateEDITemplateAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.updateEDITemplateAttributes, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.updateEDITemplateAttributes);

     Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/checkAttributesCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.deleteEDITemplateAttributes, Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.checkAttributesCode, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.checkAttributesCode);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/getParentAttributeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.getParentAttributeList, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.getParentAttributeList);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/deleteEDITemplateAttributes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eEdi.EDITemplateAttributes.MidEDITemplateAttributes.deleteEDITemplateAttributes, Evolve.App.Controllers.eEdi.EDITemplateAttributes.ConList.deleteEDITemplateAttributes);










    /** End  : gsp Api Attributes */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve gsp Api Attributes Router :", error)
}


module.exports = Evolve.Router