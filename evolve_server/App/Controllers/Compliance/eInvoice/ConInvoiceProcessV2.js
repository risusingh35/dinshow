'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getGlobleVariableEInv: async function (req, res) {
        try {
            let response = {};
            let ioPublicFolders = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableIo('PUBLICDIR');
            if (ioPublicFolders instanceof Error || ioPublicFolders.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Key PUBLICDIR does not exist in IO Configration",
                    result: null
                };
                res.send(obj);
            }
            else {
                response['PUBLICDIR'] = ioPublicFolders.recordset[0].EvolveIOConfig_Value;
                let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableEInv('EINVBASEURL');
                if (eInvBaseUrl instanceof Error || eInvBaseUrl.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key EINVBASEURL does not exist in E Invoice Configration",
                        result: null
                    };
                    res.send(obj);
                } else {
                    response['EINVBASEURL'] = eInvBaseUrl.recordset[0].EvolveEinvoiceConfig_Value;
                    let eInvInDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableEInv('EINVINPATH');
                    if (eInvInDir instanceof Error || eInvInDir.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Key EINVINPATH does not exist in E Invoice Configration",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        response['EINVINPATH'] = eInvInDir.recordset[0].EvolveEinvoiceConfig_Value;
                        let eInvProcessDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableEInv('EINVPROCESSPATH');
                        if (eInvProcessDir instanceof Error || eInvProcessDir.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Key EINVPROCESSPATH does not exist in E Invoice Configration",
                                result: null
                            };
                            res.send(obj);
                        } else {
                            response['EINVPROCESSPATH'] = eInvProcessDir.recordset[0].EvolveEinvoiceConfig_Value;
                            let eInvOriginalDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableEInv('EINVORIGINALPATH');
                            if (eInvOriginalDir instanceof Error || eInvOriginalDir.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Key EINVORIGINALPATH does not exist in E Invoice Configration",
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                response['EINVORIGINALPATH'] = eInvOriginalDir.recordset[0].EvolveEinvoiceConfig_Value;
                                let eInvArchiveDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getGlobleVariableEInv('EINVARCHIVEPATH');
                                if (eInvArchiveDir instanceof Error || eInvArchiveDir.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Key EINVARCHIVEPATH does not exist in E Invoice Configration",
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    response['EINVARCHIVEPATH'] = eInvArchiveDir.recordset[0].EvolveEinvoiceConfig_Value;
                                    let obj = {
                                        statusCode: 200,
                                        status: "Success",
                                        message: "Success",
                                        result: response
                                    };
                                    res.send(obj);
                                }
                            }
                        }
                    }
                }
            }
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

    getEInvoiceList: async function (req, res) {
        try {
            let EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceProcessV2.getEInvoiceList(EvolveUser_ID);
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
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while getting Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
    
    
    



}