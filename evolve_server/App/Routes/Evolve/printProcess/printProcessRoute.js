'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Gate Out API List
     *  Desc  :    
     */
       
    Evolve.Router.post('/api/v1/Evolve/printProcess/getPrintProcessListOnline', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConList.getPrintProcessListOnline);

    Evolve.Router.post('/api/v1/Evolve/printProcess/getPrintProcessListOffline', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConList.getPrintProcessListOffline);

    Evolve.Router.post('/api/v1/Evolve/printProcess/onClickRePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConList.onClickRePrint);

    Evolve.Router.post('/api/v1/Evolve/printProcessV1/getPrintProcessListOffline', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV1.getPrintProcessListOffline);

    Evolve.Router.post('/api/v1/Evolve/printProcessV1/onClickRePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV1.onClickRePrint);

    Evolve.Router.get('/api/v1/Evolve/printProcess/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConList.getAllPrinter);

    Evolve.Router.get('/api/v1/Evolve/printProcessV1/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV1.getAllPrinter);

    Evolve.Router.post('/api/v1/Evolve/printProcess/requeueAllErrorLabels', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConList.requeueAllErrorLabels);

    // Printer Process V2

    Evolve.Router.post('/api/v1/Evolve/printProcessV2/getPrintProcessList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV2.getPrintProcessList);

    Evolve.Router.post('/api/v1/Evolve/printProcessV2/rePrintAll', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV2.rePrintAll);
    
    Evolve.Router.get('/api/v1/Evolve/printProcessV2/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV2.getAllPrinter);

    Evolve.Router.post('/api/v1/Evolve/printProcessV2/onClickRePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListV2.onClickRePrint);
    
    // Printer Process Invoice

    Evolve.Router.post('/api/v1/Evolve/printProcessInvoice/getPrintProcessList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListInvoice.getPrintProcessList);

    Evolve.Router.post('/api/v1/Evolve/printProcessInvoice/rePrintAll', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListInvoice.rePrintAll);
    
    Evolve.Router.get('/api/v1/Evolve/printProcessInvoice/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListInvoice.getAllPrinter);

    Evolve.Router.post('/api/v1/Evolve/printProcessInvoice/onClickRePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printProcess.ConListInvoice.onClickRePrint);



     /** End  : Gate Out  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Gate Out Router :", error)
}


module.exports = Evolve.Router