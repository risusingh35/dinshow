'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process validation API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/processvalidation/getProcessValList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessValidation.ProcessValidationMid.getProcessValListAuth,Evolve.App.Controllers.Evolve.ProcessValidation.ConList.getProcessValList);

    Evolve.Router.get('/api/v1/evolve/processvalidation/getProcesses', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.getProcesses);

    Evolve.Router.post('/api/v1/evolve/processvalidation/getLastProcessValSeqNum', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.getLastProcessValSeqNum);

    Evolve.Router.post('/api/v1/evolve/processvalidation/getSingleProcessVal', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessValidation.ProcessValidationMid.getSingleProcessVal, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.getSingleProcessVal);

    Evolve.Router.post('/api/v1/evolve/processvalidation/addProcessVal', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ProcessValidation.ProcessValidationMid.addProcessVal, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.addProcessVal);

    Evolve.Router.post('/api/v1/evolve/processvalidation/updateProcessVal', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessValidation.ProcessValidationMid.updateProcessVal, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.updateProcessVal);

    Evolve.Router.post(
        "/api/v1/evolve/processvalidation/pdiImageUpload",
        Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Controllers.Evolve.ProcessValidation.ConList.pdiImageUpload
      );

    // Evolve.Router.post('/api/v1/evolve/processvalidation/deleteProcessVal', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessValidation.ConList.deleteProcessVal);

    /** End  : Process validation  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process validation Router :", error)
}
module.exports = Evolve.Router