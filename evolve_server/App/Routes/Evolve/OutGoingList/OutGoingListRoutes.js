'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    Evolve.Router.post('/api/v1/evolve/OutGoingList/getOutGoingList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.OutGoingList.ConOutGoingList.getOutGoingList);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Template Master Router :", error)
}


module.exports = Evolve.Router