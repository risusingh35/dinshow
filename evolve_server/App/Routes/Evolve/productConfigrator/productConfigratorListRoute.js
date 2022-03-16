'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/Evolve/ProductConfigrator/getProductList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.getProductList);

    Evolve.Router.get('/api/v1/Evolve/ProductConfigrator/getProductNameList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.getProductNameList);

    Evolve.Router.get('/api/v1/Evolve/ProductConfigrator/getProductColourList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.getProductColourList);

    Evolve.Router.get('/api/v1/Evolve/ProductConfigrator/getProductDesignList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.getProductDesignList);

    Evolve.Router.get('/api/v1/Evolve/ProductConfigrator/getCustomerNameList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.getCustomerNameList);

    Evolve.Router.post('/api/v1/Evolve/ProductConfigrator/SearchAllData',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.productConfigrator.ConList.SearchAllData);
   
    
} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router