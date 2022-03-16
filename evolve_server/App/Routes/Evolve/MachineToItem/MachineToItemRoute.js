'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */


    // Evolve.Router.get('/api/v1/evolve/machineToItem/getMachineToItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToItem.ConList.getMachineToItemList);

    Evolve.Router.get('/api/v1/evolve/machineToItem/getMachineToItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.MachineToItem.MidMachineToItem.getMachineToItemList , Evolve.App.Controllers.Evolve.MachineToItem.ConList.getMachineToItemList);

    Evolve.Router.get('/api/v1/evolve/machineToItem/getMachines', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToItem.ConList.getMachines);

    Evolve.Router.get('/api/v1/evolve/machineToItem/getItems', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToItem.ConList.getItems);

    Evolve.Router.get('/api/v1/evolve/machineToItem/getuoms', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToItem.ConList.getuoms);

    Evolve.Router.post('/api/v1/evolve/machineToItem/addMachineToItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToItem.MidMachineToItem.addMachineToItem, Evolve.App.Controllers.Evolve.MachineToItem.ConList.addMachineToItem);

    Evolve.Router.post('/api/v1/evolve/machineToItem/getSingleMachineToItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToItem.MidMachineToItem.getSingleMachineToItem, Evolve.App.Controllers.Evolve.MachineToItem.ConList.getSingleMachineToItem);

    Evolve.Router.post('/api/v1/evolve/machineToItem/updateMachineToItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToItem.MidMachineToItem.updateMachineToItem, Evolve.App.Controllers.Evolve.MachineToItem.ConList.updateMachineToItem);


    /** End  : Machine To Item  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router