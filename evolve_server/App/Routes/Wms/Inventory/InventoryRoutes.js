'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    
    Evolve.Router.post('/api/v1/Wms/inventory/getInventoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.Inventory.ConList.getInventoryList);

    Evolve.Router.post('/api/v1/Wms/inventory/onUploadInventryCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.Inventory.ConList.onUploadInventryCsv);

    Evolve.Router.post('/api/v1/Wms/inventory/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.Inventory.ConList.getItemList);

    Evolve.Router.post('/api/v1/Wms/inventory/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.Inventory.ConList.getUnitList);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router