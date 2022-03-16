'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Gst Return API List
    *  Desc  :     
    */

  Evolve.Router.post('/api/v1/compliance/eInvoice/GSTReturn/SendGSTReturnOTPRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.SendGSTReturnOTPRequest);

  Evolve.Router.post('/api/v1/compliance/eInvoice/GSTReturn/SubmitOTPRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.SubmitOTPRequest);
  
  

  /** End  : Gst Return  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Gst Return Router :", error)
}
module.exports = Evolve.Router