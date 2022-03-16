'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getInvoiceList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let searchStartDate = req.body.searchStartDate;
            let searchEndDate = req.body.searchEndDate;
            let Count = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceListCount(search, req.body);
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceList(start, length, search, req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice list!",
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
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while getting E-Invoice List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while getting E-Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getGlobleVariableEInv: async function (req, res) {
        try {
            let response = {};
            let ioPublicFolders = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableIo('PUBLICDIR');
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
                let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVBASEURL');
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
                    let eInvInDir = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVINPATH');
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
                        let eInvProcessDir = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVPROCESSPATH');
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
                            let eInvOriginalDir = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVORIGINALPATH');
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
                                let eInvArchiveDir = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVARCHIVEPATH');
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
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getEInvoiceList(EvolveUser_ID);
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
    updateEInvoice: async function (req, res) {

        try {
            if (req.body.EvolveEinvoice_CurrentAction == 'DBINITIAl') {
                // let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVIOFOLDERNAME');
                let Originalpath = '../' + Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME + '/EINV/ORIGINAL/' + req.body.EvolveEinvoice_PDFfileNameOriginal;
                let Inpath = '../' + Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME + '/EINV/IN/' + req.body.EvolveEinvoice_PDFfileNameOriginal;
                console.log("Orgiginal file Path ===============================", Originalpath)
                console.log("Inpath file Path ===============================", Inpath)
                if (Evolve.Fs.existsSync(Originalpath)) {
                    console.log("==================File Exit Found=========")
                    Evolve.Fs.rename(Originalpath, Inpath, async function (err) {
                        if (err) {
                            throw err
                        } else {
                            let checkIsInvoiceWithJson = await Evolve.App.Services.Compliance.eInvoice.SrvIoQueue.getGlobleVariableEInv('ISINVOICEWITHJSON');
                            if (checkIsInvoiceWithJson.recordset[0].EvolveEinvoiceConfig_Value == 1) {
                                let originalPathExtension = Originalpath.split('.').pop();
                                let inPathExtension = Inpath.split('.').pop();
                                if (originalPathExtension.toLowerCase() == 'pdf' && inPathExtension.toLowerCase() == 'pdf') {
                                    Originalpath = Originalpath.replace(".pdf", ".json")
                                    Inpath = Inpath.replace(".pdf", ".json")
                                }
                                else {
                                    Originalpath = Originalpath.replace(".json", ".pdf")
                                    Inpath = Inpath.replace(".json", ".pdf")
                                }
                                Evolve.Fs.rename(Originalpath, Inpath, async function (err) {
                                    Evolve.Log.info('Successfully renamed - ERROR moved!')
                                    let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.updateEInvoiceError(req.body);
                                    if (result instanceof Error) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "Error while Invoice Re-Process!",
                                            result: null
                                        };
                                        res.send(obj);
                                    } else {
                                        let obj = {
                                            statusCode: 200,
                                            status: "Success",
                                            message: "Invoice Re-Process Success",
                                            result: null
                                        };
                                        res.send(obj);
                                    }
                                });
                            } else {
                                Evolve.Log.info('Successfully renamed - ERROR moved!')
                                let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.updateEInvoiceError(req.body);
                                if (result instanceof Error) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Error while Invoice Re-Process!",
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    let obj = {
                                        statusCode: 200,
                                        status: "Success",
                                        message: "Invoice Re-Process Success",
                                        result: null
                                    };
                                    res.send(obj);
                                }
                            }
                        }
                    });
                } else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Original file not exist",
                        result: null
                    };
                    res.send(obj);
                }
            } else {
                let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.updateEInvoice(req.body);
                if (result instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while Invoice Re-Process!",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Invoice Re-Process Success",
                        result: null
                    };
                    res.send(obj);
                }
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

    // invoice History
    reSendEmail: async function (req, res) {
        try {
            let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvList.getSingleInvoiceData(req.body);
            if (InvoiceData.rowsAffected > 0) {
                let Invoice = InvoiceData.recordset[0];
                console.log("EvolveInvoice_ID:", Invoice.EvolveInvoice_PDFfileName)
                console.log("EvolveDocument_ID:", Invoice.EvolveDocument_ID)

                let fileArray = Invoice.EvolveInvoice_PDFfileName.split('|');
                let fileName = fileArray[0];
                let orignalFile = fileArray[fileArray.length - 1];
                console.log("File Name :", fileName)

                if (Invoice.EvolveDocument_IsEmail_Process == true) {

                    let EvolveUnitToCustomerLink_FromEmail_ID = Evolve.EvolveEinvoiceConfig.EINVDEFAULTFROMEMAIL;
                    let EvolveUnitToCustomerLink_ToEmail_ID = Evolve.EvolveEinvoiceConfig.EINVDEFAULTTOEMAIL;
                    let EvolveUnitToCustomerLink_CCEmail_IDS = "";
                    let EvolveUnitToCustomerLink_EmailSubject = Evolve.EvolveEinvoiceConfig.EINVDEFAULTSUBJECTEMAIL;
                    let EvolveUnitToCustomerLink_EmailBody = Evolve.EvolveEinvoiceConfig.EINVDEFAULTBODYEMAIL;
                    let sendmail = true;
                    let eDoc = '';
                    let InvoiceCustUnitEmailData = await Evolve.App.Services.Compliance.eInvoice.SrvList.getUnitCustomerLink(Invoice);
                    if (InvoiceCustUnitEmailData.rowsAffected > 0) {
                        console.log("Unit To Customer Data Found====")
                        eDoc = InvoiceCustUnitEmailData.recordset[0];
                        EvolveUnitToCustomerLink_FromEmail_ID = eDoc.EvolveUnitToCustomerLink_FromEmail_ID;
                        EvolveUnitToCustomerLink_ToEmail_ID = eDoc.EvolveUnitToCustomerLink_ToEmail_ID;
                        EvolveUnitToCustomerLink_CCEmail_IDS = eDoc.EvolveUnitToCustomerLink_CCEmail_IDS;
                        EvolveUnitToCustomerLink_EmailSubject = eDoc.EvolveUnitToCustomerLink_EmailSubject;
                        EvolveUnitToCustomerLink_EmailBody = eDoc.EvolveUnitToCustomerLink_EmailBody;
                    } else {
                        console.log("Unit To Customer Data Not Found====")
                        console.log("DEFAULTMAILSEND====", Evolve.EvolveEinvoiceConfig.DEFAULTMAILSEND)
                        if (Evolve.EvolveEinvoiceConfig.DEFAULTMAILSEND == '0') {
                            sendmail = false;
                            console.log("not send mail=====")
                        }
                    }
                    if (sendmail == true) {
                        let path = '../' + Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME + '/EINV/ARCHIVE/' + fileName;
                        // let pathn = '../evolve_io_server/EINV/ARCHIVE/'+fileName;
                        path = path.trim();
                        // pathn = pathn.trim();
                        console.log("File Path =", path)
                        if (Evolve.Fs.existsSync(path)) {
                            let fileData = Evolve.Fs.readFileSync(path);
                            let transporter = '';
                            if (Evolve.EvolveEinvoiceConfig.EMAILSECURE == 0) {
                                transporter = Evolve.Mailer.createTransport({
                                    host: Evolve.EvolveEinvoiceConfig.EMAILHOST,
                                    port: Evolve.EvolveEinvoiceConfig.EMAILPORT,
                                    secure: false, // true for 465, false for other ports
                                    tls: { rejectUnauthorized: false } //TO prevent crashes due to tls authorization
                                });
                            } else {
                                transporter = Evolve.Mailer.createTransport({
                                    host: Evolve.EvolveEinvoiceConfig.EMAILHOST,
                                    port: Evolve.EvolveEinvoiceConfig.EMAILPORT,
                                    secure: true, // true for 465, false for other ports
                                    tls: { rejectUnauthorized: true }, //TO prevent crashes due to tls authorization
                                    auth: {  /* Commit it when use port other then 465 */
                                        user: Evolve.EvolveEinvoiceConfig.EMAILUSERNAME, // generated ethereal user
                                        pass: Evolve.EvolveEinvoiceConfig.EMAILPASSWORD, // generated ethereal password
                                    },
                                });
                            }


                            // console.log('LinkData :', eDoc);
                            console.log('From Email ID :', EvolveUnitToCustomerLink_FromEmail_ID);
                            console.log('To Email ID :', EvolveUnitToCustomerLink_ToEmail_ID);
                            console.log('CC Email ID :', EvolveUnitToCustomerLink_CCEmail_IDS);
                            console.log('Email Subject :', EvolveUnitToCustomerLink_EmailSubject);
                            console.log('Email Body:', EvolveUnitToCustomerLink_EmailBody);

                            b

                        } else {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "File Not Found",
                                result: null
                            };
                            res.send(obj);
                        }
                    } else {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Default Mail Send Process false",
                            result: null
                        };
                        res.send(obj);
                    }
                } else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Email Send Process Not True",
                        result: null
                    };
                    res.send(obj);
                }
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Invoice Data Not Found",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while Send Email " + error.message,
                result: null
            };
            res.send(obj);
        }

    },

    reProcessSendErp: async function (req, res) {  // QExtend
        try {
            let error = false;
            let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvList.getSingleInvoiceData(req.body);
            if (InvoiceData.rowsAffected > 0) {
                let Invoice = InvoiceData.recordset[0];
                console.log("EvolveEinvoice_ID:", Invoice.EvolveDocument_ID)
                console.log("EvolveEinvoice_ID:", Invoice.EvolveInvoice_ID)
                let xmlObj = {
                    'soapenv:Envelope': {
                        '@xmlns': 'urn:schemas-qad-com:xml-services', // Add @for Add Attribute
                        '@xmlns:qcom': 'urn:schemas-qad-com:xml-services:common',
                        '@xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
                        '@xmlns:wsa': 'http://www.w3.org/2005/08/addressing',
                        'soapenv:Header': {
                            'wsa:Action': '',
                            'wsa:To': 'urn:services-qad-com:QADERP',
                            'wsa:MessageID': 'urn:services-qad-com::QADERP',
                            'wsa:ReferenceParameters': {
                                'qcom:suppressResponseDetail': true
                            },
                            'wsa:ReplyTo': {
                                'wsa:Address': 'urn:services-qad-com:'
                            }
                        },
                        'soapenv:Body': {
                            'MaintainUPDIRN': {
                                'qcom:dsSessionContext': {
                                    'qcom:ttContext': [{
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'domain',
                                        'qcom:propertyValue': '',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'scopeTransaction',
                                        'qcom:propertyValue': 'false',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'version',
                                        'qcom:propertyValue': 'ERP3_1',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'mnemonicsRaw',
                                        'qcom:propertyValue': 'false',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'action',
                                        'qcom:propertyValue': '',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'entity',
                                        'qcom:propertyValue': '',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'email',
                                        'qcom:propertyValue': '',
                                    },
                                    {
                                        'qcom:propertyQualifier': 'QAD',
                                        'qcom:propertyName': 'emailLevel',
                                        'qcom:propertyValue': '',
                                    }],
                                },
                                'dsMaintainUPDIRNNO': {
                                    'MaintainUPDIRNNO': {
                                        'operation': 'M',
                                        'vcinvoice': Invoice.EvolveInvoice_Number,//Invoice Number,
                                        'vcirn': Invoice.EvolveInvoice_IrnNo, // IRN
                                        'vcack': Invoice.EvolveInvoice_GstNo // ACK 
                                    }
                                }
                            }
                        },
                    },
                };

                let xmldoc = Evolve.Xmlbuilder.create(xmlObj, { version: '1.0', encoding: 'UTF-8' })
                let xmlFileData = xmldoc.end({ pretty: true });
                let config = {
                    headers: {
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': "",
                        'Host': '10.0.0.4:22079',
                        'Connection': 'Keep - Alive',
                        'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)',
                        'Content-Length': xmldoc.length
                    }
                }

                let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVQXTENDURL');
                if (eInvBaseUrl instanceof Error || eInvBaseUrl.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key EINVBASEURL does not exist in E Invoice Configration",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let eInvoiceQxtendUrl = eInvBaseUrl.recordset[0].EvolveEinvoiceConfig_Value;
                    let responce = await Evolve.Axios.post(eInvoiceQxtendUrl, xmlFileData, config);
                    Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileData) {
                        if (err) {
                            console.log("issue in xml formate")
                            error = true;
                        }
                    });
                }
            } else {
                error = true;
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while IRN NO Send To ERP!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "IRN NO Send To ERP Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while IRN NO Send To ERP" + error.message,
                result: null
            };
            res.send(obj);
        }

    },

    reProcessUploadErp: async function (req, res) {
        let isSftpConnection = false;
        let error = false;
        let InvoiceId = '';
        try {
            let sftp = new Evolve.sFtpClient();
            console.log("Client Configer...");
            let SftpHost = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPHOST');
            if (SftpHost instanceof Error || SftpHost.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Key SFTPHOST does not exist in E Invoice Configration",
                    result: null
                };
                res.send(obj);
            } else {
                let SftpUser = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPUSER');
                if (SftpUser instanceof Error || SftpUser.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key SftpUser does not exist in E Invoice Configration",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let SftpPasword = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPPASSWORD');
                    if (SftpPasword instanceof Error || SftpPasword.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Key SFTPPASSWORD does not exist in E Invoice Configration",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let SftpPort = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPPORT');
                        if (SftpPort instanceof Error || SftpPort.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Key SFTPPORT does not exist in E Invoice Configration",
                                result: null
                            };
                            res.send(obj);
                        } else {
                            let SftpInPath = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPINPATH');
                            if (SftpInPath instanceof Error || SftpInPath.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Key SFTPINPATH does not exist in E Invoice Configration",
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let EinvoiceFileExtention = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVFILEEXTENSION');
                                if (EinvoiceFileExtention instanceof Error || EinvoiceFileExtention.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Key EINVFILEEXTENSION does not exist in E Invoice Configration",
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    let EinvoiceInPath = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVINPATH');
                                    if (EinvoiceInPath instanceof Error || EinvoiceInPath.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "Key EINVINPATH does not exist in E Invoice Configration",
                                            result: null
                                        };
                                        res.send(obj);
                                    } else {
                                        let EInvProcessPath = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVPROCESSPATH');
                                        if (EInvProcessPath instanceof Error || EInvProcessPath.rowsAffected < 1) {
                                            let obj = {
                                                statusCode: 400,
                                                status: "fail",
                                                message: "Key EINVPROCESSPATH does not exist in E Invoice Configration",
                                                result: null
                                            };
                                            res.send(obj);
                                        } else {
                                            let SftpOutPath = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('SFTPOUTPATH');
                                            if (SftpOutPath instanceof Error || SftpOutPath.rowsAffected < 1) {
                                                let obj = {
                                                    statusCode: 400,
                                                    status: "fail",
                                                    message: "Key SFTPOUTPATH does not exist in E Invoice Configration",
                                                    result: null
                                                };
                                                res.send(obj);
                                            } else {
                                                let EInvArchivePath = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVARCHIVEPATH');
                                                if (EInvArchivePath instanceof Error || EInvArchivePath.rowsAffected < 1) {
                                                    let obj = {
                                                        statusCode: 400,
                                                        status: "fail",
                                                        message: "Key EINVARCHIVEPATH does not exist in E Invoice Configration",
                                                        result: null
                                                    };
                                                    res.send(obj);
                                                } else {
                                                    let configObj = {
                                                        host: SftpHost.recordset[0].EvolveEinvoiceConfig_Value, // 52.183.136.166 // 10.0.0.4
                                                        user: SftpUser.recordset[0].EvolveEinvoiceConfig_Value,
                                                        password: SftpPasword.recordset[0].EvolveEinvoiceConfig_Value,
                                                        port: SftpPort.recordset[0].EvolveEinvoiceConfig_Value,
                                                    };
                                                    sftp.connect(configObj).then(async () => {
                                                        console.log("STEP 1) Read FTP & Send List...")
                                                        return await sftp.list(SftpInPath.recordset[0].EvolveEinvoiceConfig_Value);
                                                    }).then(async list => {
                                                        // Read Live File
                                                        console.log("STEP 2) Read List Of file one By One...")
                                                        for (let file of list) {
                                                            // for (let i = 0; i < list.length; i++) {
                                                            if (file.type != "d") {
                                                                // if Not File
                                                                console.log("list File Name >>", file.name);
                                                                let extention = file.name.split(".").pop().toLowerCase();
                                                                if (extention == EinvoiceFileExtention.recordset[0].EvolveEinvoiceConfig_Value) {
                                                                    await sftp.get(SftpInPath.recordset[0].EvolveEinvoiceConfig_Value + "/" + file.name, EinvoiceInPath.recordset[0].EvolveEinvoiceConfig_Value + "/" + file.name);
                                                                    console.log("Download >>", file.name);
                                                                    await sftp.delete(SftpInPath.recordset[0].EvolveEinvoiceConfig_Value + "/" + file.name);
                                                                    console.log("Delete >>", file.name);
                                                                }
                                                            } //
                                                        }
                                                        console.log("Now Work Finished");
                                                        return list;
                                                    }).then(async data => {
                                                        console.log("STEP 3) Upload File From Local To Remont");
                                                        isSftpConnection = true;

                                                        let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvList.getSingleInvoiceData(req.body);
                                                        if (InvoiceData.rowsAffected > 0) {
                                                            let Invoice = InvoiceData.recordset[0];

                                                            InvoiceId = Invoice.EvolveInvoice_ID; // Use when Error Occure thata time json objject save as invoiceid file name
                                                            console.log("EvolveEinvoice_ID:", Invoice.EvolveDocument_ID)
                                                            console.log("EvolveEinvoice_ID:", Invoice.EvolveInvoice_ID)

                                                            if (Evolve.Fs.existsSync(EInvProcessPath.recordset[0].EvolveEinvoiceConfig_Value + Invoice.EvolveInvoice_PDFfileName)) {
                                                                let localFile = Evolve.Fs.createReadStream(EInvProcessPath.recordset[0].EvolveEinvoiceConfig_Value + Invoice.EvolveInvoice_PDFfileName);
                                                                // console.log("localFile:", localFile)
                                                                await sftp.put(localFile, SftpOutPath.recordset[0].EvolveEinvoiceConfig_Value + Invoice.EvolveInvoice_PDFfileName); // If Any Error Occuer it go to catch block.
                                                                await Evolve.Fs.promises.rename(EInvProcessPath.recordset[0].EvolveEinvoiceConfig_Value + Invoice.EvolveInvoice_PDFfileName, EInvArchivePath.recordset[0].EvolveEinvoiceConfig_Value + Invoice.EvolveEinvoice_PDFfileName);
                                                            } else {
                                                                error = true
                                                            }
                                                        }
                                                        return data;
                                                    }).catch(err => async function (err) {
                                                        error = true
                                                    }).finally(async () => {
                                                        console.log("STEP 6) Connection  Closed", isSftpConnection);
                                                        // console.log("Connection  Closed>>>>>>>>>>>>>.", sftp.sftp);
                                                        if (isSftpConnection == false) {
                                                            error = true
                                                        }
                                                        if (sftp.sftp) {
                                                            await sftp.end();
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Document Update To ERP!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Document Update To ERP Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while Document Update To ERP" + error.message,
                result: null
            };
            res.send(obj);
        }

    },

    getUnitList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getUnitList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Unit List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Get Unit List Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while getting Unit List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSupplierList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getSupplierList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Supplier List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Get Supplier List Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while getting Supplier List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    onClearInvoice: async function (req, res) {
        try {
            let clearInvoice = await Evolve.App.Services.Compliance.eInvoice.SrvList.onClearInvoice(req.body);
            if (clearInvoice instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while clear invoice !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Invoice cleared successfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32744: Error while clear invoice" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getInvoiceHistoryList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceHistoryList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice History list!",
                    result: null
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
            Evolve.Log.error(" EERR32746: Error while getting E-Invoice History List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32746: Error while getting E-Invoice History List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getItemHistoryList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getItemHistoryList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Item History list!",
                    result: null
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
            Evolve.Log.error(" EERR32747: Error while getting Item History List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32747: Error while getting Item History List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateEwayBillDetail: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.updateEwayBillDetail(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Invoice Update Eway Bill Detail!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Invoice Eway Bill Detail Updated !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR32750 : Error while getting E Way Bill Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32750: Error while getting E Way Bill Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getEwayBillDetailByID: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getEwayBillDetailByID(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Invoice Update Eway Bill Detail!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Invoice Eway Bill Details!",
                    result: result.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### : Error while Change Vehicle " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getEwayBillDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getEwayBillDetails(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get E Way Bill Details!",
                    result: null
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
            Evolve.Log.error("EERR32750 : Error while getting E Way Bill Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32750: Error while getting E Way Bill Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


    changeVehicle: async function (req, res) {
        try {
            // console.log("Controller ========changeVehicle ============")
            // console.log("req.body>>>>>>>>>>>>>", req.body);
            let getStateCode = await Evolve.App.Services.Compliance.eInvoice.SrvList.getStateCode(req.body.EvolveInvoiceSellerDtls_State);
            let EvolveInvoiceSellerDtls_StateCode = getStateCode.recordset[0].EvolveState_Code;
            req.body.EvolveInvoiceSellerDtls_StateCode = EvolveInvoiceSellerDtls_StateCode;

            let changeVehicleInvoice = await Evolve.App.Services.Compliance.eInvoice.SrvList.changeVehicleInvoice(req.body);
            if (changeVehicleInvoice instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Change Vehicle Invoice!",
                    result: null
                };
                res.send(obj);
            } else {
                let EvolveInvoice_Number = changeVehicleInvoice.recordset[0].EvolveInvoice_Number;
                let changeVehicleEInvoiceHistory = await Evolve.App.Services.Compliance.eInvoice.SrvList.changeVehicleEInvoiceHistory(EvolveInvoice_Number, req.body);
                if (changeVehicleEInvoiceHistory instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while Change Vehicle EInvoice History!",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/changeVehicle';
                    // console.log("apiUrl==============", apiUrl)
                    let responce = await Evolve.Axios.post(apiUrl, req.body);
                    // console.log("responce>>>>>>>>>>>>>>>.", responce.data);
                    if (responce.data.statusCode == 400) {
                        let obj = { statusCode: responce.data.statusCode, status: responce.data.status, message: responce.data.message, result: null };
                        res.send(obj);
                    }
                    if (responce.data.statusCode == 200) {
                        let obj = { statusCode: responce.data.statusCode, status: responce.data.status, message: responce.data.message, result: responce.data.result };
                        res.send(obj);
                    }
                }
            }

        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32753 : Error while Change Vehicle " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDistance: async function (req, res) {
        try {
            let responce = await Evolve.App.Services.Compliance.eInvoice.SrvList.getSingleInvoiceDetail(req.body.EvolveInvoice_ID);
            if (responce instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Invoice Details!",
                    result: null
                };
                res.send(obj);
            } else {
                let fromPincode = req.body.fromPincode;
                let toPincode = responce.recordset[0].EvolveInvoiceBuyerDtls_Pin;

                let fromPin = parseFloat(fromPincode.replace(/[^0-9\.]/g, ''), 10);
                let toPin = parseFloat(toPincode.replace(/[^0-9\.]/g, ''), 10);

                let distanceAPI = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + fromPin + '&destinations=' + toPin + '&key=' + Evolve.EvolveEinvoiceConfig.GOOGLEAPIKEY;
                // console.log("distanceAPI ::", distanceAPI);
                let distance = await Evolve.Axios.get(distanceAPI);
                let finalDistance = (distance.data.rows[0].elements[0].distance.value / 1000).toFixed(1)
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Getting Final Distance Successfully",
                    result: finalDistance
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR32754 : Error while Getting Distance " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32754 : Error while Getting Distance " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getStateList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getStateList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get State list!",
                    result: null
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
            Evolve.Log.error(" EERR32756 : Error while getting State List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32756 : Error while getting State List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    extendEwayBill: async function (req, res) {
        try {
            // console.log("Controller ========extendEwayBill ============")
            

            let getStateCode = await Evolve.App.Services.Compliance.eInvoice.SrvList.getStateCode(req.body.EvolveInvoiceSellerDtls_State);
            let EvolveInvoiceSellerDtls_StateCode = getStateCode.recordset[0].EvolveState_Code;
            req.body.EvolveInvoiceSellerDtls_StateCode = EvolveInvoiceSellerDtls_StateCode;
            
            // console.log("req.body>>>>>>>>>>>>>", req.body);
            let extendEwaybillData = {
                "ewbNo": req.body.EvolveInvoice_EwayBillNumber,
                "vehicleNo": req.body.EvolveInvoiceEwbDtls_VehNo,
                "fromPlace": req.body.EvolveInvoiceSellerDtls_Loc,
                "fromState": req.body.EvolveInvoiceSellerDtls_StateCode,
                "remainingDistance":req.body.EvolveInvoiceEwbDtls_Distance,
                "transDocNo": req.body.EvolveInvoiceEwbDtls_TransDocNo,
                "transDocDate":req.body.EvolveInvoiceEwbDtls_TransDocDt,
                "extnRsnCode":"1",
                "extnRemarks": req.body.EvolveInvoiceEwbDtls_ExtendRemarks,
                "fromPincode": req.body.EvolveInvoiceSellerDtls_Pin
            }

            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/extendEwayBill';
            // console.log("apiUrl==============", apiUrl)
            let responce = await Evolve.Axios.post(apiUrl, extendEwaybillData);

            if (responce.statusCode == 200) {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "E-Way Bill Extend Successfully!",
                    result: responce
                };
                res.send(obj);
            }
            else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Extend E-Way Bill invoice!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32752 : Error while Getting Extend E-Way Bill " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateEwayBill: async function (req, res) {
        try {
            // console.log("Controller ========extendEwayBill ============")
            // console.log("req.body>>>>>>>>>>>>>", req.body);

            let getStateCode = await Evolve.App.Services.Compliance.eInvoice.SrvList.getStateCode(req.body.EvolveInvoiceSellerDtls_State);
            let EvolveInvoiceSellerDtls_StateCode = getStateCode.recordset[0].EvolveState_Code;
            req.body.EvolveInvoiceSellerDtls_StateCode = EvolveInvoiceSellerDtls_StateCode;

            let updateEwayBillData = {
                    "ewbNo": req.body.EvolveInvoice_EwayBillNumber,
                    "vehicleNo": req.body.EvolveInvoiceEwbDtls_VehNo,
                    "fromPlace": req.body.EvolveInvoiceSellerDtls_Loc,
                    "fromState": req.body.EvolveInvoiceSellerDtls_StateCode,
                    "remainingDistance":"0",
                    "transDocNo": req.body.EvolveInvoiceEwbDtls_TransDocNo,
                    "transDocDate": req.body.EvolveInvoiceEwbDtls_TransDocDt,
                    "extnRsnCode": req.body.EvolveInvoiceEwbDtls_UpdateRsnCode,
                    "extnRemarks": req.body.EvolveInvoiceEwbDtls_UpdateRsnRemark,
                    "fromPincode":""
            }

            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/updateEwayBill';
            // console.log("apiUrl==============", apiUrl)
            let responce = await Evolve.Axios.post(apiUrl, updateEwayBillData);

            if (responce.statusCode == 200) {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "E-Way Bill Update Successfully!",
                    result: responce
                };
                res.send(obj);
            }
            else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update E-Way Bill!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### : Error while Getting Update E-Way Bill " + error.message,
                result: null
            };
            res.send(obj);
        } 
    },

    cancelEwayBill: async function (req, res) {
        try {
            let cancelEWayBillData = {
                "ewbNo": req.body.EvolveInvoice_EwayBillNumber,
                "cancelRsnCode": req.body.EvolveInvoiceEwbDtls_cancelEwbRsn,
                "cancelRmrk": req.body.EvolveInvoiceEwbDtls_cancelEwbRemarks
            }
                
                let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/cancelEwayBill';
                console.log("apiUrl==============", apiUrl)
                let responce = await Evolve.Axios.post(apiUrl, cancelEWayBillData);

                if (responce.statusCode == 200) {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "E-Way Bill Canceled Successfully!",
                        result: responce
                    };
                    res.send(obj);
                }
                else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while Canceled E-Way Bill invoice!",
                        result: null
                    };
                    res.send(obj);
                }
        } catch (error) {
            Evolve.Log.error("Error while Invoice Cancel EwayBill " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32750: Error while getting E Way Bill Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    cancelEInvoice: async function (req, res) {
        try {
            console.log("Controller ========cancelEInvoice ============")
            // console.log("req.body>>>>>>>>>>>>>", req.body);

            let cancelEInvoiceData = {
                "Irn": req.body.EvolveInvoice_IrnNo,
                "CnlRsn": req.body.EvolveInvoice_cancelInvRsnCode,
                "CnlRem": req.body.EvolveInvoice_cancelInvRemarks
            }
            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/cancelEInvoice';
            // console.log("apiUrl==============", apiUrl)
            let responce = await Evolve.Axios.post(apiUrl, cancelEInvoiceData);

            if (responce.data.statusCode == 200) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "E-Invoice Canceled Successfully!",
                    result: null
                };
                res.send(obj);
            }
            else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Cancel E-Invoice!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### : Error while Cancel E-Invoice " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // POD Start

    getPodDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getPodDetails(req.body.EvolveInvoice_Number);
            
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get invoice List!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Get Invoice List Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    podFileUpload: async function (req, res) {
        try {
            if (req.files.podFile) {
                let file = req.files.podFile;
                // console.log("file name >>>>>>>>>>>", file.name);
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(file.name)[1];

                let currentDate = new Date();
                let fileName = 'pod_' + (currentDate.getFullYear()) + ("0" + (currentDate.getMonth() + 1)).slice(-2) + ("0" + (currentDate.getDate())).slice(-2) + ("0" + (currentDate.getHours())).slice(-2) + ("0" + (currentDate.getMinutes())).slice(-2) + ("0" + (currentDate.getSeconds())).slice(-2) + '.' + ext;

                // let fileName = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvList.getGlobleVariableEInv('EINVIOFOLDERNAME');
                let podFilePath = '../' + eInvBaseUrl.recordset[0].EvolveEinvoiceConfig_Value + '/EINV/pod/' + fileName;
                // Use the mv() method to place the file somewhere on your server
                file.mv(podFilePath, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // console.log("req.body>>>>>>>>>>>.", req.body);
                        let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.savePodDetails(req.body, fileName);
                        if (result instanceof Error) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Please Attach POD File!",
                                result: null
                            };
                            res.send(obj);
                        } else {
                            let obj = {
                                statusCode: 200,
                                status: "Success",
                                message: "POD Details Save Successfully",
                                result: result.recordset
                            };
                            res.send(obj);
                        }
                    }
                }
                )
            }
            else {
                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: " Please Attach POD File! ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32571: Error Upload Add POD file " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Upload POD file",
                result: null
            };
            res.send(obj);
        }


    },

    getInvoiceListPod: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let searchStartDate = req.body.searchStartDate;
            let searchEndDate = req.body.searchEndDate;
            let Count = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceListCountPod(search, req.body);
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceListPod(start, length, search, req.body);


            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice list!",
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
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while getting E-Invoice List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while getting E-Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onClickClnIrnPod : async function (req, res) {
        try {
            let response = await Evolve.App.Services.Compliance.eInvoice.SrvList.onClickClnIrnPod(req.body.EvolveInvoice_Number);

            if (response instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while cancel invoice!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    response: response.result
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while cancel INvoice " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while cancel INvoice " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnitListPod : async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getUnitListPod(req.body.EvolveUser_ID);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Unit List POD!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Get Unit List POD Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while getting Unit List POD " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getInvoiceListPodDownloadCsv : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let start = parseInt(req.body.startFrom);
            let  length = parseInt(req.body.displayRecord);
            
            let search = req.body.search;
            let searchStartDate = req.body.searchStartDate;
            let searchEndDate = req.body.searchEndDate;
           
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvList.getInvoiceListPodDownloadCsv(start, length, search, req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice list POD CSV Downalod!",
                    result: null
                };
                res.send(obj);
            } else {
                result = result.recordset;
                let podData = [];
                
                // xlsx file
                for (let i = 0; i < result.length; i++) {
                    let data = {};
                    data['Site'] = result[i].EvolveUnit_Code
                    data['Project'] = result[i].EvolveProject_Name
                    data['Invoice Number'] = result[i].EvolveInvoice_Number
                    data['Invoice Date'] = result[i].EvolveInvoice_Date
                    data['Cust Delivery Date'] = result[i].podDeliveryDate
                    data['Days Count'] = result[i].podDayDiff
                    data['Customer Name'] = result[i].EvolveInvoiceBuyerDtls_LglNm
                    data['Invoice Amount'] = result[i].EvolveInvoiceValDtls_TotInvValFc
                    if (result[i].EvolveDocument_ID == 7) {
                        data['POD Status'] = "CREDIT NOTE"
                    }
                    else if (result[i].EvolveInvoice_irnCnlStatus == 'CANCELED') {
                        data['POD Status'] = "CANCELED INVOICE"
                    }
                    else if (result[i].EvolveInvoice_PodDocName == null) {
                        data['POD Status'] = ""
                    }
                    else if (result[i].EvolveInvoice_PodDocName != null) {
                        data['POD Status'] = "POD DOCUMENT"
                    }
                    
                    podData.push(data)
                }
                // console.log("podData>>>>>", podData);
                
                let newWB = Evolve.Xlsx.utils.book_new();
                let newWS = Evolve.Xlsx.utils.json_to_sheet(podData);
                Evolve.Xlsx.utils.book_append_sheet(newWB, newWS, "POD Invoice List")
                let fileName = 'POD Invoice List.xlsx';
                Evolve.Xlsx.writeFile(newWB, './public/xlsx/'+fileName)

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "POD File Downloaded Successfully",
                    result: fileName
                };
                res.send(obj);
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while getting E-Invoice List POD CSV Downalod " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while getting E-Invoice List POD CSV Downalod " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    



}