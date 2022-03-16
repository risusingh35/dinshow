'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    parseDocument: async function (req, res) {
        try {
            //  console.log(">>>>>>>>>>>>>>> FILE", req.files.docData)
            console.log("Befor PageNo========================",req.files)
            console.log("filels========================",req.body)
            let PageNo = (req.body.PageNo != '') ? req.body.PageNo : 1;
            console.log("PageNo========================",PageNo)
            PageNo = PageNo - 1;
            console.log("After PageNo========================",PageNo)
            if (req.files.docData) {
                let pdf = req.files.docData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(pdf.name)[1];
                let date = new Date();
                let fileName = 'Test_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                // console.log("fileName>>>>>>", fileName);
                // let label_errorStatus = false;


                // console.log("FILE >>>", pdf);

                let pdfParser = new Evolve.pdfExtract(this, 1);

                pdf.mv(Evolve.Config.pdfUploadPath + '/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // Read Xlsx 
                        await pdfParser.loadPDF(Evolve.Config.pdfUploadPath + '/' + fileName);
                        pdfParser.on("pdfParser_dataError", errData => {
                            console.log("Error on Readnig File");
                            let obj = { statusCode: 400, status: "fail", message: 'Error while parse file; !', result: null };
                            res.send(obj);
                        });
                        await pdfParser.on("pdfParser_dataReady", async pdfData => {
                            console.log("File Reading Succesfully...")
                            console.log("Get File Type")
                            // let pageNo = parseInt((Evolve.Config.DOCPARSERPAGENO != undefined) ? Evolve.Config.DOCPARSERPAGENO : 0);
                            
                            try{
                                let pdfFileData = pdfData.formImage.Pages[PageNo].Texts; // Here Set ) for First Page 1 for Second page so on..
                                // console.log("pdfFileData  ::: >>>>>>>>>>>>>>>>>>", pdfFileData);
                                let obj = { statusCode: 200, status: "success", message: 'FILE Data', result: pdfFileData };
                                res.send(obj);
                            }catch{
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Document Page Not Found ",
                                    result: null
                                };
                                res.send(obj);
                            }

                            
                        });
                    }
                    console.log("Before Responce Send $$$$$$$$$$$$$$$$$$$$$$$$");
                    // if (label_errorStatus == true) {
                    //     let obj = { statusCode: 400, status: "fail", message: 'Error while upload Labe; !', result: null };
                    //     res.send(obj);
                    // } else {
                    //     let obj = { statusCode: 200, status: "success", message: 'Xlsx File uploaded succsessfully', result: null };
                    //     res.send(obj);
                    // }

                });

            } else {
                let obj = { statusCode: 400, status: "fail", message: 'Error while parse File; !', result: null };
                res.send(obj);
            }

            console.log("We are End Here ############################");

            // req.body.EvolveUser_ID = req.EvolveUser_ID;
            // let obj = {
            //     statusCode: 200,
            //     status: "sucess",
            //     message: " ",
            //     result: null
            // };
            // res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding document " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding document " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCoordinateTempList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.EInvoice.SrvDocParser.getCoordinateTempList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate Template list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Coordinates list",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCoordinateList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.EInvoice.SrvDocParser.getCoordinateList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate list!",
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
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleCoordinateData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.EInvoice.SrvDocParser.getSingleCoordinateData(req.body);
            console.log(result.recordset[0])
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Coordinate Single Data!",
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
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateCoordinates: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.EInvoice.SrvDocParser.updateCoordinates(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Update Coordinates!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Coordinate Update Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0225: Error while getting Co-ordinate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}