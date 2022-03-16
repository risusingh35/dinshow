'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Test Mail  API List
    *  Desc  :     
    */

  Evolve.Router.post('/api/v1/compliance/eInvoice/TestMail/getMailConfigData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConTestMail.getMailConfigData);
  
  Evolve.Router.post('/api/v1/compliance/eInvoice/TestMail/sendMail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidTestMail.sendMail, Evolve.App.Controllers.Compliance.eInvoice.ConTestMail.sendMail);


  /** End  : Test Mail   */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Test Mail  Router :", error)
}
module.exports = Evolve.Router