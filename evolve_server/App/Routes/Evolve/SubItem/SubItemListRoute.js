'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Sub Item List Master  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/SubItem/deleteSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.deleteSubItem);

    Evolve.Router.get('/api/v1/evolve/SubItem/getItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.getItemSearch);

    Evolve.Router.post('/api/v1/evolve/SubItem/getSubItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubItem.MidSubItemList.getSubItemListAuth,Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.getSubItemList);

    Evolve.Router.get('/api/v1/evolve/SubItem/getItemNumber',Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.getItemNumber);

    Evolve.Router.post('/api/v1/evolve/SubItem/addSubItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubItem.MidSubItemList.addSubItemList,Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.addSubItemList);

    Evolve.Router.post('/api/v1/evolve/SubItem/selectSingleSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubItem.MidSubItemList.selectSingleSubItem,Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.selectSingleSubItem)

    Evolve.Router.post('/api/v1/evolve/SubItem/updateSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubItem.MidSubItemList.updateSubItem, 	Evolve.App.Controllers.Evolve.SubItem.ConSubItemList.updateSubItem);

     
   

   
     /** End  :  Sub Item List Master   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve  Sub Item List Master  Router :", error)
}


module.exports = Evolve.Router