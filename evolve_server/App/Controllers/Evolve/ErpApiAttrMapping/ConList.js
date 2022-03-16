'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAttrmappingList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getAttrmappingListCount(search);
            let list = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getAttrmappingListDatatable(start, length, search);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2583: Error while Erp api attribute maping list !",
                    result: list.message
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Mapping list not found",
                    result: []
                };
                res.send(obj);
            }
            else{
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "mapping list ",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2584: Error while Erp api attribute maping list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2584: Error while Erp api attribute maping list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getErpApiList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getErpApiList();
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR2585: Error while get Erp api list !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Erp Api not Found !",
                    result: null
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Erp api list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2586: Error while get Erp api list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2586: Error while get Erp api list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getApiAttributes: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getApiAttributes(req.body);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2587: Error while get api attributes !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Attributes Not Found",
                    result: null
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Attributes",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2588: Error while get api attributes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2588: Error while get api attributes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getEvolveTableList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getEvolveTableList();
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2589: Error while get table list !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "tables not found",
                    result: []
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2590: Error while get table list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2590: Error while get api attributes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTableFields: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getTableFields(req.body);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2591: Error while get table fields !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "tables not found",
                    result: null
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2592: Error while get table fields "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2592: Error while get api attributes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addErpAttrMapping: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
           let addMapping = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.addErpAttrMapping(req.body);
            if (addMapping instanceof Error || addMapping.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2593: Error while add Erp attribute mapping  !",
                    addMapping: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Erp api attribute mappig added successfully ",
                    addMapping: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2595: Error while add Erp attribute mapping "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2595: Error while add Erp attribute mapping "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleMappingDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.getSingleMappingDetails(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2596: Error while get mapping details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "mapping details ",
                    result: details.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2597: Error while get Single mapping details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2597:Error while get Single mapping details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateMappingDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateDetails = await Evolve.App.Services.Evolve.ErpApiAttrMapping.SrvList.updateMappingDetails(req.body);
            if (updateDetails instanceof Error || updateDetails.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2598: Error while update mapping details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Mapping details updated successfully ",
                    result: updateDetails.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2599: Error while update mapping details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2599: Error while update mapping details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}