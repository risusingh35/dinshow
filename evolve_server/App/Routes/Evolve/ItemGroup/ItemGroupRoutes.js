'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Item group master  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/ItemGroup/getItemGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.getItemGroupListAuth,Evolve.App.Controllers.Evolve.ItemGroup.ConList.getItemGroupList);

    Evolve.Router.post('/api/v1/evolve/ItemGroup/addItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.addItemGroupAuth ,Evolve.App.Controllers.Evolve.ItemGroup.ConList.addItemGroup);

    Evolve.Router.post('/api/v1/evolve/ItemGroup/getSingleGroupData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.getSingleGroupDatagAuth ,  Evolve.App.Controllers.Evolve.ItemGroup.ConList.getSingleGroupData);

    Evolve.Router.post('/api/v1/evolve/ItemGroup/updateItemGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Evolve.ItemGroup.ItemGroupMid.updateItemGroupAuth , Evolve.App.Controllers.Evolve.ItemGroup.ConList.updateItemGroup);

    /** End  :  Item group master  API List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Group Master Router :", error)
}
module.exports = Evolve.Router