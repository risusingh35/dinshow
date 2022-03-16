'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    // list
    getWarehouseList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.eMdm.Warehouse.SrvList.getWarehouseListCount(search);
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.getWarehouseList(start, length, search);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Warehouse List !",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Warehouse List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting warehouse list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting warehouse list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Add / Edit

    evolveUnitList : async function (req, res) {
        try {
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.evolveUnitList();
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Unit List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Unit List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting unit list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting unit list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    evolveUomList : async function (req, res) {
        try {
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.evolveUomList();
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Uom List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "UOM List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting uom list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting uom list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingelWarehouseDataEdit : async function (req, res) {
        try {
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.getSingelWarehouseDataEdit(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get singel warehouse data!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Singel Warehouse Data",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting singel warehouse data"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting uom list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addWarehouse : async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.addWarehouse(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on add warehouse data!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Warehouse Data Added Successfully",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add warehouse data"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add warehouse data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editWarehouse : async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let list = await Evolve.App.Services.eMdm.Warehouse.SrvList.editWarehouse(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Edit warehouse data!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Warehouse Data Edited Successfully",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edit warehouse data"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while edit warehouse data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}