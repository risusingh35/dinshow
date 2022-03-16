'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  E - Invoice Configration
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/ioConfig/getConfigList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ioConfig.MidList.getConfigListAuth, Evolve.App.Controllers.Evolve.ioConfig.ConList.getConfigList);

    Evolve.Router.post('/api/v1/evolve/ioConfig/addConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ioConfig.MidList.addConfigAuth, Evolve.App.Controllers.Evolve.ioConfig.ConList.addConfig);

    Evolve.Router.post('/api/v1/evolve/ioConfig/getSingleConfigData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ioConfig.MidList.getSingleConfigDataAuth, Evolve.App.Controllers.Evolve.ioConfig.ConList.getSingleConfigData);

    Evolve.Router.post('/api/v1/evolve/ioConfig/updateConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ioConfig.MidList.updateConfigAuth, Evolve.App.Controllers.Evolve.ioConfig.ConList.updateConfig);

    Evolve.Router.post('/api/v1/evolve/ioConfig/CsvConfigUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ioConfig.ConList.CsvConfigUpload);

    /** End  : E - Invoice Configration  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve IO Configration Router :", error)
}
module.exports = Evolve.Router