'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/suraksha/travelReqDetails/getTravelReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqDetails.ConList.getTravelReqDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqDetails/addTravelReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqDetails.ConList.addTravelReqDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqDetails/getSingleTravelReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqDetails.ConList.getSingleTravelReqDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqDetails/updateTravelReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqDetails.ConList.updateTravelReqDetails);    

    Evolve.Router.post('/api/v1/suraksha/travelReqDetails/deleteTravelReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReqDetails.ConList.deleteTravelReqDetails);


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha Travel Req Details Routes :", error)
}


module.exports = Evolve.Router