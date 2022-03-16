'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStockList: async function (req, res) {
        try {
            
            let getMaxDate = await Evolve.App.Services.Wms.stockMaintanance.SrvList.getMaxDateOfStock();
            if (getMaxDate instanceof Error) {
                Evolve.Log.error(" EERR32482: Error while get stock list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32482 : Error while get max date !",
                    result: stockList.message
                };
                res.send(obj);

            }else if(getMaxDate.rowsAffected<1){
                let resObj = {
                    noOfRecord: 0,
                    records: []
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "stock list",
                    result: resObj
                };
                res.send(obj);


            }else{
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let maxDate = getMaxDate.recordset[0].maxDate
            

            let count = await Evolve.App.Services.Wms.stockMaintanance.SrvList.getStockCount(search,maxDate);

            let stockList = await Evolve.App.Services.Wms.stockMaintanance.SrvList.getStockList(start , length, search,maxDate);
            
            if (stockList instanceof Error) {
            Evolve.Log.error(" EERR32463: Error while get stock list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32463 : Error while get stock list !",
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
            Evolve.Log.error(" EERR32464: Error while get stock list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32464: Error while get stock list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
 
    getInvDetails: async function (req, res) {
        try {
            let invDetails = await Evolve.App.Services.Wms.stockMaintanance.SrvList.getinvDetails(req.body);
            if (invDetails instanceof Error) {
            Evolve.Log.error(" EERR32476: Error while get stock details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32476 : Error while get stock details !",
                    result: invDetails.message
                };
                res.send(obj);
            } else if(invDetails.rowsAffected<1){
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "stock details not found !",
                    result: invDetails.recordset
                };
                res.send(obj);

            }else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "stock details",
                    result: invDetails.recordset
                };
                res.send(obj);
            }
            // res.send({
            //     result : 'sssss'
            // })
        } catch (error) {
            Evolve.Log.error(" EERR32477: Error while get stock details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32477: Error while get stock details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    

    
    updateInvQty: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID                
            let invDetails = await Evolve.App.Services.Wms.stockMaintanance.SrvList.updateInvQty(req.body);
            if (invDetails instanceof Error) {
            Evolve.Log.error(" EERR32478: Error while update stock details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32478 : Error while update stock details !",
                    result: invDetails.message
                };
                res.send(obj);
            } else if(invDetails.rowsAffected<1){
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "stock details not found !",
                    result: invDetails.recordset
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "stock details updated successfully",
                    result: invDetails.recordset
                };
                res.send(obj);
            // }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32479: Error while update stock details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32479: Error while update stock details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
    uploadStock: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'StockMaintanance_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/' + fileName, async function (error) {
                    if (error) {
                        Evolve.Log.error(" EERR32465 :  "+error.message);

                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let stockDetails = await Evolve.Csv().fromFile('./csv/' + fileName);
                        // console.log("stockDetails>>>" ,  stockDetails)
                        let errorStatus = false;
                        let errorMessege = '';

                
                        for (let i = 0; i < stockDetails.length; i++) {
                        

                            if(errorStatus == false){
                            if ( stockDetails[i]['Batch Number'] == undefined || stockDetails[i]['Quantity'] == undefined  || stockDetails[i]['Batch Number'] == '' || stockDetails[i]['Quantity'] == '' || stockDetails[i]['Stock Date'] == '' || stockDetails[i]['Stock Date'] == undefined || stockDetails[i]['Ware House Name'] == '' || stockDetails[i]['Ware House Name'] == undefined ) {

                                errorStatus = true;
                                errorMessege = 'Stock date ,  Ware House Name ,  Batch Number and Quntity  can not be blank or undefined'
                            }
                            let  str  =  stockDetails[i]['Quantity'] + ''
                            str = str.replace(/,/g, "")
                            stockDetails[i]['Quantity'] = str;

                            if(typeof( parseFloat(stockDetails[i]['Quantity'])) != 'number'){
                                errorStatus = true ;
                                errorMessege = 'qty must be in  number '

                                
                            }
                            }

                        }

              
                        if(errorStatus == false){
                            for (let i = 0; i < stockDetails.length; i++) {

                                if(errorStatus == false){
                                    let  year  = new Date().getUTCFullYear()+''
                                    var last2 = year.slice(-2);
                                    let date = last2+(stockDetails[i]['Stock Date']).slice(6,8) +'-'+ (stockDetails[i]['Stock Date']).slice(3,5)+'-'+(stockDetails[i]['Stock Date']).slice(0,2)
                                    stockDetails[i]['Stock Date'] = date;
                                    let checkInvExist = await Evolve.App.Services.Wms.stockMaintanance.SrvList.checkInvExist(stockDetails[i]);
                                    if (checkInvExist instanceof Error ) {
                                        errorStatus = true ;
                                        errorMessege = 'Error While check inventory data'
                                    }else if(checkInvExist.rowsAffected > 0){
                                        let userDetails = {
                                            EvolveCompany_ID : req.EvolveCompany_ID ,
                                            EvolveUnit_ID : req.EvolveUnit_ID ,
                                            EvolveUser_ID : req.EvolveUser_ID ,
                                        }
                                        let updateInv = await Evolve.App.Services.Wms.stockMaintanance.SrvList.updateInv(userDetails,checkInvExist.recordset[0].EvolveCustomStockTake_ID ,stockDetails[i] );
                                        if (updateInv instanceof Error || updateInv.rowsAffected < 1 ) {
                                            errorStatus = true ;
                                            errorMessege = 'Error While update inventory data'
                                        }
                                    }else{
                                        let userDetails = {
                                            EvolveCompany_ID : req.EvolveCompany_ID ,
                                            EvolveUnit_ID : req.EvolveUnit_ID ,
                                            EvolveUser_ID : req.EvolveUser_ID ,
                                        }
                                        let addInv = await Evolve.App.Services.Wms.stockMaintanance.SrvList.addInv(userDetails ,stockDetails[i]);
                                        if (addInv instanceof Error || addInv.rowsAffected < 1 ) {
                                            errorStatus = true ;
                                            errorMessege = 'Error While add inventory data'
                                        }

                                    }
                   
                                }

                            }
                        }   
                        if (errorStatus == true) {
                          Evolve.Log.error(" EERR32466 : "+errorMessege);
                            let obj = { statusCode: 400, status: "fail", message: 'EERR32466 : '+errorMessege, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Stock loaded successfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR32467: Error while uploading csv  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR32467: Error while uploading csv  "+error.message, result: null };
            res.send(obj);
        }
    },
    addOrUpdateStock: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID     
            req.body.EvolveCompany_ID = req.EvolveCompany_ID ;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID ;
            
            if(req.body.EvolveCustomStockTake_ID == null || req.body.EvolveCustomStockTake_ID == '' )
            {
                let addStock = await Evolve.App.Services.Wms.stockMaintanance.SrvList.addStockDetails(req.body);
                if (addStock instanceof Error) {
                Evolve.Log.error(" EERR32483: Error while add new stock details");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR32483 : Error while add new stock details!",
                        result: addStock.message
                    };
                    res.send(obj);
                } else if(addStock.rowsAffected<1){
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "stock details not found !",
                        result: addStock.recordset
                    };
                    res.send(obj);

                }else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "stock details added successfully",
                        result: addStock.recordset
                    };
                    res.send(obj);
                // }
                }
            }else{
                let updateStock = await Evolve.App.Services.Wms.stockMaintanance.SrvList.updateStockDetails(req.body);
                if (updateStock instanceof Error) {
                Evolve.Log.error(" EERR32484: Error while update stock details");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR32484 : Error while update stock details!",
                        result: updateStock.message
                    };
                    res.send(obj);
                } else if(updateStock.rowsAffected<1){
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "stock details not found !",
                        result: updateStock.recordset
                    };
                    res.send(obj);

                }else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "stock details added successfully",
                        result: updateStock.recordset
                    };
                    res.send(obj);
                // }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR32485: Error while add or update stock details"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32485: Error while add or update stock details"+error.message,
                result: null
            };
            res.send(obj);
        }
    },    




}