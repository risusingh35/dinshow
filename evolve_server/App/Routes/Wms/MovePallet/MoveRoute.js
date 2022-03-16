'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Move Pallet API List
     *  Desc  :    
     */

    // Evolve.Router.post("/api/v1/Wms/MovePallet/getItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getItem);

    Evolve.Router.post('/api/v1/wms/MovePallet/getPalletList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getPalletList);

    // Evolve.Router.post('/api/v1/wms/movePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.MovePallet.MidMove.movePalletAuth, Evolve.App.Controllers.Wms.MovePallet.ConMove.movePallet); // Evolve.App.Middlewares.EvolveCommonApiValidator.movePalletAuth
    // //

    // Evolve.Router.get('/api/v1/wms/MovePallet/getInventoryItemNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getInventoryItemNumber);
    Evolve.Router.get('/api/v1/wms/MovePallet/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getLocationList);

    Evolve.Router.post('/api/v1/wms/movePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.MovePallet.MidMove.movePalletAuth, Evolve.App.Controllers.Wms.MovePallet.ConMove.movePallet); // Evolve.App.Middlewares.EvolveCommonApiValidator.movePalletAuth

    // Evolve.Router.get('/api/v1/wms/MovePallet/getInventoryItemNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getInventoryItemNumber);

    Evolve.Router.get('/api/v1/wms/MovePallet/getReasonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConMove.getReasonList);
    // Evolve.Router.get('/api/v1/wms/gateExit/getallInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.GateExit.ConList.getallInvoice);

    // Move Pallet V1 Apis 
    Evolve.Router.post('/api/v1/wms/MovePallet/v1/getscannedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Wms.MovePallet.MidMove.getscannedPalletAuth, Evolve.App.Controllers.Wms.MovePallet.ConV1.getscannedPallet);

    Evolve.Router.post('/api/v1/wms/MovePallet/v1/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConV1.getLocationList);

    Evolve.Router.get('/api/v1/wms/MovePallet/v1/getReasonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConV1.getReasonList);

    Evolve.Router.post('/api/v1/wms/MovePallet/v1/onMovePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.MovePallet.ConV1.onMovePallet);

    Evolve.Router.post('/api/v1/wms/MovePallet/v1/rePrintPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Wms.MovePallet.MidMove.rePrintPalletAuth, Evolve.App.Controllers.Wms.MovePallet.ConV1.rePrintPallet);









    /** End  :  Move Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error ewms move pallet Router :", error)
}


module.exports = Evolve.Router