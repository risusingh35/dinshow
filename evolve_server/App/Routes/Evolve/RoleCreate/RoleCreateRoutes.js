'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Role API List : Start
     *  Desc  :    
     */

    // Role List

    Evolve.Router.post('/api/v1/evolve/roleCreate/getAppMenuByAppId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.RoleCreate.ConList.getAppMenuByAppId);


    Evolve.Router.post('/api/v1/evolve/roleCreate/getAllRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.RoleCreate.ConList.getAllRoleList);

    Evolve.Router.post('/api/v1/evolve/roleCreate/saveRoleData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.RoleCreate.ConList.saveRoleData);

    Evolve.Router.post('/api/v1/evolve/roleCreate/getSingelRoleDataEdit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.RoleCreate.ConList.getSingelRoleDataEdit);

    Evolve.Router.post('/api/v1/evolve/roleCreate/modifyRoleData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.RoleCreate.ConList.modifyRoleData);

    

    // Role Option


    /** End  : Role API List : End  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router