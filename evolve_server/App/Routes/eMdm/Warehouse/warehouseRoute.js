'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Warehouse
     */

    // Warehouse List
    Evolve.Router.post('/api/v1/eMdm/warehouse/getWarehouseList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.getWarehouseList);

    // Add / Edit 

    Evolve.Router.get('/api/v1/eMdm/warehouse/evolveUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.evolveUnitList);

    Evolve.Router.get('/api/v1/eMdm/warehouse/evolveUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.evolveUomList);

    Evolve.Router.post('/api/v1/eMdm/warehouse/getSingelWarehouseDataEdit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.getSingelWarehouseDataEdit);

    Evolve.Router.post('/api/v1/eMdm/warehouse/addWarehouse', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.addWarehouse);

    Evolve.Router.post('/api/v1/eMdm/warehouse/editWarehouse', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Warehouse.ConList.editWarehouse);





} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error In WMS Task :", error)
}


module.exports = Evolve.Router