'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Rack Master
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/rackMaster/getAllRackList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getAllRackList);

    Evolve.Router.post('/api/v1/evolve/rackMaster/addRack', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.addRack);

    Evolve.Router.post('/api/v1/evolve/rackMaster/selectSingleRack', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.selectSingleRack);

    Evolve.Router.post('/api/v1/evolve/rackMaster/updateRack', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.updateRack);

    Evolve.Router.get('/api/v1/evolve/rackMaster/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getLocationList);

    Evolve.Router.get('/api/v1/evolve/rackMaster/getDeviceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getDeviceList);

    Evolve.Router.get('/api/v1/evolve/rackMaster/getItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getItemList);

    Evolve.Router.post('/api/v1/evolve/rackMaster/getLocationSync', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getLocationSync);
    


    // rack Details
    Evolve.Router.post('/api/v1/evolve/rackMaster/getAllRackDetailsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.getAllRackDetailsList);

    Evolve.Router.post('/api/v1/evolve/rackMaster/deviceCommand', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.rack.ConList.deviceCommand);




    /** End  :  Split Pallet  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error Rack Master :", error)
}


module.exports = Evolve.Router