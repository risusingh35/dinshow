'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/projectMaster/getProjectMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.projectMaster.ConList.getProjectMasterList);
    
    Evolve.Router.post('/api/v1/eDoa/projectMaster/addProjectMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.projectMaster.ConList.addProjectMaster);

    Evolve.Router.post('/api/v1/eDoa/projectMaster/updateProjectMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.projectMaster.ConList.updateProjectMaster);

    Evolve.Router.post('/api/v1/eDoa/projectMaster/onUploadProjectMasterFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.projectMaster.ConList.onUploadProjectMasterFile);

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Project Master Router :", error)
}
module.exports = Evolve.Router