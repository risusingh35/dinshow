'use strict';
const Evolve = require("../../../../Boot/Evolve");
const nodemailer = require('nodemailer');
module.exports = {

    getVisitorList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let searchdate = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            }
            let Count = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.getVisitorListCount(search, searchdate);
            let result = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.getVisitorList(start, length, search, searchdate);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR0179: Error while get Visitor list!",
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
                    message: "Out Visitor List",
                    result: resObj,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0180: Error while getting Visitor list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0180: Error while getting Visitor list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleVisitorData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.getSingleVisitorData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR0181: error on get Single Visitor Data",
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
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0182: Error while getting single visitor data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateOutVisitor: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.updateOutVisitor(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR0183: error on out Visitor",
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
            Evolve.Log.error(" EERR0184: Error while updating out visitor "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0184: Error while updating out visitor "+error.message,
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
                    message: " EERR0185: error on generate otp",
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
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0186: Error while generating Otp "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendotp: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.sendotp(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR0187: error on send Otp",
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
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0188: Error while sending otp"+error.message,
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
                message: "Send SMS",
                result: null
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0189: Error while sending message "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendMail: async function (req, res) {
        try {
            
            let transporter = Evolve.Mailer.createTransport({
                host: Evolve.Config.EMAILHOST,
                port: Evolve.Config.EMAILPORT,
                secure: true, // true for 465, false for other ports
                tls: { rejectUnauthorized: true }, //TO prevent crashes due to tls authorization
                auth: {  /* Commit it when use port other then 465 */
                    user: Evolve.Config.email, // generated ethereal user
                    pass: Evolve.Config.password
                },
            });
            try {
                let info = await transporter.sendMail({
                    from: Evolve.Config.email, // sender address
                    secure: true, // 
                    to: req.body.EvolveGate_Email,
                    subject: req.body.emailSubject, // Subject line
                    text: req.body.messege, // plain text body
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
                Evolve.Log.info('Error in Sending Visitor Out Mail : ' + error);
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Error in Send mail",
                    result: null
                };
                res.send(obj); 
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0191: Error while Sending Email "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getImageUrl: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let imageUrl = await Evolve.App.Services.eGateControl.GateOut.SrvVisitorOut.getImageUrl(req.body.id);
            if (imageUrl instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR0192: Error while get Visitor Image !",
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
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0193: Error while getting Visitor Image !"+error.message,
                result: null
            };
            res.send(obj);
        }
    },





}
