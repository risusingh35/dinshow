'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getApprovalList: async function (req, res) {
        try {
            let error = false;
            let errorMessage = '';
            let resObj;

            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            // let displayAll = req.body.displayAll;

            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApprovalListCount(req.EvolveUser_ID);
            let list = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApprovalList(start, length, req.EvolveUser_ID);

            if (list instanceof Error) {

                error = true;
                errorMessage = 'Error while get approval matrix list'

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
                    }


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
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERROREMAILSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'ERROREMAILSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'EMAILSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' || list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORQADSUBMIT') ? 'SUCCESS' : 'PENDING'
                        })

                    }
                    if (list.recordset[i].EvolveApprovalMatrix_IsMessageNotif == true) {

                        currentActionList.push({
                            key: "MESSAGESEND",
                            icon: "mdi  mdi-message-text",
                            action: "Message Notification",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORMESSAGESEND' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORMESSAGESEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsWPMessageNotif == true) {


                        currentActionList.push({
                            key: "WHATSAPPSEND",
                            icon: "mdi mdi-whatsapp",
                            action: "Whatsapp Notification",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORWHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORWHATSAPPSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsQxtendReq == true) {

                        currentActionList.push({
                            key: "QEXTEND",
                            icon: "mdi  mdi-cloud-upload",
                            action: "Send To QAD",
                            status: list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORQEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORQEXTEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

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

                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == '845AGREEMENT') {

                        let details = [];
                        let priceListDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getPriceListDetais(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('AGREEMNET NO : ' + priceListDetails.recordset[0].EvolvePriceList_Code)
                        details.push('START DATE : ' + priceListDetails.recordset[0].EvolvePriceList_StartDate)
                        details.push('END DATE : ' + priceListDetails.recordset[0].EvolvePriceList_EndDate)

                        list.recordset[i].details = details;
                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'CUSTOMER') {

                        let details = [];
                        let custDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getCustomerDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('CUSTOMER CODE : ' + custDetails.recordset[0].EvolveCustomer_Code)
                        details.push('CUSTOMER NAME : ' + custDetails.recordset[0].EvolveCustomer_Name)
                        list.recordset[i].details = details;
                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'SO') {

                        let details = [];
                        let soDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getSingelSO(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('SO NO : ' + soDetails.recordset[0].EvolveSO_Serial)
                        details.push('CUSTOMER  : ' + soDetails.recordset[0].EvolveCustomer_name)
                        list.recordset[i].details = details;

                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'PURCHASEREQUISITION') {
                        let details = [];
                        let reqDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.getPrHeadDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('REQUISITION NO : ' + reqDetails.recordset[0].EvolvePR_NO)
                        details.push('TOTAL COST  : ' + reqDetails.recordset[0].EvolvePR_TotalCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
                        list.recordset[i].details = details;
                    } else {
                        list.recordset[i].details = [];

                    }
                }
                let matchIndex = [];

                for (let i = 0; i < list.recordset.length; i++) {
                    if (list.recordset[i].details.length > 0) {

                        if (list.recordset[i].details[0].includes(search)) {

                            matchIndex.push(i)

                        }
                    } else {
                        matchIndex.push(i)
                    }

                }
                let finalArray = [];

                for (let i = 0; i < matchIndex.length; i++) {

                    finalArray.push(list.recordset[matchIndex[i]])
                }

                resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: finalArray
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

    addApprovalProcessDetails: async function (req, res) {
        try {

            let isGroundSendBack = false;
            let error = false;
            let errorMessage = 'Error While Update Process';
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let data = req.body;
            let details = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixDetailsByProcessId(data);

            if (details instanceof Error) {

                errorMessage = "Error while get matrix details"

            } else {

                details = details.recordset[0];
                if (data.EvolveApprovalProcessDetails_Status == 'APPROVE') {

                    if (data.currentSeq == data.lastSeq) {
                        data.EvolveApprovalProcessDetails_Status = 'APPROVED'
                        if (details.EvolveApprovalMatrix_IsQxtendReq) {


                            data.EvolveApprovalProcess_Status = 'QEXTEND'

                        } else {
                            data.EvolveApprovalProcess_Status = 'COMPLETED'

                        }
                        data.EvolveApprovalProcess_CurrentIndex = data.currentSeq + 1;
                    } else {

                        data.EvolveApprovalProcessDetails_Status = 'APPROVED'
                        data.EvolveApprovalProcess_Status = 'PROCESS'

                        data.EvolveApprovalProcess_CurrentIndex = data.currentSeq + 1;

                    }
                } else if (data.EvolveApprovalProcessDetails_Status == 'SENDBACK') {

                    data.EvolveApprovalProcess_Status = 'SENDBACK'

                    data.EvolveApprovalProcess_CurrentIndex = data.currentSeq - 1;

                } else if (data.EvolveApprovalProcessDetails_Status == 'REJECT') {

                    data.EvolveApprovalProcess_Status = 'REJECTED'
                    data.EvolveApprovalProcessDetails_Status = 'REJECTED'
                    data.EvolveApprovalProcess_CurrentIndex = data.currentSeq;

                } else if (data.EvolveApprovalProcessDetails_Status == 'GROUNDLEVELSENDBACK') {
                    isGroundSendBack = true;

                    data.EvolveApprovalProcess_Status = 'SENDBACK'
                    data.EvolveApprovalProcessDetails_Status = 'SENDBACK'
                    data.EvolveApprovalProcess_CurrentIndex = data.currentSeq;
                    data.EvolveApprovalProcess_IsOnGroundLevel = 1;
                }
                if (!error) {
                    let addProcessDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.addApprovalProcessDetails(data);
                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                        error = true
                        let userName = await Evolve.App.Services.eDoa.MyApproval.SrvList.getUserNameById(req.body.EvolveUser_ID);
                        let details = {
                            EvolveApprovalProcess_ErrorCode: 'APPROVALERROR',
                            EvolveApprovalProcess_ErrorDetails: "ERROR WHILE CHANGE STATUS TO " + data.EvolveApprovalProcessDetails_Status + " BY USER " + userName.recordset[0].EvolveUser_Name,
                            EvolveUser_ID: req.body.EvolveUser_ID
                        }
                        let changeStatusToError = await Evolve.App.Services.eDoa.MyApproval.SrvList.updateProcesStatusToError(details);

                    } else {

                        let updateProcess = await Evolve.App.Services.eDoa.MyApproval.SrvList.updateProcessStatus(data);
                        if (updateProcess instanceof Error || updateProcess.rowsAffected < 1) {
                            error = true;
                        }

                    }
                    if (!error) {
                        if (details.EvolveApprovalMatrix_Type == '845AGREEMENT') {
                            let objData = {};
                            if ((data.EvolveApprovalProcess_Status == 'COMPLETED' && data.EvolveApprovalProcessDetails_Status == 'APPROVED') || data.EvolveApprovalProcessDetails_Status == 'REJECTED' || data.EvolveApprovalProcessDetails_Status == 'SENDBACK') {

                                objData = {

                                    EvolvePriceList_ID: details.EvolveApprovalProcess_PrimaryID,
                                    EvolvePriceList_Status: data.EvolveApprovalProcessDetails_Status


                                }

                                let upatePriceListStatus = await Evolve.App.Services.eDoa.MyApproval.SrvList.upatePriceListStatus(objData);

                                if (upatePriceListStatus instanceof Error || upatePriceListStatus.rowsAffected < 1) {

                                    error = true;
                                    errorMessage = "Error While Update Agreement Status"


                                } else {
                                    objData.EvolveEDI_ID = upatePriceListStatus.recordset[0].EvolveEDI_ID;
                                    objData.EvolveEDI_Status = upatePriceListStatus.recordset[0].EvolvePriceList_Status == 'APPROVED' ? 'PROCESS' : 'ERROR';


                                    objData.EvolveEDI_CurrentAction = upatePriceListStatus.recordset[0].EvolvePriceList_Status == 'APPROVED' ? 'UPDATEAPPROVALDATA' : 'SENDTOAPPROVAL';


                                    objData.EvolveEDI_ErrorMessage = objData.EvolveEDI_Status == 'ERROR' ? 'Agreement ' + upatePriceListStatus.recordset[0].EvolvePriceList_Status + ' \n Comments : ' + data.EvolveApprovalProcessDetails_Remarks : '';

                                    let updateEdiStatus = await Evolve.App.Services.eDoa.MyApproval.SrvList.updateEdiStatus(objData);

                                    if (updateEdiStatus instanceof Error || updateEdiStatus.rowsAffected < 1) {

                                        error = true;
                                        errorMessage = "Error While Update Status"


                                    }

                                }

                            }
                        } else if (details.EvolveApprovalMatrix_Type == 'GATEIN') {
                            let objData = {};
                            if ((data.EvolveApprovalProcess_Status == 'COMPLETED' && data.EvolveApprovalProcessDetails_Status == 'APPROVED') || data.EvolveApprovalProcessDetails_Status == 'REJECTED' || data.EvolveApprovalProcessDetails_Status == 'SENDBACK') {

                                objData = {

                                    EvolveGate_ID: details.EvolveApprovalProcess_PrimaryID,
                                    EvolveGate_Status: data.EvolveApprovalProcessDetails_Status,
                                    EvolveUser_ID : req.EvolveUser_ID == undefined ? null :  req.EvolveUser_ID  ,


                                }

                                let updateGAteInStatus = await Evolve.App.Services.eDoa.MyApproval.SrvList.updateGateEntryStatus(objData);

                                if (updateGAteInStatus instanceof Error || updateGAteInStatus.rowsAffected < 1) {

                                    error = true;
                                    errorMessage = "Error While Update Gate Entry Status"


                                }
                            }
                        }
                    }
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
                if (details.EvolveApprovalMatrix_IsEmailNotif) {
                    let emailData = {
                        EvolveApprovalProcess_ID: req.body.EvolveApprovalProcess_ID,
                        EvolveApprovalProcessDetails_Status: req.body.EvolveApprovalProcessDetails_Status,
                        isSendBack: isGroundSendBack,
                        isRejected: data.EvolveApprovalProcess_Status == 'REJECTED' ? true : false,
                        isSubmited: false,
                        EvolveApprovalMatrix_Type: details.EvolveApprovalMatrix_Type
                    }
                    let sendMail = Evolve.App.Controllers.Common.ConCommon.mailSend(emailData)
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Status Updated Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update process status " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update process status " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




}