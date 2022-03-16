'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/suraksha/travelHistory/addTravelHist', Evolve.App.Controllers.Suraksha.TravelHistory.ConList.addTravelHist);

    Evolve.Router.post('/api/v1/suraksha/travelHistory/updateTravelHist', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Suraksha.TravelHistory.ConList.updateTravelHist);

    Evolve.Router.post('/api/v1/suraksha/travelHistory/getTravelHistList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.TravelHistory.ConList.getTravelHistList);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evole Suraksha Travel History Routes :", error)
}


module.exports = Evolve.Router