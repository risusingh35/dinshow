'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process To Machine API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/processToMachine/getProcessToMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.getProcessToMachineList);

    Evolve.Router.get('/api/v1/evolve/processToMachine/getProcessList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.getProcessList);

    Evolve.Router.get('/api/v1/evolve/processToMachine/getMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.getMachineList);

    Evolve.Router.post('/api/v1/evolve/processToMachine/getSingleProcessToMachine', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.getSingleProcessToMachine);

    Evolve.Router.post('/api/v1/evolve/processToMachine/addProcessToMachine', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessToMachine.ProcessToMachineMid.addProcessToMachine, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.addProcessToMachine);
    
    Evolve.Router.post('/api/v1/evolve/processToMachine/getProcessSelectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessToMachine.ConList.getProcessSelectList);

    /** End  : Process To Machine  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process To Machine Router :", error)
}
module.exports = Evolve.Router