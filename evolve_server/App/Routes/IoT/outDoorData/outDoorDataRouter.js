'use strict';
const Evolve = require('../../../../Boot/Evolve');

/**
 * Get list of devices
 * @route POST /api/v1/IoT/getDevices
 */
Evolve.Router.post(
    '/api/v1/IoT/outDoorData/getDetails',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getDetailsByDeviceId
);

/**
 * Add new device
 * @public
 * @route GET /api/v1/IoT/addDevice
 */
Evolve.Router.get(
    '/api/v1/IoT/outDoorData/addDetail',
    Evolve.App.Controllers.Iot.outDoorData.ConList.addNewDetail
);

/**
 * Fetch lastest row
 * @route POST /api/v1/IoT/outDoorData/latestDetail
 */
Evolve.Router.post(
    '/api/v1/IoT/outDoorData/latestDetail',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getLatestDetail
);

Evolve.Router.post(
    '/api/v1/IoT/outDoorData/getLastMonthDeviceDetail',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getLastMonthDeviceDetail
);

Evolve.Router.post(
    '/api/v1/IoT/outDoorData/getLastWeekDeviceDetail',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getLastWeekDeviceDetail
);

Evolve.Router.post(
    '/api/v1/IoT/outDoorData/getTodayDeviceDetail',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getTodayDeviceDetail
);

Evolve.Router.post(
    '/api/v1/IoT/outDoorData/getLastYearDeviceDetail',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.outDoorData.ConList.getLastYearDeviceDetail
);

module.exports = Evolve.Router;