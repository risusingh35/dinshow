'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/machineToUser/getMachinetoUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.MachineToUser.MachineToUserMid.getMachinetoUserListAuth, Evolve.App.Controllers.Evolve.MachineToUser.ConList.getMachinetoUserList);

    Evolve.Router.get('/api/v1/evolve/machineToUser/getUsers', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToUser.ConList.getUsers);

    Evolve.Router.get('/api/v1/evolve/machineToUser/getMachines', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToUser.ConList.getMachines);

    Evolve.Router.get('/api/v1/evolve/machineToUser/getMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToUser.ConList.getMenuList);

    Evolve.Router.post('/api/v1/evolve/machineToUser/addMachineToUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToUser.MachineToUserMid.addMachineToUser, Evolve.App.Controllers.Evolve.MachineToUser.ConList.addMachineToUser);

    Evolve.Router.post('/api/v1/evolve/machineToUser/getSingleMachineToUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToUser.MachineToUserMid.getSingleMachineToUser, Evolve.App.Controllers.Evolve.MachineToUser.ConList.getSingleMachineToUser);

    Evolve.Router.post('/api/v1/evolve/machineToUser/updateMachineToUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.MachineToUser.MachineToUserMid.updateMachineToUser, Evolve.App.Controllers.Evolve.MachineToUser.ConList.updateMachineToUser);

    Evolve.Router.post('/api/v1/evolve/machineToUser/deleteMachineToUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MachineToUser.ConList.deleteMachineToUser);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router