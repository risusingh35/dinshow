'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/MenuType/getAllMenuTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.getAllMenuTypeList);

    Evolve.Router.post('/api/v1/evolve/MenuType/getSingleMenuTypeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.getSingleMenuTypeDetails);

    Evolve.Router.post('/api/v1/evolve/MenuType/createMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.createMenuType);

    Evolve.Router.post('/api/v1/evolve/MenuType/upateMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.upateMenuType);
    
    Evolve.Router.post('/api/v1/evolve/MenuType/deleteMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.deleteMenuType);


    // Evolve.Router.post('/api/v1/evolve/MenuType/updateApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.updateApp);

    Evolve.Router.post('/api/v1/evolve/MenuType/getMdiIconList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.MenuType.ConList.getMdiIconList);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router