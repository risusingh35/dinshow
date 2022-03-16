'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addLocationGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let count = await Evolve.App.Services.Wms.LocationGroup.SrvList.checkLocationGroup(req.body);
            if (count instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Location Group!",
                    count: null
                };
                res.send(obj);
            } else if(count.rowsAffected>0){

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Group Already Exist",
                    result: null
                };
                res.send(obj);

            }else{


            let result = await Evolve.App.Services.Wms.LocationGroup.SrvList.addLocationGroup(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Create Location Group!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Location Group Created Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        }
        } catch (error) {
            Evolve.Log.error(" EERR0295: Error while create location group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0295: Error while create location group "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLocationGroupList: async function (req, res) {
        try {
            // let start = parseInt(req.body.startFrom);
            // let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;
            // let Count = await Evolve.App.Services.Wms.LocationGroup.SrvList.getLocationGroupListCount(search);
            let result = await Evolve.App.Services.Wms.LocationGroup.SrvList.getLocationGroupList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Location Group!",
                    result: null
                };
                res.send(obj);
            } else {
                // let resObj = {
                //     noOfRecord: Count.recordset[0].count,
                //     records: result.recordset
                // }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location group list",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" ERR0296: Error while getting location group list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0296: Error while getting location group list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleLocationGroup: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.LocationGroup.SrvList.getSingleLocationGroup(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Location Group!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0297: Error while getting single location group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0297: Error while getting single location group "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateLocationGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Wms.LocationGroup.SrvList.updateLocationGroup(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Location Group!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Location Group Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0298: Error while updating location group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0298: Error while updating location group "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}