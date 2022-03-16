'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Document API List
    *  Desc  :    
    */


  Evolve.Router.post('/api/v1/evolve/document/addDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Document.MidDocument.addDocument, Evolve.App.Controllers.Evolve.Document.ConList.addDocument);

  Evolve.Router.post('/api/v1/evolve/document/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Document.MidDocument.getDocumentList, Evolve.App.Controllers.Evolve.Document.ConList.getDocumentList);

  Evolve.Router.get('/api/v1/evolve/document/getDocumentTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getDocumentTypeList);

  Evolve.Router.post('/api/v1/evolve/document/getDocumentSubTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getDocumentSubTypeList);

  Evolve.Router.get('/api/v1/evolve/document/getGspList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getGspList);

  Evolve.Router.get('/api/v1/evolve/document/getInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getInvoiceList);

  Evolve.Router.get('/api/v1/evolve/document/getCTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getCTemplateList);

  Evolve.Router.post('/api/v1/evolve/document/getSingleDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getSingleDocument);

  Evolve.Router.post('/api/v1/evolve/document/updateDocument', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Document.MidDocument.updateDocument, Evolve.App.Controllers.Evolve.Document.ConList.updateDocument);

  Evolve.Router.post('/api/v1/evolve/document/getCoordinateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Document.MidDocument.getCoordinateList, Evolve.App.Controllers.Evolve.Document.ConList.getCoordinateList);

  Evolve.Router.get('/api/v1/evolve/document/getCustQRTempList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Document.ConList.getCustQRTempList);



  /** End  : Document  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Router :", error)
}


module.exports = Evolve.Router