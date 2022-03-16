'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStockList: async function (req, res) {
        try {

            let  error   =  false ;
            if(req.body.maxDate == ''){
             let getMaxDate = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getMaxDateOfStock();
                  if (getMaxDate instanceof Error) {
                    Evolve.Log.error(" EERR32495: Error while get stock list ");

                    error   =  true;
                    let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32495 : Error while get max date !",
                    result: stockList.message
                };
                res.send(obj);
                  }else if(getMaxDate.rowsAffected<1){
                    error = true ; 
                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "stock list",
                    result: resObj
                 };
                 res.send(obj);


                  }else{
                     req.body.maxDate = getMaxDate.recordset[0].maxDate
                  }
            }
            if(error == false){
                req.body.start = parseInt(req.body.startFrom);
                req.body.length = parseInt(req.body.displayRecord);

                let count = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getStockCount(req.body);


                let stockList = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getStockList(req.body);

                if (stockList instanceof Error) {
                Evolve.Log.error(" EERR32496: Error while get stock list ");
    
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR32496 : Error while get stock list !",
                        result: stockList.message
                    };

                    res.send(obj);
                } else {
                    let resObj = {
                        noOfRecord: count.recordset[0].count,
                        records: stockList.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "stock list",
                        result: resObj
                    };
                    res.send(obj);
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR32497: Error while get stock list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32497: Error while get stock list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    

    // getUnitList: async function (req, res) {
    //     try {
    //         let unitList = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getUnitList();
    //         if (unitList instanceof Error) {
    //         Evolve.Log.error(" EERR32463: Error while get unit list ");

    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "EERR32463 : Error while get unit list !",
    //                 result: unitList.message
    //             };
    //             res.send(obj);
    //         } else {
    //             // let resObj = {
    //             //     noOfRecord: count.recordset[0].count,
    //             //     records: unitList.recordset
    //             // }
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "unit list",
    //                 result: unitList.recordset
    //             };
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32464: Error while get unit list "+error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: " EERR32464: Error while get unit list "+error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },  
    // getItemSearch: async function (req, res) {
    //     try {
    //         let result = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getItemSearch(req.body.term);

    //         let obj = {
    //             statusCode: 200,
    //             status: "success",
    //             message: "Item search Successfully",
    //             result: result.recordset
    //         };
    //         res.send(obj);
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0207: Error while getting Item Search "+error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: " EERR0207: Error while getting Item Search "+error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },
    getWareHouseNameList: async function (req, res) {
        try {           
            let wareHouseList = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getWareHouseNameList();
            if (wareHouseList instanceof Error) {
            Evolve.Log.error(" EERR32498: Error while get ware house name list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32498 : Error while get ware house name list !",
                    result: wareHouseList.message
                };
                res.send(obj);
            } else {
         
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Ware house name list",
                    result: wareHouseList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32499: Error while get ware house name list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32499: Error while get ware house name list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    getUploadedDateList: async function (req, res) {
        try {         
            let dateList = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getUploadedDateList();
            if (dateList instanceof Error) {
            Evolve.Log.error(" EERR32500: Error while get ware uploaded date list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32500 : Error while get ware uploaded date list !",
                    result: dateList.message
                };
                res.send(obj);
            } else {
         
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Ware uploaded date list",
                    result: dateList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32501: Error while get ware uploaded date list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32501: Error while get ware uploaded date list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    getStockDetailList: async function (req, res) {
        try {

            let details = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getStockDetailList();
            if (details instanceof Error) {
            Evolve.Log.error(" EERR32502: Error while get stock detail list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32502 : Error while get stock detail list !",
                    result: details.message
                };
                res.send(obj);
            } else {
         
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Stock details",
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32503: Error while get stock detail list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32503: Error while get stock detail list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
     getStockDetaisByDate: async function (req, res) {
        try {

            let details = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getStockDetaisByDate(req.body);
            if (details instanceof Error) {
            Evolve.Log.error(" EERR32504: Error while get stock detail by date ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32504 : Error while get stock detail by date !",
                    result: details.message
                };
                res.send(obj);
            } else {
         
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Stock details",
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32505: Error while get stock detail by date "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32505: Error while get stock detail by date "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getLastDatearomWHName: async function (req, res) {
        try {

            let details = await Evolve.App.Services.Wms.stockMaintanance.SrvHistory.getLastDatearomWHName(req.body);
            if (details instanceof Error) {
            Evolve.Log.error(" EERR32506: Error while get lattest uploaded date of ware house name ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32506 : Error while get lattest uploaded date of ware house name !",
                    result: details.message
                };
                res.send(obj);
            } else {
                
         
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uploaded Date",
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32507: Error while get lattest uploaded date of ware house name "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32507: Error while get lattest uploaded date of ware house name "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}