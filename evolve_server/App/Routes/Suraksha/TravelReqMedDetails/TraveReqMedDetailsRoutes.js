'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/suraksha/travelReqMedDetails/getTravelMedReqDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqMedDetails.ConList.getTravelMedReqDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqMedDetails/addTravelReqMedDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqMedDetails.ConList.addTravelReqMedDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqMedDetails/getTravelReqMedDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqMedDetails.ConList.getTravelReqMedDetails);

    Evolve.Router.post('/api/v1/suraksha/travelReqMedDetails/updatTravelReqMedDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Suraksha.TravelReqMedDetails.ConList.updatTravelReqMedDetails);
    
    Evolve.Router.post('/api/v1/suraksha/travelReqMedDetails/deleteTravelReqMedDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelReqMedDetails.ConList.deleteTravelReqMedDetails);


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha Travel Req Med Details Routes :", error)
}


module.exports = Evolve.Router