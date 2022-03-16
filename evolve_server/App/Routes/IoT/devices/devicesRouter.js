'use strict';
const Evolve = require('../../../../Boot/Evolve');

Evolve.Router.post(
    '/api/v1/IoT/getAllDevices',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getAllDevices
);

// /**
//  * Get list of devices
//  * @route POST /api/v1/IoT/getDevices
//  */
// Evolve.Router.post(
//     '/api/v1/IoT/getDevices',
//     Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
//     Evolve.App.Controllers.Iot.devices.ConList.getIoTDeviceList
// );



// /**
//  * Add new device
//  * @route POST /api/v1/IoT/addDevice
//  */
// Evolve.Router.post(
//     '/api/v1/IoT/addOneDevice',
//     Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
//     Evolve.App.Controllers.Iot.devices.ConList.addOneDevice
// );

// /**
//  * Update single device info
//  * @route POST '/api/v1/IoT/updateOneDevice'
//  */
// Evolve.Router.post(
//     '/api/v1/IoT/updateOneDevice',
//     Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
//     Evolve.App.Controllers.Iot.devices.ConList.updateOneDevice
// );

// /**
//  * Delete specific device
//  * @route POST /api/v1/IoT/removeDevice
//  */
// Evolve.Router.post(
//     '/api/v1/IoT/removeOneDevice', 
//     Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, 
//     Evolve.App.Controllers.Iot.devices.ConList.removeOneDevice
// );

Evolve.Router.post(
    '/api/v1/IoT/devices/getAqiDeviceList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getAqiDeviceList
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getScaleDeviceList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getScaleDeviceList
);

Evolve.Router.post(
    '/api/v1/IoT/devices/addOneDevice',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.addOneDevice
);

Evolve.Router.post(
    '/api/v1/IoT/devices/updateOneDevice',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.updateOneDevice
);

Evolve.Router.post(
    '/api/v1/IoT/devices/removeOneDevice',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.removeOneDevice
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getDeviceLocations',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getDeviceLocations
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getDeviceData',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getDeviceData
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getDeviceType',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getDeviceType
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getSingleDeviceData',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getSingleDeviceData
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getDeviceDataByCode',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getDeviceDataByCode
);

Evolve.Router.post(
    '/api/v1/IoT/devices/updateDeviceAPI',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.updateDeviceAPI
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getPLCDeviceList',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getPLCDeviceList
);

Evolve.Router.post(
    '/api/v1/IoT/devices/getPLCDeviceStatus',
    Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Iot.devices.ConList.getPLCDeviceStatus
);

module.exports = Evolve.Router;