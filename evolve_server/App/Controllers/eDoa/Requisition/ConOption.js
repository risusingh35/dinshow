'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //  Quote Header Api
    getSupplierList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getSupplierList(req.body);
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
    getSupplierDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getSupplierDetails(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get supplier Details")
                let obj = { statusCode: 400, status: "fail", message: "Error while get supplier Details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Supplier Details", result: result.recordset[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get supplier Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get supplier Details " + error.message, result: null };
            res.send(obj);
        }
    },
    getAdressList: async function (req, res) {
        // console.log("re.body>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.body);
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getAdressList(req.body);
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
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getProjectList();
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
    getCategoryList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getCategoryList();
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Category List")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Category List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Category List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Category List " + error.message, result: null };
            res.send(obj);
        }
    },



    getItemList: async function (req, res) {
        try {
// console.log("req.bo>>>>>>>>>>>>>>>>>>>>>dy",req.body);
            let userDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.getUserDetails(req.EvolveUser_ID);

            let data = {

                EvolveUnit_ID: userDetails.recordset[0].EvolveUnit_ID,
                search: req.body.term,
            }

            if (userDetails instanceof Error) {

                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit code", result: null };
                res.send(obj);


            } else {

                let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getItemList(data);
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
    getSupList: async function (req, res) {
        try {
            // console.log("req.body>>>>>>>>>>>>>>>>>>>>>>>>>>getSupList",req.body);
            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getSupList(data);
            // console.log("req.body>>>>>>>>>>>>>>>>>>>>>Result>>>>>getSupList",result);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get supplier  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get supplier  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get supplier  list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get supplier  list " + error.message, result: null };
            res.send(obj);
        }
    },

    getShipList: async function (req, res) {
        try {
            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getShipList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get supplier  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get supplier  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get supplier  list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get supplier  list " + error.message, result: null };
            res.send(obj);
        }
    },

    getUserDetails: async function (req, res) {
        try {
            let userDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.getUserDetails(req.EvolveUser_ID);

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
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getItemDetails(req.body);

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
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getTaxClassesList();
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
            let list = await Evolve.App.Services.eDoa.Requisition.SrvOption.getSalesPersonList();
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
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getCreditTermsList();
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
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getApprovalMatrixList(req.body);
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
                currencyList: [],




            };
            let list = await Evolve.App.Services.eDoa.Requisition.SrvOption.geGenericCodeMasterList();
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


                    } else if (list.recordset[i].EvolveGenericCodeMaster_Key == 'Currency') {

                        details.currencyList.push(list.recordset[i])


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

    saveRequisitionDetails: async function (req, res) {
        try {
            console.log("req.body>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>saveRequisitionDetails",req.body);
            let isError = false;
            req.body.EvolvePR_TotalCost = (req.body.EvolvePR_TotalCost==null || req.body.EvolvePR_TotalCost==undefined || req.body.EvolvePR_TotalCost==NaN || req.body.EvolvePR_TotalCost=='') ? null : parseFloat(req.body.EvolvePR_TotalCost.toString().replace(/,/g, ""));

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let saveReqHead = await Evolve.App.Services.eDoa.Requisition.SrvOption.saveReqHeadDetails(req.body);

            if (saveReqHead instanceof Error || saveReqHead.rowsAffected < 1) {
                isError = 'Error While Save Head Details';
            } else {
                let PRDetails = req.body.EvolvePRDetails;
                for (let i = 0; i < PRDetails.length; i++) {
                    console.log(PRDetails[i])
                    PRDetails[i].EvolvePR_ID = saveReqHead.recordset[0].inserted_id;

                    PRDetails[i].EvolvePRDetails_Qty = (PRDetails[i].EvolvePRDetails_Qty==null || PRDetails[i].EvolvePRDetails_Qty==undefined || PRDetails[i].EvolvePRDetails_Qty==NaN || PRDetails[i].EvolvePRDetails_Qty=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_Qty.toString().replace(/,/g, ""));

                    PRDetails[i].EvolvePRDetails_ItemUnitPrice = (PRDetails[i].EvolvePRDetails_ItemUnitPrice==null || PRDetails[i].EvolvePRDetails_ItemUnitPrice==undefined || PRDetails[i].EvolvePRDetails_ItemUnitPrice==NaN || PRDetails[i].EvolvePRDetails_ItemUnitPrice=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_ItemUnitPrice.toString().replace(/,/g, ""));

                    PRDetails[i].EvolvePRDetails_ItemTotalPrice = (PRDetails[i].EvolvePRDetails_ItemTotalPrice==null || PRDetails[i].EvolvePRDetails_ItemTotalPrice==undefined || PRDetails[i].EvolvePRDetails_ItemTotalPrice==NaN || PRDetails[i].EvolvePRDetails_ItemTotalPrice=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_ItemTotalPrice.toString().replace(/,/g, ""));

                }
                for (let i = 0; i < PRDetails.length; i++) {
                    PRDetails[i].EvolveUser_ID = req.EvolveUser_ID;
                    let saveLineDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.savePRLineDetails(PRDetails[i]);
                    if (saveLineDetails instanceof Error || saveLineDetails.rowsAffected < 1) {
                        isError = 'Error While Save Line Details';
                    }
                }
            }
            // }
            if (isError == false) {
                let obj = { statusCode: 200, status: "success", message: "Salse Quote Saved Successfully", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: isError, result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while save Salse Quote " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while save Salse Quote " + error.message, result: null };
            res.send(obj);
        }
    },
    updateRequisitionById: async function (req, res) {
        try {
            req.body.EvolveApprovalMatrix_ID = null;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            let error = false;
            let updateHead = await Evolve.App.Services.eDoa.Requisition.SrvOption.updateReqHeadDetails(req.body);

            if (updateHead instanceof Error || updateHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while Update PR Head Details")
                error = true;
            } else {
                let deleteLine = await Evolve.App.Services.eDoa.Requisition.SrvOption.deleteRequisitionLineDetails(req.body.EvolvePR_ID);
                if (deleteLine instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while Delete PR Line Details")
                    error = true;
                }
                else {
                    let PRDetails = req.body.EvolvePRDetails;
                    for (let i = 0; i < PRDetails.length; i++) {
                        PRDetails[i].EvolvePR_ID = req.body.EvolvePR_ID;
                        // PRDetails[i].EvolvePRDetails_Qty = parseFloat(PRDetails[i].EvolvePRDetails_Qty.toString().replace(/,/g, ""));
                        // PRDetails[i].EvolvePRDetails_ItemUnitPrice = parseFloat(PRDetails[i].EvolvePRDetails_ItemUnitPrice.toString().replace(/,/g, ""));
                        // PRDetails[i].EvolvePRDetails_ItemTotalPrice = parseFloat(PRDetails[i].EvolvePRDetails_ItemTotalPrice.toString().replace(/,/g, ""));

                        PRDetails[i].EvolvePRDetails_Qty = (PRDetails[i].EvolvePRDetails_Qty==null || PRDetails[i].EvolvePRDetails_Qty==undefined || PRDetails[i].EvolvePRDetails_Qty==NaN || PRDetails[i].EvolvePRDetails_Qty=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_Qty.toString().replace(/,/g, ""));

                        PRDetails[i].EvolvePRDetails_ItemUnitPrice = (PRDetails[i].EvolvePRDetails_ItemUnitPrice==null || PRDetails[i].EvolvePRDetails_ItemUnitPrice==undefined || PRDetails[i].EvolvePRDetails_ItemUnitPrice==NaN || PRDetails[i].EvolvePRDetails_ItemUnitPrice=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_ItemUnitPrice.toString().replace(/,/g, ""));
    
                        PRDetails[i].EvolvePRDetails_ItemTotalPrice = (PRDetails[i].EvolvePRDetails_ItemTotalPrice==null || PRDetails[i].EvolvePRDetails_ItemTotalPrice==undefined || PRDetails[i].EvolvePRDetails_ItemTotalPrice==NaN || PRDetails[i].EvolvePRDetails_ItemTotalPrice=='') ? null : parseFloat(PRDetails[i].EvolvePRDetails_ItemTotalPrice.toString().replace(/,/g, ""));
    
                    }
                    for (let i = 0; i < PRDetails.length; i++) {
                        PRDetails[i].EvolveUser_ID = req.EvolveUser_ID;
                        let saveLineDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.savePRLineDetails(PRDetails[i]);
                        if (saveLineDetails instanceof Error || saveLineDetails.rowsAffected < 1) {
                            isError = 'Error While Save PR Line Details';
                        }
                    }

                }
            }
            if (error == false) {
                let obj = { statusCode: 200, status: "success", message: "Requisition Updated Successfully", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while update Requisition Details", result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update Requisition by id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while delete Requisition by id " + error.message, result: null };
            res.send(obj);
        }
    },

    getSinglePrData: async function (req, res) {
        try {
            let prHead = await Evolve.App.Services.eDoa.Requisition.SrvOption.getPrHeadDetails(req.body.EvolvePR_ID);

            // console.log("getSinglePrData,prHead>>>>>>>>>>>>>>>>>>>>>>>conlist",prHead);

            if (prHead instanceof Error || prHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while get Requisition Head Details ")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Requisition Head Details ", result: null };
                res.send(obj);
            }
            else {
                prHead.recordset[0].EvolvePR_TotalCost =   prHead.recordset[0].EvolvePR_TotalCost ==null ? '' : (prHead.recordset[0].EvolvePR_TotalCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                let prLineDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.getPrLineDetails(req.body.EvolvePR_ID);
                if (prLineDetails instanceof Error || prLineDetails.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error While Get Requisition Line Details ")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error While Get Requisition Line Details", result: null };
                    res.send(obj);
                }
                else {

                    for (let i = 0; i < prLineDetails.recordset.length; i++) {

                        prLineDetails.recordset[i].EvolvePRDetails_Qty =  prLineDetails.recordset[i].EvolvePRDetails_Qty == null ? '' : (prLineDetails.recordset[i].EvolvePRDetails_Qty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice = prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice == null ? '' : (prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice = prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice == null ? '' : (prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                    }

                    let resObj = {
                        prHead: prHead.recordset,
                        prDetails: prLineDetails.recordset,
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




    getReqSerialNo: async function (req, res) {
        try {
            // console.log("Serial code>>>>>>>getSerialCode>>req,body>>>", req.body);
            // // let getSerialCode = await Evolve.App.Services.eDoa.Requisition.SrvOption.getSerialCodeByCategory(req.body);
            // // console.log("getSerialCode<>>>>>>>>>>>>>.recordsets",getSerialCode.recordsets);
            // // console.log("getSerialCode<>>>>>>>>>>>>>",getSerialCode);
            // if (getSerialCode instanceof Error || getSerialCode.rowsAffected < 1) {

            //     console.log("Serial code>>>>>>>getSerialCode>>>>>", getSerialCode);

            //     Evolve.Log.error("Error While Get Requisition Serial Code By Category")
            //     let obj = { statusCode: 400, status: "fail", message: "Error While Get Requisition Serial Code By Category", result: null };
            //     res.send(obj);

            // } else {
            //     // PURCHASEREQUISITION
            //     console.log("getSerialCode.recordset[0].EvolveSerial_Code>>>>>>>>>>",getSerialCode.recordset[0].EvolveSerial_Code);

                let prNo = await Evolve.Generator.generate("PR");
                // let prNo = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber(getSerialCode.recordset[0].EvolveSerial_Code)
                console.log("prNo>>>", prNo);
                if (prNo == 0) {
                    Evolve.Log.error("Error While Get Requisition Serial Code By Category")
                    let obj = { statusCode: 400, status: "fail", message: "Error While Get Requisition Serial Code By Category", result: null };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "Sales Quote No", result: prNo };
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


            let changeStatus = await Evolve.App.Services.eDoa.Requisition.SrvOption.changeSqStatusOnAmend(req.body);

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
            let resultByDesignGroup = await Evolve.App.Services.eDoa.Requisition.SrvOption.getItemAgreementDetailsByDesignGroup(req.body);

            if (resultByDesignGroup instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Agreement details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Agreement details", result: null };
                res.send(obj);
            } else {
                let resultByItem = await Evolve.App.Services.eDoa.Requisition.SrvOption.getItemAgreementDetailsByItem(req.body);


                if (resultByItem instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while get Agreement details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get Agreement details", result: null };
                    res.send(obj);
                } else {
                    for (let i = 0; i < resultByItem.recordset.length; i++) {

                        resultByDesignGroup.recordset.push(resultByItem.recordset[i]);
                    }
                }

                let obj = { statusCode: 200, status: "success", message: "Agreement details", result: resultByDesignGroup.recordset };
                console.log("obj>>>>>", obj)

                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Agreement details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Agreement details " + error.message, result: null };
            res.send(obj);
        }
    },
    getBuyerList: async function (req, res) {
        // console.log("Ok getBuyerList>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getBuyerList();
            // console.log("Ok getBuyerList>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>result",result);
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
    getShipToDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.Requisition.SrvOption.getShipToDetails(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get Ship to Details")
                let obj = { statusCode: 400, status: "fail", message: "Error while get Ship to Details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Customer List", result: result.recordset[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Ship to Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get Ship to Details " + error.message, result: null };
            res.send(obj);
        }
    },

}