const Evolve = require('../../Boot/Evolve');

try {

    // Menu Link
    Evolve.Router.get('/api/v1/iot/iotSidebarMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.iotSidebarMenuList);

    // iot Device
    Evolve.Router.get('/api/v1/iot/getDeviceType', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getDeviceType);

    Evolve.Router.get('/api/v1/iot/deviceLocations', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.deviceLocations);

    Evolve.Router.get('/api/v1/iot/getDeviceData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getDeviceData);

    Evolve.Router.post('/api/v1/iot/addDevice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.IotApiValidator.addDevice, Evolve.App.Controllers.Iot.iotControllers.addDevice);

    Evolve.Router.post('/api/v1/iot/getSingleDeviceData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getSingleDeviceData);

    Evolve.Router.post('/api/v1/iot/updateDevice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.IotApiValidator.updateDevice, Evolve.App.Controllers.Iot.iotControllers.updateDevice);

    Evolve.Router.post('/api/v1/iot/deleteDevice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.deleteDevice);


    Evolve.Router.post('/api/v1/iot/getCfdDeviceChartData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getCfdDeviceChartData);

    Evolve.Router.post('/api/v1/iot/getCfdDeviceTableData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getCfdDeviceTableData);

    Evolve.Router.post('/api/v1/iot/getlatandlongForMap', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Iot.iotControllers.getlatandlongForMap);


    /** Andon Screen */

    Evolve.Router.post('/api/v1/iot/getWOList', Evolve.App.Controllers.Iot.iotControllers.getWOList);
    Evolve.Router.post('/api/v1/iot/getReason', Evolve.App.Controllers.Iot.iotControllers.getReason);
    Evolve.Router.post('/api/v1/iot/downReport', Evolve.App.Controllers.Iot.iotControllers.downReport);
    Evolve.Router.post('/api/v1/iot/productionBooking', Evolve.App.Controllers.Iot.iotControllers.productionBooking);

    Evolve.Router.get('/api/v1/iot/registerWSIP/:iKonnectID/:ip', Evolve.App.Controllers.Iot.iotControllers.registerDevicesIP);
    //   Evolve.Router.get('/api/v1/iot/registerWSIP/:iKonnectID/:ip',function (req, res) {

    //         // console.log("#############################################################")
    //         console.log("iKonnectID:", req.params.iKonnectID)
    //         console.log("ip:", req.params.ip)

    //         res.send("ok")
    // });


} catch (error) {
    console.log("Error in Evolve Iot :", error)
}

module.exports = Evolve.Router