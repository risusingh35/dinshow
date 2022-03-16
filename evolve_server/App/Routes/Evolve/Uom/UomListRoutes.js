'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Role API List
     *  Desc  :    
     */

     // UOM MASTER 

    Evolve.Router.post('/api/v1/evolve/uom/createUom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Uom.MidUomList.createUomAuth, Evolve.App.Controllers.Evolve.Uom.ConUomList.createUom);

    Evolve.Router.post('/api/v1/evolve/uom/selectSingleUom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Uom.MidUomList.selectSingleUomAuth, Evolve.App.Controllers.Evolve.Uom.ConUomList.selectSingleUom);

    Evolve.Router.post('/api/v1/evolve/uom/updateUom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Uom.MidUomList.updateUomAuth, Evolve.App.Controllers.Evolve.Uom.ConUomList.updateUom);

    
    Evolve.Router.post('/api/v1/evolve/uom/getdefaultUom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.getdefaultUomAuth, Evolve.App.Controllers.Evolve.Uom.ConConversation.getdefaultUom);


    Evolve.Router.post('/api/v1/evolve/uom/getAllUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Uom.MidUomList.getAllUomListAuth, Evolve.App.Controllers.Evolve.Uom.ConUomList.getAllUomList);

    Evolve.Router.post('/api/v1/evolve/uom/onUploadUomCsvFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.Uom.ConUomList.onUploadUomCsvFile);








// CONVERSATION MASTER 


    Evolve.Router.post('/api/v1/evolve/uom/getAllConversationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.getAllConversationListAuth,  Evolve.App.Controllers.Evolve.Uom.ConConversation.getAllConversationList);
    
    Evolve.Router.get('/api/v1/evolve/uom/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.Uom.ConConversation.getUomList);

  

    Evolve.Router.post('/api/v1/evolve/uom/createUomConversation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.createUomConversationAuth, Evolve.App.Controllers.Evolve.Uom.ConConversation.createUomConversation);

    Evolve.Router.post('/api/v1/evolve/uom/selectSingleConversation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.selectSingleConversationAuth, Evolve.App.Controllers.Evolve.Uom.ConConversation.selectSingleConversation);

    Evolve.Router.post('/api/v1/evolve/uom/updateConversion', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.updateConversionAuth,Evolve.App.Controllers.Evolve.Uom.ConConversation.updateConversion);

    


    Evolve.Router.post('/api/v1/evolve/uom/checkExistingConversion', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.createUomConversationAuth, Evolve.App.Controllers.Evolve.Uom.ConConversation.checkExistingConversion);


    Evolve.Router.post('/api/v1/evolve/uom/checkExistingConversiononUpdate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.Uom.MidUomConversation.updateConversionAuth, Evolve.App.Controllers.Evolve.Uom.ConConversation.checkExistingConversiononUpdate);





    /** End  : Uom Router  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Uom Router :", error)
}

module.exports = Evolve.Router