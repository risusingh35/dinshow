'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Document Type API List
    *  Desc  :    
    */


  Evolve.Router.post('/api/v1/evolve/CustQRTemplate/addCustQRTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQRTemplate.CustQRTemplateMid.addCustQRTemplate, Evolve.App.Controllers.Evolve.CustQRTemplate.ConList.addCustQRTemplate);

  Evolve.Router.post('/api/v1/evolve/CustQRTemplate/getCustQRTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQRTemplate.CustQRTemplateMid.getCustQRTemplateList, Evolve.App.Controllers.Evolve.CustQRTemplate.ConList.getCustQRTemplateList);  
  
  Evolve.Router.post('/api/v1/evolve/CustQRTemplate/getSingleCustQRTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQRTemplate.CustQRTemplateMid.getSingleCustQRTemplate, Evolve.App.Controllers.Evolve.CustQRTemplate.ConList.getSingleCustQRTemplate);
  
  Evolve.Router.post('/api/v1/evolve/CustQRTemplate/updateCustQRTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CustQRTemplate.CustQRTemplateMid.updateCustQRTemplate, Evolve.App.Controllers.Evolve.CustQRTemplate.ConList.updateCustQRTemplate);



  


  /** End  : Document  Type*/

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Document Type Router :", error)
}


module.exports = Evolve.Router