'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Dashboard API List
     *  Desc  :    
     */
    Evolve.Router.post('/api/v1/evolve/dashboard/getSerialChartData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Dashboard.ConDashboard.getSerialChartData);

    Evolve.Router.get('/api/v1/evolve/dashboard/getAllSerial', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Dashboard.ConDashboard.getAllSerial);

    Evolve.Router.get('/api/v1/evolve/dashboard/getAllCountData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Dashboard.ConDashboard.getAllCountData);



    /** End  : Dashboard  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Dashboard Router :", error)
}


module.exports = Evolve.Router