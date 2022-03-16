'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.getDocumentList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Document list !",
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
            Evolve.Log.error(" EERR0247: Error while getting document List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting document List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getGSPList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.getGspList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get gps list !",
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
            Evolve.Log.error(" EERR0247: Error while getting Gsp List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Gsp List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getGSPApiList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.GspApi.SrvList.getGSPApiListCount(search);
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.getGSPApiList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get gsp Api list !",
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
    addGspApi: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.addGspApi(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add gsp Api",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gsp Api Added Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0246: Error while adding Gsp Api " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0246: Error while adding Gsp Api " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleGSPApiData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.getSingleGSPApiData(req.body);
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
            Evolve.Log.error(" EERR0248: Error while getting single Gsp Api List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0248: Error while getting single Gsp Api List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateGspApi: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.GspApi.SrvList.updateGspApi(req.body);
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
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while updating Gsp Api " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while updating Gsp Api " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTypeAsperDatatype: async function (defaultValue,) {
        try {
            // console.log('defaultValue', defaultValue);
            if (defaultValue == 'OBJECT') {
                return {};
            }
            else if (defaultValue == 'ARRAY') {
                return [];
            } else {
                // if (defaultValue == 'TEXT') {
                //     return {};
                // } else {
                return defaultValue;
                //}
            }
        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
            return "";
        }
    },

    getGspApiUrldata: async function (req, res) {
        try {

            let eInvGD = await Evolve.App.Services.Evolve.GspApi.SrvList.checkAttributesCode(req.body);
            if (eInvGD instanceof Error || eInvGD.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Record Found!", result: null };
                res.send(obj);
            } else {

                let apiBodyObj = {};
                let headersOBJ = {};
                for (let eGspAPIObj of eInvGD.recordset) {
                    if (eGspAPIObj.eGP == 0 && eGspAPIObj.eGRP == 'REQUEST') {

                        apiBodyObj[eGspAPIObj.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGspAPIObj.eGDV);
                        let firstLevel = {};
                        for (let eGOC of eInvGD.recordset) {
                            if (eGOC.eGP == eGspAPIObj.eGID) {



                                firstLevel[eGOC.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGOC.eGDV);

                                console.log("eGOC.eGDV", eGOC.eGDV);
                                console.log("eGOC.eCD", eGOC.eCD);
                                console.log("firstLevel[eGOC.eCD]", firstLevel[eGOC.eCD]);

                                let secondLevel = {};
                                for (let eGSC of eInvGD.recordset) {
                                    if (eGSC.eGP == eGOC.eGID) {
                                        secondLevel[eGSC.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGSC.eGDV);
                                        let thirdLevel = {};
                                        for (let eGTC of eInvGD.recordset) {
                                            if (eGTC.eGP == eGSC.eGID) {
                                                thirdLevel[eGTC.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGTC.eGDV);
                                                let fordthLevel = {};
                                                for (let eGFC of eInvGD.recordset) {
                                                    if (eGFC.eGP == eGTC.eGID) {
                                                        fordthLevel[eGFC.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGFC.eGDV);
                                                    }
                                                }
                                                if (Object.keys(fordthLevel).length != 0) {
                                                    if (eGTC.eGDV == 'ARRAY') {
                                                        thirdLevel[eGTC.eCD] = new Array(fordthLevel);
                                                    } else {
                                                        thirdLevel[eGTC.eCD] = fordthLevel;
                                                    }
                                                } else {
                                                    if (eGTC.eGDT == 'ARRAY') {
                                                        thirdLevel[eGTC.eCD] = new Array(thirdLevel[eGTC.eCD]);
                                                    }
                                                }
                                            }
                                        }

                                        if (Object.keys(thirdLevel).length != 0) {
                                            if (eGSC.eGDV == 'ARRAY') {
                                                secondLevel[eGSC.eCD] = new Array(thirdLevel);
                                            } else {
                                                secondLevel[eGSC.eCD] = thirdLevel;
                                            }
                                        } else {
                                            if (eGSC.eGDT == 'ARRAY') {
                                                secondLevel[eGSC.eCD] = new Array(secondLevel[eGSC.eCD]);
                                            }
                                        }

                                    }
                                }

                                console.log("Object.keys(secondLevel).length >>>>>", Object.keys(secondLevel).length);
                                if (Object.keys(secondLevel).length != 0) {
                                    if (eGOC.eGDV == 'ARRAY') {
                                        firstLevel[eGOC.eCD] = new Array(secondLevel);
                                    } else {
                                        firstLevel[eGOC.eCD] = secondLevel;
                                    }
                                } else {
                                    if (eGOC.eGDT == 'ARRAY') {
                                        firstLevel[eGOC.eCD] = new Array(firstLevel[eGOC.eCD]);
                                    }
                                }

                            }
                        }


                        console.log("eGspAPIObj.eGDV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", eGspAPIObj.eGDV);
                        console.log("eGspAPIObj.eCD", eGspAPIObj.eCD);
                        console.log("firstLevel", firstLevel);

                        if (eGspAPIObj.eGDV == 'ARRAY') {
                            apiBodyObj[eGspAPIObj.eCD] = new Array(firstLevel);
                        } else {
                            apiBodyObj[eGspAPIObj.eCD] = firstLevel;
                        }
                    }
                    if (eGspAPIObj.eGP == 0 && eGspAPIObj.eGRP == 'HEADERS') {
                        headersOBJ[eGspAPIObj.eCD] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGspAPIObj.eGDV);
                    }
                }

                console.log("apiBodyObj ::", apiBodyObj);


                let apiObc = {
                    headers: headersOBJ,
                    body: apiBodyObj
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "API Object Successfully !",
                    result: apiObc
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while getting data" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while getting data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },





}