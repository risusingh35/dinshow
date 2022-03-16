'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getMailConfigData: async function (req, res) {
        try {
            let EvolveUser_ID = req.EvolveUser_ID;
            
            let obj = {
                statusCode: 200,
                status: "Success",
                message: "Success",
                result: Evolve.EvolveEinvoiceConfig
            };
            res.send(obj);
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while Get Einvoice Config Data  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    sendMail: async function (req, res) {
		try {
            console.log("data===",req.body)
            let transporter = Evolve.Mailer.createTransport({
                host: req.body.EmailHost,
                port: req.body.EmailPort,
                secure: req.body.EmailSecure, // true for 465, false for other ports
                tls: { rejectUnauthorized: req.body.TLS }, //TO prevent crashes due to tls authorization
                auth: {  /* Commit it when use port other then 465 */
                    user: req.body.EmailUser, // generated ethereal user
                    pass: req.body.EmailPassword, // generated ethereal password
                },
            });
            try {
                let info = await transporter.sendMail({
                    from: req.body.FromEmail, // sender address
                    secure: req.body.EmailSecure, // 
                    to: req.body.ToEmail, // list of receivers
                    cc: req.body.CCEmail,
                    subject: req.body.EmailSubject, // Subject line
                    text: req.body.EmailBody, // plain text body
                    // html: req.body.EmailBody, // html body
                    // attachments: [{
                    // 	filename: orignalForBuyer, // Chnage Name of File as you like
                    // 	content: orignalForBuyerfileData
                    // }], 
                });
                console.log('info :', info);
                console.log('Success===================================');
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Mail Send Successfully",
                    result: null
                };
                res.send(obj);

            } catch (error) {
                console.log("Error 1 ===",error);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error In Send Mail",
                    result: null
                };
                res.send(obj);
                Evolve.Log.info('Error in SendEmail : ' + error);
            }
		} catch (error) {
            console.log("Error 2 ===",error);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
			
		}

	},
}