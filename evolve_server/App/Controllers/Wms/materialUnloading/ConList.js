'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getAllMaterialUnloadList: async function (req, res) {
        try {


            console.log("ENTERED IN MATERIAL UNLOADINHB?????" ,req.body.searchMaterial )
            let list = await Evolve.App.Services.Wms.materialUnloading.SrvList.getAllMaterialUnloadList(req.body.searchMaterial);
            
            console.log('list???? ' ,  list)
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Material Unloading List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Material Unloading List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting material unloading "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting material unloading "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMaterialDetais : async function (req, res) {
        try {
            
            let result = await Evolve.App.Services.Wms.materialUnloading.SrvList.getSingleMaterialDetais(req.body.EvolveGate_ID);
            
            console.log("result>>>>>" ,  result)
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get singel material details !",
                    result: result
                };
                res.send(obj);
            } 
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Singel Material List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting singel material details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting singel material details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    unloadMaterial : async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID  == undefined ? null : req.EvolveUser_ID  ; 
            
            let result = await Evolve.App.Services.Wms.materialUnloading.SrvList.unloadMaterial(req.body);
    
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on unload material !",
                    result: result
                };
                res.send(obj);
            } 
            else {

                let updateLine = await Evolve.App.Services.Wms.materialUnloading.SrvList.updateGateDetails(req.body);
    
                if (updateLine instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Update Gate Details !",
                        result: result
                    };
                    res.send(obj);
                } 
                else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Material Unloaded Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while unload material "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while unload material "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}