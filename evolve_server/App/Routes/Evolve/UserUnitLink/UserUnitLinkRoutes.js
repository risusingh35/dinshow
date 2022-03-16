'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    
     Evolve.Router.post('/api/v1/evolve/UserUnitLink/getUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getUserList);



        
     Evolve.Router.post('/api/v1/evolve/UserUnitLink/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getUnitList);



    Evolve.Router.post('/api/v1/evolve/UserUnitLink/getUserUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getUserUnitList);

    


    Evolve.Router.post('/api/v1/evolve/UserUnitLink/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getRoleList);
    

    Evolve.Router.post('/api/v1/evolve/UserUnitLink/addUserUnitLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.addUserUnitLink);

    
    Evolve.Router.post('/api/v1/evolve/UserUnitLink/activeDeactiveLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.activeDeactiveLink);

    
    Evolve.Router.post('/api/v1/evolve/UserUnitLink/getAssignedRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getAssignedRoleList);





    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/getSingleMenuTypeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getSingleMenuTypeDetails);

    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/createMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.createMenuType);

    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/upateMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.upateMenuType);
    
    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/deleteMenuType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.deleteMenuType);


    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/updateApp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.updateApp);

    // Evolve.Router.post('/api/v1/evolve/UserUnitLink/getMdiIconList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UserUnitLink.ConList.getMdiIconList);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router