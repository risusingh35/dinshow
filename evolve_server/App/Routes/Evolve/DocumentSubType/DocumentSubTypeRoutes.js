'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Document Sub Type  API List
    *  Desc  :    
    */


  Evolve.Router.get('/api/v1/evolve/documentSubType/getDocumentTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.DocumentSubType.ConList.getDocumentTypeList);

  Evolve.Router.post('/api/v1/evolve/documentSubType/getDocumentSubTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentSubType.MidDocumentSubType.getDocumentSubTypeList, Evolve.App.Controllers.Evolve.DocumentSubType.ConList.getDocumentSubTypeList);

  Evolve.Router.post('/api/v1/evolve/documentSubType/addDocumentSubType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentSubType.MidDocumentSubType.addDocumentSubType, Evolve.App.Controllers.Evolve.DocumentSubType.ConList.addDocumentSubType);

  Evolve.Router.post('/api/v1/evolve/documentSubType/updateDocumentSubType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentSubType.MidDocumentSubType.updateDocumentSubType, Evolve.App.Controllers.Evolve.DocumentSubType.ConList.updateDocumentSubType);

  Evolve.Router.post('/api/v1/evolve/documentSubType/getSingleDocumentSubType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentSubType.MidDocumentSubType.getSingleDocumentSubType, Evolve.App.Controllers.Evolve.DocumentSubType.ConList.getSingleDocumentSubType);




  


  /** End  : Document sub  Type*/

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Type Router :", error)
}


module.exports = Evolve.Router