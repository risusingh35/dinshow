'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getQuestionList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.getQuestionCount(search);

            let list = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.getQuestionList(start, length, search);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Question List !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: list.recordset
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
            Evolve.Log.error("EERR32820 : Error while get Question List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32820 : Error while get Question List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addQuestion: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let checkMode = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.checkQuestion(req.body)
            if(checkMode instanceof Error){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check Question",
                    result: '',
                };
                res.send(obj);

            }else if(checkMode.rowsAffected >0){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Question Already Exist",
                    result: '',
                };
                res.send(obj);

            }else{
                let addres = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.addQuestion(req.body)
                if (addres instanceof Error || addres.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Add Question ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Question Added Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
             }
        } catch (error) {
            Evolve.Log.error("EERR32821 : Error While Add Question " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32821 : Error While Add Question " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingalQuestionDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let details = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.getSingalQuestionDetails(req.body)
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Question details ",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: details.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR32822 : Error While get Question details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32822 : Error While get Question details',
                result: null
            };
            res.send(obj);
        }
    },
    updatQuestionDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let checkMode = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.checkQuestionOnUpdate(req.body)
            if(checkMode instanceof Error){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check Question",
                    result: '',
                };
                res.send(obj);

            }else if(checkMode.rowsAffected >0){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Question Already Exist",
                    result: '',
                };
                res.send(obj);

            }else{
                let details = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.updatQuestionDetails(req.body)
                if (details instanceof Error || details.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While update Question details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Question Updated Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error("EERR32823 : Error While update Question details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32823 : Error While update Question details',
                result: null
            };
            res.send(obj);
        }
    },

    deleteQuestion: async function (req, res) {
        try {
            let deleteMode = await Evolve.App.Services.Suraksha.MedQuestion.SrvList.deleteQuestion(req.body)
           
            if (deleteMode instanceof Error || deleteMode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Delete Question",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Question Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR32824 : Error While delete Question details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32824 : Error While delete Question details',
                result: null
            };
            res.send(obj);
        }
    },    
 
}