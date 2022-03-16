
'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Location Group API List
      *  Desc  :    
      */


    Evolve.Router.post('/api/v1/evolve/LoginFailedAttempts/getLoginFailedAttempts', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.LoginFailedAttempts.ConList.getLoginFailedAttempts);

    // Evolve.Router.post('/api/v1/evolve/LoginMaster/getDateWiseLogInList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.LoginMaster.ConList.getDateWiseLogInList);




    /** End  : Location Group  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Location Group Router :", error)
}


module.exports = Evolve.Router