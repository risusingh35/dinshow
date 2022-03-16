'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/suraksha/travelMode/getTravelModeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelMode.MidTravelMode.getTravelModeListAuth,  Evolve.App.Controllers.Suraksha.TravelMode.ConList.getTravelModeList);

    Evolve.Router.post('/api/v1/suraksha/travelMode/addTravelMode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelMode.MidTravelMode.addTravelModeAuth,  Evolve.App.Controllers.Suraksha.TravelMode.ConList.addTravelMode);

    Evolve.Router.post('/api/v1/suraksha/travelMode/getSingleModeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelMode.MidTravelMode.getSingleModeDetailsAuth,  Evolve.App.Controllers.Suraksha.TravelMode.ConList.getSingleModeDetails);

    Evolve.Router.post('/api/v1/suraksha/travelMode/updatTravelModeDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelMode.MidTravelMode.updatTravelModeDetailsAuth,  Evolve.App.Controllers.Suraksha.TravelMode.ConList.updatTravelModeDetails);

    Evolve.Router.post('/api/v1/suraksha/travelMode/deleteTravelMode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.TravelMode.MidTravelMode.deleteTravelModeAuth, Evolve.App.Controllers.Suraksha.TravelMode.ConList.deleteTravelMode);


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha Travel Mode Routes :", error)
}


module.exports = Evolve.Router