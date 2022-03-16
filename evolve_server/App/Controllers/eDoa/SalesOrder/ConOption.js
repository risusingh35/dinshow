'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //  Quote Header Api
    getCustomerList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getCustomerList(req.body);
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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getCustomerDetails(req.body);
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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getAdressList(req.body);
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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getProjectList();
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

            let userDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getUserDetails(req.EvolveUser_ID);

            let data = {

                EvolveUnit_ID: userDetails.recordset[0].EvolveUnit_ID,
                search: req.body.term,
            }

            if (userDetails instanceof Error) {

                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit code", result: null };
                res.send(obj);


            } else {

                let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getItemList(data);
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

            // let userDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getUserDetails(req.EvolveUser_ID);

            let data = {
                search: req.body.term,
            }

            // if (userDetails instanceof Error) {

            //     let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit code", result: null };
            //     res.send(obj);


            // }else{

            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getCustList(data);
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
            let userDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getUserDetails(req.EvolveUser_ID);

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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getItemDetails(req.body);

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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getTaxClassesList();
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
            let list = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getSalesPersonList();
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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getCreditTermsList();
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
            let result = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getApprovalMatrixList(req.body);
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
            let list = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.geGenericCodeMasterList();
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

            req.body.EvolveSO_LandedCost = parseFloat(req.body.EvolveSO_LandedCost.toString().replace(/,/g, ""));
            req.body.EvolveSO_ProfitMargin = parseFloat(req.body.EvolveSO_ProfitMargin.toString().replace(/,/g, ""));
            req.body.EvolveSO_TotalCustomerPrice = parseFloat(req.body.EvolveSO_TotalCustomerPrice.toString().replace(/,/g, ""));
            req.body.EvolveApprovalMatrix_ID = null;
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            req.body.EvolveSO_Status = 'SAVED';

            req.body.EvolveSO_SalesPerson = JSON.stringify(req.body.EvolveSO_SalesPerson);
            req.body.EvolveSO_AttachedDocument = JSON.stringify(req.body.EvolveSO_AttachedDocument);

            let saveQuoteHead = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.saveQuoteHeadDetails(req.body);

            if (saveQuoteHead instanceof Error || saveQuoteHead.rowsAffected < 1) {
                salseQuoteSaveError = true;
            } else {
                let EvolveSO_ID = saveQuoteHead.recordset[0].inserted_id;

                let EvolveSODetailsArray = req.body.EvolveSO_Details;
                for (let i = 0; i < EvolveSODetailsArray.length; i++) {

                    EvolveSODetailsArray[i].EvolveSODetails_Qty = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_Qty.toString().replace(/,/g, ""));


                    EvolveSODetailsArray[i].EvolveSODetails_CustomerUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_CustomerUnitPrice.toString().replace(/,/g, ""));

                    EvolveSODetailsArray[i].EvolveItem_ItemUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveItem_ItemUnitPrice.toString().replace(/,/g, ""));

                    EvolveSODetailsArray[i].EvolveSODetails_TotalPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_TotalPrice.toString().replace(/,/g, ""));

                    EvolveSODetailsArray[i].EvolveSODetails_AfterDiscountCustUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_AfterDiscountCustUnitPrice.toString().replace(/,/g, ""));
                }
                for (let i = 0; i < EvolveSODetailsArray.length; i++) {
                    EvolveSODetailsArray[i].EvolveUser_ID = req.EvolveUser_ID;
                    let saveQuoteLineDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.saveQuoteLineDetails(EvolveSODetailsArray[i], EvolveSO_ID);
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

    getSinglesalesOrderDetaislById: async function (req, res) {
        try {
            let getSingelSO = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getSingelSO(req.body.EvolveSO_ID);

            if (getSingelSO instanceof Error || getSingelSO.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while get single sales details head ")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details head ", result: null };
                res.send(obj);
            }
            else {


                let availableList = [];
                let documentList = (getSingelSO.recordset[0].EvolveSO_AttachedDocument == null || getSingelSO.recordset[0].EvolveSO_AttachedDocument == '') ? [] : JSON.parse(getSingelSO.recordset[0].EvolveSO_AttachedDocument);
                for (let i = 0; i < documentList.length; i++) {
                    if (Evolve.Fs.existsSync(documentList[i].filePath)) {

                        availableList.push(documentList[i])
                    }
                }
                getSingelSO.recordset[0].EvolveSO_AttachedDocument = availableList;
                let getSingelSalesQuoteDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getSingelSalesQuoteDetails(req.body.EvolveSO_ID);
                if (getSingelSalesQuoteDetails instanceof Error || getSingelSalesQuoteDetails.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error while get single sales quote details ")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details", result: null };
                    res.send(obj);
                }
                else {

                    for (let i = 0; i < getSingelSalesQuoteDetails.recordset.length; i++) {


                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustUnitPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerDiscount / 100) * getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice) + '';


                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustTotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_Qty * (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerDiscount / 100)) * getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice) + '';

                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_TotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_Qty * getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice;


                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_Qty = (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_Qty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));


                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_CustomerUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_TotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_TotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustTotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSODetails_AfterDiscountCustTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                    }

                    let resObj = {
                        soHeadDetails: getSingelSO.recordset,
                        soLineDetails: getSingelSalesQuoteDetails.recordset,
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

    updatesalesOrderById: async function (req, res) {
        try {
            req.body.EvolveApprovalMatrix_ID = null;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;

            req.body.EvolveSO_Status = 'SAVED';


            req.body.EvolveSO_AttachedDocument = JSON.stringify(req.body.EvolveSO_AttachedDocument);
            req.body.EvolveSO_SalesPerson = JSON.stringify(req.body.EvolveSO_SalesPerson);
            let updateSO = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.updateSO(req.body);

            if (updateSO instanceof Error || updateSO.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while delete salse quote head")
                error = true;
            } else {
                let deleteSalseQuoteDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.deleteSalseQuoteDetails(req.body.EvolveSO_ID);
                if (deleteSalseQuoteDetails instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while delete salse quote details")
                    error = true;
                }
                else {

                    let EvolveSODetailsArray = req.body.EvolveSO_Details;

                    for (let i = 0; i < EvolveSODetailsArray.length; i++) {

                        EvolveSODetailsArray[i].EvolveSODetails_Qty = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_Qty.toString().replace(/,/g, ""));


                        EvolveSODetailsArray[i].EvolveSODetails_CustomerUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_CustomerUnitPrice.toString().replace(/,/g, ""));

                        EvolveSODetailsArray[i].EvolveItem_ItemUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveItem_ItemUnitPrice.toString().replace(/,/g, ""));

                        EvolveSODetailsArray[i].EvolveSODetails_TotalPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_TotalPrice.toString().replace(/,/g, ""));

                        EvolveSODetailsArray[i].EvolveSODetails_AfterDiscountCustUnitPrice = parseFloat(EvolveSODetailsArray[i].EvolveSODetails_AfterDiscountCustUnitPrice.toString().replace(/,/g, ""));




                    }
                    for (let i = 0; i < EvolveSODetailsArray.length; i++) {
                        EvolveSODetailsArray[i].EvolveUser_ID = req.EvolveUser_ID;
                        let updateQuoteLineDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.updateQuoteLineDetails(EvolveSODetailsArray[i], req.body.EvolveSO_ID);
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


    getsalesOrderNo: async function (req, res) {
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


            let changeStatus = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.changeSqStatusOnAmend(req.body);

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
            let resultByDesignGroup = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getItemAgreementDetailsByDesignGroup(req.body);
            
            if (resultByDesignGroup instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Agreement details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Agreement details", result: null };
                res.send(obj);
            } else {
                let resultByItem = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getItemAgreementDetailsByItem(req.body);
            

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

}