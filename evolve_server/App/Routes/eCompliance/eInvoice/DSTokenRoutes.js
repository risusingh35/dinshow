'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  DSToken  API List
    *  Desc  :     
    */

  Evolve.Router.get('/api/v1/compliance/eInvoice/DSToken/getDSTokenList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Compliance.eInvoice.ConDSToken.getDSTokenList);


  /** End  : DSToken   */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve DSToken  Router :", error)
}
module.exports = Evolve.Router