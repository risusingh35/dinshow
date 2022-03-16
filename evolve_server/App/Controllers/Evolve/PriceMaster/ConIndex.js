'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPriceMasterList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let getPriceMasterListCount = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.getPriceMasterListCount(search);
            let getPriceMasterList = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.getPriceMasterList(start,length,search);
            if (getPriceMasterList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get price master !",
                    result: getPriceMasterList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getPriceMasterListCount.recordset[0].count,
                    records: getPriceMasterList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Price Master List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while getting Price Master list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while getting Price Master list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addPriceMaster: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkPriceMaster = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.checkPriceMaster(req.body);
            if (checkPriceMaster.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Price Master already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.addPriceMaster(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on add price master !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Price master created successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0202: Error while adding bom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0202: Error while adding bom "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getBomDisplaySeq: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.Bom.SrvList.getBomDisplaySeq(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "sucess",
                result: processData.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0203: Error while getting Bom Display Seq "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0203: Error while getting Bom Display Seq "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSinglePriceMaster: async function (req, res) {
        try {
            let priceMasterData = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.getSinglePriceMaster(req.body);
            if(priceMasterData instanceof Error || priceMasterData.rowsAffected < 1){
                let obj = {
                    statusCode:400,
                    status: "fail",
                    message: "Error while getting single price master data",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single price list master gotted successfully !",
                    result: priceMasterData.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while getting single price list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while getting single price list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updatePriceList: async function (req, res) {
        try {
            let checkPriceMasterEdit = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.checkPriceMasterEdit(req.body);
            if (checkPriceMasterEdit.recordset[0].count > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Price list already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.updatePriceList(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on update price list !" ,
                        result: null 
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Price list update successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error("Error on update price list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error on update price list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    uploadPriceCsv: async function(req, res) {
        try {
           // console.log("req.File >>>>", req.files.csvFile)
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'Price_'+date.getFullYear()+'_'+date.getMonth()+'_'+date.getDate()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'.'+ext;
                // let fileName = date.getTime()+'.'+ext;
                // Use the mv() method to place the file somewhere on your server
                console.log("Evolve.Config.priceMasterCsvPath :",Evolve.Config.priceMasterCsvPath);
                // ./public/csv/customers
                csv.mv(Evolve.Config.priceMasterCsvPath+fileName, async function(error) {
                  if (error){
                    // console.log("Error in File Upload ::", error.message);
                    let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                    res.send(obj);
                  }else{
                    let priceArray = await Evolve.Csv().fromFile(Evolve.Config.priceMasterCsvPath+fileName);
                    let price_errorStatus = false;
                    for(let i=0; i < priceArray.length; i++)
                    {
                        if(price_errorStatus == false)
                        {
                            let mrpPrice = priceArray[i]['MRP Price'].replace(",", "");
                            let priceData = {
                                EvolvePriceList_Code : priceArray[i]['Price Code'],
                                EvolvePriceList_ItemCode : priceArray[i]['Item Code'],
                                EvolvePriceList_ItemDesc : priceArray[i]['Item Description'],
                                EvolvePriceList_StdPktSize : priceArray[i]['Standard Packing size'],
                                EvolvePriceList_MinimumSize : priceArray[i]['Minimum Qty'],
                                EvolvePriceList_StartDate : priceArray[i]['Start Date'],
                                EvolvePriceList_ExpriryDate : priceArray[i]['Expire Date'],
                                EvolvePriceList_MRPPrice : parseInt(mrpPrice),
                                EvolvePriceList_CouponOf : priceArray[i]['Coupon Of'],
                                EvolveUser_ID : req.body.EvolveUser_ID
                            };
                            // console.log("i:",i)
                            // console.log("priceData :",priceData)
                            let checkPriceExits = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.checkPriceMaster(priceData);
                            if(checkPriceExits.rowsAffected > 0)
                            {
                                priceData.EvolvePriceList_ID = checkPriceExits.recordset[0].EvolvePriceList_ID;
                                // console.log("priceData.EvolvePriceList_ID :",priceData.EvolvePriceList_ID);
                                let updateCustomer = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.updatePriceList(priceData);
                                if(updateCustomer.rowsAffected <= 0){
                                    price_errorStatus = true;
                                    Evolve.Log.error(updateCustomer.message);
                                }
                            }
                            else
                            {
                                let addCustomer = await Evolve.App.Services.Evolve.PriceMaster.SrvIndex.addPriceMaster(priceData);
                                if(addCustomer.rowsAffected <= 0){
                                    price_errorStatus = true;
                                    Evolve.Log.error(addCustomer.message);
                                }
                            }
                        }
                    }

                    if(price_errorStatus == true)
                    {
                        let obj = { statusCode: 400, status: "fail", message: 'Error while uploading price master', result: null };
                        res.send(obj);
                    }
                    else
                    {
                        let obj = { statusCode: 200, status: "success", message: 'Price master uploaded succsessfully', result: null };
                        res.send(obj);
                    }
                  }
                });
              }
        } catch (error) {
            Evolve.Log.error("Error while uploading price csv "+error.message);
            let obj = { statusCode: 400, status: "fail !", message: "Error while uploading price csv "+error.message, result: null };
            res.send(obj);
        }
    },


}