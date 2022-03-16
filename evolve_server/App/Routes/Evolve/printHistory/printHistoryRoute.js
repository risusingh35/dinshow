'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Label Master  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/printHistory/getOnlinePrintHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConList.getOnlinePrintHistory); 

    Evolve.Router.post('/api/v1/evolve/printHistory/getOfflinePrintHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConList.getOfflinePrintHistory); 

    Evolve.Router.post('/api/v1/evolve/printHistory/reprintLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConList.reprintLabel); 

    Evolve.Router.post('/api/v1/evolve/printHistoryV1/getOfflinePrintHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV1.getOfflinePrintHistory); 

    Evolve.Router.post('/api/v1/evolve/printHistoryV1/reprintLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV1.reprintLabel); 

    Evolve.Router.get('/api/v1/evolve/printHistory/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConList.getAllPrinter);

    Evolve.Router.get('/api/v1/evolve/printHistoryV1/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV1.getAllPrinter);
    
    // Print Process History V2
    
    Evolve.Router.post('/api/v1/evolve/printHistoryV2/getPrintProcessHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV2.getPrintProcessHistory); 

    Evolve.Router.post('/api/v1/evolve/printHistoryV2/onClickRePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV2.onClickRePrint);

    Evolve.Router.get('/api/v1/evolve/printHistoryV2/getAllPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printHistory.ConListV2.getAllPrinter);

    /** End  : Label Master   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Label Master Router :", error)
}
module.exports = Evolve.Router