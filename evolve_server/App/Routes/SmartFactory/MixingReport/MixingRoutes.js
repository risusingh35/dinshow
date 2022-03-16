'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/SmartFactory/MixingReport/getMixingReportDatatable',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.mixingReport.ConList.getMixingReportDatatable);


    Evolve.Router.post('/api/v1/SmartFactory/MixingReport/getMachineList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.mixingReport.ConList.getMachineList);

 


    /** End  : Gate In*/

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Mixin Report  router :", error)
}


module.exports = Evolve.Router
