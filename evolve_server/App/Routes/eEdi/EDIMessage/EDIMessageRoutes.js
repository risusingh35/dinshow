'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eEDI/EDIMessage/getMessageList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDIMessage.ConList.getMessageList);

    Evolve.Router.post('/api/v1/eEDI/EDIMessage/addmessage', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDIMessage.ConList.addmessage);

    Evolve.Router.post('/api/v1/eEDI/EDIMessage/getEDITemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eEdi.EDIMessage.ConList.getEDITemplateList);


    Evolve.Router.post('/api/v1/eEDI/EDIMessage/getSingleMessageDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eEdi.EDIMessage.ConList.getSingleMessageDetails);

    Evolve.Router.post('/api/v1/eEDI/EDIMessage/updateMessageDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eEdi.EDIMessage.ConList.updateMessageDetails);

    Evolve.Router.post('/api/v1/eEDI/EDITemplateAttributes/deleteMessageDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eEdi.EDIMessage.ConList.deleteMessageDetails);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router