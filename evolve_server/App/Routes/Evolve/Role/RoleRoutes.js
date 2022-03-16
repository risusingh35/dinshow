'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Role API List
     *  Desc  :    
     */
    Evolve.Router.post('/api/v1/evolve/role/getAppMenuByAppId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Role.ConList.getAppMenuByAppId);

    Evolve.Router.post('/api/v1/evolve/role/getAllRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.getAllRoleAuth,Evolve.App.Controllers.Evolve.Role.ConList.getAllRole);

    Evolve.Router.get('/api/v1/evolve/role/appListForRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Role.ConList.appListForRole);

    Evolve.Router.post('/api/v1/evolve/role/updateRoleToMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Role.ConList.updateRoleToMenu);

    Evolve.Router.post('/api/v1/evolve/role/createRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.createRoleAuth, Evolve.App.Controllers.Evolve.Role.ConList.createRole);

    Evolve.Router.post('/api/v1/evolve/role/selectSingleRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.selectSingleRoleAuth, Evolve.App.Controllers.Evolve.Role.ConList.selectSingleRole);

    Evolve.Router.post('/api/v1/evolve/role/updateRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.updateRoleAuth, Evolve.App.Controllers.Evolve.Role.ConList.updateRole);

    Evolve.Router.post('/api/v1/evolve/role/deleteRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.deleteRole, Evolve.App.Controllers.Evolve.Role.ConList.deleteRole);

    Evolve.Router.post('/api/v1/evolve/role/getDefaultMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Role.RoleMid.getDefaultMenuList, Evolve.App.Controllers.Evolve.Role.ConList.getDefaultMenuList);

    /** End  : Role  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router