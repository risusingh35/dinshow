'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Page Congig API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/evolve/pageConfig/getMenuUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.PageConfig.ConList.getMenuUrl);

    Evolve.Router.post('/api/v1/evolve/pageConfig/getPageConfigList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PageConfig.MidPageConfig.getPageConfigList, Evolve.App.Controllers.Evolve.PageConfig.ConList.getPageConfigList);

    Evolve.Router.post('/api/v1/evolve/pageConfig/addPageConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.PageConfig.MidPageConfig.addPageConfig, Evolve.App.Controllers.Evolve.PageConfig.ConList.addPageConfig);

    Evolve.Router.post('/api/v1/evolve/pageConfig/getSinglePageConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.PageConfig.MidPageConfig.getSinglePageConfig, Evolve.App.Controllers.Evolve.PageConfig.ConList.getSinglePageConfig);

    Evolve.Router.post('/api/v1/evolve/pageConfig/updatePageConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.PageConfig.MidPageConfig.updatePageConfig, Evolve.App.Controllers.Evolve.PageConfig.ConList.updatePageConfig);

    Evolve.Router.post('/api/v1/evolve/pageConfig/deletePageConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.PageConfig.MidPageConfig.deletePageConfig, Evolve.App.Controllers.Evolve.PageConfig.ConList.deletePageConfig);


    /** End  : Page Config  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Page Config Router :", error)
}
module.exports = Evolve.Router