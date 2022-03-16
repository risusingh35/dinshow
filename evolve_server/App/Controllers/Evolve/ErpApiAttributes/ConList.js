'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getErpApiList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.getErpApiList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Erp Api list !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0247: Error while getting Erp APi List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Erp Api List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getERPApiAttributesList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.getERPApiAttributesListCount(search);
            let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.getERPApiAttributesList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get erp Api Attributes list !",
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
            Evolve.Log.error(" EERR0247: Error while getting ERP API Attributes List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting ERP API Attributes List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addErpApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.checkAttributesCode(req.body);
            if (check.rowsAffected < 1) {
                let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.addErpApiAttributes(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on Add Erp Api Attributes",
                        result: result.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Erp Api Attributes Added Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Code Allready Define",
                    result: result.message
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0246: Error while adding Erp Api Attriutes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0246: Error while adding Erp Api Attriutes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleErpApiAttributesData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.getSingleErpApiAttributesData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Erp Api Attributes",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully !",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0248: Error while getting single Erp Api Attributes" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0248: Error while getting single Erp Api Attributes" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateERPApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.checkAttributesCode(req.body);
            if (check.rowsAffected < 1) {
                let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.updateERPApiAttributes(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on update Erp Api Attributes",
                        result: result.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Erp Api Attributes update Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Code Allready Define",
                    result: check.message
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while updating Erp Api Attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while updating Erp Api Attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkAttributesCode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.checkAttributesCode(req.body);
            if (result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "success",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Code Allready Define",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while Check Code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while Check Code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getParentAttributeList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.getParentAttributeList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Get Parent Attribute List",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while get Parent Attribute List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while get Parent Attribute List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteERPApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.checkChildExits(req.body);
            if (check.rowsAffected < 1) {

                 let result = await Evolve.App.Services.Evolve.ErpApiAttributes.SrvList.deleteERPApiAttributes(req.body);
                  if (result instanceof Error || result.rowsAffected < 1) {
                      let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on Delete API Attributes",
                            result: result.message
                        };
                        res.send(obj);
                  }else{
                      let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "API Attributes Delete Success",
                            result: result.recordset
                        };
                        res.send(obj);
                  }
                
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Child Is Define",
                    result: check.message
                };
                res.send(obj);
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while Delete API Attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while Delete API Attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },





}