'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    
     Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getTableList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getTableList);


         
     Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getTableDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getTableDetails);

     Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getSinglePageDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getSinglePageDetail);

     Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/addPageDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.addPageDetails);

     Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/updatePageDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.updatePageDetails);





        
    //  Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getUnitList);



    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getUserUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getUserUnitList);

    


    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getRoleList);
    

    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/addUserUnitLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.addUserUnitLink);

    
    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/activeDeactiveLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.activeDeactiveLink);

    
    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getAssignedRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getAssignedRoleList);





    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getSingleMenuTypeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getSingleMenuTypeDetails);

    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/createMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.createMenuType);

    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/upateMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.upateMenuType);
    
    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/deleteMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.deleteMenuType);


    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/updateApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.updateApp);

    // Evolve.Router.post('/api/v1/evolve/EvolvePageDesigner/getMdiIconList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.EvolvePageDesigner.ConPageDesigner.getMdiIconList);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router