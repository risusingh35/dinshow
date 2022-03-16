'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getAllBusinessGroupList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getAllBusinessGroupListCount = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.getAllBusinessGroupListCount(search);
            let getAllBusinessGroupList = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.getAllBusinessGroupList(start, length, search);
            if (getAllBusinessGroupList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get bom !",
                    result: getAllBusinessGroupList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getAllBusinessGroupListCount.recordset[0].count,
                    records: getAllBusinessGroupList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while getting Business Group List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while getting Business Group List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTaxZoneList : async function (req , res){
        try {
            let getTaxZoneList = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.getTaxZoneList();
            if (getTaxZoneList instanceof Error || getTaxZoneList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Business Group Details !",
                    result: getTaxZoneList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: getTaxZoneList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get Single Business Group Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get Single Business Group Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTaxClassList : async function (req, res) {
        try {
            let getTaxClassList = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.getTaxClassList();
            if (getTaxClassList instanceof Error || getTaxClassList.rowsAffected < 1) {
                let obj = { 
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Business Group Details !",
                    result: getTaxClassList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: getTaxClassList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get Single Business Group Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get Single Business Group Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSinglebusinessGroupDetails: async function (req, res) {
        try {
            let getSinglebusinessGroupDetails = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.getSinglebusinessGroupDetails(req.body);
            if (getSinglebusinessGroupDetails instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Business Group Details !",
                    result: getSinglebusinessGroupDetails.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: getSinglebusinessGroupDetails.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while get Single Business Group Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while get Single Business Group Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createbusinessGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let createAddress = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.createAddress(req.body)
            if (createAddress instanceof Error || createAddress.rowsAffected < 1) {
                err = true
            } else {
                let id = createAddress.recordset[0].inserted_id
                console.log("id::::::::::::", id)
                let createContact = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.createContact(req.body ,id)
                if (createContact instanceof Error || createContact.rowsAffected < 1) {
                    err = true
                } else {
                    let createbusinessGroup = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.createbusinessGroup(req.body , id);
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
            Evolve.Log.error(" EERR0201: Error while create Business Group List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while create Business Group List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updatebusinessGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("req.body::::::::::::", req.body)
            let err = false;
            let updateAddress = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.updateAddress(req.body)
            if (updateAddress instanceof Error || updateAddress.rowsAffected < 1) {
                err = true
            } else {
                let updateContact = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.updateContact(req.body)
                if (updateContact instanceof Error || updateContact.rowsAffected < 1) {
                    err = true
                } else {
                    let updatebusinessGroup = await Evolve.App.Services.Evolve.BusinessGroup.SrvList.updatebusinessGroup(req.body);
                    if (updatebusinessGroup instanceof Error || updatebusinessGroup.rowsAffected < 1) {
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
            Evolve.Log.error(" EERR0201: Error while update Business Group List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while update Business Group List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}