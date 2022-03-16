'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getEDITransactionList: async function (req, res) {
        try {
            // let start = parseInt(req.body.startFrom);
            // let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;

            let getEDITransactionList = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getEDITransactionList();
    
            if (getEDITransactionList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get EDI Transaction list !",
                    result: getEDITransactionList.message
                };
                res.send(obj);
            } else {


             let   currentActionList = [
                    {
                        key: "READFILE",
                        lstKey: "",
                        icon: "mdi mdi-file-find",
                        action: "Reading File",
                        preKeyArry: [""],
                        postKeyArry: [
                            "VALIDATEDATA",
                            "CREATEXML",
                            "UPLOADTOERP",
                            "SENDMAIL"
                        ],
                    },
                    {
                        key: "VALIDATEDATA",
                        lstKey: "READFILE",
                        icon: "mdi mdi-file-check",
                        action: "Validating Data",
                        preKeyArry: ["READFILE"],
                        postKeyArry: [
                            "CREATEXML",
                            "UPLOADTOERP",
                            "SENDMAIL"
                        ],
                    },
                    {
                        key: "CREATEXML",
                        lstKey: "VALIDATEDATA",
                        icon: "mdi mdi-file-xml",
                        action: "Creating XML File",
                        preKeyArry: ["READFILE", "VALIDATEDATA"],
                        postKeyArry: [
                            "UPLOADTOERP",
                            "SENDMAIL"
                        ],
                    },
                    {
                        key: "UPLOADTOERP",
                        lstKey: "CREATEXML",
                        icon: "mdi mdi-cloud-upload",
                        action: "Upload File To ERP",
                        preKeyArry: ["READFILE", "VALIDATEDATA", "CREATEXML"],
                        postKeyArry: [
                            "SENDMAIL"
                        ],
                    },
                    {
                        key: "SENDMAIL",
                        lstKey: "UPLOADTOERP",
                        icon: "mdi mdi-email-check",
                        action: "Send Mail",
                        preKeyArry: ["READFILE", "VALIDATEDATA", "CREATEXML", "UPLOADTOERP"],
                        postKeyArry: [],
                    },
                ];



                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EDI Transaction List",
                    result: getEDITransactionList.recordset,
                    actionList : currentActionList
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting EDI Transaction list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting EDI Transaction list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getGlobleVariableEdi: async function (req, res) {
        try {
            let response = {};
            // let ioPublicFolders = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableIo('PUBLICDIR');
            // if (ioPublicFolders instanceof Error || ioPublicFolders.rowsAffected < 1) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "Key PUBLICDIR does not exist in IO Configration",
            //         result: null
            //     };
            //     res.send(obj);
            // }
            // else {
            //     response['PUBLICDIR'] = ioPublicFolders.recordset[0].EvolveIOConfig_Value;
            //     let eInvBaseUrl = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableConfig('IOSERVERURL');
            //     if (eInvBaseUrl instanceof Error || eInvBaseUrl.rowsAffected < 1) {
            //         let obj = {
            //             statusCode: 400,
            //             status: "fail",
            //             message: "Key IOSERVERURL does not exist in Configration",
            //             result: null
            //         };
            //         res.send(obj);
            //     } else {
            //         response['IOSERVERURL'] = eInvBaseUrl.recordset[0].EvolveConfig_Value;
            //         let eInvInDir = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableConfig('EDIINPATH');
            //         if (eInvInDir instanceof Error || eInvInDir.rowsAffected < 1) {
            //             let obj = {
            //                 statusCode: 400,
            //                 status: "fail",
            //                 message: "Key EDIINPATH does not exist in Configration",
            //                 result: null
            //             };
            //             res.send(obj);
            //         } else {
            //             response['EDIINPATH'] = eInvInDir.recordset[0].EvolveConfig_Value;
            //             let eInvProcessDir = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableConfig('EDIOUTPATH');
            //             if (eInvProcessDir instanceof Error || eInvProcessDir.rowsAffected < 1) {
            //                 let obj = {
            //                     statusCode: 400,
            //                     status: "fail",
            //                     message: "Key EDIOUTPATH does not exist in Configration",
            //                     result: null
            //                 };
            //                 res.send(obj);
            //             } else {
            //                 response['EDIOUTPATH'] = eInvProcessDir.recordset[0].EvolveConfig_Value;
            //                 let eInvOriginalDir = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableConfig('EDIORIGINALPATH');
            //                 if (eInvOriginalDir instanceof Error || eInvOriginalDir.rowsAffected < 1) {
            //                     let obj = {
            //                         statusCode: 400,
            //                         status: "fail",
            //                         message: "Key EDIORIGINALPATH does not exist in Configration",
            //                         result: null
            //                     };
            //                     res.send(obj);
            //                 } else {
            //                     response['EDIORIGINALPATH'] = eInvOriginalDir.recordset[0].EvolveConfig_Value;
            //                     let eInvArchiveDir = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getGlobleVariableConfig('EDIARCHIVEPATH');
            //                     if (eInvArchiveDir instanceof Error || eInvArchiveDir.rowsAffected < 1) {
            //                         let obj = {
            //                             statusCode: 400,
            //                             status: "fail",
            //                             message: "Key EDIARCHIVEPATH does not exist in Configration",
            //                             result: null
            //                         };
            //                         res.send(obj);
            //                     } else {
            //                         response['EDIARCHIVEPATH'] = eInvArchiveDir.recordset[0].EvolveConfig_Value;
            //                         let obj = {
            //                             statusCode: 200,
            //                             status: "Success",
            //                             message: "Success",
            //                             result: response
            //                         };
            //                         res.send(obj);
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // For PowerBI Start
            response['EDIARCHIVEPATH'] = './EDI/ARCHIVE/';
            response['EDIORIGINALPATH'] = './EDI/ORIGINAL/';
            response['EDIINPATH'] = './EDI/IN/';
            response['IOSERVERURL'] = 'http://192.168.104.5:5160/';
            response['PUBLICDIR'] = 'public,IO,EINV';
            let obj = {
                statusCode: 200,
                status: "Success",
                message: "Success",
                result: response
            };
            res.send(obj);
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While getting E Invoice globle variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateEdi: async function (req, res) {
        try {
            // let start = parseInt(req.body.startFrom);
            // let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let updateEdi = await Evolve.App.Services.eEdi.EDITransaction.SrvList.updateEdi(req.body);
    
            if (updateEdi instanceof Error || updateEdi.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Re_Process EDI Data !",
                    result: updateEdi.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EDI Re-Process Successfully",
                    result: updateEdi.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Re_Process EDI Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Re_Process EDI Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onUploadFile: async function (req, res) {
        try {

            if (req.files.fileData) {
                let fileData = req.files.fileData;
                fileData.mv(req.body.pathToUpload, async function (error) {
                    if (error) {
                        Evolve.Log.error(" EERR#### : Error while upload file  " + error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // Evolve.Log.error(" EERR32465 :  "+error.message);
                        let obj = { statusCode: 200, status: "Success", message: 'File upoaded successfully', result: null };
                        res.send(obj);
                    }
                });


            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while upload file  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while upload file  " + error.message, result: null };
            res.send(obj);
        }
    },

    onClearEdi : async function (req , res) {
        try {
            let addRecordInEdiHistory = await Evolve.App.Services.eEdi.EDITransaction.SrvList.addRecordInEdiHistory(req.body.data);
            if(addRecordInEdiHistory instanceof Error || addRecordInEdiHistory.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while clear EDI Message  " + error.message, result: null };
                res.send(obj);
            }else{
                let deleteRecordInPrintProcess = await Evolve.App.Services.eEdi.EDITransaction.SrvList.deleteRecordInPrintProcess(req.body.data.EvolveEDI_ID);
                let obj = { statusCode: 200, status: "Success", message: " EERR####: EDI Message Clear Successfully ", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while upload file  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while upload file  " + error.message, result: null };
            res.send(obj);
        }
    },

    getEDIDetailsTable : async function (req , res){
        try {
            let getEDIDetailsTable = await Evolve.App.Services.eEdi.EDITransaction.SrvList.getEDIDetailsTable(req.body.EvolveEDI_ID);
            if(getEDIDetailsTable instanceof Error || getEDIDetailsTable.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get EDI Details  " + error.message, result: null };
                res.send(obj);
            }else{
                let obj = { statusCode: 200, status: "Success", message: " EDI Details get Successfully ", result: getEDIDetailsTable.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while upload file  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get EDI Details  " + error.message, result: null };
            res.send(obj);
        }
    }
}