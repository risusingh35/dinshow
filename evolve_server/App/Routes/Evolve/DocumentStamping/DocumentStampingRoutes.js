'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Document Stamping  API List
    *  Desc  :    
    */


  Evolve.Router.get('/api/v1/evolve/documentStamping/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.getDocumentList);

  Evolve.Router.post('/api/v1/evolve/documentStamping/getDocumentStampingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentStamping.MidDocumentStamping.getDocumentStampingList, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.getDocumentStampingList);

  Evolve.Router.post('/api/v1/evolve/documentStamping/addDocumentStamping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentStamping.MidDocumentStamping.addDocumentStamping, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.addDocumentStamping);

  Evolve.Router.post('/api/v1/evolve/documentStamping/getSingleDocumentStamping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentStamping.MidDocumentStamping.getSingleDocumentStamping, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.getSingleDocumentStamping);

  Evolve.Router.post('/api/v1/evolve/documentStamping/updateDocumentStamping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentStamping.MidDocumentStamping.updateDocumentStamping, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.updateDocumentStamping);

  Evolve.Router.post('/api/v1/evolve/documentStamping/checkDocumentStampingCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DocumentStamping.MidDocumentStamping.checkDocumentStampingCode, Evolve.App.Controllers.Evolve.DocumentStamping.ConList.checkDocumentStampingCode);

 




  


  /** End  : Document Stamping*/

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Stamping Router :", error)
}


module.exports = Evolve.Router