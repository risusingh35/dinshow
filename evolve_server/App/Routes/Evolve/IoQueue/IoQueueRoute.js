'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Io Queue API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/IoQueue/getIoReportData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoQueue.MidIoQueue.getIoReportData,Evolve.App.Controllers.Evolve.IoQueue.ConIoQueue.getIoReportData);
    Evolve.Router.post('/api/v1/evolve/IoQueue/getSingleIoCodeData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoQueue.MidIoQueue.getSingleIoCodeData,Evolve.App.Controllers.Evolve.IoQueue.ConIoQueue.getSingleIoCodeData);
    Evolve.Router.post('/api/v1/evolve/IoQueue/changeIoCodeStatus',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoQueue.MidIoQueue.changeIoCodeStatus,Evolve.App.Controllers.Evolve.IoQueue.ConIoQueue.changeIoCodeStatus);    
    
    Evolve.Router.post('/api/v1/evolve/IoQueue/reQueueProcess',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.IoQueue.MidIoQueue.reQueueProcess,Evolve.App.Controllers.Evolve.IoQueue.ConIoQueue.reQueueProcess);

     /** End  : Io Queue  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Io Queue Router :", error)
}


module.exports = Evolve.Router