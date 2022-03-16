'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Purchase Order Receive API List
     *  Desc  :    
     */

     Evolve.Router.post('/api/v1/Wms/PurchaseOrder/Reciept/getPoRcptList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConReciept.getPoRcptList);


     
     Evolve.Router.post('/api/v1/Wms/PurchaseOrder/Reciept/poRcptPostToErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConReciept.poRcptPostToErpNew);

    // Evolve.Router.post('/api/v1/Wms/PurchaseOrder/Reciept/onUploadInventryCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.onUploadInventryCsv);

    // Evolve.Router.post('/api/v1/Wms/PurchaseOrder/Reciept/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.getItemList);

    // Evolve.Router.post('/api/v1/Wms/PurchaseOrder/Reciept/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.PurchaseOrder.ConList.getUnitList);






    /** End  :  PurchaseOrder  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Recive Router :", error)
}


module.exports = Evolve.Router