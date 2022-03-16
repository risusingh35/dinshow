const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getPrintProcessHistory: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            // let search = req.body.search;
            console.log("req.body ==",req.body)
            
            let condition = " AND eph.EvolvePrintHistory_CreatedUser = "+req.body.EvolveUser_ID;
            if (req.body.startDate != "" && req.body.endDate != ""){
                condition =" AND cast(EvolvePrintHistory_CreatedAt as date) >= " + "'" + req.body.startDate + "'" + " AND cast(EvolvePrintHistory_CreatedAt as date) <= " + "'" + req.body.endDate +"'"
            }
            console.log("condition ===",condition)
            let count = await Evolve.App.Services.Evolve.printHistory.SrvListV2.getPrintProcessHistoryCount(condition , search);
            let result = await Evolve.App.Services.Evolve.printHistory.SrvListV2.getPrintProcessHistory(start, length, condition , search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in get print Process history details",
                    result: result.message
                };
                res.send(obj);
            }
            else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32586: Error while getting printer history " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32586: Error while getting printer history " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onClickRePrint : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getSinglePrintHistory = await Evolve.App.Services.Evolve.printHistory.SrvListV2.getSinglePrintHistory(req.body);
            if (getSinglePrintHistory instanceof Error || getSinglePrintHistory.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting Print History Data",
                    result: getSinglePrintHistory.message
                };
                res.send(obj);
            }
            else {
                let rePrintProcess = await Evolve.App.Services.Evolve.printHistory.SrvListV2.rePrintProcess(req.body, getSinglePrintHistory.recordset[0]);
                if (rePrintProcess instanceof Error || rePrintProcess.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error in add Print Process",
                        result: getSinglePrintHistory.message
                    };
                    res.send(obj);
                }
                else {
                    let getSinglePrintHistoryDetails = await Evolve.App.Services.Evolve.printHistory.SrvListV2.getSinglePrintHistoryDetails(req.body);
                    if (getSinglePrintHistoryDetails instanceof Error || getSinglePrintHistoryDetails.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error in getting Print History Details",
                            result: getSinglePrintHistory.message
                        };
                        res.send(obj);
                    }
                    else {
                        req.body.EvolvePrintProcess_ID =  rePrintProcess.recordset[0].inserted_id;
                        let rePrintProcessDetail = await Evolve.App.Services.Evolve.printHistory.SrvListV2.rePrintProcessDetail(req.body, getSinglePrintHistoryDetails.recordset[0]);
                        if (rePrintProcessDetail instanceof Error || rePrintProcessDetail.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error in add Print Process Details",
                                result: getSinglePrintHistory.message
                            };
                            res.send(obj);
                        }
                        else {
                            let obj = {
                                statusCode: 200,
                                status: "success",
                                message: "Re Print Successfully",
                                result: null
                            };
                            res.send(obj);
                        }  
                    }   
                }   
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Reprint Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllPrinter : async function (req,res) {
        try {
            let getAllPrinter = await Evolve.App.Services.Evolve.printHistory.SrvListV2.getAllPrinter();
            if (getAllPrinter instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting printer",
                    result: getAllPrinter.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Online Print Historyt",
                    result: getAllPrinter.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while getting Printer " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while getting Printer " + error.message,
                result: null
            };
            res.send(obj);
        }
    }
    
}
