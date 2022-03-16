'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Label Master  API List
     *  Desc  :    
     */


    Evolve.Router.post('/api/v1/evolve/labelCommandMaster/getAllLabelCommandList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelCommandMaster.ConList.getAllLabelCommandList);

    Evolve.Router.post('/api/v1/evolve/labelCommandMaster/getParameters', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelCommandMaster.ConList.getParameters);

    Evolve.Router.post('/api/v1/evolve/labelCommandMaster/csvLabelCmdUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelCommandMaster.ConList.csvLabelCmdUpload);


    /** End  : Label Master   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Label Master Router :", error)
}
module.exports = Evolve.Router