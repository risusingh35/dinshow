'use strict';
const Evolve = require('../../../../Boot/Evolve');
const ConOptions = require('../MyApproval/ConOptions');
module.exports = {


    getApprovalList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let error = false;
            let errorMessage = '';
            let resObj;


            let count = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvList.getApprovalListCount(search);
            let list = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvList.getApprovalList(start, length, search);
            if (list instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get approval process history ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval process history!",
                    result: list.message
                };
                res.send(obj);
            } else {

                for (let i = 0; i < list.recordset.length; i++) {

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

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < list.recordset[i].EvolveApprovalProcessHistory_CurrentIndex) {

                                        ApproverDetails = "Approved by "


                                    } else {

                                        ApproverDetails = "To be approved by "

                                    }

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
                    let currentActionList = [];



                    if (list.recordset[i].EvolveApprovalMatrix_IsEmailNotif == true) {

                        currentActionList.push({
                            key: "EMAILSEND",
                            icon: "mdi mdi-email-check",
                            action: "Email Send",
                            status: list.recordset[i].EvolveApprovalProcessHistory_ErrorCode == 'ERROREMAILSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcessHistory_Status == 'EMAILSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcessHistory_Status == 'MESSAGESEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'
                        })

                    }
                    if (list.recordset[i].EvolveApprovalMatrix_IsMessageNotif == true) {

                        currentActionList.push({
                            key: "MESSAGESEND",
                            icon: "mdi  mdi-message-text",
                            action: "Message Notification",
                            status: list.recordset[i].EvolveApprovalProcessHistory_ErrorCode == 'ERRORMESSAGESEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcessHistory_Status == 'MESSAGESEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcessHistory_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsWPMessageNotif == true) {


                        currentActionList.push({
                            key: "WHATSAPPSEND",
                            icon: "mdi mdi-whatsapp",
                            action: "Whatsapp Notification",
                            status: list.recordset[i].EvolveApprovalProcessHistory_ErrorCode == 'ERRORWHATSAPPSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcessHistory_Status == 'WHATSAPPSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcessHistory_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcessHistory_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    } if (list.recordset[i].EvolveApprovalMatrix_IsQxtendReq == true) {

                        currentActionList.push({
                            key: "QEXTEND",
                            icon: "mdi  mdi-cloud-upload",
                            action: "Send To QAD",
                            status: list.recordset[i].EvolveApprovalProcessHistory_ErrorCode == 'ERRORQEXTEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcessHistory_Status == 'QEXTEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcessHistory_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        })


                    }
                    list.recordset[i].currentActionList = currentActionList;
                    if (list.recordset[i].EvolveApprovalMatrix_Type == 'ITEM') {

                        let details = [];
                        let itemDetails = await Evolve.App.Services.eDoa.ApprovalProcessHistory.SrvList.getItemDetails(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        details.push('ITEM CODE : ' + itemDetails.recordset[0].EvolveItem_Code)
                        details.push('ITEM DESC : ' + itemDetails.recordset[0].EvolveItem_Desc)
                        list.recordset[i].details = details;

                    }
                    else if (list.recordset[i].EvolveApprovalMatrix_Type == 'SALESQUOTE') {
                        let details = [];


                        let quoteDetails = await Evolve.App.Services.eDoa.MyApproval.SrvOptions.getquoteDetails(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        if (quoteDetails.rowsAffected > 0) {


                            details.push('SALE QUOTE NO : ' + quoteDetails.recordset[0].EvolveSalesQuote_Serial)
                            details.push('CUSTOMER  : ' + quoteDetails.recordset[0].EvolveCustomer_name)
                            list.recordset[i].details = details;


                        }


                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == '845AGREEMENT') {

                        let details = [];
                        let priceListDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getPriceListDetais(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        if (priceListDetails instanceof Error || priceListDetails.rowsAffected < 1) {

                            details.push("DATA NOT FOUND")

                        } else {
                            details.push('AGREEMNET NO : ' + priceListDetails.recordset[0].EvolvePriceList_Code)
                            details.push('START DATE : ' + priceListDetails.recordset[0].EvolvePriceList_StartDate)
                            details.push('END DATE : ' + priceListDetails.recordset[0].EvolvePriceList_EndDate)
                        }


                        list.recordset[i].details = details;
                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'CUSTOMER') {

                        let details = [];
                        let custDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getCustomerDetails(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        details.push('CUSTOMER CODE : ' + custDetails.recordset[0].EvolveCustomer_Code)
                        details.push('CUSTOMER NAME : ' + custDetails.recordset[0].EvolveCustomer_Name)
                        // details.push('RABP_ID : ' + (custDetails.recordset[0].EvolveCustomer_RabpId == null ? '-': ''))


                        list.recordset[i].details = details;
                    } else if (list.recordset[i].EvolveApprovalMatrix_Type == 'SO') {

                        let details = [];
                        let soDetails = await Evolve.App.Services.eDoa.SalesOrder.SrvOption.getSingelSO(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        details.push('SO NO : ' + soDetails.recordset[0].EvolveSO_Serial)
                        details.push('CUSTOMER  : ' + soDetails.recordset[0].EvolveCustomer_name)
                        list.recordset[i].details = details;

                    } else if(list.recordset[i].EvolveApprovalMatrix_Type == 'PURCHASEREQUISITION'){
                        let details = [];
                        let reqDetails = await Evolve.App.Services.eDoa.Requisition.SrvOption.getPrHeadDetails(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);
                        details.push('REQUISITION NO : ' + reqDetails.recordset[0].EvolvePR_NO)
                        details.push('TOTAL COST  : '+reqDetails.recordset[0].EvolvePR_TotalCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
                        list.recordset[i].details = details;

                    }else if (list.recordset[i].EvolveApprovalMatrix_Type == 'GATEIN') {
                        let details = [];
                        let result = await Evolve.App.Services.eDoa.ApprovalProcess.SrvList.getGateInDetails(list.recordset[i].EvolveApprovalProcessHistory_PrimaryID);

                        if( result.rowsAffected > 0){

                            details.push('GATE ENTRY NO : ' + result.recordset[0].EvolveGate_RefNumber)
                            // details.push('SUPPLIER : '+result.recordset[0].EvolvePR_TotalCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
                        }


                        
                        list.recordset[i].details = details;

                    }else{
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
                    noOfRecord: matchIndex.length,
                    records: finalArray
                }
                // let obj = {
                //     statusCode: 200,
                //     status: "success",
                //     message: "approval process history",
                //     result: resObj
                // };
                // res.send(obj);
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
            Evolve.Log.error(" EERR####: Error while get approval process history " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get approval process history " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}