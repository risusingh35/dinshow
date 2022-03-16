'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {

    async getAllDevices(req, res) {
        const body = req.body;
        let start = parseInt(body.startFrom),
            length = parseInt(body.displayRecord),
            search = body.search;

        try {
            let status, message, result = null, count = 0;
            const countedRecords = await Evolve.App.Services.Iot.devices.SrvList.getDeviceListCount(search);
            const list = await Evolve.App.Services.Iot.devices.SrvList.getAllDeviceList(start, length, search);

            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get device list !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: countedRecords.recordset[0].COUNT,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Device Master List",
                    result: resObj
                };
                res.send(obj);
            }
        }
        catch (error) {
            const message = "Error while get IoT device list";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },
    // /**
    //  * Get list of IoT Devices 
    //  * @async
    //  */
    // async getIoTDeviceList(req, res) {
    //     const body = req.body;
    //     let start = parseInt(body.startFrom),
    //         length = parseInt(body.displayRecord),
    //         search = body.search;

    //     try {
    //         let status, message, result = null, count = 0;
    //         const countedRecords = await Evolve.App.Services.Iot.devices.SrvList.getDeviceListCount(search);
    //         const list = await Evolve.App.Services.Iot.devices.SrvList.getDeviceList(start, length, search);
    //         const countList = countedRecords.recordset[0];

    //         if (list instanceof Error) {
    //             throw(list);
    //         }
    //         else {
    //             status = 200;
    //             message = 'List of IoT devices';
    //             result = list.recordset;
    //             count = countList.count || countList.COUNT;
    //         }

    //         return res.status(status).json({ message, status, result, count });
    //     }
    //     catch (error) {
    //         const message = "Error while get IoT device list";

    //         Evolve.Log.error(message);

    //         return res.status(500).json({
    //             message,
    //             result: null
    //         });
    //     }
    // },

    // /**
    //  * Add new IoT device
    //  * @async 
    //  */
    // async addOneDevice (req, res) {
    //     const payload = req.body;

    //     payload.EvolveUser_ID = req.EvolveUser_ID;

    //     try {
    //         const result = await Evolve.App.Services.Iot.devices.SrvList.addNewDevice(payload);

    //         if (result instanceof Error || result.rowsAffected < 1) {
    //             throw(result);
    //         }
    //         else {
    //             res.status(201).json({ 
    //                 status: 201, 
    //                 message: "One device added successfully", 
    //                 result: null 
    //             });
    //         }

    //     }
    //     catch (error) {
    //         const message = "Error while add new device";

    //         Evolve.Log.error(message);
    //         res.status(500).json({ status: 500, message, result: null });
    //     }
    // },

    // /**
    //  * Update device info
    //  * @async
    //  */
    // async updateOneDevice (req, res) {
    //     const payload = req.body;

    //     payload.EvolveUser_ID = req.EvolveUser_ID;

    //     // Handle common 400
    //     if (typeof payload.EvolveIoTDeviceList_Id === 'undefined') {
    //         return res.status(400).json({
    //             message: "Require device id for updation"
    //         });
    //     }

    //     try {
    //         const result = await Evolve.App.Services.Iot.devices.SrvList.updateDevice(payload);

    //         if (result instanceof Error || result.rowsAffected < 1) {
    //             throw(result);
    //         }
    //         else {
    //             return res.status(201).json({
    //                 status: 201,
    //                 message: "Device updated",
    //             });
    //         }
    //     }
    //     catch (error) {
    //         const message = "Error while update device";

    //         Evolve.Log.error(message);
    //         res.status(500).json({ status: 500, message });
    //     }
    // },

    // /**
    //  * Remove single device from database
    //  * @async
    //  */
    // async removeOneDevice (req, res) {
    //     /** @type {string} */
    //     const deviceId = req.body.EvolveIoTDeviceList_Id;

    //     // Handle common 400
    //     if (typeof deviceId === 'string' && deviceId.length > 0) {
    //         return res.status(400).json({
    //             message: "Require device id"
    //         });
    //     }

    //     try {
    //         let result = await Evolve.App.Services.Iot.devices.SrvList.deleteOneDevice(deviceId);

    //         if (result instanceof Error || result.rowsAffected < 1) {
    //             throw(result);
    //         }
    //         else {
    //             return res.status(200).json({ status: 200, message: "Device has been removed" });
    //         }

    //     }
    //     catch (error) {
    //         const message = "Error while remove device";

    //         Evolve.Log.error(message);
    //         return res.status(500).json({ message });
    //     }
    // }

    async getAqiDeviceList(req, res) {
        try {
            let statusCode, message, result = null;
            const list = await Evolve.App.Services.Iot.devices.SrvList.getAQIDeviceList();

            if (list instanceof Error) {
                throw (list);
            }
            else {
                statusCode = 200;
                message = 'List of AQI devices';
                result = list.recordset;
            }

            return res.status(statusCode).json({
                message,
                status: 'success',
                statusCode,
                result
            });
        }
        catch (error) {
            const message = "Error while get AQI devices";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                statusCode: 500,
                status: 'fail',
                result: null
            });
        }
    },

    async getScaleDeviceList(req, res) {
        try {
            let statusCode, message, result = null;
            const list = await Evolve.App.Services.Iot.devices.SrvList.getScaleDeviceList();

            if (list instanceof Error) {
                throw (list);
            }
            else {
                statusCode = 200;
                message = 'List of scale devices';
                result = list.recordset;
            }

            return res.status(statusCode).json({
                message,
                status: 'success',
                statusCode,
                result
            });
        }
        catch (error) {
            const message = "Error while get scale devices";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                statusCode: 500,
                status: 'fail',
                result: null
            });
        }
    },

    async addOneDevice(req, res) {
        const payload = req.body;

        payload.EvolveUser_ID = req.EvolveUser_ID;

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.addNewDevice(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    statusCode: 201,
                    status: 'success',
                    message: "One device added successfully"
                });
            }

        }
        catch (error) {
            const message = "Error while add new device";

            Evolve.Log.error(message);
            res.status(500).json({
                statusCode: 500,
                message,
                status: 'fail'
            });
        }
    },

    async updateOneDevice(req, res) {
        const payload = req.body;

        payload.EvolveUser_ID = req.EvolveUser_ID;

        // Handle common 400
        if (typeof payload.EvolveDevice_ID === 'undefined') {
            return res.status(400).json({
                statusCode: '400',
                status: 'fail',
                message: "Require device id for updation",
                result: null
            });
        }

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.updateDevice(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                return res.status(201).json({
                    statusCode: 201,
                    status: 'success',
                    message: "Device updated"
                });
            }
        }
        catch (error) {
            const message = "Error while update device";

            Evolve.Log.error(message);
            res.status(500).json({
                statusCode: 500,
                status: 'fail',
                message
            });
        }
    },

    async removeOneDevice(req, res) {
        const payload = req.body;

        try {
            let result = await Evolve.App.Services.Iot.devices.SrvList.deleteDevice(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                return res.status(200).json({
                    statusCode: 200,
                    status: 'success',
                    message: "Device has been removed"
                });
            }

        }
        catch (error) {
            const message = "Error while remove device";

            Evolve.Log.error(message);
            return res.status(500).json({
                statusCode: 500,
                status: 'fail',
                message
            });
        }
    },

    async getDeviceLocations(req, res) {
        const payload = req.body;

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.deviceLocations(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    statusCode: 201,
                    status: 'success',
                    message: "Locations of devices",
                    result: result.recordset
                });
            }
        }
        catch (error) {
            const message = "Error while getting device locations";

            Evolve.Log.error(message);
            res.status(500).json({
                statusCode: 500,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    async getDeviceData(req, res) {
        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.getDeviceData();

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    statusCode: 201,
                    status: 'success',
                    message: "Device data",
                    result: result.recordset
                });
            }
        }
        catch (error) {
            const message = "Error while getting device data";

            Evolve.Log.error(message);
            res.status(500).json({
                statusCode: 500,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    async getDeviceType(req, res) {
        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.getDeviceType();

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "Device types",
                    result: null
                });
            }
        }
        catch (error) {
            const message = "Error while getting device types";

            Evolve.Log.error(message);
            res.status(500).json({ status: 500, message, result: null });
        }
    },

    async getSingleDeviceData(req, res) {
        const payload = req.body;

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.getSingleDeviceData(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "Device types",
                    result: null
                });
            }
        }
        catch (error) {
            const message = "Error while getting device data";

            Evolve.Log.error(message);
            res.status(500).json({ status: 500, message, result: null });
        }
    },

    async getDeviceDataByCode(req, res) {
        const payload = req.body;

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.getDeviceDataByCode(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "Device types",
                    result: null
                });
            }
        }
        catch (error) {
            const message = "Error while getting device data";

            Evolve.Log.error(message);
            res.status(500).json({ status: 500, message, result: null });
        }
    },

    async updateDeviceAPI(req, res) {
        const payload = req.body;

        try {
            const result = await Evolve.App.Services.Iot.devices.SrvList.updateDeviceAPI(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw (result);
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "Updated device API",
                    result: null
                });
            }
        }
        catch (error) {
            const message = "Error while update device API";

            Evolve.Log.error(message);
            res.status(500).json({ status: 500, message, result: null });
        }
    },

    async getPLCDeviceList(req, res) {
        try {
            let statusCode, message, result = null;
            const list = await Evolve.App.Services.Iot.devices.SrvList.getPLCDeviceList();
            console.log("list PLC Devices:::::::::::",list);
            if (list instanceof Error) {
                throw(list);
            }
            else {
                statusCode = 200;
                message = 'List of PLC devices';
                result = list.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                status: 'success',
                statusCode, 
                result 
            });
        }
        catch (error) {
            const message = "Error while get PLC devices";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                statusCode: 500,
                status: 'fail',
                result: null
            });
        }
    },

    async getPLCDeviceStatus (req , res) {
        try {
            if(req.body.url == "/api/v1/eIot/getPLCStatus"){
                console.log("IOSERVERURL>>>", Evolve.Config.IOSERVERURL);

                let tokenUrl = Evolve.Config.IOSERVERURL + 'api/v1/eIot/getPLCStatus';
                console.log("tokenUrl",tokenUrl);
                let getPLCStatusFromIo = await Evolve.Axios.get(tokenUrl);
                console.log("getTokenFromIo>>>>>>>", getPLCStatusFromIo);
                if(getPLCStatusFromIo.data.statusCode == 200) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "PLC Status",
                        result: getPLCStatusFromIo.data.result
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR####: Error while getting PLC Device Status ",
                        result: null
                    };
                    res.send(obj);
                }
            }
            if(req.body.url == "/api/v1/eIot/getPLCParameterReading"){
                console.log("IOSERVERURL>>>", Evolve.Config.IOSERVERURL);

                let tokenUrl = Evolve.Config.IOSERVERURL + 'api/v1/eIot/getPLCParameterReading';
                console.log("tokenUrl",tokenUrl);
                let getPLCStatusFromIo = await Evolve.Axios.post(tokenUrl , req.body.data);
                console.log("getTokenFromIo>>>>>>>", getPLCStatusFromIo);
                if(getPLCStatusFromIo.data.statusCode == 200) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "PLC Status",
                        result: getPLCStatusFromIo.data.result
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR####: Error while getting PLC Device Status ",
                        result: null
                    };
                    res.send(obj);
                }
            }
            if(req.body.url == "api/v1/eIot/startPLCReading"){
                console.log("IOSERVERURL>>>", Evolve.Config.IOSERVERURL);

                let tokenUrl = Evolve.Config.IOSERVERURL + 'api/v1/eIot/startPLCReading';
                console.log("tokenUrl",tokenUrl);
                let getPLCStatusFromIo = await Evolve.Axios.post(tokenUrl , req.body.data);
                console.log("getTokenFromIo>>>>>>>", getPLCStatusFromIo);
                if(getPLCStatusFromIo.data.statusCode == 200) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "PLC Status",
                        result: getPLCStatusFromIo.data.result
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR####: Error while getting PLC Device Status ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting PLC Device Status "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting PLC Device Status "+error.message,
                result: null
            };
            res.send(obj);

            
        }
    }
}