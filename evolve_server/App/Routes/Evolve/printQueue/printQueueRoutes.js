'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Pdi Template Master API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/printQueue/getAllOnlinePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getAllOnlinePrintQueue);

    Evolve.Router.post('/api/v1/evolve/printQueue/getAllOfflinePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getAllOfflinePrintQueue);

    Evolve.Router.get('/api/v1/evolve/printQueue/getAllOfflineModelList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getAllOfflineModelList);

    Evolve.Router.post('/api/v1/evolve/printQueue/saveOfflinePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.saveOfflinePrintQueue);

    Evolve.Router.post('/api/v1/evolve/printQueue/printOfflineLabel',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.printOfflineLabel);

    Evolve.Router.post('/api/v1/evolve/printQueue/printOnlineLabel',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.printOfflineLabel);
   
    Evolve.Router.post('/api/v1/evolve/printQueue/printFirst21DSN',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.printFirst21DSN);

    Evolve.Router.get('/api/v1/evolve/printQueueV1/getAllItemList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getAllItemList);

    Evolve.Router.post('/api/v1/evolve/printQueueV1/saveOfflinePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.saveOfflinePrintQueue);

    Evolve.Router.post('/api/v1/evolve/printQueueV1/getAllOfflinePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getAllOfflinePrintQueue);

    Evolve.Router.post('/api/v1/evolve/printQueueV1/printOfflineLabel',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.printOfflineLabel);

    Evolve.Router.get('/api/v1/evolve/printQueue/getAllPrinter',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getAllPrinter);

    Evolve.Router.get('/api/v1/evolve/printQueueV1/getAllPrinter',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getAllPrinter);

    Evolve.Router.get('/api/v1/evolve/printQueueV1/getAllShift',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getAllShift);

    Evolve.Router.post('/api/v1/evolve/printQueueV1/deletePrintQueue',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.deletePrintQueue);
     /** End  :Pdi Template Master  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Template Master Router :", error)
}


module.exports = Evolve.Router