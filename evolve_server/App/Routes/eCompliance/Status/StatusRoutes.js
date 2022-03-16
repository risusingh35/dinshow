'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /* 
        *  Title :  status API List
        *  Desc  :     
    */

  Evolve.Router.post('/api/v1/compliance/status/getInvoiceList', Evolve.App.Controllers.Compliance.Status.ConStatus.getInvoiceList);

  /** End  : Status  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Status Router :", error)
}


module.exports = Evolve.Router