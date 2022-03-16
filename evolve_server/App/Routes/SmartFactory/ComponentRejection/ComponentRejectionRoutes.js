'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.get('/api/v1/smartFactory/componentRejection/getComponentRejectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ComponentRejection.ConList.getComponentRejectionList);

    Evolve.Router.post('/api/v1/smartFactory/componentRejection/addScrapItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ComponentRejection.ConList.addScrapItem);




    /** End  : Component Rejection  */
} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Router :", error)
}

module.exports = Evolve.Router