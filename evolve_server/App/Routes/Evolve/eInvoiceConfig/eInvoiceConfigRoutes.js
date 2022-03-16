'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  E - Invoice Configration
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/eInvoiceConfig/getConfigList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.eInvoiceConfig.MidList.getConfigListAuth, Evolve.App.Controllers.Evolve.eInvoiceConfig.ConList.getConfigList);

    Evolve.Router.post('/api/v1/evolve/eInvoiceConfig/addConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.eInvoiceConfig.MidList.addConfigAuth, Evolve.App.Controllers.Evolve.eInvoiceConfig.ConList.addConfig);

    Evolve.Router.post('/api/v1/evolve/eInvoiceConfig/getSingleConfigData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.eInvoiceConfig.MidList.getSingleConfigDataAuth, Evolve.App.Controllers.Evolve.eInvoiceConfig.ConList.getSingleConfigData);

    Evolve.Router.post('/api/v1/evolve/eInvoiceConfig/updateConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.eInvoiceConfig.MidList.updateConfigAuth, Evolve.App.Controllers.Evolve.eInvoiceConfig.ConList.updateConfig);

    Evolve.Router.post('/api/v1/evolve/eInvoiceConfig/CsvConfigUpload', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.eInvoiceConfig.ConList.CsvConfigUpload);

    /** End  : E - Invoice Configration  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve E - Invoice Configration Router :", error)
}
module.exports = Evolve.Router