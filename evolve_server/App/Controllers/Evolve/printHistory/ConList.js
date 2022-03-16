const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getOnlinePrintHistory: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search
            // let search = req.body.search;
            let condition = "";
            if (req.body.startDate != "" && req.body.endDate != ""){
                condition =
                  " AND cast(EvolvePrintQueue_CreatedAt as date) >=" +
                  "'" +
                  req.body.startDate +
                  "'" +
                  " AND cast(EvolvePrintQueue_CreatedAt as date) <=" +
                  "'" +
                  req.body.endDate +
                  "'";
            }

            let count = await Evolve.App.Services.Evolve.printHistory.SrvList.getOnlinePrintHistoryCount(condition , search);

            let onlinePrintHistory = await Evolve.App.Services.Evolve.printHistory.SrvList.getOnlinePrintHistory(start, length, condition , search);

            if (onlinePrintHistory instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting online print history",
                    result: onlinePrintHistory.message
                };
                res.send(obj);
            }
            else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: onlinePrintHistory.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Online Print Historyt",
                    result: resObj
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32585: Error while getting online printer history " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32585: Error while getting online printer history " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

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
            let count = await Evolve.App.Services.Evolve.printHistory.SrvList.getOfflinePrintHistoryCount(condition , search);

            let offlinePrintHistory = await Evolve.App.Services.Evolve.printHistory.SrvList.getOfflinePrintHistory(start, length, condition , search);

            if (offlinePrintHistory instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting offline print history",
                    result: offlinePrintHistory.message
                };
                res.send(obj);
            }
            else {
                for(let i = 0 ; i < offlinePrintHistory.recordset.length ; i++){
                    offlinePrintHistory.recordset[i].EvolvePrintLabelSerial_Number = offlinePrintHistory.recordset[i].EvolvePrintLabelSerial_Number.split("~")[1]
                }
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: offlinePrintHistory.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Offline Print Historyt",
                    result: resObj
                };
                res.send(obj);

            }

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
        try {
            let rePrintArray = req.body.labelData;
            let error = false
            for (let i = 0 ; i < rePrintArray.length ; i++){
                if (error == false){
                    rePrintArray[i].EvolvePrintQueue_RePrint = parseInt(rePrintArray[i].EvolvePrintQueue_RePrint) + 1;
                    rePrintArray[i].EvolveUser_ID = req.EvolveUser_ID
                    let rePrintLabel = await Evolve.App.Services.Evolve.printHistory.SrvList.rePrintLabel(rePrintArray[i] , rePrintArray[i].EvolvePrintQueue_RePrint);
                    if(rePrintLabel instanceof Error || rePrintLabel.rowsAffected <= 0){
                        error = true
                        i = rePrintArray.length
                    }
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
            let getAllPrinter = await Evolve.App.Services.Evolve.printHistory.SrvList.getAllPrinter();
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
