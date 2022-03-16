'use strict';
const Evolve = require("../../../../Boot/Evolve");
const nodemailer = require('nodemailer');
module.exports = {

    getVisitorList: async function (req, res) {
        try {
            let start = parseInt(req.query.start);
            let length = parseInt(req.query.length);
            let search = req.query.search.value;
            let searchdate = {
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            }
            let Count = await Evolve.App.Services.eGateControl.Visitor.SrvList.getVisitorListCount(search, searchdate);
            let result = await Evolve.App.Services.eGateControl.Visitor.SrvList.getVisitorList(start, length, search, searchdate);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Visitor list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    draw: req.query.draw,
                    recordsTotal: Count.recordset[0].count,
                    recordsFiltered: Count.recordset[0].count,
                    data: result.recordset,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0151: Error while getting visitor list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message:  " EERR0151: Error while getting visitor list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllSectionList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.getAllSectionList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Section List",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0152: Error while getting all section list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0152: Error while getting all section list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllPassTypeList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.getAllPassTypeList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Pass Type List",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0153: Error while getting  all pass type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0153: Error while getting  all pass type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addVisitorIN: async function (req, res) {
        try {

            let checkVisitorIn = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.checkVisitorIn(req.body);
            if (checkVisitorIn instanceof Error || checkVisitorIn.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "visitor already IN",
                    result: null
                };
                res.send(obj);
            }
            else {

                req.body.EvolveGate_RefNumber = Evolve.Generator.generate("GATE")
                if (req.body.EvolveGate_RefNumber == undefined || req.body.EvolveGate_RefNumber.length == 0) {
                    Evolve.Log.error(" EERR#### : Error while assign Gate RefNumber ")
    
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR#### : Error while assign Gate RefNumber ",
                        result: null
                    };
                    res.send(obj);
                } else {
                    req.body.EvolveGate_RefNumber = (req.body.EvolveGate_RefNumber.toString()).replace(/ -/g, '');
                    req.body.EvolveGate_RefNumber = req.body.EvolveGate_RefNumber.split(" ").join("");
                    req.body.EvolveGate_PassNumber = req.body.EvolveGate_RefNumber.replace("GATE" , "PN");


                    if (req.body.image != '') {

                        let imageData = req.body.image;
                        let extention = imageData.substring(
                            "data:image/".length,
                            imageData.indexOf(";base64")
                        );
                        let fileName = req.body.EvolveGate_RefNumber + "." + extention;
                        req.body.imageName = fileName;
                        let base64Data = imageData.replace(/^data:image\/png;base64,/, "");
                        base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
                        Evolve.Fs.writeFile(
                            Evolve.Config.imageUploadPath + fileName,
                            base64Data,
                            "base64",
                            function (err) {
                                if (err) {
                                    console.log(err);
                                    // res.json(0);
                                } else {

                                }
                            }
                        );
                    }
                    req.body.EvolveGate_Image = req.body.imageName;
                    let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.addVisitorIN(req.body);
                    if (result instanceof Error) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on get add visiter in",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Visiter Add success",
                            result: null
                        };
                        res.send(obj);
                    }
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR0154: Error while add visitor IN "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0154: Error while add visitor IN "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleVisitorData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.Visitor.SrvList.getSingleVisitorData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Single Visitor Data",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0155: Error while getting single visitor data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0155: Error while getting single visitor data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateOutVisitor: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.Visitor.SrvList.updateOutVisitor(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on out Visitor",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Visitor Out Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0156: Error while updating out visitor "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0156: Error while updating out visitor "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    generateOtp: async function (req, res) {
        try {
            let otpnumber = "5141"
            if (otpnumber == '') {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on generate otp",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "OTP SENT",
                    result: otpnumber
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0157: Error while generating otp "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendotp: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.Visitor.SrvList.sendotp(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on out Visitor",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Visitor Out Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0158: Error while sending OTP "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0158: Error while sending OTP "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    searchVisitorData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.searchVisitorData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "visitor Data Not Found",
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
            Evolve.Log.error(" EERR0159: Error while searching visitor data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0159: Error while searching visitor data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendMessege: async function (req, res) {
        try {
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Messege Send Succsessfully ",
                result: null
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR0160: Error while sending message "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0160: Error while sending message "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendMail: async function (req, res) {
        try {
            let defaultTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: Evolve.Config.email,
                    pass: Evolve.Config.pass
                }
            });
            var mailOptions = {
                to: req.body.EvolveGate_Email + "",
                // cc: ccmaillist,
                from: Evolve.Config.email,
                subject: req.body.emailSubject,
                text: 'Hi Sir,\n\n' +
                    ' Please find gate entry details \n\n' +
                    req.body.messege + '\n\n' +
                    // ' Date : ' + eBykeTodayDate + ' \n\n' +
                    ' Thanks, \n\n' +
                    'The Aliter solutions \n\n',

                // attachments: [{
                //     filename: name + '.csv',
                //     content: csv
                // }],
            };

            defaultTransport.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log("Do Nothing for mail send ...", error);
                } else {
                    console.log("Email Sending........")
                }
            });
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Mail Send Succsessfully ",
                result: null
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR0161: Error while sending email "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0161: Error while sending email "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getImageUrl: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let imageUrl = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.getImageUrl(req.body.id);
            if (imageUrl instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Visitor Image !",
                    imageUrl: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: " ",
                    message: "",
                    result: imageUrl.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0162: Error while sending email "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0162: Error while sending email "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkVisitorMobileNo: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.checkVisitorMobileNo(req.body);
            if (result instanceof Error || result.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Visitor already IN",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0163: Error while checking visitor mobile number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0163: Error while checking visitor mobile number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkVisitorEmailId: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eGateControl.GateIn.SrvVisitorIn.checkVisitorEmailId(req.body);
            if (result instanceof Error || result.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Visitor already IN",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0164: Error while checking visitor email id "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0164: Error while checking visitor email id "+error.message,
                result: null
            };
            res.send(obj);
        }
    },





}
