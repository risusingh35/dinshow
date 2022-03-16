'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGSPApiList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.getGSPApiList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get gsp Api list !",
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
            Evolve.Log.error(" EERR0247: Error while getting Gsp Api List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Gsp Api List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getGSPApiAttributesList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.getGSPApiAttributesListCount(search);
            let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.getGSPApiAttributesList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get gsp Api Attributes list !",
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
            Evolve.Log.error(" EERR0247: Error while getting Gsp Api Attributes List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Gsp Api Attributes List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addGspApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.checkAttributesCode(req.body);
            if (check.rowsAffected < 1) {
                let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.addGspApiAttributes(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on Add gsp Api Attributes",
                        result: result.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Gsp Api Attributes Added Successfully !",
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
            Evolve.Log.error(" EERR0246: Error while adding Gsp Api Attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0246: Error while adding Gsp Api Attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleGSPApiAttributesData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.getSingleGSPApiAttributesData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single gsp Api",
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
            Evolve.Log.error(" EERR0248: Error while getting single Gsp Api Attributes List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0248: Error while getting single Gsp Api Attributes List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateGspApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.checkAttributesCode(req.body);
            if (check.rowsAffected < 1) {
                let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.updateGspApiAttributes(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on update gsp api",
                        result: result.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Gsp Api update Successfully !",
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
            Evolve.Log.error(" EERR0249: Error while updating Gsp Api Attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while updating Gsp Api Attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkAttributesCode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.checkAttributesCode(req.body);
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
            let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.getParentAttributeList(req.body);
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
            Evolve.Log.error(" EERR0249: Error while get Gsp parent attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while get Gsp parent attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteGspApiAttributes: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let check = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.checkChildExits(req.body);
            if (check.rowsAffected < 1) {

                 let result = await Evolve.App.Services.Evolve.GspApiAttributes.SrvList.deleteGspApiAttributes(req.body);
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
            Evolve.Log.error(" EERR0249: Error while delete Gsp Api Attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while delete Gsp Api Attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },





}