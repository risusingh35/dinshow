'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Split Pallet Api List
     *  Desc  :    
     */



    Evolve.Router.post('/api/v1/wms/splitPallet/getInventoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.splitPallet.MidIndex.getInventoryListAuth, Evolve.App.Controllers.Wms.splitPallet.ConIndex.getInventoryList);

    Evolve.Router.post('/api/v1/wms/splitPallet/splitPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.splitPallet.MidIndex.splitPalletAuth, Evolve.App.Controllers.Wms.splitPallet.ConIndex.splitPallet);

    Evolve.Router.post('/api/v1/wms/splitPallet/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.splitPallet.MidIndex.printPalletAuth, Evolve.App.Controllers.Wms.splitPallet.ConIndex.printPallet);

    // v1 routes

    Evolve.Router.post('/api/v1/wms/splitPallet/v1/getScannedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.splitPallet.ConV1.getscannedPallet);

    
    Evolve.Router.post('/api/v1/wms/splitPallet/v1/splitPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.splitPallet.ConV1.splitPallet);

    Evolve.Router.post('/api/v1/wms/splitPallet/v1/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.splitPallet.MidIndex.printPalletV1Auth, Evolve.App.Controllers.Wms.splitPallet.ConV1.printPallet);


    /** End  :  Split Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Split Pallets :", error)
}


module.exports = Evolve.Router