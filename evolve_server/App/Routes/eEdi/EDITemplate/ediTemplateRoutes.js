'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eEdi/EDITemplate/getTemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTemplateList);

    Evolve.Router.post('/api/v1/eEdi/EDITemplate/addEdiTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.ediTemplate.ConList.addEdiTemplate);

    Evolve.Router.post('/api/v1/eEdi/EDITemplate/updateEdiTemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.ediTemplate.ConList.updateEdiTemplate);

    Evolve.Router.post('/api/v1/eEdi/EDITemplate/getprevueData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.ediTemplate.ConList.getprevueData)
    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router