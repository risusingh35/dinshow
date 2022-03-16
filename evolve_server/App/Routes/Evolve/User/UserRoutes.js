'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  User API List
     *  Desc  :    
     */
    Evolve.Router.post('/api/v1/evolve/user/getUsersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.getUsersListAuth , Evolve.App.Controllers.Evolve.User.ConList.getUsersList);

    Evolve.Router.post('/api/v1/evolve/user/deleteUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.deleteUser, Evolve.App.Controllers.Evolve.User.ConList.deleteUser);

    Evolve.Router.post('/api/v1/evolve/user/getCompanyListById', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.getCompanyListById, Evolve.App.Controllers.Evolve.User.ConList.getCompanyListById);

    Evolve.Router.get('/api/v1/evolve/user/companyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.User.ConList.companyList);

    Evolve.Router.get('/api/v1/evolve/user/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.User.ConList.getRoleList);

    Evolve.Router.post('/api/v1/evolve/user/selectSingleUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.selectSingleUserAuth, Evolve.App.Controllers.Evolve.User.ConList.selectSingleUser);

    Evolve.Router.post('/api/v1/evolve/user/updateUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.updateUserAuth, Evolve.App.Controllers.Evolve.User.ConList.updateUser);

    Evolve.Router.post('/api/v1/evolve/user/createUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.createUserAuth, Evolve.App.Controllers.Evolve.User.ConList.createUser);


    Evolve.Router.get('/api/v1/evolve/user/getBranchList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.User.ConList.getBranchList);

    Evolve.Router.post('/api/v1/evolve/user/assignBranch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.assignBranchAuth, Evolve.App.Controllers.Evolve.User.ConList.assignBranch);

    Evolve.Router.post('/api/v1/evolve/user/updateBranch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.updateBranchAuth, Evolve.App.Controllers.Evolve.User.ConList.updateBranch);

    Evolve.Router.post('/api/v1/evolve/user/getDefaultMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.User.MidList.getDefaultMenuList, Evolve.App.Controllers.Evolve.User.ConList.getDefaultMenuList);

    Evolve.Router.get('/api/v1/evolve/user/getAppList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.User.ConList.getAppList);



    /** End  : User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve User Router :", error)
}


module.exports = Evolve.Router