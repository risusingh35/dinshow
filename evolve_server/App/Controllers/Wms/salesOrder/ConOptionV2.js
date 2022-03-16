'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //  Quote Header Api

    getSoDetails : async function (req, res) {
        try {
            let data = {};
            let details = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSoDetails(req.body.EvolveSalesOrder_ID);
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error("EERR2795: Error while  get so details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo details", result: null };
                res.send(obj);
            } else {

                // if (details.recordset[0].EvolveProdOrders_IsPicklistGenerated) {
                //     Evolve.Log.error("Pick list already generated")
                //     let obj = { statusCode: 400, status: "fail", message: "Pick list already generated", result: null };
                //     res.send(obj);
                // } else {
                data.soDetails = details.recordset;
                console.log(" data.soDetails????????????//",  data.soDetails);
                let soLineDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSoLineDetails(req.body.EvolveSalesOrder_ID);
                if (soLineDetails instanceof Error) {
                    Evolve.Log.error("EERR2795: Error while  get so details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get so Line details", result: null };
                    res.send(obj);
                } else {
                    data.soLineDetails = soLineDetails.recordset;
                    data.soDetails[0].EvolveTransHistory_Type = 'SOSHIPMENT'

                    console.log("data.soDetails[0].EvolveTransHistory_Type????" , data.soDetails[0].EvolveTransHistory_Type)
                    let materialShiped = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getTransHistory(data.soDetails[0]);
                    if (materialShiped instanceof Error) {
                        Evolve.Log.error("EERR####: Error while  get so details")
                        let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material Shiped again sales order", result: null };
                        res.send(obj);
                    } else {
                            data.materialShiped = materialShiped.recordset;
                            console.log("data????" ,  data)
                            let obj = { statusCode: 200, status: "success", message: "so production details", result: data };
                            res.send(obj);
                        }
                }
                // }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get so details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get so details " + error.message, result: null };
            res.send(obj);
        }
    },
     



    getCustomerList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getCustomerList(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get customer list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get customer list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get customer list " + error.message, result: null };
            res.send(obj);
        }
    },
    getCustomerDetails: async function (req, res) {
        try {
            console.log(":req.body?????" ,  req.body)
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getCustomerDetails(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get customer Details")
                let obj = { statusCode: 400, status: "fail", message: "Error while get customer Details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get customer Details " + error.message, result: null };
            res.send(obj);
        }
    },
    getAdressList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getAdressList(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get customer address List")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get customer address List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer address List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get customer address List " + error.message, result: null };
            res.send(obj);
        }
    },
    getProjectList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getProjectList();
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get project list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get project list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get project list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get project list " + error.message, result: null };
            res.send(obj);
        }
    },



    getItemList: async function (req, res) {
        try {

            let userDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getUserDetails(req.EvolveUser_ID);

            let data = {

                EvolveUnit_ID: userDetails.recordset[0].EvolveUnit_ID,
                search: req.body.term,
            }

            if (userDetails instanceof Error) {

                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit code", result: null };
                res.send(obj);


            } else {

                let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getItemList(data);
                if (result instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while get item list")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get item list", result: null };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                    res.send(obj);
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get item list " + error.message, result: null };
            res.send(obj);
        }
    },
    getCustList: async function (req, res) {
        try {

            // let userDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getUserDetails(req.EvolveUser_ID);

            let data = {
                search: req.body.term,
            }

            // if (userDetails instanceof Error) {

            //     let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit code", result: null };
            //     res.send(obj);


            // }else{

            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getCustList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get customer  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get customer  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }
            // }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer  list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get customer  list " + error.message, result: null };
            res.send(obj);
        }
    },

    getUserDetails: async function (req, res) {
        try {
            let userDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getUserDetails(req.EvolveUser_ID);

            if (userDetails instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get user details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get user details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "UserDetails", result: userDetails.recordset[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get item list " + error.message, result: null };
            res.send(obj);
        }
    },

    getItemDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getItemDetails(req.body);

            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Item Details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Item Details", result: null };
                res.send(obj);
            } else if (result.rowsAffected < 1) {

                Evolve.Log.error("EERR#### : Invalid Item")
                let obj = { statusCode: 400, status: "fail", message: "Invalid Item", result: null };
                res.send(obj);


            } else {
                let obj = { statusCode: 200, status: "success", message: "Item Details", result: result.recordset[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Item Desc " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Item Details " + error.message, result: null };
            res.send(obj);
        }
    },
    getTaxClassesList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getTaxClassesList();
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get tax classes list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get tax classes list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Tax Classes", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get tax classes list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get tax classes list " + error.message, result: null };
            res.send(obj);
        }
    },
    getSalesPersonList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSalesPersonList();
            if (list instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get sales person list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get sales person list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Sales Person List", result: list.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales person list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get sales person list " + error.message, result: null };
            res.send(obj);
        }
    },
    getCreditTermsList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getCreditTermsList();
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get credit terms list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get credit terms list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Tax Classes", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get credit terms list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get credit terms list " + error.message, result: null };
            res.send(obj);
        }
    },

    getApprovalMatrixList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getApprovalMatrixList(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Approval Matrix List")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Approval Matrix List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Approval MAtrix List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Matrix List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Approval Matrix List " + error.message, result: null };
            res.send(obj);
        }
    },
    geGenericCodeMasterList: async function (req, res) {
        try {
            let details = {
                channelList: [],
                modList: [],
                categoryList: [],
                taxEnvList: [],



            };
            let list = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.geGenericCodeMasterList();
            if (list instanceof Error) {

                Evolve.Log.error("EERR#### : Error while Get Generic Code Master List")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while Get Generic Code Master List", result: null };
                res.send(obj);
            } else {

                for (let i = 0; i < list.recordset.length; i++) {

                    if (list.recordset[i].EvolveGenericCodeMaster_Key == 'Channel') {
                        // etails.channelList = [] ;

                        details.channelList.push(list.recordset[i])

                    } else if (list.recordset[i].EvolveGenericCodeMaster_Key == 'MOD') {
                        // etails.modList = [] ;

                        details.modList.push(list.recordset[i])


                    } else if (list.recordset[i].EvolveGenericCodeMaster_Key == 'Taxenv') {
                        // etails.categoryList = [] ;
                        details.taxEnvList.push(list.recordset[i])


                    }
                }

                let obj = { statusCode: 200, status: "success", message: "Approval MAtrix List", result: details };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Generic Code Master List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Get Generic Code Master List " + error.message, result: null };
            res.send(obj);
        }
    },

    saveQuoteDetails: async function (req, res) {
        try {
            let salseQuoteSaveError = false;

            req.body.EvolveSalesOrder_LandedCost = parseFloat(req.body.EvolveSalesOrder_LandedCost.toString().replace(/,/g, ""));
            req.body.EvolveSalesOrder_ProfitMargin = parseFloat(req.body.EvolveSalesOrder_ProfitMargin.toString().replace(/,/g, ""));
            req.body.EvolveSalesOrder_TotalCustomerPrice = parseFloat(req.body.EvolveSalesOrder_TotalCustomerPrice.toString().replace(/,/g, ""));
            req.body.EvolveApprovalMatrix_ID = null;
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            req.body.EvolveSalesOrder_Status = 'SAVED';

            req.body.EvolveSalesOrder_SalesPerson = JSON.stringify(req.body.EvolveSalesOrder_SalesPerson);
            req.body.EvolveSalesOrder_AttachedDocument = JSON.stringify(req.body.EvolveSalesOrder_AttachedDocument);

            let saveQuoteHead = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.saveQuoteHeadDetails(req.body);

            if (saveQuoteHead instanceof Error || saveQuoteHead.rowsAffected < 1) {
                salseQuoteSaveError = true;
            } else {
                let EvolveSalesOrder_ID = saveQuoteHead.recordset[0].inserted_id;

                let EvolveSalesOrderLineArray = req.body.EvolveSalesOrder_Details;
                for (let i = 0; i < EvolveSalesOrderLineArray.length; i++) {

                    EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_OrderQty = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_OrderQty.toString().replace(/,/g, ""));


                    EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_CustomerUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_CustomerUnitPrice.toString().replace(/,/g, ""));

                    EvolveSalesOrderLineArray[i].EvolveItem_ItemUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveItem_ItemUnitPrice.toString().replace(/,/g, ""));

                    EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_TotalPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_TotalPrice.toString().replace(/,/g, ""));

                    EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice.toString().replace(/,/g, ""));
                }
                for (let i = 0; i < EvolveSalesOrderLineArray.length; i++) {
                    EvolveSalesOrderLineArray[i].EvolveUser_ID = req.EvolveUser_ID;
                    let saveQuoteLineDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.saveQuoteLineDetails(EvolveSalesOrderLineArray[i], EvolveSalesOrder_ID);
                    if (saveQuoteLineDetails instanceof Error || saveQuoteLineDetails.rowsAffected < 1) {
                        salseQuoteSaveError = true;
                    }

                }
            }


            // }
            if (salseQuoteSaveError == false) {
                let obj = { statusCode: 200, status: "success", message: "Salse Quote Saved Successfully", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while save Salse Quote Line Details", result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while save Salse Quote " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while save Salse Quote " + error.message, result: null };
            res.send(obj);
        }
    },

    getSingleSalesOrderDetaislById: async function (req, res) {
        try {
            let getSingelSalesQuoteHead = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSingelSalesQuoteHead(req.body.EvolveSalesOrder_ID);

            if (getSingelSalesQuoteHead instanceof Error || getSingelSalesQuoteHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while get single sales details head ")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details head ", result: null };
                res.send(obj);
            }
            else {


                let availableList = [];
                let documentList = (getSingelSalesQuoteHead.recordset[0].EvolveSalesOrder_AttachedDocument == null || getSingelSalesQuoteHead.recordset[0].EvolveSalesOrder_AttachedDocument == '') ? [] : JSON.parse(getSingelSalesQuoteHead.recordset[0].EvolveSalesOrder_AttachedDocument);
                for (let i = 0; i < documentList.length; i++) {
                    if (Evolve.Fs.existsSync(documentList[i].filePath)) {

                        availableList.push(documentList[i])
                    }
                }
                getSingelSalesQuoteHead.recordset[0].EvolveSalesOrder_AttachedDocument = availableList;
                let getSingelSalesQuoteDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSingelSalesQuoteDetails(req.body.EvolveSalesOrder_ID);
                if (getSingelSalesQuoteDetails instanceof Error || getSingelSalesQuoteDetails.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error while get single sales quote details ")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details", result: null };
                    res.send(obj);
                }
                else {

                    for (let i = 0; i < getSingelSalesQuoteDetails.recordset.length; i++) {


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerDiscount / 100) * getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice) + '';


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustTotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_OrderQty * (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerDiscount / 100)) * getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice) + '';

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_TotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_OrderQty * getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice;


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_OrderQty = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_OrderQty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_CustomerUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_TotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_TotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustTotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesOrderLine_AfterDiscountCustTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                    }

                    let resObj = {
                        salesQuoteHead: getSingelSalesQuoteHead.recordset,
                        salesQuoteHeadOriginal : getSingelSalesQuoteHead.recordset,
                        salesQuoteDetails: getSingelSalesQuoteDetails.recordset,
                        salesQuoteDetailsOriginal: getSingelSalesQuoteDetails.recordset,
                    }
                    let obj = { statusCode: 200, status: "success", message: "single sales details get succesfully", result: resObj };
                    res.send(obj);

                }

            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while save Salse Quote " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get single sales details " + error.message, result: null };
            res.send(obj);
        }
    },

    updateSalesQuoteById: async function (req, res) {
        try {
            req.body.EvolveApprovalMatrix_ID = null;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;

            req.body.EvolveSalesOrder_Status = 'SAVED';


            req.body.EvolveSalesOrder_AttachedDocument = JSON.stringify(req.body.EvolveSalesOrder_AttachedDocument);
            req.body.EvolveSalesOrder_SalesPerson = JSON.stringify(req.body.EvolveSalesOrder_SalesPerson);
            let updateSalesQuoteHead = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.updateSalesQuoteHead(req.body);

            if (updateSalesQuoteHead instanceof Error || updateSalesQuoteHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while delete salse quote head")
                error = true;
            } else {
                let deleteSalseQuoteDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.deleteSalseQuoteDetails(req.body.EvolveSalesOrder_ID);
                if (deleteSalseQuoteDetails instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while delete salse quote details")
                    error = true;
                }
                else {

                    let EvolveSalesOrderLineArray = req.body.EvolveSalesOrder_Details;

                    for (let i = 0; i < EvolveSalesOrderLineArray.length; i++) {

                        EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_OrderQty = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_OrderQty.toString().replace(/,/g, ""));


                        EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_CustomerUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_CustomerUnitPrice.toString().replace(/,/g, ""));

                        EvolveSalesOrderLineArray[i].EvolveItem_ItemUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveItem_ItemUnitPrice.toString().replace(/,/g, ""));

                        EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_TotalPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_TotalPrice.toString().replace(/,/g, ""));

                        EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice = parseFloat(EvolveSalesOrderLineArray[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice.toString().replace(/,/g, ""));




                    }
                    for (let i = 0; i < EvolveSalesOrderLineArray.length; i++) {
                        EvolveSalesOrderLineArray[i].EvolveUser_ID = req.EvolveUser_ID;
                        let updateQuoteLineDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.updateQuoteLineDetails(EvolveSalesOrderLineArray[i], req.body.EvolveSalesOrder_ID);
                        if (updateQuoteLineDetails instanceof Error || updateQuoteLineDetails.rowsAffected < 1) {
                            error = true;
                        }

                    }

                    if (error == false) {

                        req.body.EvolveApprovalMatrix_ID = null;

                        let matrixList = await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixRootDetails('SALESQUOTE');


                        if (matrixList instanceof Error) {

                            error = true;

                        }

                    }

                }
            }
            if (error == false) {
                let obj = { statusCode: 200, status: "success", message: "Salse Quote Updated Successfully", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while update Salse Quote Details", result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update salse quote by id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while delete salse quote by id " + error.message, result: null };
            res.send(obj);
        }
    },


    getSalesOrderNo: async function (req, res) {
        try {

            let salesQuoteNo = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('SALESQUOTE')
            if (salesQuoteNo == 0) {
                Evolve.Log.error("EERR0082 :Error get sales quote no")
                let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error get sales quote no", result: null };
                res.send(obj);

            } else {
                let obj = { statusCode: 200, status: "success", message: "Sales Quote No", result: salesQuoteNo };
                res.send(obj);


            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales quote no " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get sales quote no " + error.message, result: null };
            res.send(obj);
        }
    },

    changeSqStatusOnAmend: async function (req, res) {
        try {


            let changeStatus = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.changeSqStatusOnAmend(req.body);

            if (changeStatus instanceof Error || changeStatus.rowsAffected < 1) {

                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While Amend Sales Quote ", result: null };
                res.send(obj);

            } else {

                let obj = { statusCode: 200, status: "success", message: "Sales Quote Amended Successfully", result: null };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Amend Sales Quote" + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While Amend Sales Quote " + error.message, result: null };
            res.send(obj);
        }
    },
    onUploadFile: async function (req, res) {
        try {

            console.log("Entere in  file dat,<<<", req.body);

            if (req.files.fileData) {
                let fileData = req.files.fileData;
                let fileName = ((req.body.fimeName + '').split('.'))[0];
                let extention = (req.body.fimeName + '').split('.').pop();

                console.log("fileName>>>", fileName);
                console.log("extention>>>", extention);


                let filePath = Evolve.Config.SQDOCUMENTPATH + '/' + fileName + "_" + req.EvolveUser_ID + new Date().getTime() + "." + extention;

                console.log("filePath>>>", filePath)
                fileData.mv(filePath, async function (error) {
                    if (error) {
                        Evolve.Log.error(" EERR32728 : Error while upload file  " + error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // Evolve.Log.error(" EERR32465 :  "+error.message);
                        let obj = {
                            statusCode: 200, status: "Success", message: 'File upoaded successfully', result: {
                                filePath: filePath,
                                fileName: fileName + "_" + req.EvolveUser_ID + new Date().getTime() + "." + extention
                            }
                        };
                        res.send(obj);
                    }
                });


            }
        } catch (error) {
            Evolve.Log.error(" EERR32729: Error while upload file  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR32729: Error while upload file  " + error.message, result: null };
            res.send(obj);
        }
    },
    deleteResource: async function (req, res) {
        try {
            if (req.body.type == 'directory') {
                let error = false;

                await Evolve.Fs.rmdirSync(req.body.path, { recursive: true })
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Directory deleted successfully",
                    result: null
                };
                res.send(obj);
            } else {
                await Evolve.Fs.unlinkSync(req.body.path)

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "File deleted successfully",
                    result: null
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error("EERR32721 : error while delete resource" + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32721 : error while delete resource " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemAgreementDetails: async function (req, res) {
        try {
            let resultByDesignGroup = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getItemAgreementDetailsByDesignGroup(req.body);
            
            if (resultByDesignGroup instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Agreement details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Agreement details", result: null };
                res.send(obj);
            } else {
                let resultByItem = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getItemAgreementDetailsByItem(req.body);
            

                if (resultByItem instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while get Agreement details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Agreement details", result: null };
                    res.send(obj);
                } else {
                    for(let i= 0 ; i<resultByItem.recordset.length ; i++){

                        resultByDesignGroup.recordset.push(resultByItem.recordset[i]) ;
                    }
                }

                let obj = { statusCode: 200, status: "success", message: "Agreement details", result: resultByDesignGroup.recordset };
                console.log("obj>>>>>"  , obj)

                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Agreement details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Agreement details " + error.message, result: null };
            res.send(obj);
        }
    },

    getSalesOrderLineAmendmentHistory : async function (req , res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSalesOrderLineAmendmentHistory(req.body.lineData);
            if(list instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get sales order line amendment history", result: null };
                res.send(obj);
            }else if (list.rowsAffected < 1){
                let obj = { statusCode: 300, status: "fail", message: "EERR####: Error while get sales order line amendment history", result: null };
                res.send(obj);
            }else{
                let getMaximumIndex = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSalesOrderLineAmendmentHistoryMaxIndex(req.body.lineData);
                console.log("getMaximumIndex.recordset[0].max_index",getMaximumIndex.recordset[0].max_index);
                if(getMaximumIndex instanceof Error || getMaximumIndex.rowsAffected < 1){
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get sales order line amendment history", result: null };
                    res.send(obj);
                }else{
                    let resObj = {
                        record : list.recordset,
                        maxIndex : getMaximumIndex.recordset[0].max_index
                    }
                    let obj = { statusCode: 200, status: "success", message: "Sales Order Amendment History", result: resObj };
                    res.send(obj);
                }
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales order line amendment history " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get sales order line amendment history " + error.message, result: null };
            res.send(obj);
        }
    },

    getSalesOrderHeaderAmendmentHistory : async function (req , res) {
        try {
            let list = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getSalesOrderHeaderAmendmentHistory(req.body);
            if(list instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get sales order header amendment history", result: null };
                res.send(obj);
            }else if (list.rowsAffected < 1){
                let obj = { statusCode: 300, status: "fail", message: "EERR####: Error while get sales order header amendment history", result: null };
                res.send(obj);
            }else{
                let obj = { statusCode: 200, status: "success", message: "Sales Order Amendment History", result: list.recordset };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales order header amendment history " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get sales order header amendment history " + error.message, result: null };
            res.send(obj);
        }
    },

    saveSalesOrderAmendment : async function (req , res) {
        try {
            console.log("saveSalesOrderAmendment called:::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
            let dataToUpdate = req.body.updateData;
            console.log("dataToUpdate",dataToUpdate);
            let error = false;
            let errorMessage = "";
            let nextIndex = null;
            let getLastUpdatedIndex = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getLastUpdatedIndex(dataToUpdate[0].salesOrderId)
            if(getLastUpdatedIndex instanceof Error || getLastUpdatedIndex.rowsAffected < 1){
                error = true;
                errorMessage = "Error While Get Next Index!!"
            }else{
                if(getLastUpdatedIndex.recordset[0].max_index == null){
                    nextIndex = 1;
                }else{
                    nextIndex = (parseInt(getLastUpdatedIndex.recordset[0].max_index) + 1);
                }
            }
            if(error == false){
                for(let i = 0 ; i < dataToUpdate.length ; i++){
                    dataToUpdate[i].EvolveUser_ID = req.EvolveUser_ID;
                    dataToUpdate[i].EvolveSalesOrderModifiedData_Index = nextIndex
                    if(error == false){
                        if(dataToUpdate[i].action == 'UPDATE'){
                            if(dataToUpdate[i].salesOrderLineId == null ){
                                let updateSalesOrderData = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.updateDataInTable('EvolveSalesOrder' , dataToUpdate[i].key , dataToUpdate[i].newValue , req.EvolveUser_ID ,  dataToUpdate[i].salesOrderId);
                                if(updateSalesOrderData instanceof Error || updateSalesOrderData.rowsAffected < 1){
                                    error = true;
                                    errorMessage = "Error While Update Sales Order!!"
                                }
                            }else{
                                let updateSalesOrderData = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.updateDataInTable('EvolveSalesOrderLine' , dataToUpdate[i].key , dataToUpdate[i].newValue ,req.EvolveUser_ID, dataToUpdate[i].salesOrderLineId);
                                if(updateSalesOrderData instanceof Error || updateSalesOrderData.rowsAffected < 1){
                                    error = true;
                                    errorMessage = "Error While Update Sales Order Line!!"
                                }
                            }
                        }
                        if(dataToUpdate[i].action == 'ADD'){
                            let getAddedLineId = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.getAddedLineId(dataToUpdate[i].salesOrderId , dataToUpdate[i].salesOrderLineId);
                            if(getAddedLineId instanceof Error || getAddedLineId.rowsAffected < 1){
                                error = true;
                                errorMessage = "Error While Get Added Sales Order LIne ID!!"
                            }else{
                                dataToUpdate[i].salesOrderLineId = getAddedLineId.recordset[0].EvolveSalesOrderLine_ID;
                            }
                        }
                        
                        let addRecordInSaledOrderModifiedData =  await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.addRecordInSaledOrderModifiedData(dataToUpdate[i]);
                        if(addRecordInSaledOrderModifiedData instanceof Error || addRecordInSaledOrderModifiedData.rowsAffected < 1){
                            error = true;
                            errorMessage = "Error While Add Sales Order Line History!!"
                        }
                    }
                }
            }

            if(error == false) {
                let updateSalesOrderStatus = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.updateSalesOrderStatus(dataToUpdate[0].salesOrderId , 'SAVED')
                if(updateSalesOrderStatus instanceof Error || updateSalesOrderStatus.rowsAffected < 1){
                    error = true;
                    errorMessage = "Error While Update Sales Order Status!!"
                }
            }
            
            if(error == false){
            let obj = { statusCode: 200, status: "success", message: " Saved Successfully!! ", result: null };
            res.send(obj);
            }else{
                Evolve.Log.error(" EERR####: Error while Save Sales Order Amendment Histrory" + errorMessage);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Save Sales Order Amendment Histrory" + errorMessage, result: null };
            res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Sales Order Amendment " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Save Sales Order Amendment " + error.message, result: null };
            res.send(obj);
        }
    },

    addOrDeleteLineDetails : async function (req , res) {
        try {
            let dataToAdd = req.body.newAddLineDetails;
            let dataToDelete = req.body.deletedLineDetails;
            let error = false;
            let errorMessage = "";
            console.log("dataToAdd",dataToAdd);
            for (let i = 0; i < dataToAdd.length; i++) {

                dataToAdd[i].EvolveSalesOrderLine_OrderQty = parseFloat(dataToAdd[i].EvolveSalesOrderLine_OrderQty.toString().replace(/,/g, ""));


                dataToAdd[i].EvolveSalesOrderLine_CustomerUnitPrice = parseFloat(dataToAdd[i].EvolveSalesOrderLine_CustomerUnitPrice.toString().replace(/,/g, ""));

                dataToAdd[i].EvolveItem_ItemUnitPrice = parseFloat(dataToAdd[i].EvolveItem_ItemUnitPrice.toString().replace(/,/g, ""));

                dataToAdd[i].EvolveSalesOrderLine_TotalPrice = parseFloat(dataToAdd[i].EvolveSalesOrderLine_TotalPrice.toString().replace(/,/g, ""));

                dataToAdd[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice = parseFloat(dataToAdd[i].EvolveSalesOrderLine_AfterDiscountCustUnitPrice.toString().replace(/,/g, ""));
            }
            for (let i = 0; i < dataToAdd.length; i++) {
                console.log("Called Add",dataToAdd[i] );
                dataToAdd[i].EvolveUser_ID = req.EvolveUser_ID;
                let saveQuoteLineDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.saveQuoteLineDetails(dataToAdd[i], dataToAdd[i].EvolveSalesOrder_ID);
                console.log("saveQuoteLineDetails",saveQuoteLineDetails);
                if (saveQuoteLineDetails instanceof Error || saveQuoteLineDetails.rowsAffected < 1) {
                    error = true;
                    i = dataToAdd.length
                }
            }
            if(error == false){
                for (let i = 0; i < dataToDelete.length; i++) {
                    dataToDelete[i].EvolveUser_ID = req.EvolveUser_ID;
                    let deleteSalesQuoteDetails = await Evolve.App.Services.Wms.salesOrder.SrvOptionV2.deleteSalesQuoteDetails(dataToDelete[i], EvolveSalesOrder_ID);
                    if (deleteSalesQuoteDetails instanceof Error || deleteSalesQuoteDetails.rowsAffected < 1) {
                        error = true;
                        i = dataToDelete.length
                    }
                }
            }

            if(error == false) {
                let obj = { statusCode: 200, status: "success", message: "Saves Successfully", result: null };
                res.send(obj);
            }else{
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Add Or Delete Sales Order Line Amendment " + errorMessage, result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Sales Order Amendment " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Save Sales Order Amendment " + error.message, result: null };
            res.send(obj);
        }
    },

}