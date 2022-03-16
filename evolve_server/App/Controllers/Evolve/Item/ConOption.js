'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSingleItem: async function (req, res) {
        try {
            let getSingleItem = await Evolve.App.Services.Evolve.Item.SrvOption.getSingleItem(req.body);
            if (getSingleItem instanceof Error || getSingleItem.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Fail",
                    result: null
                };
                res.send(obj);
            } else {
                let getItemToSupp = await Evolve.App.Services.Evolve.Item.SrvOption.getSingleAssignData(req.body);
                // console.log('getItemToSupp',getItemToSupp)
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: {
                        itemData: getSingleItem.recordset,
                        ItemSupp: getItemToSupp.recordset,
                    }
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0259: Error while getting single item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0259: Error while getting single item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllQCTemplateList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getAllQCTemplateList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Fail",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0260: Error while getting All QC Template List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0260: Error while getting All QC Template List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessTemp: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getProcessTemp();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Process Template",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Template",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0261: Error while getting getting process temp "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0261: Error while getting getting process temp "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSerialMaster: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getSerialMaster();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Serial Master",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial Master Goted Succseffully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0262: Error while getting serial master "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0262: Error while getting serial master "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getItemGroup: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getItemGroup();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Item Group",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item Group",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0263: Error while getting Item group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0263: Error while getting Item group "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPdiTemplates: async function (req, res) {
        try {
            let getPdiTemplates = await Evolve.App.Services.Evolve.Item.SrvOption.getPdiTemplates();
            if (getPdiTemplates instanceof Error || getPdiTemplates.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Pdi Templates",
                    getPdiTemplates: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "PDI Templates",
                    result: getPdiTemplates.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0264: Error while getting Pdi Templates "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0264: Error while getting Pdi Templates "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createItem: async function (req, res) {
        try {
            if (req.body.EvolveQCTemp_ID == '') {
                req.body.EvolveQCTemp_ID = null;
            }
            let error = true;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            // console.log("data =",req.body)
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.createItem(req.body);
            // console.log('result',result)
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Item",
                    result: result.message
                };
                res.send(obj);
            } else {
                if (req.body.EvolveQc_IsRequired == true && req.body.EvolveQc_TempStatus == 'Approval') {
                    for (let i = 0; i < req.body.selectedSuppliers.length; i++) {
                        req.body.EvolveItem_ID = result.recordset[0].inserted_id;
                        req.body.EvolveSupplier_ID = req.body.selectedSuppliers[i].EvolveSupplier_ID;
                        let itemToSupp = await Evolve.App.Services.Evolve.Item.SrvOption.assignItemToSuppliers(req.body);
                        if (itemToSupp instanceof Error || itemToSupp.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error on Add Item to Supplier",
                                result: result.message
                            };
                            res.send(obj);
                        } else {
                            error = false;
                        }
                    }

                }
                else {
                    error = false;
                }
                if (error == false) {
                    if(Evolve.Config.ISAPPROVALREQUIRED != undefined && Evolve.Config.ISAPPROVALREQUIRED == 'true'){
                            let approvalRule =   await Evolve.App.Services.Common.SrvCommon.getApprovalMatrixByType("ITEM")
                            if (approvalRule instanceof Error ) {

                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error While Get Approval Rules",
                                    result: null
                                };
                                res.send(obj);

                            }else if(approvalRule.rowsAffected > 0){

                                let  details  = {
                                    EvolveApprovalMatrix_ID : approvalRule.recordset[0].EvolveApprovalMatrix_ID ,
                                    EvolveApprovalProcess_PrimaryID : result.recordset[0].inserted_id ,
                                    EvolveApprovalProcess_Status : 'PROCESS',
                                    EvolveApprovalProcess_CurrentIndex : 2 ,
                                    EvolveUser_ID  : req.body.EvolveUser_ID ,


                                }

                                let addApprProcess = await Evolve.App.Services.Common.SrvCommon.addApprovalProcess(details)

                                if (addApprProcess instanceof Error || addApprProcess.rowsAffected < 1) {

                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Error While Add Approval  Process",
                                        result: null
                                    };
                                    res.send(obj);

                                }else{
                                    let obj = {
                                        statusCode: 200,
                                        status: "success",
                                        message: "Item Added Successfully !",
                                        result: null
                                    };
                                    res.send(obj);
                                }
                            }else{
                                let obj = {
                                    statusCode: 200,
                                    status: "success",
                                    message: "Item Added Successfully !",
                                    result: null
                                };
                                res.send(obj);
                            }
                    }else{
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Item Added Successfully !",
                            result: null
                        };
                        res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0265: Error while creating item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0265: Error while creating item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateItem: async function (req, res) {
        try {
            if (req.body.EvolveQCTemp_ID == '' || req.body.EvolveQCTemp_ID == 'null') {
                req.body.EvolveQCTemp_ID = null;
            }
            // console.log("data =",req.body)
            let error = true;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.updateItem(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update Item",
                    result: result.message
                };
                res.send(obj);
            }
            else {
                if (req.body.EvolveQc_IsRequired == true && req.body.EvolveQc_TempStatus == 'Approval') {
                    let deleteOldItem = await Evolve.App.Services.Evolve.Item.SrvOption.deleteOldItemSupp(req.body);
                    if (deleteOldItem instanceof Error) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error on DELETE Item to Supplier",
                            result: deleteOldItem.message
                        };
                        res.send(obj);
                    } else {
                        for (let i = 0; i < req.body.selectedSuppliers.length; i++) {
                            req.body.EvolveSupplier_ID = req.body.selectedSuppliers[i].EvolveSupplier_ID;
                            // console.log("EvolveSupplier_ID",req.body.EvolveSupplier_ID)
                            // console.log("EvolveItem_ID",req.body.EvolveItem_ID)
                            // console.log("EvolveQCTemp_ID",req.body.EvolveQCTemp_ID)
                            // console.log("EvolveItemSupLink_Approved",req.body.EvolveItemSupLink_Approved)
                            // console.log("EvolveItemSupLink_recInvetory_Location",req.body.EvolveItemSupLink_recInvetory_Location)
                            let itemToSupp = await Evolve.App.Services.Evolve.Item.SrvOption.assignItemToSuppliers(req.body);
                            if (itemToSupp instanceof Error || itemToSupp.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error on Add Item to Supplier",
                                    result: null,
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                        }
                    }
                }
                else {
                    error = false;
                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Item Update Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0266: Error while updating item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0266: Error while updating item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemQcTemp: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getItemQcTemp(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Fail",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0267: Error while getting Item Qc temp "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0267: Error while getting Item Qc temp "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getUomList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Item.SrvOption.getUomList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Uom List",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0268: Error while getting Item Qc temp "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0268: Error while getting Item Qc temp "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}