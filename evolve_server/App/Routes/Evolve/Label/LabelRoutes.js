'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Label  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/label/getLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.getLabelList);

    Evolve.Router.get('/api/v1/evolve/label/getAllLanguageList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.getAllLanguageList);

    Evolve.Router.post('/api/v1/evolve/label/getSingleLabelDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.getSingleLabelDetails);

    Evolve.Router.post('/api/v1/evolve/label/addLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.addLabelList);

    Evolve.Router.get('/api/v1/evolve/label/getKeywordUrl', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.getKeywordUrl);

    // Evolve.Router.post('/api/v1/evolve/label/addLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.addLabelList);

    Evolve.Router.post('/api/v1/evolve/label/ExportCsvFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.ExportCsvFile);

    Evolve.Router.post('/api/v1/evolve/label/checkKeywordExists', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.checkKeywordExists);

    Evolve.Router.post('/api/v1/evolve/label/ImportCsvFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.ImportCsvFile);

    Evolve.Router.post('/api/v1/evolve/label/deleteLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.deleteLabel);

    Evolve.Router.post('/api/v1/evolve/label/updateLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.updateLabelList);

    Evolve.Router.post('/api/v1/evolve/label/addChildLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.addChildLabel);

    Evolve.Router.post('/api/v1/evolve/label/getChildLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.getChildLabelList);


    // Evolve.Router.post('/api/v1/evolve/label/addChildLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.Label.ConList.addChildLabel);







    /** End  : Label   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Label  Router :", error)
}
module.exports = Evolve.Router