'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAttrmappingList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getAttrmappingListCount(search);
            let list = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getAttrmappingListDatatable(start, length, search);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2583: Error while gsp api attribute maping list !",
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
            Evolve.Log.error(" EERR2584: Error while gsp api attribute maping list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2584: Error while gsp api attribute maping list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getGspApiList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getGspApiList();
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR2585: Error while get gsp api list !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Gsp Api not Found !",
                    result: null
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gsp api list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2586: Error while get gsp api list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2586: Error while get gsp api list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getApiAttributes: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getApiAttributes(req.body);
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
            let list = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getEvolveTableList();
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
                message: " EERR2590: Error while get tables "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTableFields: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getTableFields(req.body);
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
                message: " EERR2592: Error while get tables fields "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addGspApiAttrMapping: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
           let addMapping = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.addGspApiAttrMapping(req.body);
            if (addMapping instanceof Error || addMapping.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2593: Error while add gsp attribute mapping  !",
                    addMapping: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gsp api attribute mappig added successfully ",
                    addMapping: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2595: Error while add gsp attribute mapping "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2595: Error while add gsp attribute mapping "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleMappingDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.getSingleMappingDetails(req.body);
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
            Evolve.Log.error("EERR2597: Error while get single mapping details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2597:Error while get single mapping details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateMappingDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateDetails = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.updateMappingDetails(req.body);
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
    deleteGspApiAttributesMapping: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateDetails = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.deleteGspApiAttributesMapping(req.body);
            if (updateDetails instanceof Error || updateDetails.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2598: Error while Delete mapping details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Mapping details Delete successfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2599: Error while delete mapping details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2599: Error while delete mapping details "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    CheckApiAttribute: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.GspApiAttrMapping.SrvList.CheckApiAttribute(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2598: Error while Check Api Attribut !",
                    result: null
                };
                res.send(obj);
            } else if(result.rowsAffected < 1){
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: null
                };
                res.send(obj);
            }else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Api Attribute Already Exists",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2599: Error Check Api Attribut "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2599: Error Check Api Attribut "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}