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
            let Count = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getInvoiceListCount(search, req.body);
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getInvoiceList(start, length, search, req.body);
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
reSendEmail: async function (req, res) {
    try {
        let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getSingleInvoiceData(req.body);
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
                let InvoiceCustUnitEmailData = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getUnitCustomerLink(Invoice);
                if (InvoiceCustUnitEmailData.rowsAffected > 0) {
                    console.log("Unit To Customer Data Found====")
                    eDoc = InvoiceCustUnitEmailData.recordset[0];
                    EvolveUnitToCustomerLink_FromEmail_ID = eDoc.EvolveUnitToCustomerLink_FromEmail_ID;
                    EvolveUnitToCustomerLink_ToEmail_ID = eDoc.EvolveUnitToCustomerLink_ToEmail_ID;
                    EvolveUnitToCustomerLink_CCEmail_IDS = eDoc.EvolveUnitToCustomerLink_CCEmail_IDS;
                    EvolveUnitToCustomerLink_EmailSubject = eDoc.EvolveUnitToCustomerLink_EmailSubject;
                    EvolveUnitToCustomerLink_EmailBody = eDoc.EvolveUnitToCustomerLink_EmailBody;
                }else{
                    console.log("Unit To Customer Data Not Found====")
                    console.log("DEFAULTMAILSEND====",Evolve.EvolveEinvoiceConfig.DEFAULTMAILSEND)
                    if(Evolve.EvolveEinvoiceConfig.DEFAULTMAILSEND == '0'){
                        sendmail  = false;
                        console.log("not send mail=====")
                    }
                }
                if(sendmail == true){
                    let path = '../'+Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME+'/EINV/ARCHIVE/'+fileName;
                    // let pathn = '../evolve_io_server/EINV/ARCHIVE/'+fileName;
                    path = path.trim();
                    // pathn = pathn.trim();
                    console.log("File Path =",path)
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

                        try {
                            let info = await transporter.sendMail({
                                from: EvolveUnitToCustomerLink_FromEmail_ID, // sender address
                                secure: (Evolve.EvolveEinvoiceConfig.EMAILSECURE == 0) ? false : true, // 
                                to: EvolveUnitToCustomerLink_ToEmail_ID, // list of receivers
                                cc: EvolveUnitToCustomerLink_CCEmail_IDS,
                                subject: EvolveUnitToCustomerLink_EmailSubject, // Subject line
                                //text: "Hello world?", // plain text body
                                html: EvolveUnitToCustomerLink_EmailBody, // html body
                                attachments: [{
                                    filename: orignalFile, // Chnage Name of File as you like
                                    content: fileData
                                }],
                            });
                            console.log('info :', info);
                            console.log('Success===================================');
                            let obj = {
                                statusCode: 200,
                                status: "success",
                                message: "Email Send Successfully",
                                result: null
                            };
                            res.send(obj); 

                            
                        } catch (error) {
                            Evolve.Log.info('Error in eInvoiceSendEmail : ' + error);
                            let obj = {
                                statusCode: 400,
                                status: "success",
                                message: "Error in Send mail",
                                result: null
                            };
                            res.send(obj); 
                        }

                    } else {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "File Not Found",
                            result: null
                        };
                        res.send(obj); 
                    }
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Default Mail Send Process false",
                        result: null
                    };
                    res.send(obj); 
                }
            }else{
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
        let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getSingleInvoiceData(req.body);
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
            
            let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVQXTENDURL');
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
        let SftpHost = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPHOST');
        if (SftpHost instanceof Error || SftpHost.rowsAffected < 1) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Key SFTPHOST does not exist in E Invoice Configration",
                result: null
            };
            res.send(obj);
        } else {
            let SftpUser = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPUSER');
            if (SftpUser instanceof Error || SftpUser.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Key SftpUser does not exist in E Invoice Configration",
                    result: null
                };
                res.send(obj);
            } else {
                let SftpPasword = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPPASSWORD');
                if (SftpPasword instanceof Error || SftpPasword.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Key SFTPPASSWORD does not exist in E Invoice Configration",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let SftpPort = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPPORT');
                    if (SftpPort instanceof Error || SftpPort.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Key SFTPPORT does not exist in E Invoice Configration",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let SftpInPath = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPINPATH');
                        if (SftpInPath instanceof Error || SftpInPath.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Key SFTPINPATH does not exist in E Invoice Configration",
                                result: null
                            };
                            res.send(obj);
                        } else {
                            let EinvoiceFileExtention = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVFILEEXTENSION');
                            if (EinvoiceFileExtention instanceof Error || EinvoiceFileExtention.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Key EINVFILEEXTENSION does not exist in E Invoice Configration",
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let EinvoiceInPath = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVINPATH');
                                if (EinvoiceInPath instanceof Error || EinvoiceInPath.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Key EINVINPATH does not exist in E Invoice Configration",
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    let EInvProcessPath = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVPROCESSPATH');
                                    if (EInvProcessPath instanceof Error || EInvProcessPath.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "Key EINVPROCESSPATH does not exist in E Invoice Configration",
                                            result: null
                                        };
                                        res.send(obj);
                                    } else {
                                        let SftpOutPath = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('SFTPOUTPATH');
                                        if (SftpOutPath instanceof Error || SftpOutPath.rowsAffected < 1) {
                                            let obj = {
                                                statusCode: 400,
                                                status: "fail",
                                                message: "Key SFTPOUTPATH does not exist in E Invoice Configration",
                                                result: null
                                            };
                                            res.send(obj);
                                        } else { 
                                            let EInvArchivePath = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVARCHIVEPATH');
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

                                                    let InvoiceData = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getSingleInvoiceData(req.body);
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
        let result = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getUnitList();
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
        let result = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getSupplierList(req.body);
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
getGlobleVariableEInv: async function (req, res) {
    try {
        let response = {};
        let ioPublicFolders = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableIo('PUBLICDIR');
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
            let eInvBaseUrl = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVBASEURL');
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
                let eInvInDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVINPATH');
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
                    let eInvProcessDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVPROCESSPATH');
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
                        let eInvOriginalDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVORIGINALPATH');
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
                            let eInvArchiveDir = await Evolve.App.Services.Compliance.eInvoice.SrvInvoiceHistoryV2.getGlobleVariableEInv('EINVARCHIVEPATH');
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
}