'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessValList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.getProcessValListCount(search);
            let getProcessVal = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.getProcessValList(start, length,search);
            if (getProcessVal instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get process validation !",
                    result: getProcessVal.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getProcessVal.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process validation list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0368: Error while process val list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0368: Error while process val list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcesses: async function (req, res) {
        try {
            let processList = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.getProcesses();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process List",
                result: processList.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0369: Error while getting process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0369: Error while getting process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLastProcessValSeqNum: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.getLastProcessValSeqNum(req.body.EvolveProcess_ID);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get last process sequence !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Sequence",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0370: Error while getting last process val seq num "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0370: Error while getting last process val seq num "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleProcessVal: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.getSingleProcessVal(req.body.EvolveProcessVal_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single process validation !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Validation",
                    result: result.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0371: Error while getting Single Process Val "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0371: Error while getting Single Process Val "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProcessVal: async function (req, res) {
        try {
            // console.log("--dangerimage data >>> " , req.body.validationImage)
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            // Conver base64 to image
            // req.body.imageName = '';
            // if(req.body.imageBase64Data != ''){


            //     let d = new Date();
            //     let time = d.getTime();
            //     let extention = req.body.imageBase64Data.substring(
            //       "data:image/".length,
            //       req.body.imageBase64Data.indexOf(";base64")
            //     );
            //     let fileName = time + "_process_validation." + extention;
            //     req.body.imageName = fileName;
            //     let base64Data = req.body.imageBase64Data.replace(/^data:image\/png;base64,/, "");
            //     base64Data = req.body.imageBase64Data.replace(/^data:image\/jpeg;base64,/, "");
            //     Evolve.Fs.writeFile(
            //       Evolve.Config.imageUploadPath + fileName,
            //       base64Data,
            //       "base64",
            //       function(err) {
            //         if (err) {
            //           console.log(err);
            //           // res.json(0);
            //         } else {
            //           console.log("The file was saved!");
            //           // res.json(fileName);
            //         }
            //       }
            //     );
            // }






            let proPlan = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.addProcessVal(req.body);
            if (proPlan instanceof Error || proPlan.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add process validation !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process validation added successfully",
                    result: proPlan.recordsets[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0372: Error while adding process val "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0372: Error while adding process val "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateProcessVal: async function (req, res) {
        try {

            // req.body.imageName = '';
            // if(req.body.imageBase64Data != ''){


            //     let d = new Date();
            //    let time = d.getTime();
            //     let extention = req.body.imageBase64Data.substring(
            //       "data:image/".length,
            //       req.body.imageBase64Data.indexOf(";base64")
            //     );
            //     let fileName = time + "_process_validation." + extention;
            //     req.body.imageName = fileName;
            //     req.body.inage64Data = req.body.imageBase64Data;
            //     let base64Data = req.body.imageBase64Data.replace(/^data:image\/png;base64,/, "");
            //     base64Data = req.body.imageBase64Data.replace(/^data:image\/jpeg;base64,/, "");
            //     Evolve.Fs.writeFile(
            //       Evolve.Config.imageUploadPath + fileName,
            //       base64Data,
            //       "base64",
            //       function(err) {
            //         if (err) {
            //           console.log(err);
            //           // res.json(0);
            //         } else {
            //           console.log("The file was saved!");
            //           // res.json(fileName);
            //         }
            //       }
            //     );
            // } 
            let userResponse = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.updateProcessVal(req.body);
            if (userResponse instanceof Error || userResponse.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update process Validation !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process validation updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0373: Error while updating process val "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0373: Error while updating process val "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteProcessVal: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessValidation.SrvList.deleteProcessVal(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete process Validation !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process validation deleted successfuly",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0374: Error while deleting process val "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0374: Error while deleting process val "+error.message,
                result: null
            };  
            res.send(obj);
        }
    },

    pdiImageUpload: async function (req, res) {
        try {
            let d = new Date();
            let time = d.getTime();
            let extention = req.body.base64.substring(
                "data:image/".length,
                req.body.base64.indexOf(";base64")
            );
            let fileName = time + "_pdi." + extention;
            let base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
            base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
            Evolve.Fs.writeFile(
                Evolve.Config.imageUploadPath + fileName,
                base64Data,
                "base64",
                function (err) {
                    if (err) {
                        console.log(err);
                        res.json(0);
                    } else {
                        console.log("The file was saved!");
                        res.json(fileName);
                    }
                }
            );
        } catch (error) {
            Evolve.Log.error(" EERR0375: Error while  pdi image upload "+error.message);
            res.json(0);
        }
    },



}