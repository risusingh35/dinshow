'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addDocument: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let addDocument = await Evolve.App.Services.Evolve.Document.SrvList.addDocument(req.body);
            if (addDocument instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Document!",
                    result: null
                };
                res.send(obj);
            } else {
                
                let data = [
                    { code : 'CUSTQR', extraText : ''},
                    { code : 'IRNQR', extraText : ''},
                    { code : 'IRNTXT', extraText : ''},
                    { code : 'DS', extraText : ''},
                ]
                console.log("insert id",addDocument.recordset[0].inserted_id)
                for(let i = 0; i < data.length; i++){
                    let addDocumentStampingData = {
                        'EvolveDocument_ID' : addDocument.recordset[0].inserted_id,
                        'EvolveDocumentStamping_Code' : data[i].code,
                        'EvolveDocumentStamping_StartX' : 0,
                        'EvolveDocumentStamping_StartY' : 0,
                        'EvolveDocumentStamping_EndX' : 0.10,
                        'EvolveDocumentStamping_EndY' : 0.10,
                        'EvolveDocumentStamping_Status' : true,
                    }
                    let addDocumentStamping = await Evolve.App.Services.Evolve.Document.SrvList.addDocumentStamping(req.body, addDocumentStampingData);
                    if (addDocumentStamping instanceof Error) {
                       error = true;
                    } 
                   
                }  
                for(let j = 0; j < req.body.EvolveDocumentMappingSetting.length; j++){
                    let addDocumentMappingData = {
                        'EvolveCoordinates_ID' : req.body.EvolveDocumentMappingSetting[j].EvolveCoordinates_ID,
                        'EvolveDocumentMappingSetting_MatchingValue' : req.body.EvolveDocumentMappingSetting[j].EvolveDocumentMappingSetting_MatchingValue,
                        'EvolveCoordinatesTemplate_ID' : req.body.EvolveDocumentMappingSetting[j].EvolveCoordinatesTemplate_ID,
                        'EvolveDocument_ID' : addDocument.recordset[0].inserted_id,
                    }
                    let addDocumentMapping = await Evolve.App.Services.Evolve.Document.SrvList.addDocumentMapping(req.body, addDocumentMappingData);
                    if (addDocumentMapping instanceof Error) {
                       error = true;
                    } 
                }
                if(error == false){
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Document Add Successfully",
                        result: "Success"
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on add Document Stamping",
                        result: "fail"
                    };
                    res.send(obj);
                }
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding document "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDocumentList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.Document.SrvList.getDocumentListCount(search);
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getDocumentList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document list!",
                    result: null
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
                    message: "Document list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0238: Error while getting document list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0238: Error while getting document list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDocumentTypeList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getDocumentTypeList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document Type!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0239: Error while geting document type "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0239: Error while geting document type "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDocumentSubTypeList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getDocumentSubTypeList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document Sub Type!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0240: Error while getting document sub-type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0240: Error while getting document sub-type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getGspList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getGspList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get GSP list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0241: Error while getting Gsp list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0241: Error while getting Gsp list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getInvoiceList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getInvoiceList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0242: Error while getting Invoice list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0242: Error while getting Invoice list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCTemplateList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getCTemplateList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get template list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0243: Error while getting CTemplate List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0243: Error while getting CTemplate List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleDocument: async function (req, res) {
        try {

            let result = await Evolve.App.Services.Evolve.Document.SrvList.getSingleDocument(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Document list!",
                    result: null
                };
                res.send(obj);
            } else {
                let mapping = await Evolve.App.Services.Evolve.Document.SrvList.getDocumentMapppingList(req.body);
                if (mapping instanceof Error) {
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Success",
                        result: {
                            document: result.recordset,
                            documentMapping: [],
                        }
                    };
                    res.send(obj);
                } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: {
                        document: result.recordset,
                        documentMapping: mapping.recordset,
                    }
                };
                res.send(obj);
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0244: Error while getting single document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0244: Error while getting single document "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateDocument: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Document.SrvList.updateDocument(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Document list!",
                    result: null
                };
                res.send(obj);
            } else {
                let removeDocumentMapping = await Evolve.App.Services.Evolve.Document.SrvList.removeDocumentMapping(req.body.Evolvedocument_ID);
                let error = false;
                for(let j = 0; j < req.body.EvolveDocumentMappingSetting.length; j++){
                    let addDocumentMappingData = {
                        'EvolveCoordinates_ID' : req.body.EvolveDocumentMappingSetting[j].EvolveCoordinates_ID,
                        'EvolveDocumentMappingSetting_MatchingValue' : req.body.EvolveDocumentMappingSetting[j].EvolveDocumentMappingSetting_MatchingValue,
                        'EvolveCoordinatesTemplate_ID' : req.body.EvolveDocumentMappingSetting[j].EvolveCoordinatesTemplate_ID,
                        'EvolveDocument_ID' : req.body.Evolvedocument_ID,
                    }
                    let addDocumentMapping = await Evolve.App.Services.Evolve.Document.SrvList.addDocumentMapping(req.body, addDocumentMappingData);
                    if (addDocumentMapping instanceof Error) {
                       error = true;
                    } 
                }
                if(error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Document Update Success",
                        result: null
                    };
                    res.send(obj);
                } else {
                    console.log("I am here");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while update Document list!",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while updating document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCoordinateList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getCoordinateList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while get Coordinate List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCustQRTempList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Document.SrvList.getCustQRTempList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Cust QR Template List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while get Cust QR Template List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },


}