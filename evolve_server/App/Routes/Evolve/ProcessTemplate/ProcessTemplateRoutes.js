'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Process Template API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/processtemplate/getProcessTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.getProcessTemplateListAuth, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getProcessTemplateList);

    Evolve.Router.post('/api/v1/evolve/processtemplate/addProcessTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.addProcessTemplate, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.addProcessTemplate);

    Evolve.Router.post('/api/v1/evolve/processtemplate/getSingleProcessTempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.getSingleProcessTempalte, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getSingleProcessTempalte);

    Evolve.Router.post('/api/v1/evolve/processtemplate/updateProcessTempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.updateProcessTempalte, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.updateProcessTempalte);

    Evolve.Router.get('/api/v1/evolve/processtemplate/getProcessSequencePTN', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getProcessSequencePTN);

    Evolve.Router.get('/api/v1/evolve/processtemplate/getProcessSequencePN', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getProcessSequencePN);

    Evolve.Router.post('/api/v1/evolve/processtemplate/checkSequenceProcessName', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.checkSequenceProcessName, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.checkSequenceProcessName);

    Evolve.Router.post('/api/v1/evolve/processtemplate/getProcessSequenceON', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.getProcessSequenceON, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getProcessSequenceON);

    Evolve.Router.post('/api/v1/evolve/processtemplate/addProcessSequence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.addProcessSequence, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.addProcessSequence);

    Evolve.Router.post('/api/v1/evolve/processtemplate/getProcessTeplateSequence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ProcessTemplate.ProcessTemplateMid.getProcessTeplateSequence, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.getProcessTeplateSequence);

    Evolve.Router.post('/api/v1/evolve/processtemplate/deleteProcessTempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ProcessTemplate.ConList.deleteProcessTempalte);



    /** End  : Process Template  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Process Template Router :", error)
}
module.exports = Evolve.Router