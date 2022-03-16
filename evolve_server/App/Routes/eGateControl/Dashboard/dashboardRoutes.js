'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Assets Dashboard API List
      *  Desc  :     
      */


    Evolve.Router.get('/api/v1/eAssets/dashboard/gettotalBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Dashboard.ConDashboard.gettotalBeds);

    Evolve.Router.get('/api/v1/eAssets/dashboard/getTotalInBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Dashboard.ConDashboard.getTotalInBeds);

    Evolve.Router.get('/api/v1/eAssets/dashboard/gettotalOutBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Dashboard.ConDashboard.gettotalOutBeds);

    Evolve.Router.get('/api/v1/eAssets/dashboard/getWorkOrderCompletedData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Dashboard.ConDashboard.getWorkOrderCompletedData);

    Evolve.Router.get('/api/v1/eAssets/dashboard/getWorkOrderInProgressData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Dashboard.ConDashboard.getWorkOrderInProgressData);

    /** End  : Assets Dashboard  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Assets Dashboard Router :", error)
}


module.exports = Evolve.Router