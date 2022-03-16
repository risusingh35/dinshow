'use strict';
const Evolve = require('../../../../Boot/Evolve');

 Evolve.Router.post(
    '/api/v1/IoT/dataLogger/addDeviceData',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.dataLogger.ConList.addDeviceData
);

module.exports = Evolve.Router;