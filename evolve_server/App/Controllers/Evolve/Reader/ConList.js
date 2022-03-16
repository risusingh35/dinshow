'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderList: async function (req, res) {
        try {

            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.Reader.SrvList.getReaderListCount(search);

            let result = await Evolve.App.Services.Evolve.Reader.SrvList.getReaderList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Reader List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting reader List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addReader: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.Reader.SrvList.addReader(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Reader !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Added Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Adding Reader " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editReader: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.Reader.SrvList.editReader(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Edit Reader !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Updated Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Edit Reader " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Edit Reader " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTypeAsperDatatype: async function (defaultValue) {
        try {
            // console.log('defaultValue', defaultValue);
            if (defaultValue == 'OBJECT') {
                return {};
            }
            else if (defaultValue == 'ARRAY') {
                return [];
            } else {
                return defaultValue;
            }
        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
            return "";
        }
    },

    getReaderPreviewData: async function (req, res) {
        try {
            let response = await Evolve.App.Services.Evolve.Reader.SrvList.getReaderPreviewData(req.body.EvolveReader_ID);

            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on getting Reader Preview Data!",
                    result: response.message
                };
                res.send(obj);
            } else {
                let readerPreviewDataObj = {};
                for (let readerObj of response.recordset) {
                    if (readerObj.eraParent == 0){
                        readerPreviewDataObj[readerObj.eraCode] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(readerObj.eraDefault);
                        console.log("readerPreviewDataObj[readerObj.eraCode]>>>>>>>>>>>>.", readerPreviewDataObj[readerObj.eraCode]);
                        let firstLevel = {};
                        for (let eGOC of response.recordset) {
                            if (eGOC.eraParent == readerObj.eraId) {

                                firstLevel[eGOC.eraCode] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGOC.eraDefault);

                                console.log("eGOC.eraDefault", eGOC.eraDefault);
                                console.log("eGOC.eraCode", eGOC.eraCode);
                                console.log("firstLevel[eGOC.eraCode]", firstLevel[eGOC.eraCode]);

                                let secondLevel = {};
                                for (let eGSC of response.recordset) {
                                    if (eGSC.eraParent == eGOC.eraId) {
                                        secondLevel[eGSC.eraCode] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGSC.eraDefault);
                                        let thirdLevel = {};
                                        for (let eGTC of response.recordset) {
                                            if (eGTC.eraParent == eGSC.eraId) {
                                                thirdLevel[eGTC.eraCode] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGTC.eraDefault);
                                                let fordthLevel = {};
                                                for (let eGFC of response.recordset) {
                                                    if (eGFC.eraParent == eGTC.eraId) {
                                                        fordthLevel[eGFC.eraCode] = await Evolve.App.Controllers.Evolve.GspApi.ConList.getTypeAsperDatatype(eGFC.eraDefault);
                                                    }
                                                }
                                                if (Object.keys(fordthLevel).length != 0) {
                                                    if (eGTC.eraDefault == 'ARRAY') {
                                                        thirdLevel[eGTC.eraCode] = new Array(fordthLevel);
                                                    } else {
                                                        thirdLevel[eGTC.eraCode] = fordthLevel;
                                                    }
                                                } else {
                                                    if (eGTC.eraDataType == 'ARRAY') {
                                                        thirdLevel[eGTC.eraCode] = new Array(thirdLevel[eGTC.eraCode]);
                                                    }
                                                }
                                            }
                                        }

                                        if (Object.keys(thirdLevel).length != 0) {
                                            if (eGSC.eraDefault == 'ARRAY') {
                                                secondLevel[eGSC.eraCode] = new Array(thirdLevel);
                                            } else {
                                                secondLevel[eGSC.eraCode] = thirdLevel;
                                            }
                                        } else {
                                            if (eGSC.eraDataType == 'ARRAY') {
                                                secondLevel[eGSC.eraCode] = new Array(secondLevel[eGSC.eraCode]);
                                            }
                                        }

                                    }
                                }

                                console.log("Object.keys(secondLevel).length >>>>>", Object.keys(secondLevel).length);
                                if (Object.keys(secondLevel).length != 0) {
                                    if (eGOC.eraDefault == 'ARRAY') {
                                        firstLevel[eGOC.eraCode] = new Array(secondLevel);
                                    } else {
                                        firstLevel[eGOC.eraCode] = secondLevel;
                                    }
                                } else {
                                    if (eGOC.eraDataType == 'ARRAY') {
                                        firstLevel[eGOC.eraCode] = new Array(firstLevel[eGOC.eraCode]);
                                    }
                                }

                            }
                        }


                        console.log("readerObj.eraDefault >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", readerObj.eraDefault);
                        console.log("readerObj.eraCode", readerObj.eraCode);
                        console.log("firstLevel", firstLevel);

                        if (readerObj.eraDefault == 'ARRAY') {
                            readerPreviewDataObj[readerObj.eraCode] = new Array(firstLevel);
                        } else {
                            readerPreviewDataObj[readerObj.eraCode] = firstLevel;
                        }
                    }
                }

                console.log("readerPreviewDataObj ::", readerPreviewDataObj);
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Object Successfully !",
                    result: readerPreviewDataObj
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Getting Reader Preview Data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Getting Reader Preview Data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}