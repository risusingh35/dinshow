'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addCoordinate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.addCoordinate(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Coordinate!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Coordinate Add Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0224: Error while adding co-ordinate "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0224: Error while adding co-ordinate "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getCoordinateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let Count = await Evolve.App.Services.Evolve.Coordinates.SrvList.getCoordinateListCount(search);
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.getCoordinateList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate list!",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Coordinates list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0225: Error while getting Co-ordinate list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
   

    getSingleCoordinate: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.getSingleCoordinate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Coordinate list!",
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
            Evolve.Log.error(" EERR0226: Error while getting single Co-ordinate "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0226: Error while getting single Co-ordinate "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCoordinateTempList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.getCoordinateTempList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate template list!",
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
            Evolve.Log.error(" EERR0227: Error while getting Co-ordinate temp list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0227: Error while getting Co-ordinate temp list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateCoordinate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.updateCoordinate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Coordinate list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Coordinate Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0228: Error while updating Co-ordinate "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0228: Error while updating Co-ordinate "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getInvoiceFilds: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.getInvoiceFilds();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice Filds list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0225: Error while getting Co-ordinate list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getInvoiceItemFilds: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.getInvoiceItemFilds();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice Item Filds list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0225: Error while getting Co-ordinate list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteCoordinates: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Coordinates.SrvList.deleteCoordinates(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Delete Coordinates!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Coordinates Delete Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0225: Error while Coordinates Delete "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while Coordinates Delete "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}