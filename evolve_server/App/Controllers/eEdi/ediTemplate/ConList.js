'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getTemplateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eEdi.ediTemplate.SrvList.getTemplateListCount(search);
            let result = await Evolve.App.Services.eEdi.ediTemplate.SrvList.getTemplateList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get EDI Template list !",
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
            Evolve.Log.error(" EERR####: Error while getting EDI Template List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting EDI Template List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addEdiTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eEdi.ediTemplate.SrvList.addEdiTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add EDI Template",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " EDI Template Added Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding EDI Template " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while adding EDI Template " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateEdiTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eEdi.ediTemplate.SrvList.updateEdiTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update EDI Template",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " EDI Template Updated Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Updateing EDI Template " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Updateing EDI Template " + error.message,
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

    getprevueData: async function (req, res) {
        try {

            let eInvGD = await Evolve.App.Services.eEdi.ediTemplate.SrvList.checkAttributesCode(req.body);
            if (eInvGD instanceof Error || eInvGD.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Record Found!", result: null };
                res.send(obj);
            } else {

                let apiBodyObj = {};
                let headersOBJ = {};
                for (let eGspAPIObj of eInvGD.recordset) {
                    if (eGspAPIObj.eGP == 0) {

                        apiBodyObj[eGspAPIObj.eCD] = await Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTypeAsperDatatype(eGspAPIObj.eGDV);
                        let firstLevel = {};
                        let childData = false;
                        for (let eGOC of eInvGD.recordset) {
                            if (eGOC.eGP == eGspAPIObj.eGID) {


                                childData = true;
                                firstLevel[eGOC.eCD] = await Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTypeAsperDatatype(eGOC.eGDV);

                                console.log("eGOC.eGDV", eGOC.eGDV);
                                console.log("eGOC.eCD", eGOC.eCD);
                                console.log("firstLevel[eGOC.eCD]", firstLevel[eGOC.eCD]);

                                let secondLevel = {};
                                for (let eGSC of eInvGD.recordset) {
                                    if (eGSC.eGP == eGOC.eGID) {
                                        secondLevel[eGSC.eCD] = await Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTypeAsperDatatype(eGSC.eGDV);
                                        let thirdLevel = {};
                                        for (let eGTC of eInvGD.recordset) {
                                            if (eGTC.eGP == eGSC.eGID) {
                                                thirdLevel[eGTC.eCD] = await Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTypeAsperDatatype(eGTC.eGDV);
                                                let fordthLevel = {};
                                                for (let eGFC of eInvGD.recordset) {
                                                    if (eGFC.eGP == eGTC.eGID) {
                                                        fordthLevel[eGFC.eCD] = await Evolve.App.Controllers.eEdi.ediTemplate.ConList.getTypeAsperDatatype(eGFC.eGDV);
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
                            if(childData == true){
                            apiBodyObj[eGspAPIObj.eCD] = firstLevel;
                            }
                        }
                    }
                }

                console.log("apiBodyObj ::", apiBodyObj);


                let apiObc = apiBodyObj

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