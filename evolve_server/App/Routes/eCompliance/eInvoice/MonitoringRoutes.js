'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Monitoring  API List
    *  Desc  :     
    */

  Evolve.Router.post('/api/v1/compliance/eInvoice/Monitoring/ReprocessEinvConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConMonitoring.ReprocessEinvConfig);

  Evolve.Router.get('/api/v1/compliance/eInvoice/Monitoring/EInvoiceFuncStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConMonitoring.EInvoiceFuncStatus);

  Evolve.Router.post('/api/v1/compliance/eInvoice/Monitoring/eInvoiceStartFunction', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConMonitoring.eInvoiceStartFunction);


  /** End  : Monitoring   */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Monitoring  Router :", error)
}
module.exports = Evolve.Router