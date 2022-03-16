'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  EInvoice Process V2 API List
    *  Desc  :     
    */

   Evolve.Router.get('/api/v1/compliance/eInvoice/EinvoiceProcessV2/getGlobleVariableEInv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceProcessV2.getGlobleVariableEInv);

  Evolve.Router.get('/api/v1/compliance/eInvoice/EinvoiceProcessV2/getEInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceProcessV2.getEInvoiceList);


  /** End  : EInvoice  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve EInvoice Process V2 Router :", error)
}


module.exports = Evolve.Router