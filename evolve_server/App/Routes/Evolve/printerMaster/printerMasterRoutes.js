'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Serial No  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/printerMaster/getPrinterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.getPrinterList);

    Evolve.Router.post('/api/v1/evolve/printerMaster/addPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.addPrinter);

    Evolve.Router.post('/api/v1/evolve/printerMaster/editPrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.editPrinter);

    Evolve.Router.post('/api/v1/evolve/printerMaster/getSingelPrinterData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.getSingelPrinterData);

    Evolve.Router.post('/api/v1/evolve/printerMaster/deletePrinter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.deletePrinter);

    Evolve.Router.post('/api/v1/evolve/printerMaster/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.printerMaster.ConList.getUnitList);

    /** End  : Serial No  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Serial No Router :", error)
}
module.exports = Evolve.Router