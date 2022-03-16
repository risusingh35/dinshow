'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  EInvoice Process V2 API List
    *  Desc  :     
    */


  Evolve.Router.post('/api/v1/compliance/eInvoice/InvoiceHistoryV2/getInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidList.getInvoiceList, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.getInvoiceList);

  Evolve.Router.post('/api/v1/compliance/eInvoice/InvoiceHistoryV2/reSendEmail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidList.reSendEmail, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.reSendEmail);

  Evolve.Router.post('/api/v1/compliance/eInvoice/InvoiceHistoryV2/reProcessSendErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidList.reProcessSendErp, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.reProcessSendErp);

  Evolve.Router.post('/api/v1/compliance/eInvoice/InvoiceHistoryV2/reProcessUploadErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Compliance.eInvoice.MidList.reProcessUploadErp, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.reProcessUploadErp);

  Evolve.Router.get('/api/v1/compliance/eInvoice/InvoiceHistoryV2/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.getUnitList);  
  
  Evolve.Router.get('/api/v1/compliance/eInvoice/InvoiceHistoryV2/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.getSupplierList);
  
  Evolve.Router.get('/api/v1/compliance/eInvoice/InvoiceHistoryV2/getGlobleVariableEInv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConInvoiceHistoryV2.getGlobleVariableEInv);

  
  /** End  : EInvoice  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve EInvoice Process V2 Router :", error)
  }
  
  
  module.exports = Evolve.Router