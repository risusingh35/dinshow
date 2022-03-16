'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Document API List
      *  Desc  :    
      */


    Evolve.Router.post('/api/v1/evolve/coordinatesTemplate/addTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CoordinatesTemplate.MidCoordinatesTemplate.addTemplate, Evolve.App.Controllers.Evolve.CoordinatesTemplate.ConList.addTemplate);

    Evolve.Router.post('/api/v1/evolve/coordinatesTemplate/getTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CoordinatesTemplate.MidCoordinatesTemplate.getTemplateList , Evolve.App.Controllers.Evolve.CoordinatesTemplate.ConList.getTemplateList);

    Evolve.Router.post('/api/v1/evolve/coordinatesTemplate/getSingleTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.CoordinatesTemplate.ConList.getSingleTemplate);

    Evolve.Router.post('/api/v1/evolve/coordinatesTemplate/updateTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.CoordinatesTemplate.MidCoordinatesTemplate.updateTemplate, Evolve.App.Controllers.Evolve.CoordinatesTemplate.ConList.updateTemplate);




    /** End  : Document  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Document Router :", error)
}


module.exports = Evolve.Router