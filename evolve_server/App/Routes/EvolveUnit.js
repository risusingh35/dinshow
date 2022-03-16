const Evolve = require('../../Boot/Evolve');
try {

    Evolve.Router.get('/api/v1/unit/getLotNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Unit.unitControllers.getLotNumber);

    Evolve.Router.post('/api/v1/unit/getUnitConfigValue', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Middlewares.UnitApiValidator.getUnitConfigValueAuth, Evolve.App.Controllers.Unit.unitControllers.getUnitConfigValue);

    Evolve.Router.post('/api/v1/unit/captureWeight', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Middlewares.UnitApiValidator.captureWeightAuth, Evolve.App.Controllers.Unit.unitControllers.captureWeight);

    Evolve.Router.get('/api/v1/unit/getPrinterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Unit.unitControllers.getPrinterList);

    Evolve.Router.get('/api/v1/unit/getScaleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Unit.unitControllers.getScaleList);


} catch (error) {
    console.log("Error in Evolve Unit Router :", error)
}

module.exports = Evolve.Router