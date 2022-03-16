'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : Pdi Template Master API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/addPDITemp',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PdiTemplate.MidPdiTemplateList.addPDITemp,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.addPDITemp);

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/updatePDITempDetail',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PdiTemplate.MidPdiTemplateList.updatePDITempDetail,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.updatePDITempDetail);

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/addPDITempCode',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PdiTemplate.MidPdiTemplateList.addPDITempCode,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.addPDITempCode);

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/selectSinglePDITemp',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PdiTemplate.MidPdiTemplateList.selectSinglePDITemp,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.selectSinglePDITemp);

    Evolve.Router.get('/api/v1/evolve/PdiTemplate/getPDITempCode',  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.getPDITempCode);

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/getPDITempDetail',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.PdiTemplate.MidPdiTemplateList.getPDITempDetailAuth,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.getPDITempDetail);

    Evolve.Router.post('/api/v1/evolve/PdiTemplate/deletePDITempDetail',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.PdiTemplate.ConPdiTemplateList.deletePDITempDetail);

    
   

   
     /** End  :Pdi Template Master  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Template Master Router :", error)
}


module.exports = Evolve.Router