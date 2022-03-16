'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Material Unloading
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/wms/materialUnload/getAllMaterialUnloadList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.materialUnloading.ConList.getAllMaterialUnloadList);

    Evolve.Router.post('/api/v1/wms/materialUnload/getSingleMaterialDetais', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.materialUnloading.ConList.getSingleMaterialDetais);

    Evolve.Router.post('/api/v1/wms/materialUnload/unloadMaterial', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.materialUnloading.ConList.unloadMaterial);



    /** End  :  Split Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error In WMS Material Unloading :", error)
}


module.exports = Evolve.Router