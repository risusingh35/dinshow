'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductNameList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductNameList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductColorList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductColorList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductDesignList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductDesignList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getCustomerList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getCustomerList);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/getItemList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getItemList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getUomList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getUomList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductQuality',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductQuality);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/getProductData',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductData);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/createProductConfigrator',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createProductConfigrator);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/getConfigratorDetailList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getConfigratorDetailList);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/checkProductExistOrNot',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.checkProductExistOrNot);

    Evolve.Router.post('/api/v1/evolve/productConfigrator/updateConfigratorDetailAndReque',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.updateConfigratorDetailAndReque);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductTypeList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductTypeList);

    Evolve.Router.get('/api/v1/evolve/productConfigrator/getProductGradeList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization
    ,Evolve.App.Controllers.Evolve.productConfigrator.ConOption.getProductGradeList);
    
} catch (error) {
    Evolve.Log.error(error.message);
    console.log(" Error in Evolve  Sub Reason Master Router :", error)
}


module.exports = Evolve.Router
