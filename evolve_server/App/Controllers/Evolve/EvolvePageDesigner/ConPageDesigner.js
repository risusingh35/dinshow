'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {



    getTableList: async function(req, res) {
        try {

            let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.getTableList();
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get table list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get table list!",
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
            Evolve.Log.error(" EERR####: Error while get table list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get table list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTableDetails: async function(req, res) {
        try {

            let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.getTableDetails(req.body);
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get table details ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get table details!",
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
            Evolve.Log.error(" EERR####: Error while get table details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get table details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addPageDetails: async function(req, res) {
        try {

            let errorMessage = '';
            req.body.headDetails.EvolvePage_Code = Evolve.Generator.generate("EPGE");
            console.log("req.body.headDetails.EvolvePage_Code", req.body.headDetails.EvolvePage_Code);
            req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
            if (req.body.headDetails.EvolvePage_Code == undefined || req.body.headDetails.EvolvePage_Code.length == 0) {
                Evolve.Log.error(" EERR#### : Error while assign page code ")

                errorMessage = 'Error while assign page code'
            } else {

                req.body.headDetails.EvolvePage_Code = (req.body.headDetails.EvolvePage_Code.toString()).replace(/ -/g, '')
                req.body.headDetails.EvolvePage_Code = req.body.headDetails.EvolvePage_Code.split(" ").join("");

                req.body.headDetails.Evolvepage_Url = '/common/pageList/' + req.body.headDetails.EvolvePage_Code;


                let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.addPageDetails(req.body.headDetails);
                if (result instanceof Error || result.rowsAffected < 1) {

                    errorMessage = 'Error While Add Page Details'

                } else {

                    req.body.inserted_id = result.recordset[0].inserted_id;
                    let addPageFields
                    for (let i = 0; i < req.body.fieldDetails.length; i++) {

                        if (errorMessage == '') {

                            if (req.body.fieldDetails[i].isSelected) {
                                if (req.body.fieldDetails[i].SelectQuery) {
                                    req.body.fieldDetails[i].SelectQuery = req.body.fieldDetails[i].SelectQuery
                                } else { req.body.fieldDetails[i].SelectQuery = "" }
                                addPageFields = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.addPageFieldsDetails(req.body.fieldDetails[i], req.body.inserted_id);


                                if (addPageFields instanceof Error) {

                                    errorMessage = 'Errror While Add Page Field Details'
                                }
                            }
                        }
                    }

                }
            }

            let obj = {
                statusCode: errorMessage == '' ? 200 : 400,
                status: errorMessage == '' ? "success" : "fail",
                message: errorMessage == '' ? "Page Designed Successfully" : errorMessage,
                result: req.body.inserted_id
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add table details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add table details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updatePageDetails: async function(req, res) {
        try {
            let errorMessage = '';
            req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.updatePageDetails(req.body.headDetails);
            if (result instanceof Error || result.rowsAffected < 1) {

                errorMessage = 'Error While Add Page Details'

            } else {

                req.body.EvolvePage_ID = req.body.headDetails.EvolvePage_ID;
                let updatePageFields;
                for (let i = 0; i < req.body.fieldDetails.length; i++) {
                    if (req.body.fieldDetails[i].SelectQuery) {
                        req.body.fieldDetails[i].SelectQuery = req.body.fieldDetails[i].SelectQuery
                    } else { req.body.fieldDetails[i].SelectQuery = "" }
                    updatePageFields = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.updatePageFieldsDetails(req.body.fieldDetails[i], req.body.EvolvePage_ID, req.body.EvolveUser_ID);
                }
                if (updatePageFields instanceof Error || updatePageFields.rowsAffected < 1) {

                    errorMessage = 'Errror While Update Page Field Details'
                }
            }
            let obj = {
                statusCode: errorMessage == '' ? 200 : 400,
                status: errorMessage == '' ? "success" : "fail",
                message: errorMessage == '' ? "Page Designed Successfully" : errorMessage,
                result: req.body.inserted_id
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add table details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add table details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPageDetails: async function(req, res) {
        try {

            let EvolvePage_ID = 1;

            let errorMessage = '';
            // req.body.headDetails.EvolvePage_Code = Evolve.Generator.generate("EPGE");
            // req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null :  req.EvolveUser_ID ;

            // if (req.body.headDetails.EvolvePage_Code == undefined || req.body.headDetails.EvolvePage_Code.length == 0) {
            //     Evolve.Log.error(" EERR#### : Error while assign page code ")

            //     errorMessage = 'Error while assign page code'
            // } else {

            // req.body.headDetails.EvolvePage_Code = (req.body.headDetails.EvolvePage_Code.toString()).replace(/ -/g, '')
            // req.body.headDetails.EvolvePage_Code = req.body.headDetails.EvolvePage_Code.split(" ").join("");

            // req.body.headDetails.Evolvepage_Url = '/common/pageList/list'+req.body.headDetails.EvolvePage_Code;


            let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.getPageDetails(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {

                errorMessage = 'Error While Add Page Details'

            } else {

                req.body.inserted_id = result.inserted_id;
                let addPageFields = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.getPageFieldsDetails(req.body);
                if (addPageFields instanceof Error) {

                    errorMessage = 'Errror While Add Page Field Details'
                }
            }
            // }

            // let obj = {
            //     statusCode: errorMessage == '' ? 200 : 400,
            //     status: errorMessage == '' ? "success" : "fail",
            //     message: errorMessage == '' ? "Page Designed Successfully" : errorMessage,
            //     result: req.body.inserted_id
            // };
            // res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add table details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add table details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSinglePageDetail: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.EvolvePageDesigner.SrvPageDesigner.getSinglePageDetail(req.body);

            console.log("result????", result)
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get Single Page details list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Single Page details list!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: { headerValue: result.recordset[0], Childvalue: result.recordset }
                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Single Page Details list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Single Page Details list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}