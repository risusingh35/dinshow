'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Purchase Order Receive API List
     *  Desc  :    
     */

    //  Evolve.Router.post('/api/v1/Wms/PurchaseOrderReceipt/getAsnDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.purchaseOrderReceipt.MidList.getAsnDetails , Evolve.App.Controllers.Wms.purchaseOrderReceipt.ConList.getAsnDetails);

    // Purchase Order V3 - end

    /** End  :  PurchaseOrder  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Recive Router :", error)
}


module.exports = Evolve.Router