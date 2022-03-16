'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getunitList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getunitListCount = await Evolve.App.Services.Evolve.Unit.SrvListV2.getunitListCount(search);
            let getunitList = await Evolve.App.Services.Evolve.Unit.SrvListV2.getunitList(start, length, search);
            if (getunitList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get unit List !",
                    result: getunitList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getunitListCount.recordset[0].count,
                    records: getunitList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "unit List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while getting unit List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while getting unit List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTaxZoneList : async function (req , res){
        try {
            let getTaxZoneList = await Evolve.App.Services.Evolve.Unit.SrvListV2.getTaxZoneList();
            if (getTaxZoneList instanceof Error || getTaxZoneList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get TaxZoneList !",
                    result: getTaxZoneList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "TaxZone List",
                    result: getTaxZoneList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get TaxZoneList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get TaxZoneList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTaxClassList : async function (req, res) {
        try {
            let getTaxClassList = await Evolve.App.Services.Evolve.Unit.SrvListV2.getTaxClassList();
            if (getTaxClassList instanceof Error || getTaxClassList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get TaxClassList !",
                    result: getTaxClassList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "TaxClass List",
                    result: getTaxClassList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get TaxClassList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get TaxClassList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getCompanyList : async function (req, res){
        try {
            let getCompanyList = await Evolve.App.Services.Evolve.Unit.SrvListV2.getCompanyList();
            if (getCompanyList instanceof Error || getCompanyList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get CompanyList !",
                    result: getCompanyList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: getCompanyList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get CompanyList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get CompanyList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleUnitDetails: async function (req, res) {
        try {
            let getSingleUnitDetails = await Evolve.App.Services.Evolve.Unit.SrvListV2.getSingleUnitDetails(req.body);
            if (getSingleUnitDetails instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get SingleUnitDetails !",
                    result: getSingleUnitDetails.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Singl eUnit Details",
                    result: getSingleUnitDetails.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get SingleUnitDetails " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get SingleUnitDetails " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createUnit: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let createAddress = await Evolve.App.Services.Evolve.Unit.SrvListV2.createAddress(req.body)
            if (createAddress instanceof Error || createAddress.rowsAffected < 1) {
                err = true
            } else {
                let id = createAddress.recordset[0].inserted_id
                console.log("id::::::::::::", id)
                let createContact = await Evolve.App.Services.Evolve.Unit.SrvListV2.createContact(req.body ,id)
                if (createContact instanceof Error || createContact.rowsAffected < 1) {
                    err = true
                } else {
                    let createbusinessGroup = await Evolve.App.Services.Evolve.Unit.SrvListV2.createUnit(req.body , id);
                    if (createbusinessGroup instanceof Error || createContact.rowsAffected < 1) {
                        err = true;
                    }
                }
            }

            if (err == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Create successfuly",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error in create",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while create createUnit " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while create createUnit " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    upateUnit: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let updateAddress = await Evolve.App.Services.Evolve.Unit.SrvListV2.updateAddress(req.body)
            if (updateAddress instanceof Error || updateAddress.rowsAffected < 1) {
                err = true
            } else {
                let updateContact = await Evolve.App.Services.Evolve.Unit.SrvListV2.updateContact(req.body)
                if (updateContact instanceof Error || updateContact.rowsAffected < 1) {
                    err = true
                } else {
                    let upateUnit = await Evolve.App.Services.Evolve.Unit.SrvListV2.upateUnit(req.body);
                    if (upateUnit instanceof Error || upateUnit.rowsAffected < 1) {
                        err = true;
                    }
                }
            }

            if (err == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "update successfuly",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error in update",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while update Unit " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while update Unit " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}