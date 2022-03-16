'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   QC Template API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/qualityCheck/addQCTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.QualityCheck.MidQualityCheck.addQCTemplate, Evolve.App.Controllers.Evolve.QualityCheck.ConList.addQCTemplate);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/getQCTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.QualityCheck.MidQualityCheck.getQCTemplateList, Evolve.App.Controllers.Evolve.QualityCheck.ConList.getQCTemplateList);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/getSingleQCTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.QualityCheck.ConList.getSingleQCTemplate);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/updateQCTempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.QualityCheck.MidQualityCheck.updateQCTempalte, Evolve.App.Controllers.Evolve.QualityCheck.ConList.updateQCTempalte);

    Evolve.Router.get('/api/v1/evolve/qualityCheck/getAllQCTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.QualityCheck.ConList.getAllQCTemplateList);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/addQCValue', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.QualityCheck.MidQualityCheck.addQCValue, Evolve.App.Controllers.Evolve.QualityCheck.ConList.addQCValue);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/getSingleQCTempProcessList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.QualityCheck.ConList.getSingleQCTempProcessList);

    Evolve.Router.post('/api/v1/evolve/qualityCheck/getQCVSequenceNo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.QualityCheck.ConList.getQCVSequenceNo);



    /** End  : QC Template  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve QC Template Router :", error)
}
module.exports = Evolve.Router