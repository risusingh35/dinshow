'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProductList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getProductListCount(search);
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getProductList(start, length,search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Product List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Product list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Product list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // get ProductName List

    getProductNameList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getProductNameList(req.body);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Product List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product  List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Product  list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Product  list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

     // Product Colour Lisr
     getProductColourList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getProductColourList(req.body);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Product Colour List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product Colour   List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Product Colour   list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Product Colour   list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

     //   Get Product Design List 
     getProductDesignList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getProductDesignList(req.body);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Product Design List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product Design List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Product Design List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Product Design List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Get Customer List 
    getCustomerNameList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.getCustomerNameList(req.body);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Customer List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Customer List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Customer list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Customer list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SearchAllData: async function (req, res) {
        console.log("req.body>>>>>>>>>earch>>>>>>>>>>");
        try {
            console.log("req.body>>>>>>>>>>>>>>", req.body);
            let con = "WHERE ";

            if (req.body.EvolveProduct_Name != '' && req.body.EvolveProduct_Name != null && req.body.EvolveProduct_Name != undefined) {
				console.log("??????????????");
                con += "EP.EvolveProduct_Name = '" + req.body.EvolveProduct_Name + "'"
			}

            if (req.body.EvolveProductColour_Name != '' && req.body.EvolveProductColour_Name != null && req.body.EvolveProductColour_Name != undefined) {
				console.log("??????????????");
                con += " AND EPCLR.EvolveProductColour_Name = '" + req.body.EvolveProductColour_Name + "'"
			}

            if (req.body.EvolveProductDesign_Name != '' && req.body.EvolveProductDesign_Name != null && req.body.EvolveProductDesign_Name != undefined) {
				console.log("??????????????");
                con += " AND EPD.EvolveProductDesign_Name = '" + req.body.EvolveProductDesign_Name + "'"
 
			}

            if (req.body.EvolveCustomer_Name != '' && req.body.EvolveCustomer_Name != null && req.body.EvolveCustomer_Name != undefined) {
				console.log("??????????????");
                con += " AND EC.EvolveCustomer_Name = '" + req.body.EvolveCustomer_Name + "'"
			}
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvList.SearchAllData(con);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Searching List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Searching List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Searching list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Searching list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
   

}