'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Security Control : Start
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/securityControl/saveSecurityControl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SecurityControl.ConList.saveSecurityControl);

    Evolve.Router.get('/api/v1/evolve/securityControl/getSecurityControlData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.SecurityControl.ConList.getSecurityControlData);



    /** End  : Security Control : End  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Security Control Routes :", error)
}

module.exports = Evolve.Router