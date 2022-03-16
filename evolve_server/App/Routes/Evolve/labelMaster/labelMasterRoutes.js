'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Label Master  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/labelMaster/getAllLabelList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getAllLabelList);

    Evolve.Router.post('/api/v1/evolve/labelMaster/addNewLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.addNewLabel);

    Evolve.Router.post('/api/v1/evolve/labelMaster/deleteLabel', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.deleteLabel);

    Evolve.Router.post('/api/v1/evolve/labelMaster/getAllVariables', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getAllVariables);

    Evolve.Router.post('/api/v1/evolve/labelMaster/deleteVariable', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.deleteVariable);

    Evolve.Router.post('/api/v1/evolve/labelMaster/addNewVariable', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.addNewVariable);

    Evolve.Router.post('/api/v1/evolve/labelMaster/getPrinterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getPrinterList);

    Evolve.Router.post('/api/v1/evolve/labelMaster/getLabelSizeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getLabelSizeList);

    Evolve.Router.post('/api/v1/evolve/labelMaster/removeLabelSize', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.removeLabelSize);

    Evolve.Router.post('/api/v1/evolve/labelMaster/addLabelSize', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.addLabelSize);

    Evolve.Router.post('/api/v1/evolve/labelMaster/clickPreview', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.clickPreview);
   
    Evolve.Router.post('/api/v1/evolve/labelMaster/saveLabelDesign', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.saveLabelDesign);

    Evolve.Router.get('/api/v1/evolve/labelMaster/getAllZplCmdList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getAllZplCmdList);

    Evolve.Router.post('/api/v1/evolve/labelMaster/getAllZplCmdParamList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.labelMaster.ConList.getAllZplCmdParamList);

    Evolve.Router.post('/api/v1/evolve/labelMaster/addImgageInZpl',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.labelMaster.ConList.addImgageInZpl);

    Evolve.Router.post('/api/v1/evolve/labelMaster/printLabel',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.labelMaster.ConList.printLabel);

    
    
    


    /** End  : Label Master   */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Label Master Router :", error)
}
module.exports = Evolve.Router