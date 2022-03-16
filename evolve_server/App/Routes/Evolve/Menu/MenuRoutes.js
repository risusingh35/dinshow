'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Role API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/menu/getAllMenulist', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.getAllMenulistAuth, Evolve.App.Controllers.Evolve.Menu.ConList.getAllMenulist);

    Evolve.Router.post('/api/v1/evolve/menu/getMenusByAppId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.getMenusByAppIdAuth, Evolve.App.Controllers.Evolve.Menu.ConList.getMenusByAppId);

    Evolve.Router.get('/api/v1/evolve/menu/getAppList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Menu.ConList.getAppList);

    Evolve.Router.post('/api/v1/evolve/menu/selectSingleMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.selectSingleMenuAuth, Evolve.App.Controllers.Evolve.Menu.ConList.selectSingleMenu);

    Evolve.Router.post('/api/v1/evolve/menu/createMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.createMenuAuth, Evolve.App.Controllers.Evolve.Menu.ConList.createMenu);

    Evolve.Router.post('/api/v1/evolve/menu/updateMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.updateMenuAuth, Evolve.App.Controllers.Evolve.Menu.ConList.updateMenu);

    Evolve.Router.post('/api/v1/evolve/menu/deleteMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Menu.MenuMid.deleteMenu, Evolve.App.Controllers.Evolve.Menu.ConList.deleteMenu);

    Evolve.Router.get('/api/v1/evolve/menu/getIconList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.Menu.ConList.getIconList);

    Evolve.Router.get('/api/v1/evolve/menu/getMenuTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.Menu.ConList.getMenuTypeList);

    /** End  : Role  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router