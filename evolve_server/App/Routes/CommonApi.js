'use strict';
const Evolve = require('../../Boot/Evolve');
try {
    /** 
     *  Title :  Common API List
     *  Desc  :    
     */
    Evolve.Router.post('/api/v1/evolve/auth/login', Evolve.App.Middlewares.EvolveCommonApiValidator.loginAuth, Evolve.App.Controllers.Common.ConCommon.evolveLogin);

    Evolve.Router.get('/api/v1/evolve/me', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuth);

    Evolve.Router.get('/api/v1/evolve/auth/logout', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthLogout);


    Evolve.Router.post('/api/v1/evolve/translate',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getTranslate);
    Evolve.Router.post('/api/v1/evolve/translateMobile', Evolve.App.Controllers.Common.ConCommon.getTranslateForMobile);

    Evolve.Router.get("/api/v1/evolve/planningMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.planningSidebarMenuList);

    Evolve.Router.get("/api/v1/evolve/complianceMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.complianceSidebarMenuList);

    Evolve.Router.get("/api/v1/evolve/eAssetsMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.eAssetsSidebarMenuList);

    Evolve.Router.get("/api/v1/evolve/eGateControlMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.eGateControlSidebarMenuList);

    Evolve.Router.get("/api/v1/evolve/getLoginPageStyle", Evolve.App.Controllers.Common.ConCommon.getLoginPageStyle);

    Evolve.Router.post("/api/v1/evolve/evolveMenuList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.evolveMenuList);

    Evolve.Router.post("/api/v1/evolve/pageParameter", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.pageParameter);

    Evolve.Router.get("/api/v1/evolve/getBranchList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getBranchList);

    //Navbar Theme Color
    Evolve.Router.get("/api/v1/evolve/navThemeColor", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getNavThemeColor);

    // Printer API
    Evolve.Router.post("/api/v1/evolve/getPrintTask",  Evolve.App.Controllers.Common.ConCommon.getPrintTask);
    /** End  : Common API List  */

    Evolve.Router.get(
        '/api/v1/evolve/getIOServerInfo', 
        Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Controllers.Evolve.evolveControllers.getIOServerInfo
    );


    Evolve.Router.post("/api/v1/evolve/setFavourite", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.setFavourite);

    Evolve.Router.post("/api/v1/evolve/getFavourite", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getFavourite);

    Evolve.Router.get("/api/v1/evolve/getUserUnits", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getUserUnits);

    Evolve.Router.post("/api/v1/evolve/addAction", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.addAction);

    // Change User Selected Unit

    Evolve.Router.post("/api/v1/evolve/changeUserUnit", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.changeUserUnit);

    Evolve.Router.post("/api/v1/evolve/changeUserLang", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.changeUserLang);
    
    
    Evolve.Router.post("/api/v1/evolve/getuserCompanyList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getuserCompanyList);


        
    Evolve.Router.post("/api/v1/evolve/testTExt", Evolve.App.Controllers.Common.ConCommon.testTExt);

    Evolve.Router.get('/api/v1/evolve/getPrinterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Common.ConCommon.getPrinterList);



    


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Plan Upload Router :", error)
}


module.exports = Evolve.Router