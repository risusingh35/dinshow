'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Io Queue API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/compliance/eInvoice/IOQueue/getIoReportData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidIoQueue.getIoReportData, Evolve.App.Controllers.Compliance.eInvoice.ConIoQueue.getIoReportData);
     
    Evolve.Router.post('/api/v1/compliance/eInvoice/IOQueue/reQueueProcess',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidIoQueue.reQueueProcess,Evolve.App.Controllers.Compliance.eInvoice.ConIoQueue.reQueueProcess);
    
    Evolve.Router.get('/api/v1/compliance/eInvoice/IOQueue/getGlobleVariableEInv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Compliance.eInvoice.ConIoQueue.getGlobleVariableEInv);
    
    Evolve.Router.post('/api/v1/compliance/eInvoice/IOQueue/deleteIOQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Compliance.eInvoice.MidIoQueue.deleteIOQueue,Evolve.App.Controllers.Compliance.eInvoice.ConIoQueue.deleteIOQueue);

     /** End  : Io Queue  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Io Queue Router :", error)
}


module.exports = Evolve.Router