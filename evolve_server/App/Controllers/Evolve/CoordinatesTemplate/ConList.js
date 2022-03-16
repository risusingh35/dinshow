'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let addTemplate = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.addTemplate(req.body);
            if (addTemplate instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add template!",
                    result: null
                };
                res.send(obj);
            } else {
                addTemplate.recordset[0].inserted_id;  
                let data = [
                    { name : 'DOCUMENTTYPE', extraText : ''},
                    { name : 'DOCUMENTPAGETOTAL', extraText : ''},
                    { name : 'DOCUMENTPAGECOUNT', extraText : ''},
                    { name : 'INVOICENUMBER', extraText : ''},
                    { name : 'INVOICEITEMCOUNT', extraText : '1'},
                ]
                for(let i = 0; i < data.length; i++){
                    let addCordinateData = {
                        'EvolveCoordinatesTemplate_ID' : addTemplate.recordset[0].inserted_id,
                        'EvolveCoordinates_Name' : data[i].name,
                        'EvolveCoordinates_Code' : data[i].name,
                        'EvolveCoordinates_X' : 0,
                        'EvolveCoordinates_Y' : 0,
                        'EvolveCoordinates_MinX' : 0.10,
                        'EvolveCoordinates_MaxX' : 0.10,
                        'EvolveCoordinates_IsMultiple' : false,
                        'EvolveCoordinates_DiffWithLineNumber' : 0,
                        'EvolveCoordinates_ExtraText' : data[i].extraText,
                        'EvolveCoordinates_Status' : true,
                        'EvolveCoordinates_InvoiceFeild' : '',
                        'EvolveCoordinates_InvoiceItemFeild' : '',
                    }
                    let addCordinate = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.addCoordinate(req.body, addCordinateData);
                    if (addCordinate instanceof Error) {
                       error = true;
                    } 
                }  
                if(error == false){
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Template Add Successfully",
                        result: "Success"
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on Add Cordinate",
                        result: "fail"
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0229: Error while adding template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0229: Error while adding template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTemplateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);            
            let search = req.body.search;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let Count = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.getTemplateListCount(search);
            let result = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.getTemplateList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get template list!",
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
                    message: "CO Templates",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0230: Error while getting Template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0230: Error while getting Template list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleTemplate: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.getSingleTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Template list!",
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
            Evolve.Log.error(" EERR0231: Error while getting single template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0231: Error while getting single template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.CoordinatesTemplate.SrvList.updateTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Template list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Template Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0232: Error while updating template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0232: Error while updating template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}