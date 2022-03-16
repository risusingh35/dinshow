'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Split Pallet Api List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/wms/supplierReturn/getQcOrderList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.supplierReturn.ConsupplierReturn.getQcOrderList);

    Evolve.Router.post('/api/v1/Wms/supplierReturn/getRejectPalletDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.supplierReturn.ConsupplierReturn.getRejectPalletList);
    
    Evolve.Router.post('/api/v1/Wms/supplierReturn/conformSupplierReturn', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.supplierReturn.ConsupplierReturn.conformSupplierReturn);
    

    /** End  :  Split Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error suppliter Returns:", error)
}


module.exports = Evolve.Router