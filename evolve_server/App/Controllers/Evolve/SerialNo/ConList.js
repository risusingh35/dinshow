'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSerialNumberList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count =await Evolve.App.Services.Evolve.SerialNo.SrvList.getSerialNumberCount(search);
            let getSerialNumberData = await Evolve.App.Services.Evolve.SerialNo.SrvList.getSerialNumberList(start, length,search);
            if (getSerialNumberData instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get serial number list !",
                    result: getSerialNumberData.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getSerialNumberData.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial number list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0403: Error while getting serial number list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0403: Error while getting serial number list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addSerialNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            req.body.EvolveSerial_LastGeneratedCode = req.body.EvolveSerial_Prefix ;

            for(let i=0 ; i <req.body.EvolveSerial_Width ;i++){

                req.body.EvolveSerial_LastGeneratedCode += '0'

            }


            let result = await Evolve.App.Services.Evolve.SerialNo.SrvList.addSerialNumber(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial no created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0404: Error while adding serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0404: Error while adding serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateSerialNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvList.updateSerialNumber(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial no updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0405: Error while updating serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0405: Error while updating serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleSerialNumber: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvList.getSingleSerialNumber(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial Single List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0406: Error while getting single serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0406: Error while getting single serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSerialNumber: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvList.deleteSerialNumber(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete section !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0407: Error while deleting serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0407: Error while deleting serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}