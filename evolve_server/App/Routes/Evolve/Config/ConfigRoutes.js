'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Section  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/Config/getConfigList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Config.ConfigMid.getConfigListAuth, Evolve.App.Controllers.Evolve.Config.ConList.getConfigList);

    Evolve.Router.post('/api/v1/evolve/Config/addConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Config.ConfigMid.addConfigAuth, Evolve.App.Controllers.Evolve.Config.ConList.addConfig);

    Evolve.Router.post('/api/v1/evolve/Config/getSingleConfigData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Config.ConfigMid.getSingleConfigDataAuth, Evolve.App.Controllers.Evolve.Config.ConList.getSingleConfigData);
    
    Evolve.Router.post('/api/v1/evolve/Config/updateConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Config.ConfigMid.updateConfigAuth, Evolve.App.Controllers.Evolve.Config.ConList.updateConfig);
    
    Evolve.Router.post('/api/v1/evolve/Config/CsvConfigUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Config.ConList.CsvConfigUpload);
    
    Evolve.Router.post('/api/v1/evolve/Config/restartPM2Server', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Config.ConList.restartPM2Server);


  

    /** End  : Section  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Section Router :", error)
}
module.exports = Evolve.Router