'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Document Type API List
    *  Desc  :    
    */


  Evolve.Router.post('/api/v1/evolve/documentType/addDocumentType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentType.MidDocumentType.addDocumentType, Evolve.App.Controllers.Evolve.DocumentType.ConList.addDocumentType);

  Evolve.Router.post('/api/v1/evolve/documentType/getDocumentTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentType.MidDocumentType.getDocumentTypeList, Evolve.App.Controllers.Evolve.DocumentType.ConList.getDocumentTypeList);  
  
  Evolve.Router.post('/api/v1/evolve/documentType/getSingleDocumentType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentType.MidDocumentType.getSingleDocumentType, Evolve.App.Controllers.Evolve.DocumentType.ConList.getSingleDocumentType);
  
  Evolve.Router.post('/api/v1/evolve/documentType/updateDocumentTypeData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentType.MidDocumentType.updateDocumentTypeData, Evolve.App.Controllers.Evolve.DocumentType.ConList.updateDocumentTypeData);



  


  /** End  : Document  Type*/

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Type Router :", error)
}


module.exports = Evolve.Router