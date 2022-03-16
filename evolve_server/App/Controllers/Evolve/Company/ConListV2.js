'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getCompanyList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getCompanyListCount = await Evolve.App.Services.Evolve.Company.SrvListV2.getCompanyListCount(search);
            let getCompanyList = await Evolve.App.Services.Evolve.Company.SrvListV2.getCompanyList(start, length, search);
            if (getCompanyList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get CompanyList !",
                    result: getCompanyList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getCompanyListCount.recordset[0].count,
                    records: getCompanyList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while getting CompanyList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while getting CompanyList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTaxZoneList : async function (req , res){
        try {
            let getTaxZoneList = await Evolve.App.Services.Evolve.Company.SrvListV2.getTaxZoneList();
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
            let getTaxClassList = await Evolve.App.Services.Evolve.Company.SrvListV2.getTaxClassList();
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

    getBusinessGroupList : async function (req, res){
        try {
            let getBusinessGroupList = await Evolve.App.Services.Evolve.Company.SrvListV2.getBusinessGroupList();
            if (getBusinessGroupList instanceof Error || getBusinessGroupList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Business Group Details !",
                    result: getBusinessGroupList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: getBusinessGroupList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get Business Group Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get Business Group Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleCompanyDetails: async function (req, res) {
        try {
            let getSingleCompanyDetails = await Evolve.App.Services.Evolve.Company.SrvListV2.getSingleCompanyDetails(req.body);
            if (getSingleCompanyDetails instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Company Details !",
                    result: getSingleCompanyDetails.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: getSingleCompanyDetails.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get Single Company Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get Single Company Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createCompany: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let createAddress = await Evolve.App.Services.Evolve.Company.SrvListV2.createAddress(req.body)
            if (createAddress instanceof Error || createAddress.rowsAffected < 1) {
                err = true
            } else {
                let id = createAddress.recordset[0].inserted_id
                console.log("id::::::::::::", id)
                let createContact = await Evolve.App.Services.Evolve.Company.SrvListV2.createContact(req.body ,id)
                if (createContact instanceof Error || createContact.rowsAffected < 1) {
                    err = true
                } else {
                    let createbusinessGroup = await Evolve.App.Services.Evolve.Company.SrvListV2.createCompany(req.body , id);
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
            Evolve.Log.error(" EERR0201: Error while createCompany " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while createCompany " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    upateCompany: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let updateAddress = await Evolve.App.Services.Evolve.Company.SrvListV2.updateAddress(req.body)
            if (updateAddress instanceof Error || updateAddress.rowsAffected < 1) {
                err = true
            } else {
                let updateContact = await Evolve.App.Services.Evolve.Company.SrvListV2.updateContact(req.body)
                if (updateContact instanceof Error || updateContact.rowsAffected < 1) {
                    err = true
                } else {
                    let upateCompany = await Evolve.App.Services.Evolve.Company.SrvListV2.upateCompany(req.body);
                    if (upateCompany instanceof Error || upateCompany.rowsAffected < 1) {
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
            Evolve.Log.error(" EERR0201: Error while update Company " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while update Company " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}