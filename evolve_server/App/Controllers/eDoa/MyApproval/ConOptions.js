'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getApprovalList: async function (req, res) {
        try {
            let resObj;
            let error = false;
            let errorMessage = '';
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let displayAll = req.body.displayAll;

            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApprovalListCount(search, req.EvolveUser_ID, displayAll);
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApprovalList(start, length, search, req.EvolveUser_ID, displayAll);
            if (list instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get approval matrix list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval matrix list!",
                    result: list.message
                };
                res.send(obj);
            } else {

                let userTobeDelete = [];
                for (let i = 0; i < list.recordset.length; i++) {

                    if (list.recordset[i].EvolveApprovalProcess_Status == 'SENDBACK') {

                        let procesDetail = await Evolve.App.Services.eDoa.MyApproval.SrvList.getLastProcesDetail(list.recordset[i].EvolveApprovalProcess_ID);
                        if (procesDetail instanceof Error) {

                        } else if (procesDetail.rowsAffected > 0 && procesDetail.recordset[0].EvolveApprovalProcessDetails_TargetedUserID != null && req.EvolveUser_ID != procesDetail.recordset[0].EvolveApprovalProcessDetails_TargetedUserID) {

                            userTobeDelete.push(i);
                        }

                    }
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(list.recordset[i].EvolveApprovalMatrix_ID);
                    if (list instanceof Error) {

                        erorr = true;
                        errorMessage = "Error While Get Inex KKist"


                    } else {

                        list.recordset[i].indexList = indexList.recordset;

                        if (indexList.rowsAffected > 0) {



                            for (let j = 0; j < indexList.recordset.length; j++) {



                                let ApproverDetails = "";




                                let getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if (getUserDetails instanceof Error) {

                                    error = true;
                                    errorMessage = "Error While Get Approvers User List"
                                } else {

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < list.recordset[i].EvolveApprovalProcess_CurrentIndex) {

                                        ApproverDetails = "Approved by "


                                    } else {

                                        ApproverDetails = "To be approved by "

                                    }
                                    // ApproverDetails = "To be approved by "
                                    for (let k = 0; k < getUserDetails.recordset.length; k++) {


                                        if (k == (getUserDetails.recordset.length - 1)) {

                                            ApproverDetails += getUserDetails.recordset[k].EvolveUser_EmailID;


                                        } else {
                                            ApproverDetails += getUserDetails.recordset[k].EvolveUser_EmailID + ' OR ';

                                        }
                                    }
                                }

                                list.recordset[i].indexList[j].ApproverDetails = ApproverDetails;
                            }
                        }
                    };

                    let details = {
                        EvolveApprovalMatrixIndex_Seq: list.recordset[i].EvolveApprovalMatrixIndex_Seq - 1,
                        EvolveApprovalMatrix_ID: list.recordset[i].EvolveApprovalMatrix_ID,
                    }
                    let userList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getUserListOfMatrixIndex(details);
                    list.recordset[i].userList = userList.recordset;
                    let currentActionList = [];



                    if (list.recordset[i].EvolveApprovalMatrix_IsEmailNotif == true) {



                        currentActionList.push({
                            key: "EMAILSEND",
                            icon: "mdi mdi-email-check",
                            action: "Email Send",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERROREMAILSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'EMAILSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' || list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORQADSUBMIT') ? 'SUCCESS' : 'PENDING'
                        })

                    }
                    if (list.recordset[i].EvolveApprovalMatrix_IsMessageNotif == true) {

                        currentActionList.push({
                            key: "MESSAGESEND",
                            icon: "mdi  mdi-message-text",
                            action: "Message Notification",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORMESSAGESEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsWPMessageNotif == true) {


                        currentActionList.push({
                            key: "WHATSAPPSEND",
                            icon: "mdi mdi-whatsapp",
                            action: "Whatsapp Notification",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORWHATSAPPSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsQxtendReq == true) {

                        currentActionList.push({
                            key: "QEXTEND",
                            icon: "mdi  mdi-cloud-upload",
                            action: "Qxtend",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORQEXTEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    }
                    list.recordset[i].currentActionList = currentActionList;
                    if (list.recordset[i].EvolveApprovalMatrix_Type == 'ITEM') {

                        let details = [];
                        let itemDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getItemDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('ITEM CODE : ' + itemDetails.recordset[0].EvolveItem_Code)
                        details.push('ITEM DESC : ' + itemDetails.recordset[0].EvolveItem_Desc)
                        list.recordset[i].details = details;
                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'SALESQUOTE') {
                        let details = [];
                        let quoteDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getquoteDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('SALE QUOTE NO : ' + quoteDetails.recordset[0].EvolveSalesQuote_Serial)
                        details.push('CUSTOMER  : ' + quoteDetails.recordset[0].EvolveCustomer_name)
                        list.recordset[i].details = details;

                    }
                }
                for (let i = 0; i < userTobeDelete.length; i++) {

                    list.recordset.splice(userTobeDelete[i], 1);
                }
                resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
            }
            if (error) {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);

            } else {


                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);



            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get approval matrix list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getApprovalProcessHistory: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getApprovalProcessHistory(req.body);

            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Approval Process History ",
                    result: null
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Approval Process History",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process History " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process History" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getApprovalDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let approvalDetails = {};
            let matrixDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getApprovalMatrixDetails(req.body);

            if (matrixDetails instanceof Error || matrixDetails.rowsAffected < 1) {

                error = true;
            } else {


                matrixDetails = matrixDetails.recordset[0];
                if (matrixDetails.EvolveApprovalMatrix_Type == 'SALESQUOTE') {

                    let quoteDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getquoteDetails(matrixDetails.EvolveApprovalProcess_PrimaryID);
                    if (quoteDetails instanceof Error || matrixDetails.rowsAffected < 1) {

                        error = true;

                    } else {


                        approvalDetails.headDetails = [];

                        approvalDetails.headDetails.push({
                            attr: 'Sales Quote No',
                            value: quoteDetails.recordset[0].EvolveSalesQuote_Serial
                        })

                        approvalDetails.headDetails.push({
                            attr: 'Customer Name',
                            value: quoteDetails.recordset[0].EvolveCustomer_name
                        })

                        approvalDetails.headDetails.push({
                            attr: 'Bill To Address',
                            value: quoteDetails.recordset[0].billtoAdress
                        })

                    }
                    approvalDetails.lineDetails = {};
                }


            }
            if (error) {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Approval Details",
                    result: list.recordset
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: approvalDetails
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process History " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process History" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getApprovalProcessDetails: async function (req, res) {
        try {
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getApprovalProcessDetails(req.body);

            if (list instanceof Error || list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Approval Process Details ",
                    result: null
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Approval Process Details",
                    result: list.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Process Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error  while get Approval Process Details" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getPriceListData: async function (req, res) {
        try {
            let result = {};
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getPriceListHeadDetails(req.body);

            if (list instanceof Error || list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get price list data ",
                    result: null
                };
                res.send(obj);

            } else {
                result.headDetails = list.recordset[0];

                let lindeDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getPriceListLineDetails(req.body);

                if (lindeDetails instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR####: Error while get price list line details",
                        result: null
                    };
                    res.send(obj);

                } else {

                    result.lineDetails = lindeDetails.recordset;
                    let custUnitDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getPriceListCustUnitDetails(req.body);

                    if (custUnitDetails instanceof Error) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: " EERR####: Error while get price cust unit details",
                            result: null
                        };
                        res.send(obj);

                    } else {

                        result.custUntDetails = custUnitDetails.recordset;
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Price List Details",
                            result: result
                        };
                        res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get price list data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get price list data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemListByDesignGroup: async function (req, res) {
        try {
            console.log("ENTERED FOR ITEM DETAILS >>>>" ,  req.body)
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getItemListByDesignGroup(req.body);

            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get item list  by  design group ",
                    result: null
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "itemList",
                    result: list.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get price list data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get price list data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },



}