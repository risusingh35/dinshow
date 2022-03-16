'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Dashboard API List
    *  Desc  :     
    */


  Evolve.Router.get('/api/v1/compliance/dashboard/getGspList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getGspList);

  Evolve.Router.get('/api/v1/compliance/dashboard/getCustomerCountList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getCustomerCountList);

  Evolve.Router.get('/api/v1/compliance/dashboard/getTotalEInvoiceProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getTotalEInvoiceProcess);
  
  Evolve.Router.get('/api/v1/compliance/dashboard/getTotalEInvoiceError', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getTotalEInvoiceError);

  Evolve.Router.get('/api/v1/compliance/dashboard/getCompletedInvoiceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getCompletedInvoiceList);

  Evolve.Router.get('/api/v1/compliance/dashboard/getLastTenDayData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getLastTenDayData);

  Evolve.Router.get('/api/v1/compliance/dashboard/getUnitWiseData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getUnitWiseData);

  Evolve.Router.get('/api/v1/compliance/dashboard/getIOQueue', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.Dashboard.ConDashboard.getIOQueue);

  
  
  
  
 

  /** End  : Dashboard  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Evolve Dashboard Router :", error)
}


module.exports = Evolve.Router