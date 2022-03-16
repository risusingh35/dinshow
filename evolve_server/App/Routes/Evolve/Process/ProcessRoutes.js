'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/process/getProcessList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Process.ProcessMid.getProcessList, Evolve.App.Controllers.Evolve.Process.ConList.getProcessList);

    Evolve.Router.post('/api/v1/evolve/process/addProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Process.ProcessMid.addProcess, Evolve.App.Controllers.Evolve.Process.ConList.addProcess);

    Evolve.Router.post('/api/v1/evolve/process/getSingleProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Process.ProcessMid.getSingleProcess, Evolve.App.Controllers.Evolve.Process.ConList.getSingleProcess);

    Evolve.Router.post('/api/v1/evolve/process/updateProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Process.ProcessMid.updateProcess, Evolve.App.Controllers.Evolve.Process.ConList.updateProcess);

    Evolve.Router.post('/api/v1/evolve/process/deleteProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Process.ConList.deleteProcess);

    Evolve.Router.post('/api/v1/evolve/process/selectProcessValidation', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Process.ProcessMid.selectProcessValidation, Evolve.App.Controllers.Evolve.Process.ConList.selectProcessValidation);


    /** End  : Process  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process Router :", error)
}
module.exports = Evolve.Router