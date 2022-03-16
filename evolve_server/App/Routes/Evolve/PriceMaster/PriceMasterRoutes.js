'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Price Master API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/priceMaster/getPriceMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PriceMaster.ConIndex.getPriceMasterList);

    Evolve.Router.post('/api/v1/evolve/priceMaster/addPriceMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PriceMaster.ConIndex.addPriceMaster);

    Evolve.Router.post('/api/v1/evolve/priceMaster/getSinglePriceMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PriceMaster.ConIndex.getSinglePriceMaster);

    Evolve.Router.post('/api/v1/evolve/priceMaster/updatePriceList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PriceMaster.ConIndex.updatePriceList);

    Evolve.Router.post('/api/v1/evolve/priceMaster/uploadPriceCsv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PriceMaster.ConIndex.uploadPriceCsv);


    /** End  : Price Master  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Price Master Router :", error)
}
module.exports = Evolve.Router