'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getDocumentList: async function (req, res) {
        try {
            
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getDocumentList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting Document List!",
                    result: null
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while getting Document List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while getting Document List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },     
    getUnitList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getUnitList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting Unit List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while getting Unit List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while getting Unit List "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getCustomerList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getCustomerList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting Customer List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while getting Customer List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while getting Customer List "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    addUnitToCustomerLink: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.addUnitToCustomerLink(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Unit To Customer Link!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Link Add successfully",
                    result: null,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while add Unit To Customer Link "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while add Unit To Customer Link "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
   
    getUnitToCustomerLinkList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getUnitToCustomerLinkListCount(search);
            let result = await Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getUnitToCustomerLinkList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Unit To Customer Link List !",
                    result: result.message
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
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0247: Error while getting Unit To Customer Link List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Unit To Customer Link List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleUnitToCustomerLink: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.getSingleUnitToCustomerLink(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Unit To Customer Link!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while get Single Unit To Customer Link "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while get Single Unit To Customer Link "+error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    updateUnitToCustomerLink: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.updateUnitToCustomerLink(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while UPDATE Unit To Customer Link!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Link Update successfully",
                    result: null,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while UPDATE Unit To Customer Link "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while UPDATE Unit To Customer Link "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
    checkDuplicate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await  Evolve.App.Services.Evolve.UnitToCustomerLink.SrvList.checkDuplicate(req.body);
            console.log(result)
            if (result.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: null,
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "data Already Define!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while check Duplicate value"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while check Duplicate value"+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 

   



}