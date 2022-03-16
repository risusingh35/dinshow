const Evolve = require('../../../../Boot/Evolve');
try {


Evolve.Router.post('/api/v1/eDoa/dayBookSet/getDayBookSet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.DayBookSet.ConList.getDayBookSet);

Evolve.Router.post('/api/v1/eDoa/dayBookSet/uploadDayBookSet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.DayBookSet.ConList.uploadDayBookSet);

Evolve.Router.post('/api/v1/eDoa/dayBookSet/onActiveDeactiveDS', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.DayBookSet.ConList.onActiveDeactiveDS);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router