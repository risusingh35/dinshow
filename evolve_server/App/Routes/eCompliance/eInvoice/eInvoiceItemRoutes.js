'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  EInvoice API List
    *  Desc  :     
    */


 

  Evolve.Router.post('/api/v1/compliance/eInvoice/Item/getEInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidItemList.getEInvoiceList, Evolve.App.Controllers.Compliance.eInvoice.ConItemList.getEInvoiceList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/Item/getSingleEinvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidItemList.getSingleEinvoiceList, Evolve.App.Controllers.Compliance.eInvoice.ConItemList.getSingleEinvoiceList);

  
  Evolve.Router.post('/api/v1/compliance/eInvoice/Item/updateEinvoiceColumn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConItemList.updateEinvoiceColumn);
  
  
  Evolve.Router.post('/api/v1/compliance/eInvoice/Item/getSingleEinvoiceLineID', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidItemList.getSingleEinvoiceLineID, Evolve.App.Controllers.Compliance.eInvoice.ConItemList.getSingleEinvoiceLineID);
  
  Evolve.Router.post('/api/v1/compliance/eInvoice/Item/updateEinvoiceLineColumn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConItemList.updateEinvoiceLineColumn);
  
  
 


  /** End  : EInvoice  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve EInvoice Router :", error)
}


module.exports = Evolve.Router