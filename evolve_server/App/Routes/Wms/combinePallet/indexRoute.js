'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Combine Pallet Api List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/wms/combinePallet/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.combinePallet.ConIndex.getLocationList);

    Evolve.Router.get('/api/v1/wms/combinePallet/getLotandBatchUnique', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.combinePallet.ConIndex.getLotandBatchUnique);

    Evolve.Router.post('/api/v1/wms/combinePallet/getInventoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.getInventoryListAuth, Evolve.App.Controllers.Wms.combinePallet.ConIndex.getInventoryList);

    Evolve.Router.post('/api/v1/wms/combinePallet/combinePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.combinePalletAuth, Evolve.App.Controllers.Wms.combinePallet.ConIndex.combinePallet);

    Evolve.Router.post('/api/v1/wms/combinePallet/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.printPalletAuth, Evolve.App.Controllers.Wms.combinePallet.ConIndex.printPallet);

    // combine pallet V1 

       
    Evolve.Router.post('/api/v1/wms/combinePallet/v1/getscannedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.combinePallet.ConV1.getscannedPallet);


    
    // Evolve.Router.post('/api/v1/wms/combinePallet/v1/getscannedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.getscannedPalletAuth, Evolve.App.Controllers.Wms.combinePallet.ConV1.getscannedPallet);

    
    // Evolve.Router.post('/api/v1/wms/combinePallet/v1/combinePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.combinePalletV1Auth, Evolve.App.Controllers.Wms.combinePallet.ConV1.combinePallet);


    Evolve.Router.post('/api/v1/wms/combinePallet/v1/combinePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.combinePallet.ConV1.combinePallet);

    Evolve.Router.post('/api/v1/wms/combinePallet/v1/printPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.combinePallet.MidIndex.printPalletV1Auth, Evolve.App.Controllers.Wms.combinePallet.ConV1.printPallet);

    



    /** End  :  Combine Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error ewms combine pallet Router :", error)
}


module.exports = Evolve.Router