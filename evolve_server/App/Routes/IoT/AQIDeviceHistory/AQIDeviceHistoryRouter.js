'use strict';
const Evolve = require('../../../../Boot/Evolve');

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getHistory',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/addHistory',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.addHistory
);

Evolve.Router.get(
    '/api/v1/IoT/AQIDeviceHistory/saveDeviceHistory',
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.saveDeviceHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getLatestHistory', 
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getLatestHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getLastMonthHistory', 
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getLastMonthHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getLastWeekHistory', 
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getLastWeekHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getLastYearHistory', 
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getLastYearHistory
);

Evolve.Router.post(
    '/api/v1/IoT/AQIDeviceHistory/getTodaysHistory', 
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
    Evolve.App.Controllers.Iot.AQIDeviceHistory.ConList.getTodaysHistory
);

module.exports = Evolve.Router;