'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getSalesOrderList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let listCount = await Evolve.App.Services.Wms.salesOrder.SrvList.getSalesOrderListCount(search);
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getSalesOrderList(start, length,search);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Sles Order List !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: listCount.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Sales Order list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting Sales Order list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addSalesOrder : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.addSalesOrder(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on add Sales Order !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding Sales Order "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while adding Sales Order "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllUnitList : async function (req,res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getAllUnitList();
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Unit List !",
                    result: list.message
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
            Evolve.Log.error(" EERR####: Error on get Unit List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error on get Unit List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllCustomerList : async function (req,res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getAllCustomerList();
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Customer List !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Customer List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error on get Customer List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error on get Customer List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editSalesOrder : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.editSalesOrder(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update Sales Order !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Updateing Sales Order "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Updateing Sales Order "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllItemList : async function (req,res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getAllItemList();
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Item List !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error on get Item List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error on get Item List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllUomList : async function (req,res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getAllUomList();
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get UOM List !",
                    result: list.message
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
            Evolve.Log.error(" EERR####: Error on get UOM List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error on get UOM List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addSalesOrderDetails : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.addSalesOrderDetails(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on add Sales Order Line !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order Line Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding Sales Order Details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while adding Sales Order Details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editSalesOrderDetails : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.editSalesOrderDetails(req.body);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update Sales Order Line !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order Line Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Updateing Sales Order Details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Updateing Sales Order Details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSalesOrderDetailsList : async function (req,res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvList.getSalesOrderDetailsList(req.body.EvolveSalesOrder_ID);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Sales Order Line !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sale Order Line get Successfully",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Sales Order Details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting Sales Order Details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}