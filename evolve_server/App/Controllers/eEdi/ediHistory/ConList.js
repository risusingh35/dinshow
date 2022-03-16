'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getEdiList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eEdi.ediHistory.SrvList.getEdiListCount(search);
            let getEdiList = await Evolve.App.Services.eEdi.ediHistory.SrvList.getEdiList(start, length, search);
    
            if (getEdiList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get EDI list !",
                    result: getEdiList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord : Count.recordset[0].count,
                    records : getEdiList.recordset
                };
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EDI List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting EDI list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting EDI list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getGlobleVariableEdi: async function (req, res) {
        try {
            let response = {};
            // let ioPublicFolders = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableIo('PUBLICDIR');
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
            //     let eInvBaseUrl = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableConfig('IOSERVERURL');
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
            //         let eInvInDir = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableConfig('EDIINPATH');
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
            //             let eInvProcessDir = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableConfig('EDIOUTPATH');
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
            //                 let eInvOriginalDir = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableConfig('EDIORIGINALPATH');
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
            //                     let eInvArchiveDir = await Evolve.App.Services.eEdi.ediHistory.SrvList.getGlobleVariableConfig('EDIARCHIVEPATH');
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
            // };
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
}