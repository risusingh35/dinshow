'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/AppMaster/getAllAppList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.AppMaster.ConList.getAllAppList);

    Evolve.Router.post('/api/v1/evolve/AppMaster/selectSingleApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.AppMaster.ConList.selectSingleApp);

    Evolve.Router.post('/api/v1/evolve/AppMaster/addNewApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.AppMaster.ConList.addNewApp);

    Evolve.Router.post('/api/v1/evolve/AppMaster/updateApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.AppMaster.ConList.updateApp);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router