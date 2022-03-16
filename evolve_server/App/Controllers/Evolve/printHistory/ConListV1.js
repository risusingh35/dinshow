const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getOfflinePrintHistory: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search
            // let search = req.body.search;

            let condition = "";
            if (req.body.startDate != "" && req.body.endDate != ""){
                condition =
                  " AND cast(EvolvePrintHistory_CreatedAt as date) >=" +
                  "'" +
                  req.body.startDate +
                  "'" +
                  " AND cast(EvolvePrintHistory_CreatedAt as date) <=" +
                  "'" +
                  req.body.endDate +
                  "'"
            }
            let count = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getOfflinePrintHistoryCount(condition , search);
            let result = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getOfflinePrintHistory(start, length, condition , search);

            if (result instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error in get print history details",
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
                                message: "Offline Print History",
                                result: resObj
                            };
                            res.send(obj);
                        }
                //    let uniqueData = true; 
                //    let printhistoryArray = [];
                //    let resultArray = result.recordset;
                //    let tempArray = [];
                //     for (let i = 0; i < resultArray.length; i++) {
                //         if(tempArray.length == 0){
                //             uniqueData = true;
                //         }
                //         else{
                //             if(resultArray[i].EvolvePrintHistory_ID == tempArray.EvolvePrintHistory_ID){
                //                 uniqueData = false;
                //             }
                //             else{
                //                 uniqueData = true;
                //             }
                //         }
                //         if(uniqueData == true){
                //             printhistoryArray.push(resultArray[i]);
                //             tempArray.push(resultArray[i]);
                //         }
                //     }
                //     console.log("printhistoryArray>>>>", printhistoryArray);
        
            // let condition = "";
            // if (req.body.startDate != "" && req.body.endDate != ""){
            //     condition =
            //       " AND cast(EvolvePrintHistory_CreatedAt as date) >=" +
            //       "'" +
            //       req.body.startDate +
            //       "'" +
            //       " AND cast(EvolvePrintHistory_CreatedAt as date) <=" +
            //       "'" +
            //       req.body.endDate +
            //       "'"
            // }
            // let count = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getOfflinePrintHistoryCount(condition , search);

            // let offlinePrintHistory = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getOfflinePrintHistory(start, length, condition , search);

            // if (offlinePrintHistory instanceof Error) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "Error in getting offline print history",
            //         result: offlinePrintHistory.message
            //     };
            //     res.send(obj);
            // }
            // else {
            //     let resObj = {
            //         noOfRecord: count.recordset[0].count,
            //         records: offlinePrintHistory.recordset
            //     }
            //     let obj = {
            //         statusCode: 200,
            //         status: "success",
            //         message: "Offline Print Historyt",
            //         result: resObj
            //     };
            //     res.send(obj);

            // }

        } catch (error) {
            Evolve.Log.error(" EERR32586: Error while getting offline printer history " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32586: Error while getting offline printer history " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    reprintLabel : async function (req, res) {
        // console.log("req.body>>>>", req.body);
        try {
            let rePrintArray = req.body.labelData;
            let error = false
            for (let i = 0 ; i < rePrintArray.length ; i++){
                if (error == false){
                    rePrintArray[i].ReprintCount = parseInt(rePrintArray[i].ReprintCount) + 1;
                    let rePrintCount = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintCount(rePrintArray[i])
                    if(rePrintCount instanceof Error || rePrintCount.rowsAffected <= 0){
                        error = true
                        i = rePrintArray.length
                    }
                    else{
                        // console.log("rePrintCount>>>", rePrintCount);
                        rePrintArray[i].EvolveUser_ID = req.EvolveUser_ID
                        let rePrintLabelProcess = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintLabelProcess(rePrintArray[i]);
                        if(rePrintLabelProcess instanceof Error || rePrintLabelProcess.rowsAffected <= 0){
                            error = true
                            i = rePrintArray.length
                        }
                        else{
                            // console.log("rePrintLabelProcess>>>>>", rePrintLabelProcess.recordset[0].inserted_id);
                            let EvolvePrintProcess_ID = rePrintLabelProcess.recordset[0].inserted_id

                            let getPrintHistoryId = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getPrintHistoryId(EvolvePrintProcess_ID);
                            if(getPrintHistoryId instanceof Error || getPrintHistoryId.rowsAffected <= 0){
                                error = true
                                i = rePrintArray.length
                            }
                            else{
                                let EvolvePrintHistory_ID = getPrintHistoryId.recordset[0].EvolvePrintHistory_ID;
                                let getPrintHistoryDetailsData = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getPrintHistoryDetailsData(EvolvePrintHistory_ID);
                                if(getPrintHistoryDetailsData instanceof Error || getPrintHistoryDetailsData.rowsAffected <= 0){
                                    error = true
                                    i = rePrintArray.length
                                }
                                else{
                                    let printerHistoryData = getPrintHistoryDetailsData.recordset;
                                    for (let i = 0; i < printerHistoryData.length; i++) {
                                        printerHistoryData[i].EvolveUser_ID = req.EvolveUser_ID
                                        let rePrintLabelProcessDetails = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintLabelProcessDetails(EvolvePrintProcess_ID, printerHistoryData[i]);
                                        if(rePrintLabelProcessDetails instanceof Error || rePrintLabelProcessDetails.rowsAffected <= 0){
                                            error = true
                                            i = rePrintArray.length
                                        }
                                        
                                    }
                                }
                            }



                            // let rePrintLabelProcessDetails1 = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintLabelProcessDetails(rePrintArray[i]);
                            // if(rePrintLabelProcessDetails1 instanceof Error || rePrintLabelProcessDetails1.rowsAffected <= 0){
                            //     error = true
                            //     i = rePrintArray.length
                            // }
                            // else{
                            //     let rePrintLabelProcessDetails2 = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintLabelProcessDetails(rePrintArray[i])
                            // }
                        }

                    }
                    // rePrintArray[i].EvolvePrintQueue_RePrint = parseInt(rePrintArray[i].EvolvePrintQueue_RePrint) + 1;
                    // rePrintArray[i].EvolveUser_ID = req.EvolveUser_ID
                    // let rePrintLabel = await Evolve.App.Services.Evolve.printHistory.SrvListV1.rePrintLabel(rePrintArray[i] , rePrintArray[i].EvolvePrintQueue_RePrint);
                    // if(rePrintLabel instanceof Error || rePrintLabel.rowsAffected <= 0){
                    //     error = true
                    //     i = rePrintArray.length
                    // }
                }
            }
            if(error == true){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while RePrint Online Label !!",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "RePrint Label.. Command Send Successfully !!",
                    result: null
                };
                res.send(obj);
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
            let getAllPrinter = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getAllPrinter();
            if (getAllPrinter instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting online print history",
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
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Reprint Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    }


}
