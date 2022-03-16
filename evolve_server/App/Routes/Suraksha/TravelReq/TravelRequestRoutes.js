'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    // Evolve.Router.post('/api/v1/suraksha/travelReq/addTravelRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelReq.MidTravelReq.addTravelRequestAuth, Evolve.App.Controllers.Suraksha.TravelReq.ConList.addTravelRequest);

    
    Evolve.Router.post('/api/v1/suraksha/travelReq/addTravelRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.addTravelRequest);

    Evolve.Router.get('/api/v1/suraksha/travelReq/getAllTravelRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.getAllTravelRequest);


    Evolve.Router.post('/api/v1/suraksha/travelReq/getTravelRequestDetailsById', Evolve.App.Controllers.Suraksha.TravelReq.ConList.getTravelRequestDetailsById);

    
    Evolve.Router.get('/api/v1/suraksha/travelReq/deleteTravelRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.deleteTravelRequest);

    Evolve.Router.get('/api/v1/suraksha/travelReq/updateTravelReq', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.updateTravelReq);

    Evolve.Router.get('/api/v1/suraksha/travelReq/getAprovalTravelRequest', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.getAprovalTravelRequest);

    Evolve.Router.post('/api/v1/suraksha/travelReq/getTravelStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.getTravelStatus);
    
    
    Evolve.Router.post('/api/v1/suraksha/travelReq/getCovidStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReq.ConList.getCovidStatus);




} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha Travel Req Routes :", error)
}


module.exports = Evolve.Router