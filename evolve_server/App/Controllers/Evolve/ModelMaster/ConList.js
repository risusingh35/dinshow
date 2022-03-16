'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllModels: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getAllModelsCount(search);
            let models = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getAllModels(start, length,search);
            if (models instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Model list !",
                    result: models.message
                };
                res.send(obj);
            } else {
                let erroringetitem = false             
                for (let i = 0 ; i < models.recordset.length ; i++){
                    let getItemsLinked = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getItemsLinked(models.recordset[i].EvolveModel_ID)
                    if(erroringetitem instanceof Error){
                        erroringetitem = true
                    }else{
                        models.recordset[i].ItemsLinked = getItemsLinked.recordset
                    }

                }
                if(erroringetitem == false){
                    let resObj = {
                        noOfRecord: count.recordset[0].count,
                        records: models.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Model list",
                        result: resObj
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while get Model list !",
                        result: models.message
                    };
                    res.send(obj);
                }
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR32572: Error while getting all Model List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32572: Error while getting all Model List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllUnitList : async function (req,res){
        try {
            let getAllUnitList = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getAllUnitList();
            if (getAllUnitList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Unit list !",
                    result: getAllUnitList.message
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Unit list",
                    result: getAllUnitList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32573: Error while getting all Unit list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32573: Error while getting all Unit list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllItemList : async function (req,res){
        try {
            let getAllItemList = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getAllItemList();
            if (getAllItemList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Unit list !",
                    result: getAllItemList.message
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: getAllItemList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32574: Error while getting all Item list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32574: Error while getting all Item list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteModel : async function (req,res){
        try {
            let deleteModel = await Evolve.App.Services.Evolve.ModelMaster.SrvList.deleteModel(req.body.EvolveModel_ID);
            if (deleteModel instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Delete Model !",
                    result: deleteModel.message
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Model Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32575: Error while delete Model "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32575: Error while delete Model "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addNewModel : async function (req,res){
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let addNewModel = await Evolve.App.Services.Evolve.ModelMaster.SrvList.addNewModel(req.body);
            if (addNewModel instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Add New Model !",
                    result: addNewModel.message
                };
                res.send(obj);
            } else {
                let getModelId = await Evolve.App.Services.Evolve.ModelMaster.SrvList.getModelId(req.body.EvolveModel_Code);
                // let addNewSerial = await Evolve.App.Services.Evolve.ModelMaster.SrvList.addNewSerial(req.body.EvolveSerial_Prefix,req.body.EvolveUser_ID , getModelId.recordset[0].EvolveModel_ID);
                // console.log(req.body.ItemsSelected , "dsfdfdsfsd");
                for (let i = 0 ; i < req.body.ItemsSelected.length ; i++){
                    let addItemToModel = await Evolve.App.Services.Evolve.ModelMaster.SrvList.addItemToModel(req.body.ItemsSelected[i] , getModelId.recordset[0].EvolveModel_ID , req.body.EvolveUnit_ID , req.body.EvolveUser_ID)
                }
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Model Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32576: Error while Add New Model "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32576: Error while Add New Model "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateModel : async function (req,res){
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let updateModel = await Evolve.App.Services.Evolve.ModelMaster.SrvList.updateModel(req.body);
            if (updateModel instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update Model !",
                    result: updateModel.message
                };
                res.send(obj);
            } else {
                // let updateSerial = await Evolve.App.Services.Evolve.ModelMaster.SrvList.updateSerial(req.body.EvolveSerial_Prefix,req.body.EvolveUser_ID , req.body.EvolveModel_ID);
                for (let i = 0 ; i < req.body.ItemsSelected.length ; i++){
                    let checkItemToModelExists =   await Evolve.App.Services.Evolve.ModelMaster.SrvList.checkItemToModelExists(req.body.ItemsSelected[i] , req.body.EvolveModel_ID)
                    if(checkItemToModelExists.rowsAffected <= 0){
                        let addItemToModel = await Evolve.App.Services.Evolve.ModelMaster.SrvList.addItemToModel(req.body.ItemsSelected[i] , req.body.EvolveModel_ID , req.body.EvolveUnit_ID , req.body.EvolveUser_ID)
                    }
                }
                let getItemsLinked =   await Evolve.App.Services.Evolve.ModelMaster.SrvList.getItemsLinked(req.body.EvolveModel_ID)
                for (let j = 0 ; j < getItemsLinked.recordset.length ; j++){
                    let isMatched = false
                    for(let k = 0 ; k < req.body.ItemsSelected.length ; k++){
                        if(req.body.ItemsSelected[k] == getItemsLinked.recordset[j].EvolveItem_ID && req.body.EvolveModel_ID == getItemsLinked.recordset[j].EvolveModel_ID){
                            isMatched = true
                        }
                    }
                    if(isMatched == false){
                        let deleteItemToModel =   await Evolve.App.Services.Evolve.ModelMaster.SrvList.deleteItemToModel(getItemsLinked.recordset[j].EvolveItemToModel_ID)
                    }
                }
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Model Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32577: Error while Update Model "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32577: Error while Update Model "+error.message,
                result: null
            };
            res.send(obj);
        }
    }
}