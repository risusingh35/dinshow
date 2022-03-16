'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  user rights   API List
     *  Desc  :    
     */

    // Evolve.Router.post('/api/v1/evolve/ItemGroup/getItemGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.getItemGroupListAuth,Evolve.App.Controllers.Evolve.ItemGroup.ConList.getItemGroupList);

    // Evolve.Router.post('/api/v1/evolve/ItemGroup/addItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.addItemGroupAuth ,Evolve.App.Controllers.Evolve.ItemGroup.ConList.addItemGroup);

    // Evolve.Router.post('/api/v1/evolve/ItemGroup/getSingleGroupData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.getSingleGroupDatagAuth ,  Evolve.App.Controllers.Evolve.ItemGroup.ConList.getSingleGroupData);

    // Evolve.Router.post('/api/v1/evolve/ItemGroup/updateItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.updateItemGroupAuth , Evolve.App.Controllers.Evolve.ItemGroup.ConList.updateItemGroup);


    
    Evolve.Router.post('/api/v1/evolve/UserRights/getMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.UserRights.ConList.getMenuList)

    
    
    Evolve.Router.post('/api/v1/evolve/UserRights/getUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.UserRights.ConList.getUserList)

    Evolve.Router.post('/api/v1/evolve/UserRights/getAppList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.UserRights.ConList.getAppList)


    Evolve.Router.post('/api/v1/evolve/UserRights/getUserRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.UserRights.ConList.getUserRole)

    
    Evolve.Router.post('/api/v1/evolve/UserRights/getMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.getMenuListAuth ,Evolve.App.Controllers.Evolve.UserRights.ConList.getMenuList)

    Evolve.Router.post('/api/v1/evolve/UserRights/getPageConfigs', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.getPageConfigsAuth ,Evolve.App.Controllers.Evolve.UserRights.ConList.getPageConfigs)

    Evolve.Router.post('/api/v1/evolve/UserRights/addRights', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.addRightsAuth,Evolve.App.Controllers.Evolve.UserRights.ConList.addRights)

    Evolve.Router.post('/api/v1/evolve/UserRights/getUserRights', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.getUserRightsAuth,Evolve.App.Controllers.Evolve.UserRights.ConList.getUserRights)

    Evolve.Router.post('/api/v1/evolve/UserRights/getSingleRightsData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.getSingleRightsDataAuth,Evolve.App.Controllers.Evolve.UserRights.ConList.getSingleRightsData)

    Evolve.Router.post('/api/v1/evolve/UserRights/updateRights', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.UserRights.UserRightsMid.updateRightsAuth,Evolve.App.Controllers.Evolve.UserRights.ConList.updateRights)

    /** End  :  user rights   API List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve user rights  Router :", error)
}
module.exports = Evolve.Router