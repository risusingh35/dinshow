'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Project API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/Project/getProjectList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.Project.ConList.getProjectList);
    
    
    
    /** End  :Project  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router