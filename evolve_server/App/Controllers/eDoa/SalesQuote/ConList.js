'use strict';
// const cons = require('consolidate');
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getSalesQuoteList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let releasedSq = req.body.releasedSq;
            let error = false;
            let errorMessage = '';
            let resObj;

            let getUserUnit = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getUserUnitDetails(req.EvolveUser_ID);

            if (getUserUnit instanceof Error || getUserUnit.rowsAffected < 1) {


                Evolve.Log.error(" EERR####: Error while get user branch details ");

                error = true;
                error = 'Error while get user branch details';

            } else {

                let unitList = getUserUnit.recordset;
                let subQuery = ' AND (';
                for (let i = 0; i < unitList.length; i++) {

                    if (i != unitList.length - 1) {

                        subQuery += ' esq.EvolveUnit_ID =' + unitList[i].EvolveUnit_ID + ' OR ';

                    } else {
                        subQuery += ' esq.EvolveUnit_ID =' + unitList[i].EvolveUnit_ID + ')';

                    }

                }
                let count = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSalesQuoteListCount(search, subQuery, releasedSq);
                let list = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSalesQuoteList(start, length, search, subQuery, releasedSq);


                if (list instanceof Error) {


                    Evolve.Log.error(" EERR####: Error while get sales quote list ");

                    error = true;
                    error = 'Error while get sales quote list';

                } else {
                    for (let i = 0; i < list.recordset.length; i++) {

                        list.recordset[i].EvolveSalesQuote_TotalCustomerPrice = (list.recordset[i].EvolveSalesQuote_TotalCustomerPrice + '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                        list.recordset[i].EvolveSalesQuote_ProfitMargin = (list.recordset[i].EvolveSalesQuote_ProfitMargin + '').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                        if (list.recordset[i].EvolveSalesQuote_Status != 'SAVED' && list.recordset[i].EvolveSalesQuote_Status != 'QADSUBMITED' && list.recordset[i].EvolveSalesQuote_Status != 'INRELEASE' && list.recordset[i].EvolveSalesQuote_Status != 'QADRELEASED' && req.body.releasedSq == false && list.recordset[i].EvolveSalesQuote_Status != 'ERRORQADRELEASE') {

                            let processDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getApprovalProccessDetails(list.recordset[i].EvolveSalesQuote_ID)
                            if (list instanceof Error) {

                                error = true;
                                error = 'Error while get A[pprpoval Proccess Details';


                            } else {

                                list.recordset[i].proccessDetails = processDetails.recordset[0];


                                let indexList = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getMatrixIndexList(list.recordset[i].proccessDetails.EvolveApprovalMatrix_ID);
                                if (list instanceof Error) {

                                    erorr = true;
                                    errorMessage = "Error While Get Matrix Index List"


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

                                                if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < list.recordset[i].proccessDetails.EvolveApprovalProcess_CurrentIndex) {




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



                                if (list.recordset[i].proccessDetails.EvolveApprovalMatrix_IsEmailNotif == true) {

                                    currentActionList.push({
                                        key: "EMAILSEND",
                                        icon: "mdi mdi-email-check",
                                        action: "Email Send",
                                        status: list.recordset[i].proccessDetails.EvolveApprovalProcess_ErrorCode == 'ERROREMAILSEND' ? 'ERROR' : list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'EMAILSEND' ? 'INPROCESS' : (list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'MESSAGESEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'COMPLETED' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'ERRORQADSUBMIT') ? 'SUCCESS' : 'PENDING'
                                    })

                                }
                                if (list.recordset[i].proccessDetails.EvolveApprovalMatrix_IsMessageNotif == true) {

                                    currentActionList.push({
                                        key: "MESSAGESEND",
                                        icon: "mdi  mdi-message-text",
                                        action: "Message Notification",
                                        status: list.recordset[i].proccessDetails.EvolveApprovalProcess_ErrorCode == 'ERRORMESSAGESEND' ? 'ERROR' : list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'MESSAGESEND' ? 'INPROCESS' : (list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                                    })


                                } if (list.recordset[i].proccessDetails.EvolveApprovalMatrix_IsWPMessageNotif == true) {


                                    currentActionList.push({
                                        key: "WHATSAPPSEND",
                                        icon: "mdi mdi-whatsapp",
                                        action: "Whatsapp Notification",
                                        status: list.recordset[i].proccessDetails.EvolveApprovalProcess_ErrorCode == 'ERRORWHATSAPPSEND' ? 'ERROR' : list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'WHATSAPPSEND' ? 'INPROCESS' : (list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                                    })


                                } if (list.recordset[i].proccessDetails.EvolveApprovalMatrix_IsQxtendReq == true) {

                                    currentActionList.push({
                                        key: "QEXTEND",
                                        icon: "mdi  mdi-cloud-upload",
                                        action: "Send TO QAD",
                                        status: list.recordset[i].proccessDetails.EvolveApprovalProcess_ErrorCode == 'ERRORQADSUBMIT' ? 'ERROR' : list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'QEXTEND' ? 'INPROCESS' : (list.recordset[i].proccessDetails.EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                                    })


                                }

                                list.recordset[i].currentActionList = currentActionList;
                            }
                        }
                    }
                    resObj = {
                        noOfRecord: count.recordset[0].count,
                        records: list.recordset
                    }


                }

            }
            if (error) {

                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: errorMessage,
                    result: resObj
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sales Quote List",
                    result: resObj
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR###ssssssssssssssssssss#: Error while get sales quote list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get sales quote list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    submitToApprovelProcess: async function (req, res) {
        try {
            let error = false;
            let errorMessage = 'Error While Submit Sales Quote';
            let successMessage = "";


            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveApprovalMatrix_ID = 0;



            if (req.body.EvolveSalesQuote_Status == 'SUBMITED') {


                let getSqDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSqDetails(req.EvolveSalesQuote_ID);

                if (getSqDetails instanceof Error || getSqDetails.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error While get Sq Details ");
                    error = true;
                    error = 'Error While get Sq Details';

                } else {

                    req.body.EvolveApprovalMatrix_ID = await Evolve.App.Controllers.Common.ConCommon.assignApprovalMatrix({

                        EvolveApprovalMatrix_Type: 'SALESQUOTE',

                        details: getSqDetails.recordset[0]


                    });



                    // let matrixList = await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixRootDetails('SALESQUOTE');


                    // if (matrixList instanceof Error) {

                    //     error = true;

                    // } else {

                    // for (let i = 0; i < matrixList.length; i++) {

                    //     if (matrixList[i].roolList.length == 0) {

                    //         req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                    //     } else {
                    //         let queryStr = "";
                    //         for (let j = 0; j < matrixList[i].roolList.length; j++) {

                    //             if (matrixList[i].roolList[j].case == "==") {
                    //                 matrixList[i].roolList[j].case = "=";
                    //             }

                    //             // matrixList[i].roolList[j].caseValue
                    //             let caseValueList  = matrixList[i].roolList[j].caseValue.split(',');

                    //             queryStr += " AND (";

                    //             for(let k=0 ; k<caseValueList.length ; k++){


                    //                 if(k == caseValueList.length-1){

                    //                     queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] +' ) ';

                    //                 }else{

                    //                     queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] +' OR ';


                    //                 }




                    //             }
                    //         }

                    //         let details = {


                    //             EvolveSalesQuote_ID: req.body.EvolveSalesQuote_ID,
                    //             queryStr: queryStr,
                    //         }


                    //         let matchSqDetaiks = await Evolve.App.Services.eDoa.SalesQuote.SrvList.matchSqDetails(details);

                    //         if (matchSqDetaiks instanceof Error) {

                    //             error = true;

                    //         } else if (matchSqDetaiks.rowsAffected > 0) {

                    //             req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                    //         }
                    //     }

                    // }

                    if (req.body.EvolveApprovalMatrix_ID != 0) {

                        let checkProcess = await Evolve.App.Services.eDoa.SalesQuote.SrvList.checkApprovalProcess(req.body);

                        if (checkProcess instanceof Error) {


                            error = true;

                        } else if (checkProcess.rowsAffected > 0) {
                            req.body.EvolveApprovalProcess_ID = checkProcess.recordset[0].EvolveApprovalProcess_ID
                            let updateSeq = await Evolve.App.Services.eDoa.SalesQuote.SrvList.updateApprovalProcessSeq(req.body);
                            if (updateSeq instanceof Error || updateSeq.rowsAffected < 1) {
                                error = true;
                            } else {

                                req.body.EvolveApprovalProcess_ID = req.body.EvolveApprovalProcess_ID;
                                req.body.EvolveUser_ID = req.EvolveUser_ID;
                                req.body.EvolveApprovalProcessDetails_Status = 'RESUBMITED'

                                let addProcessDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.addApprovalProcessetails(req.body);
                                if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                    error = true;
                                }


                            }
                        } else {

                            let result = await Evolve.App.Services.eDoa.SalesQuote.SrvList.submitToApprovelProcess(req.body);
                            if (result instanceof Error || result.rowsAffected < 1) {
                                error = true;
                            } else {


                                req.body.EvolveApprovalProcess_ID = result.recordset[0].inserted_id;
                                req.body.EvolveUser_ID = req.EvolveUser_ID;
                                req.body.EvolveApprovalProcessDetails_Status = 'SUBMITED'


                                let addProcessDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.addApprovalProcessetails(req.body);
                                if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                    error = true;
                                }


                            }
                        }
                    } else {
                        error = true;
                        errorMessage = 'No Approval Matrix Matched For Sales Quote'

                    }
                    }
      
            } else {
                successMessage = "Sales Quote Status Changed TO INRELEASE"

            }

            if (error == false) {
                let updateSalesQuoteStatus = await Evolve.App.Services.eDoa.SalesQuote.SrvList.updateSalesQuoteStatus(req.body);
                if (updateSalesQuoteStatus instanceof Error || updateSalesQuoteStatus.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error while update sales quate status ");
                    error = true;

                } else {

                    let emailData = {
                        EvolveApprovalProcess_ID: req.body.EvolveApprovalProcess_ID,
                        EvolveApprovalProcessDetails_Status: req.body.EvolveApprovalProcessDetails_Status,
                        isSendBack: false,
                        isRejected: false,
                        isSubmited: true,
                        EvolveApprovalMatrix_Type: 'SALESQUOTE',

                    }

                    let sendMail = Evolve.App.Controllers.Common.ConCommon.mailSend(emailData);

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
                    message: "Sales Quote Submited Successfully",
                    result: null
                };
                res.send(obj);
            }
            // else{ 

            // }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while sales quote submit to approvel process! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while sales quote submit to approvel process! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    uploadSqByCsv: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                let UnitStateCode = '';
                let custStateCode = '';

                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'SalesQuote_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // let csvDataArray = await Evolve.Csv({
                        //     trim:false,
                        //     ignoreEmpty : true ,
                        // }).fromFile('./csv/doa/' + fileName);
                        let csvDataArray = await Evolve.Csv({
                            trim: false,
                            ignoreEmpty: true,
                        }).fromFile('./csv/doa/' + fileName);
                        let errorMessage = '';
                        let errorStatus = false;

                        let getUnitStateCode = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getUnitStateCode(req.EvolveUnit_ID);
                        if (getUnitStateCode instanceof Error || getUnitStateCode.rowsAffected < 1) {


                            errorStatus = true;
                            errorMessage = "Error While Get Unit State Code"

                        } else {

                            if (getUnitStateCode.recordset[0].EvolveUnit_State == null || getUnitStateCode.recordset[0].EvolveUnit_State == undefined || getUnitStateCode.recordset[0].EvolveUnit_State == "") {

                                errorStatus = true;
                                errorMessage = "State Code Not Found For logged In Unit"


                            } else {

                                UnitStateCode = getUnitStateCode.recordset[0].EvolveUnit_State;


                            }

                        }



                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {

                                csvDataArray[i]['ITEM CODE'] = csvDataArray[i]['ITEM CODE'].trimEnd()
                                csvDataArray[i]['BILL-TO'] = csvDataArray[i]['BILL-TO'].trim()
                                csvDataArray[i]['SHIP-TO'] = csvDataArray[i]['SHIP-TO'].trim()
                                csvDataArray[i]['CHANNEL'] = csvDataArray[i]['CHANNEL'].trim()
                                csvDataArray[i]['PROJECT'] = csvDataArray[i]['PROJECT'].trim()
                                csvDataArray[i]['LINE NO'] = csvDataArray[i]['LINE NO'].trim()
                                csvDataArray[i]['ITEM CODE'] = csvDataArray[i]['ITEM CODE'].trim()
                                csvDataArray[i]['REXEL UNIT PRICE'] = csvDataArray[i]['REXEL UNIT PRICE'].trim()
                                csvDataArray[i]['QTY'] = csvDataArray[i]['QTY'].trim()

                                csvDataArray[i]['CUST UNIT PRICE'] = csvDataArray[i]['CUST UNIT PRICE'].trim()
                                csvDataArray[i]['CUST DISCOUNT'] = csvDataArray[i]['CUST DISCOUNT'].trim()

                                if (csvDataArray[i]['CUSTOMER CODE'] == '' || csvDataArray[i]['CUSTOMER CODE'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUSTOMER CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['BILL-TO'] == '' || csvDataArray[i]['BILL-TO'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "BILL-TO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['SHIP-TO'] == '' || csvDataArray[i]['SHIP-TO'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "SHIP-TO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CHANNEL'] == '' || csvDataArray[i]['CHANNEL'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CHANNEL Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['PROJECT'] == '' || csvDataArray[i]['PROJECT'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "PROJECT Not  Found In Row " + i + 1;


                                    // }else if(csvDataArray[i]['HEAD TAX CLASS'] == '' || csvDataArray[i]['HEAD TAX CLASS'] == undefined){


                                    //     errorStatus = true ;
                                    //     errorMessage = "HEAD TAX CLASS Not  Found In Row "+i+1 ;


                                    // }else if(csvDataArray[i]['HEAD TAX ENV'] == '' || csvDataArray[i]['CREDIT TERMS'] == undefined){


                                    //     errorStatus = true ;
                                    //     errorMessage = "CREDIT TERMS Not  Found In Row "+i+1 ;


                                    // }else if(csvDataArray[i]['HEAD TAX ENV'] == '' || csvDataArray[i]['HEAD TAX ENV'] == undefined){

                                    //     errorStatus = true ;

                                    //     errorMessage = "HEAD TAX ENV Not  Found In Row "+i+1 ;


                                } else if (csvDataArray[i]['SALESPERSON CODE'] == '' || csvDataArray[i]['SALESPERSON CODE'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "SALESPERSON CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['LINE NO'] == '' || csvDataArray[i]['LINE NO'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "LINE NO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['ITEM CODE'] == '' || csvDataArray[i]['ITEM CODE'] == undefined) {


                                    errorStatus = true;
                                    errorMessage = "ITEM CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['REXEL UNIT PRICE'] == '' || csvDataArray[i]['REXEL UNIT PRICE'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "REXEL UNIT PRICE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['QTY'] == '' || csvDataArray[i]['QTY'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "QTY Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CUST UNIT PRICE'] == '' || csvDataArray[i]['CUST UNIT PRICE'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUST UNIT PRICE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CUST DISCOUNT'] == '' || csvDataArray[i]['CUST DISCOUNT'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUST DISCOUNT Not  Found In Row " + i + 1;


                                    // }else if(csvDataArray[i]['LINE TAX CLASS'] == '' || csvDataArray[i]['LINE TAX CLASS'] == undefined){

                                    //     errorStatus = true ;
                                    //     errorMessage = "LINE TAX CLASS Not  Found In Row "+i+1 ;


                                }
                                // else if(csvDataArray[i]['LINE TAX ENV'] == '' || csvDataArray[i]['LINE TAX ENV'] == undefined){

                                //     errorStatus = true ;
                                //     errorMessage = "LINE TAX ENV Not  Found In Row "+i+1 ;


                                // }
                            }

                        }


                        let bulkSqList = [];

                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (errorStatus == false) {

                                    bulkSqList.push({

                                        headDetails: {},
                                        EvolveSalesQuote_Details: {},
                                        isTaken: false,
                                    })
                                    let index = bulkSqList.length - 1;
                                    bulkSqList[index].headDetails.EvolveSalesQuote_ReleaseDate = '';
                                    bulkSqList[index].headDetails.EvolveSalesQuote_PoDate = csvDataArray[i]['PO DATE'];

                                    bulkSqList[index].headDetails.EvolveSalesQuote_Comments = csvDataArray[i]['HEAD COMMENTS'];


                                    bulkSqList[index].headDetails.EvolveSalesQuote_Freight = (csvDataArray[i]['INWARD FREIGHT'] == '' || csvDataArray[i]['INWARD FREIGHT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['INWARD FREIGHT']);

                                    bulkSqList[index].headDetails.EvolveSalesQuote_OutWardFreight = (csvDataArray[i]['OUTWARD FREIGHT'] == '' || csvDataArray[i]['OUTWARD FREIGHT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['OUTWARD FREIGHT']);


                                    bulkSqList[index].headDetails.EvolveSalesQuote_Pnf = (csvDataArray[i]['PNF'] == '' || csvDataArray[i]['PNF'] == undefined) ? 0 : parseFloat(csvDataArray[i]['PNF']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_Status = 'SAVED';
                                    bulkSqList[index].headDetails.EvolveSalesQuote_CurrentOutstanding = (csvDataArray[i]['CURRENT OUT'] == '' || csvDataArray[i]['CURRENT OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['CURRENT OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_ThirtyOutstanding = (csvDataArray[i]['1-30 DAYS OUT'] == '' || csvDataArray[i]['1-30 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['1-30 DAYS OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_SixtyOutstanding = (csvDataArray[i]['30-60 DAYS OUT'] == '' || csvDataArray[i]['30-60 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['30-60 DAYS OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_NinetyOutstanding = (csvDataArray[i]['60-90 DAYS OUT'] == '' || csvDataArray[i]['60-90 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['60-90 DAYS OUT']);

                                    bulkSqList[index].headDetails.EvolveSalesQuote_OneEightyOutstanding = (csvDataArray[i]['90-180 DAYS OUT'] == '' || csvDataArray[i]['90-180 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['90-180 DAYS OUT']);


                                    bulkSqList[index].headDetails.EvolveSalesQuote_LandedCost = null;
                                    bulkSqList[index].headDetails.EvolveSalesQuote_ProfitMargin = null;
                                    bulkSqList[index].headDetails.EvolveSalesQuote_PurchaseOrder = csvDataArray[i]['PO NO'];
                                    bulkSqList[index].headDetails.EvolveSalesQuote_TotalCustomerPrice = null;

                                    //line details 

                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_LineNo = parseInt(csvDataArray[i]['LINE NO']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Qty = parseFloat(csvDataArray[i]['QTY']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerUnitPrice = parseFloat(csvDataArray[i]['CUST UNIT PRICE']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerDiscount = parseFloat(csvDataArray[i]['CUST DISCOUNT']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_ReqdDate = csvDataArray[i]['REQD DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_PromiseDate = csvDataArray[i]['PROMISE DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_DueDate = csvDataArray[i]['DUE DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Comments = csvDataArray[i]['LINE COMMENTS'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveItem_ItemUnitPrice = parseFloat(csvDataArray[i]['REXEL UNIT PRICE']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TotalPrice = null;
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = null;
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = null;





                                    let getCusDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getCustomerDetails(csvDataArray[i]['CUSTOMER CODE']);

                                    if (getCusDetails instanceof Error || getCusDetails.rowsAffected < 1) {

                                        errorStatus = true;
                                        errorMessage = "CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " Not Found  In Master Data";


                                    } else {

                                        let custDetails = getCusDetails.recordset[0];



                                        bulkSqList[index].headDetails.EvolveSalesQuote_Customer_ID = custDetails.EvolveCustomer_ID;

                                        // if(custDetails.EvolveTaxClass_ID == null || custDetails.EvolveTaxClass_ID == undefined || custDetails.EvolveTaxClass_ID == ''){

                                        //     errorStatus = true ;
                                        //     errorMessage = "Tax Class Not Found For CUSTOMER CODE "+csvDataArray[i]['CUSTOMER CODE']+" In Master Data" ;



                                        // }else
                                        if (custDetails.EvolveCreditTerms_ID == null || custDetails.EvolveCreditTerms_ID == undefined || custDetails.EvolveCreditTerms_ID == '') {

                                            errorStatus = true;
                                            errorMessage = "Credit Terms Not Found For CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " In Master Data";

                                        } else if (custDetails.EvolveShipTo_State == null || custDetails.EvolveShipTo_State == undefined || custDetails.EvolveShipTo_State == '') {


                                            errorStatus = true;
                                            errorMessage = "State Code Not Found For CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " In Master Data";

                                            // } else if (custDetails.EvolveSalesPerson_Code == null || custDetails.EvolveSalesPerson_Code == undefined || custDetails.EvolveSalesPerson_Code == '') {


                                            //     errorStatus = true;
                                            //     errorMessage = "Sales Person Not Found For CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " In Master Data";

                                        } else {

                                            bulkSqList[index].headDetails.EvolveSalesQuote_SalesPerson = [{ "id": custDetails.EvolveSalesPerson_ID, "name": custDetails.EvolveSalesPerson_Code, "commission": "0" }];

                                            bulkSqList[index].headDetails.EvolveSalesQuote_TaxClass_ID = (custDetails.EvolveTaxClass_ID == '' || custDetails.EvolveTaxClass_ID == null || custDetails.EvolveTaxClass_ID == undefined ? null : custDetails.EvolveTaxClass_ID);
                                            bulkSqList[index].headDetails.EvolveCreditTerms_ID = custDetails.EvolveCreditTerms_ID;
                                            custStateCode = custDetails.EvolveShipTo_State;
                                            if (custStateCode == UnitStateCode) {

                                                csvDataArray[i]['HEAD TAX ENV'] = 'WST';


                                            } else {

                                                csvDataArray[i]['HEAD TAX ENV'] = 'OST'

                                            }


                                            let getBillToId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getBillToShipToID(csvDataArray[i]['BILL-TO']);

                                            if (getBillToId instanceof Error || getBillToId.rowsAffected < 1) {

                                                errorStatus = true;
                                                errorMessage = "BILL-TO CODE" + csvDataArray[i]['BILL-TO'] + " Not Found In Master Data";


                                            } else {


                                                bulkSqList[index].headDetails.EvolveSalesQuote_BillTo = getBillToId.recordset[0].EvolveShipTo_ID

                                                let getShipToId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getBillToShipToID(csvDataArray[i]['SHIP-TO']);

                                                if (getShipToId instanceof Error || getShipToId.rowsAffected < 1) {

                                                    errorStatus = true;
                                                    errorMessage = "SHIP TO CODE " + csvDataArray[i]['SHIP-TO'] + " Not Found In Master Data";


                                                } else {


                                                    bulkSqList[index].headDetails.EvolveSalesQuote_ShipTo = getShipToId.recordset[0].EvolveShipTo_ID
                                                    let channelId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getChannelId(csvDataArray[i]['CHANNEL']);

                                                    if (channelId instanceof Error || channelId.rowsAffected < 1) {

                                                        errorStatus = true;
                                                        errorMessage = "CHANNEL " + csvDataArray[i]['CHANNEL'] + " Not Found In Master Data";


                                                    } else {

                                                        bulkSqList[index].headDetails.EvolveSalesQuote_Channel_ID = channelId.recordset[0].EvolveGenericCodeMaster_ID
                                                        // let taxClassId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getTaxClassID(csvDataArray[i]['HEAD TAX CLASS']);

                                                        // if (taxClassId instanceof Error || taxClassId.rowsAffected < 1) {

                                                        //     errorStatus = true ;
                                                        //     errorMessage = "HEAD TAX CLASS "+csvDataArray[i]['HEAD TAX CLASS']+" Not Found In Master Data" ;


                                                        // }else{
                                                        //     bulkSqList[index].headDetails.EvolveSalesQuote_TaxClass_ID = taxClassId.recordset[0].EvolveTaxClass_ID
                                                        // let creditTermsID = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getCreditTermsID(csvDataArray[i]['CREDIT TERMS']);

                                                        // if (creditTermsID instanceof Error || creditTermsID.rowsAffected < 1) {

                                                        //     errorStatus = true ;
                                                        //     errorMessage = "CREDIT TERMS "+csvDataArray[i]['CREDIT TERMS']+" Not Found In Master Data" ;


                                                        // }else{


                                                        // bulkSqList[index].headDetails.EvolveCreditTerms_ID = creditTermsID.recordset[0].EvolveCreditTerms_ID
                                                        let getTaxEnvID = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getTaxEnvID(csvDataArray[i]['HEAD TAX ENV']);

                                                        if (getTaxEnvID instanceof Error || getTaxEnvID.rowsAffected < 1) {

                                                            errorStatus = true;
                                                            errorMessage = "HEAD TAX ENV " + csvDataArray[i]['HEAD TAX ENV'] + " Not Found In Master Data";


                                                        } else {

                                                            bulkSqList[index].headDetails.EvolveSalesQuote_TaxEnv_ID = getTaxEnvID.recordset[0].EvolveGenericCodeMaster_ID
                                                            let itemId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getItemID(csvDataArray[i]['ITEM CODE']);

                                                            if (itemId instanceof Error || itemId.rowsAffected < 1) {

                                                                errorStatus = true;
                                                                errorMessage = "ITEM CODE " + csvDataArray[i]['ITEM CODE'] + " Not Found For In Master Data";


                                                            } else {

                                                                bulkSqList[index].EvolveSalesQuote_Details.EvolveItem_ID = itemId.recordset[0].EvolveItem_ID

                                                                if (itemId.recordset[0].EvolveTaxClass_ID == null || itemId.recordset[0].EvolveTaxClass_ID == undefined || itemId.recordset[0].EvolveTaxClass_ID == '') {
                                                                    errorStatus = true;
                                                                    errorMessage = "Tax Class Not Found For ITEM CODE" + csvDataArray[i]['ITEM CODE']
                                                                } else {


                                                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveTaxClass_ID = itemId.recordset[0].EvolveTaxClass_ID;

                                                                    // let lineTaxEnv = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getTaxEnvID(csvDataArray[i]['LINE TAX ENV']);

                                                                    //     if (lineTaxEnv instanceof Error || lineTaxEnv.rowsAffected < 1) {

                                                                    //         errorStatus = true ;
                                                                    //         errorMessage = "LINE TAX ENV "+csvDataArray[i]['LINE TAX ENV']+" Not Found In Master Data" ;


                                                                    //     }else{

                                                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TaxEnv_ID = bulkSqList[index].headDetails.EvolveSalesQuote_TaxEnv_ID;

                                                                    let projectId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getProjectId(csvDataArray[i]['PROJECT']);

                                                                    if (projectId instanceof Error || projectId.rowsAffected < 1) {

                                                                        errorStatus = true;
                                                                        errorMessage = "PROJECT " + csvDataArray[i]['PROJECT'] + " Not Found In Master Data";


                                                                    } else {


                                                                        bulkSqList[index].headDetails.EvolveSalesQuote_Project_ID = projectId.recordset[0].EvolveProject_ID



                                                                        let salesPersonID = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSalesPersonId(csvDataArray[i]['SALESPERSON CODE']);

                                                                        if (salesPersonID instanceof Error || salesPersonID.rowsAffected < 1) {

                                                                            errorStatus = true;
                                                                            errorMessage = "SALESPERSON CODE " + csvDataArray[i]['SALESPERSON CODE'] + " Not Found In Master Data";


                                                                        } else {
                                                                            bulkSqList[index].headDetails.EvolveSalesQuote_SalesPerson = [{
                                                                                "id": salesPersonID.recordset[0].EvolveSalesPerson_ID, "name": salesPersonID.recordset[0].EvolveSalesPerson_Code, "commission": "0",
                                                                                "email": salesPersonID.recordset[0].EvolveSalesPerson_Email
                                                                            }];

                                                                            if (csvDataArray[i]['SHIP VIA'] != undefined && csvDataArray[i]['SHIP VIA'] != '') {


                                                                                let modId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getModeOfDelivery(csvDataArray[i]['SHIP VIA']);

                                                                                if (modId instanceof Error) {

                                                                                    errorStatus = true;
                                                                                    errorMessage = "SHIP VIA " + csvDataArray[i]['SHIP VIA'] + " Not Found In Master Data";


                                                                                } else if (modId.rowsAffected > 0) {


                                                                                    bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = modId.recordset[0].EvolveGenericCodeMaster_ID;


                                                                                } else {

                                                                                    bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = null;


                                                                                }
                                                                            } else {

                                                                                bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = null;


                                                                            }

                                                                            // }


                                                                        }



                                                                    }
                                                                }

                                                            }

                                                        }

                                                        // }
                                                        // }

                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }

                        }
                        let mergedQoteList = [];

                        if (errorStatus == false) {
                            let matchSq = [];
                            for (let i = 0; i < bulkSqList.length; i++) {

                                if (bulkSqList[i].isTaken == false) {

                                    let sameSq = [];
                                    sameSq.push(i);
                                    bulkSqList[i].isTaken = true




                                    for (let j = i + 1; j < bulkSqList.length; j++) {

                                        if (bulkSqList[j].isTaken == false) {

                                            if (JSON.stringify(bulkSqList[i].headDetails) == JSON.stringify(bulkSqList[j].headDetails)) {


                                                sameSq.push(j);
                                                bulkSqList[j].isTaken = true;

                                            }
                                        }


                                    }

                                    matchSq.push(sameSq)
                                }
                            }



                            for (let i = 0; i < matchSq.length; i++) {

                                mergedQoteList.push({
                                    headDetails: bulkSqList[matchSq[i][0]].headDetails,
                                    EvolveSalesQuote_Details: [],
                                })
                                let index = mergedQoteList.length - 1;
                                for (let j = 0; j < matchSq[i].length; j++) {


                                    mergedQoteList[index].EvolveSalesQuote_Details.push(bulkSqList[matchSq[i][j]].EvolveSalesQuote_Details)

                                }
                            }

                            for (let i = 0; i < mergedQoteList.length; i++) {

                                // mergedQoteList[i].sameLines = [] ;
                                for (let j = 0; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {

                                    for (let k = j + 1; k < mergedQoteList[i].EvolveSalesQuote_Details.length; k++) {

                                        if (mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_LineNo == mergedQoteList[i].EvolveSalesQuote_Details[k].EvolveSalesQuoteDetails_LineNo) {

                                            errorStatus = true;
                                            errorMessage = "Line Number Cant  be Same For Same Head Details of Sales Quote"
                                        }
                                    }
                                }

                            }


                            for (let i = 0; i < mergedQoteList.length; i++) {

                                for (let j = 1; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {


                                    if (j + 1 != mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_LineNo) {

                                        errorStatus = true;
                                        errorMessage = "Enter Line Number In Sequience Start From 1"
                                    }

                                }
                            }

                        }




                        if (errorStatus == false) {


                            for (let i = 0; i < mergedQoteList.length; i++) {


                                let LineDetails = mergedQoteList[i].EvolveSalesQuote_Details;
                                let totalCustCost = 0;
                                let totalCost = 0;

                                let profitMargin = 0;
                                let landedCost = 0;



                                for (let j = 0; j < LineDetails.length; j++) {

                                    LineDetails[j].EvolveSalesQuoteDetails_TotalPrice = parseFloat(LineDetails[j].EvolveItem_ItemUnitPrice * LineDetails[j].EvolveSalesQuoteDetails_Qty).toFixed(2);


                                    LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = parseFloat(LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice - ((LineDetails[j].EvolveSalesQuoteDetails_CustomerDiscount / 100) * LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice)).toFixed(2);


                                    LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = parseFloat(LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice * LineDetails[j].EvolveSalesQuoteDetails_Qty).toFixed(2);


                                    totalCost += parseFloat(LineDetails[j].EvolveSalesQuoteDetails_TotalPrice)
                                    totalCustCost += parseFloat(LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice);



                                }

                                landedCost = parseFloat(totalCost).toFixed(2);


                                profitMargin = parseFloat(((totalCustCost - landedCost) / totalCustCost) * 100).toFixed(2);


                                mergedQoteList[i].headDetails.EvolveSalesQuote_LandedCost = landedCost;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_ProfitMargin = profitMargin;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_TotalCustomerPrice = totalCustCost;
                            }


                        }

                        if (errorStatus == false) {

                            for (let i = 0; i < mergedQoteList.length; i++) {

                                let salesQuoteNo = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('SALESQUOTE')
                                if (salesQuoteNo == 0) {

                                    errorStatus = true;
                                    errorMessage = "Error While Allocate Sales Quote No";

                                } else {

                                    let poDate = mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate;


                                    poDate = poDate == '' || poDate == null ? null : poDate.split("-")

                                    poDate = (poDate == null ? null : poDate[0] + "-" + poDate[1] + "-" + poDate[2])

                                    mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate = poDate;
                                    mergedQoteList[i].headDetails.EvolveSalesQuote_Serial = salesQuoteNo;
                                    mergedQoteList[i].headDetails.EvolveApprovalMatrix_ID = null;
                                    mergedQoteList[i].headDetails.EvolveSalesQuote_SubmitDate = null;
                                    mergedQoteList[i].headDetails.EvolveSalesQuote_ReleaseDate = null;
                                    mergedQoteList[i].headDetails.EvolveUnit_ID = req.EvolveUnit_ID;
                                    mergedQoteList[i].headDetails.EvolveUser_ID = req.EvolveUser_ID;
                                    mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson = JSON.stringify(mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson);

                                    let saveQuoteHead = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.saveQuoteHeadDetails(mergedQoteList[i].headDetails);

                                    if (saveQuoteHead instanceof Error || saveQuoteHead.rowsAffected < 1) {
                                        errorStatus = true;
                                        errorMessage = "Error While Upload Sales Quote";

                                    } else {

                                        let EvolveSalesQuote_ID = saveQuoteHead.recordset[0].inserted_id;

                                        for (let j = 0; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {

                                            if (errorStatus == false) {

                                                let reqdate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_ReqdDate;

                                                let promiseDate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_PromiseDate;

                                                let dueate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_DueDate;




                                                reqdate = reqdate == '' || reqdate == null ? null : reqdate.split("-")

                                                reqdate = (reqdate == null ? null : reqdate[0] + "-" + reqdate[1] + "-" + reqdate[2])






                                                promiseDate = promiseDate == '' || promiseDate == null ? null : promiseDate.split("-")

                                                promiseDate = (promiseDate == null ? null : promiseDate[0] + "-" + promiseDate[1] + "-" + promiseDate[2])




                                                dueate = dueate == '' || dueate == null ? null : dueate.split("-")
                                                dueate = (dueate == null ? null : dueate[0] + "-" + dueate[1] + "-" + dueate[2])

                                                mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_ReqdDate = reqdate;
                                                mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_PromiseDate = promiseDate;
                                                mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_DueDate = dueate;





                                                mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveUser_ID = req.EvolveUser_ID;



                                                let saveQuoteLineDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.saveQuoteLineDetails(mergedQoteList[i].EvolveSalesQuote_Details[j], EvolveSalesQuote_ID);

                                                if (saveQuoteLineDetails instanceof Error || saveQuoteLineDetails.rowsAffected < 1) {


                                                    errorStatus = true;
                                                    errorMessage = 'Error While Add Line Details Please Take Demo Csv And Match  Line etails format of Promise date , Req date etc';


                                                    let deleteHeadDetails = Evolve.App.Services.eDoa.SalesQuote.SrvList.deleteSQHeadDetails(EvolveSalesQuote_ID);

                                                    let deleteLineDetails = Evolve.App.Services.eDoa.SalesQuote.SrvList.deleteSQLineDetails(EvolveSalesQuote_ID);

                                                    break;



                                                }
                                            }

                                        }

                                    }



                                }
                            }






                        }


                        if (errorStatus) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        } else {
                            let obj = { statusCode: 200, status: "success", message: 'Sales Quotes Uploade Successfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Amend Sales Quote" + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While Amend Sales Quote " + error.message, result: null };
            res.send(obj);
        }
    },


    uploadSqInitialCsv: async function (req, res) {
        try {

            console.log("uploadSqInitialCsv???????????????????????????????????????////")
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                let UnitStateCode = '';
                let custStateCode = '';

                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'SalesQuote_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // let csvDataArray = await Evolve.Csv({
                        //     trim:false,
                        //     ignoreEmpty : true ,
                        // }).fromFile('./csv/doa/' + fileName);
                        let csvDataArray = await Evolve.Csv({
                            trim: false,
                            ignoreEmpty: true,
                        }).fromFile('./csv/doa/' + fileName);
                        let errorMessage = '';
                        let errorStatus = false;

                        let getUnitStateCode = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getUnitStateCode(req.EvolveUnit_ID);
                        if (getUnitStateCode instanceof Error || getUnitStateCode.rowsAffected < 1) {


                            errorStatus = true;
                            errorMessage = "Error While Get Unit State Code"

                        } else {

                            if (getUnitStateCode.recordset[0].EvolveUnit_State == null || getUnitStateCode.recordset[0].EvolveUnit_State == undefined || getUnitStateCode.recordset[0].EvolveUnit_State == "") {

                                errorStatus = true;
                                errorMessage = "State Code Not Found For logged In Unit"


                            } else {

                                UnitStateCode = getUnitStateCode.recordset[0].EvolveUnit_State;


                            }

                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {

                                csvDataArray[i]['ITEM CODE'] = csvDataArray[i]['ITEM CODE'].trimEnd()
                                csvDataArray[i]['BILL-TO'] = csvDataArray[i]['BILL-TO'].trim()
                                csvDataArray[i]['SHIP-TO'] = csvDataArray[i]['SHIP-TO'].trim()
                                csvDataArray[i]['CHANNEL'] = csvDataArray[i]['CHANNEL'].trim()
                                csvDataArray[i]['PROJECT'] = csvDataArray[i]['PROJECT'].trim()
                                csvDataArray[i]['LINE NO'] = csvDataArray[i]['LINE NO'].trim()
                                csvDataArray[i]['ITEM CODE'] = csvDataArray[i]['ITEM CODE'].trim()
                                csvDataArray[i]['REXEL UNIT PRICE'] = csvDataArray[i]['REXEL UNIT PRICE'].trim()
                                csvDataArray[i]['QTY'] = csvDataArray[i]['QTY'].trim()

                                csvDataArray[i]['CUST UNIT PRICE'] = csvDataArray[i]['CUST UNIT PRICE'].trim()
                                csvDataArray[i]['CUST DISCOUNT'] = csvDataArray[i]['CUST DISCOUNT'].trim()

                                if (csvDataArray[i]['CUSTOMER CODE'] == '' || csvDataArray[i]['CUSTOMER CODE'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUSTOMER CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['BILL-TO'] == '' || csvDataArray[i]['BILL-TO'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "BILL-TO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['SHIP-TO'] == '' || csvDataArray[i]['SHIP-TO'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "SHIP-TO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CHANNEL'] == '' || csvDataArray[i]['CHANNEL'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CHANNEL Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['PROJECT'] == '' || csvDataArray[i]['PROJECT'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "PROJECT Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['SALESPERSON CODE'] == '' || csvDataArray[i]['SALESPERSON CODE'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "SALESPERSON CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['LINE NO'] == '' || csvDataArray[i]['LINE NO'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "LINE NO Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['ITEM CODE'] == '' || csvDataArray[i]['ITEM CODE'] == undefined) {


                                    errorStatus = true;
                                    errorMessage = "ITEM CODE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['REXEL UNIT PRICE'] == '' || csvDataArray[i]['REXEL UNIT PRICE'] == undefined) {

                                    errorStatus = true;

                                    errorMessage = "REXEL UNIT PRICE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['QTY'] == '' || csvDataArray[i]['QTY'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "QTY Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CUST UNIT PRICE'] == '' || csvDataArray[i]['CUST UNIT PRICE'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUST UNIT PRICE Not  Found In Row " + i + 1;


                                } else if (csvDataArray[i]['CUST DISCOUNT'] == '' || csvDataArray[i]['CUST DISCOUNT'] == undefined) {

                                    errorStatus = true;
                                    errorMessage = "CUST DISCOUNT Not  Found In Row " + i + 1;

                                }

                            }

                        }
                        let bulkSqList = [];

                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {

                                console.log("csvDataArray>>>", i)

                                if (errorStatus == false) {

                                    bulkSqList.push({

                                        headDetails: {},
                                        EvolveSalesQuote_Details: {},
                                        isTaken: false,
                                    })
                                    let index = bulkSqList.length - 1;

                                    bulkSqList[index].headDetails.EvolveSalesQuote_Serial = csvDataArray[i]['SALES QUOTE NO'];
                                    bulkSqList[index].headDetails.EvolveSalesQuote_SalesOrder = csvDataArray[i]['SALES ORDER NO'];


                                    bulkSqList[index].headDetails.EvolveSalesQuote_ReleaseDate = '';
                                    bulkSqList[index].headDetails.EvolveSalesQuote_PoDate = csvDataArray[i]['PO DATE'];

                                    bulkSqList[index].headDetails.EvolveSalesQuote_Comments = csvDataArray[i]['HEAD COMMENTS'];


                                    bulkSqList[index].headDetails.EvolveSalesQuote_Freight = (csvDataArray[i]['INWARD FREIGHT'] == '' || csvDataArray[i]['INWARD FREIGHT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['INWARD FREIGHT']);

                                    bulkSqList[index].headDetails.EvolveSalesQuote_OutWardFreight = (csvDataArray[i]['OUTWARD FREIGHT'] == '' || csvDataArray[i]['OUTWARD FREIGHT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['OUTWARD FREIGHT']);


                                    bulkSqList[index].headDetails.EvolveSalesQuote_Pnf = (csvDataArray[i]['PNF'] == '' || csvDataArray[i]['PNF'] == undefined) ? 0 : parseFloat(csvDataArray[i]['PNF']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_Status = 'QADRELEASED';
                                    bulkSqList[index].headDetails.EvolveSalesQuote_CurrentOutstanding = (csvDataArray[i]['CURRENT OUT'] == '' || csvDataArray[i]['CURRENT OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['CURRENT OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_ThirtyOutstanding = (csvDataArray[i]['1-30 DAYS OUT'] == '' || csvDataArray[i]['1-30 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['1-30 DAYS OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_SixtyOutstanding = (csvDataArray[i]['30-60 DAYS OUT'] == '' || csvDataArray[i]['30-60 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['30-60 DAYS OUT']);
                                    bulkSqList[index].headDetails.EvolveSalesQuote_NinetyOutstanding = (csvDataArray[i]['60-90 DAYS OUT'] == '' || csvDataArray[i]['60-90 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['60-90 DAYS OUT']);

                                    bulkSqList[index].headDetails.EvolveSalesQuote_OneEightyOutstanding = (csvDataArray[i]['90-180 DAYS OUT'] == '' || csvDataArray[i]['90-180 DAYS OUT'] == undefined) ? 0 : parseFloat(csvDataArray[i]['90-180 DAYS OUT']);


                                    bulkSqList[index].headDetails.EvolveSalesQuote_LandedCost = null;
                                    bulkSqList[index].headDetails.EvolveSalesQuote_ProfitMargin = null;
                                    bulkSqList[index].headDetails.EvolveSalesQuote_PurchaseOrder = csvDataArray[i]['PO NO'];
                                    bulkSqList[index].headDetails.EvolveSalesQuote_TotalCustomerPrice = null;
                                    bulkSqList[index].headDetails.EvolveUnit_Code = csvDataArray[i]['UNIT CODE'];


                                    //line details 

                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_LineNo = parseInt(csvDataArray[i]['LINE NO']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Qty = parseFloat(csvDataArray[i]['QTY']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerUnitPrice = parseFloat(csvDataArray[i]['CUST UNIT PRICE']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerDiscount = parseFloat(csvDataArray[i]['CUST DISCOUNT']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_ReqdDate = csvDataArray[i]['REQD DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_PromiseDate = csvDataArray[i]['PROMISE DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_DueDate = csvDataArray[i]['DUE DATE'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Comments = csvDataArray[i]['LINE COMMENTS'];
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveItem_ItemUnitPrice = parseFloat(csvDataArray[i]['REXEL UNIT PRICE']);
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TotalPrice = null;
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = null;
                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = null;

                                    bulkSqList[index].EvolveSalesQuote_Details.EvolvePriceListDetails_ID = null


                                    bulkSqList[index].EvolveSalesQuote_Details.EvolvePriceList_Code = csvDataArray[i]['AGREEMENT NO'];

                                    // bulkSqList[index].headDetails.EvolvePriceList_Code

                                    let getCusDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getCustomerDetailsInitialLoad(csvDataArray[i]['CUSTOMER CODE']);

                                    if (getCusDetails instanceof Error || getCusDetails.rowsAffected < 1) {

                                        errorStatus = true;
                                        errorMessage = "CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " Not Found  In Master Data";


                                    } else {

                                        let custDetails = getCusDetails.recordset[0];

                                        bulkSqList[index].headDetails.EvolveSalesQuote_Customer_ID = custDetails.EvolveCustomer_ID;
                                        if (custDetails.EvolveCreditTerms_ID == null || custDetails.EvolveCreditTerms_ID == undefined || custDetails.EvolveCreditTerms_ID == '') {

                                            errorStatus = true;
                                            errorMessage = "Credit Terms Not Found For CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " In Master Data";

                                        } else if (custDetails.EvolveShipTo_State == null || custDetails.EvolveShipTo_State == undefined || custDetails.EvolveShipTo_State == '') {


                                            errorStatus = true;
                                            errorMessage = "State Code Not Found For CUSTOMER CODE " + csvDataArray[i]['CUSTOMER CODE'] + " In Master Data";
                                        } else {

                                            bulkSqList[index].headDetails.EvolveSalesQuote_SalesPerson = [];

                                            bulkSqList[index].headDetails.EvolveSalesQuote_TaxClass_ID = (custDetails.EvolveTaxClass_ID == '' || custDetails.EvolveTaxClass_ID == null || custDetails.EvolveTaxClass_ID == undefined ? null : custDetails.EvolveTaxClass_ID);
                                            bulkSqList[index].headDetails.EvolveCreditTerms_ID = custDetails.EvolveCreditTerms_ID;
                                            custStateCode = custDetails.EvolveShipTo_State;
                                            if (custStateCode == UnitStateCode) {

                                                csvDataArray[i]['HEAD TAX ENV'] = 'WST';


                                            } else {

                                                csvDataArray[i]['HEAD TAX ENV'] = 'OST'

                                            }


                                            let getBillToId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getBillToShipToID(csvDataArray[i]['BILL-TO']);

                                            if (getBillToId instanceof Error || getBillToId.rowsAffected < 1) {

                                                errorStatus = true;
                                                errorMessage = "BILL-TO CODE" + csvDataArray[i]['BILL-TO'] + " Not Found In Master Data";


                                            } else {


                                                bulkSqList[index].headDetails.EvolveSalesQuote_BillTo = getBillToId.recordset[0].EvolveShipTo_ID

                                                let getShipToId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getBillToShipToID(csvDataArray[i]['SHIP-TO']);

                                                if (getShipToId instanceof Error || getShipToId.rowsAffected < 1) {

                                                    errorStatus = true;
                                                    errorMessage = "SHIP TO CODE " + csvDataArray[i]['SHIP-TO'] + " Not Found In Master Data";


                                                } else {


                                                    bulkSqList[index].headDetails.EvolveSalesQuote_ShipTo = getShipToId.recordset[0].EvolveShipTo_ID
                                                    let channelId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getChannelId(csvDataArray[i]['CHANNEL']);

                                                    if (channelId instanceof Error || channelId.rowsAffected < 1) {

                                                        errorStatus = true;
                                                        errorMessage = "CHANNEL " + csvDataArray[i]['CHANNEL'] + " Not Found In Master Data";


                                                    } else {

                                                        bulkSqList[index].headDetails.EvolveSalesQuote_Channel_ID = channelId.recordset[0].EvolveGenericCodeMaster_ID

                                                        let getTaxEnvID = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getTaxEnvID(csvDataArray[i]['HEAD TAX ENV']);

                                                        if (getTaxEnvID instanceof Error || getTaxEnvID.rowsAffected < 1) {

                                                            errorStatus = true;
                                                            errorMessage = "HEAD TAX ENV " + csvDataArray[i]['HEAD TAX ENV'] + " Not Found In Master Data";


                                                        } else {

                                                            bulkSqList[index].headDetails.EvolveSalesQuote_TaxEnv_ID = getTaxEnvID.recordset[0].EvolveGenericCodeMaster_ID
                                                            let itemId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getItemID(csvDataArray[i]['ITEM CODE']);

                                                            if (itemId instanceof Error || itemId.rowsAffected < 1) {

                                                                errorStatus = true;
                                                                errorMessage = "ITEM CODE " + csvDataArray[i]['ITEM CODE'] + " Not Found For In Master Data";


                                                            } else {

                                                                bulkSqList[index].EvolveSalesQuote_Details.EvolveItem_ID = itemId.recordset[0].EvolveItem_ID

                                                                if (itemId.recordset[0].EvolveTaxClass_ID == null || itemId.recordset[0].EvolveTaxClass_ID == undefined || itemId.recordset[0].EvolveTaxClass_ID == '') {
                                                                    errorStatus = true;
                                                                    errorMessage = "Tax Class Not Found For ITEM CODE" + csvDataArray[i]['ITEM CODE']
                                                                } else {


                                                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveTaxClass_ID = itemId.recordset[0].EvolveTaxClass_ID;

                                                                    bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TaxEnv_ID = bulkSqList[index].headDetails.EvolveSalesQuote_TaxEnv_ID;

                                                                    let projectId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getProjectId(csvDataArray[i]['PROJECT']);

                                                                    if (projectId instanceof Error || projectId.rowsAffected < 1) {

                                                                        errorStatus = true;
                                                                        errorMessage = "PROJECT " + csvDataArray[i]['PROJECT'] + " Not Found In Master Data";


                                                                    } else {


                                                                        bulkSqList[index].headDetails.EvolveSalesQuote_Project_ID = projectId.recordset[0].EvolveProject_ID



                                                                        let unitCode = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.getUnitCode(bulkSqList[i].headDetails.EvolveUnit_Code);

                                                                        if (unitCode instanceof Error || unitCode.rowsAffected < 1) {

                                                                            errorStatus = true;
                                                                            errorMessage = 'UNIT CODE ' + bulkSqList[i].headDetails.EvolveUnit_Code + ' NOT FOUND';


                                                                        } else {


                                                                            bulkSqList[index].headDetails.EvolveUnit_ID = unitCode.recordset[0].EvolveUnit_ID

                                                                            let salesPersonID = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSalesPersonId(csvDataArray[i]['SALESPERSON CODE']);

                                                                            if (salesPersonID instanceof Error || salesPersonID.rowsAffected < 1) {

                                                                                errorStatus = true;
                                                                                errorMessage = "SALESPERSON CODE " + csvDataArray[i]['SALESPERSON CODE'] + " Not Found In Master Data";


                                                                            } else {
                                                                                bulkSqList[index].headDetails.EvolveSalesQuote_SalesPerson = [{
                                                                                    "id": salesPersonID.recordset[0].EvolveSalesPerson_ID, "name": salesPersonID.recordset[0].EvolveSalesPerson_Code, "commission": "0",
                                                                                    "email": salesPersonID.recordset[0].EvolveSalesPerson_Email
                                                                                }];

                                                                                if (csvDataArray[i]['SHIP VIA'] != undefined && csvDataArray[i]['SHIP VIA'] != '') {


                                                                                    let modId = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getModeOfDelivery(csvDataArray[i]['SHIP VIA']);

                                                                                    if (modId instanceof Error) {

                                                                                        errorStatus = true;
                                                                                        errorMessage = "SHIP VIA " + csvDataArray[i]['SHIP VIA'] + " Not Found In Master Data";


                                                                                    } else if (modId.rowsAffected > 0) {


                                                                                        bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = modId.recordset[0].EvolveGenericCodeMaster_ID;


                                                                                    } else {

                                                                                        bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = null;


                                                                                    }
                                                                                } else {

                                                                                    bulkSqList[index].headDetails.EvolveSalesQuote_DeliveryMode_ID = null;


                                                                                }


                                                                                let aggrementDetails = {

                                                                                    EvolvePriceList_Code: bulkSqList[index].EvolveSalesQuote_Details.EvolvePriceList_Code,

                                                                                    EvolveItem_ID: bulkSqList[index].EvolveSalesQuote_Details.EvolveItem_ID,

                                                                                    EvolveUnit_ID: bulkSqList[index].headDetails.EvolveUnit_ID,

                                                                                    EvolveCustomer_ID: bulkSqList[index].headDetails.EvolveSalesQuote_Customer_ID,
                                                                                }
                                                                                let resultByDesignGroup = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.getItemAgreementDetailsByDesignGroupForInitialLoad(aggrementDetails);

                                                                                if (resultByDesignGroup instanceof Error) {


                                                                                    errorStatus = true;
                                                                                    errorMessage = "ERROR WHILE GET AGREEMENT FOR LINE " + bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_LineNo

                                                                                } else {

                                                                                    if (resultByDesignGroup.rowsAffected > 0) {



                                                                                        bulkSqList[index].EvolveSalesQuote_Details.EvolvePriceListDetails_ID = resultByDesignGroup.recordset[0].EvolvePriceListDetails_ID

                                                                                    }


                                                                                    let resultByItem = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.getItemAgreementDetailsByItemForInitialLoad(aggrementDetails);


                                                                                    if (resultByItem instanceof Error) {


                                                                                        errorStatus = true;
                                                                                        errorMessage = "ERROR WHILE GET AGREEMENT FOR LINE " + bulkSqList[index].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_LineNo

                                                                                    } else if (resultByItem.rowsAffected > 0) {

                                                                                        bulkSqList[index].EvolveSalesQuote_Details.EvolvePriceListDetails_ID = resultByItem.recordset[0].EvolvePriceListDetails_ID

                                                                                    }

                                                                                }


                                                                            }
                                                                        }



                                                                    }
                                                                }

                                                            }

                                                        }

                                                        // }
                                                        // }

                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                            }

                        }
                        let mergedQoteList = [];

                        if (errorStatus == false) {
                            let matchSq = [];
                            for (let i = 0; i < bulkSqList.length; i++) {

                                if (bulkSqList[i].isTaken == false) {

                                    let sameSq = [];
                                    sameSq.push(i);
                                    bulkSqList[i].isTaken = true




                                    for (let j = i + 1; j < bulkSqList.length; j++) {

                                        if (bulkSqList[j].isTaken == false) {

                                            if ((bulkSqList[i].headDetails.EvolveSalesQuote_Serial) == (bulkSqList[j].headDetails.EvolveSalesQuote_Serial)) {


                                                sameSq.push(j);
                                                bulkSqList[j].isTaken = true;

                                            }
                                        }


                                    }

                                    matchSq.push(sameSq)
                                }
                            }



                            for (let i = 0; i < matchSq.length; i++) {

                                mergedQoteList.push({
                                    headDetails: bulkSqList[matchSq[i][0]].headDetails,
                                    EvolveSalesQuote_Details: [],
                                })
                                let index = mergedQoteList.length - 1;
                                for (let j = 0; j < matchSq[i].length; j++) {


                                    mergedQoteList[index].EvolveSalesQuote_Details.push(bulkSqList[matchSq[i][j]].EvolveSalesQuote_Details)

                                }
                            }

                            // for (let i = 0; i < mergedQoteList.length; i++) {
                            //     for (let j = 0; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {

                            //         for (let k = j + 1; k < mergedQoteList[i].EvolveSalesQuote_Details.length; k++) {

                            //             if (mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_LineNo == mergedQoteList[i].EvolveSalesQuote_Details[k].EvolveSalesQuoteDetails_LineNo) {

                            //                 errorStatus = true;
                            //                 errorMessage = "Line Number Cant  be Same For Same Head Details of Sales Quote"
                            //             }
                            //         }
                            //     }

                            // }


                            // for (let i = 0; i < mergedQoteList.length; i++) {

                            //     for (let j = 1; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {


                            //         if (j + 1 != mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_LineNo) {

                            //             errorStatus = true;
                            //             errorMessage = "Enter Line Number In Sequience Start From 1"
                            //         }

                            //     }
                            // }

                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < mergedQoteList.length; i++) {

                                console.log("mergedQoteList???", i)


                                let LineDetails = mergedQoteList[i].EvolveSalesQuote_Details;
                                let totalCustCost = 0;
                                let totalCost = 0;

                                let profitMargin = 0;
                                let landedCost = 0;



                                for (let j = 0; j < LineDetails.length; j++) {

                                    LineDetails[j].EvolveSalesQuoteDetails_TotalPrice = parseFloat(LineDetails[j].EvolveItem_ItemUnitPrice * LineDetails[j].EvolveSalesQuoteDetails_Qty).toFixed(2);


                                    LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = parseFloat(LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice - ((LineDetails[j].EvolveSalesQuoteDetails_CustomerDiscount / 100) * LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice)).toFixed(2);


                                    LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = parseFloat(LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice * LineDetails[j].EvolveSalesQuoteDetails_Qty).toFixed(2);


                                    totalCost += parseFloat(LineDetails[j].EvolveSalesQuoteDetails_TotalPrice)
                                    totalCustCost += parseFloat(LineDetails[j].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice);



                                }

                                landedCost = parseFloat(totalCost).toFixed(2);


                                profitMargin = parseFloat(((totalCustCost - landedCost) / totalCustCost) * 100).toFixed(2);


                                mergedQoteList[i].headDetails.EvolveSalesQuote_LandedCost = landedCost;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_ProfitMargin = profitMargin;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_TotalCustomerPrice = totalCustCost;
                            }


                        }


                        if (errorStatus == false) {

                            for (let i = 0; i < mergedQoteList.length; i++) {

                                let poDate = mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate;


                                poDate = poDate == '' || poDate == null ? null : poDate.split("-")

                                poDate = (poDate == null ? null : poDate[0] + "-" + poDate[1] + "-" + poDate[2])

                                mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate = poDate;
                                mergedQoteList[i].headDetails.EvolveApprovalMatrix_ID = null;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_SubmitDate = null;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_ReleaseDate = null;
                                mergedQoteList[i].headDetails.EvolveUnit_ID = req.EvolveUnit_ID;
                                mergedQoteList[i].headDetails.EvolveUser_ID = req.EvolveUser_ID;
                                mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson = JSON.stringify(mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson);

                                let saveQuoteHead = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.saveInitialQuoteHeadDetails(mergedQoteList[i].headDetails);

                                if (saveQuoteHead instanceof Error || saveQuoteHead.rowsAffected < 1) {
                                    errorStatus = true;
                                    errorMessage = "Error While Upload Sales Quote";

                                } else {

                                    let EvolveSalesQuote_ID = saveQuoteHead.recordset[0].inserted_id;

                                    for (let j = 0; j < mergedQoteList[i].EvolveSalesQuote_Details.length; j++) {

                                        if (errorStatus == false) {

                                            let reqdate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_ReqdDate;

                                            let promiseDate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_PromiseDate;

                                            let dueate = mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_DueDate;

                                            reqdate = reqdate == '' || reqdate == null ? null : reqdate.split("-")

                                            reqdate = (reqdate == null ? null : reqdate[0] + "-" + reqdate[1] + "-" + reqdate[2])

                                            promiseDate = promiseDate == '' || promiseDate == null ? null : promiseDate.split("-")

                                            promiseDate = (promiseDate == null ? null : promiseDate[0] + "-" + promiseDate[1] + "-" + promiseDate[2])

                                            dueate = dueate == '' || dueate == null ? null : dueate.split("-")
                                            dueate = (dueate == null ? null : dueate[0] + "-" + dueate[1] + "-" + dueate[2])

                                            mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_ReqdDate = reqdate;
                                            mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_PromiseDate = promiseDate;
                                            mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveSalesQuoteDetails_DueDate = dueate;
                                            mergedQoteList[i].EvolveSalesQuote_Details[j].EvolveUser_ID = req.EvolveUser_ID;

                                            let saveQuoteLineDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvOption.saveInitialQuoteLineDetails(mergedQoteList[i].EvolveSalesQuote_Details[j], EvolveSalesQuote_ID);

                                            if (saveQuoteLineDetails instanceof Error || saveQuoteLineDetails.rowsAffected < 1) {


                                                errorStatus = true;
                                                errorMessage = 'Error While Add Line Details Please Take Demo Csv And Match  Line etails format of Promise date , Req date etc';


                                                let deleteHeadDetails = Evolve.App.Services.eDoa.SalesQuote.SrvList.deleteSQHeadDetails(EvolveSalesQuote_ID);

                                                let deleteLineDetails = Evolve.App.Services.eDoa.SalesQuote.SrvList.deleteSQLineDetails(EvolveSalesQuote_ID);

                                                break;



                                            }
                                        }

                                    }

                                }

                            }
                        }

                        console.log("errorStatus?????", errorStatus)

                        console.log("errorMessage?????", errorMessage)



                        if (errorStatus) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        } else {
                            let obj = { statusCode: 200, status: "success", message: 'Sales Quotes Uploade Successfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Amend Sales Quote" + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While Amend Sales Quote " + error.message, result: null };
            res.send(obj);
        }
    },


    getSingleSqDetailsForPdf: async function (req, res) {
        try {
            let getSingelSalesQuoteHead = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSingelSalesQuoteHead(req.body.EvolveSalesQuote_ID);

            if (getSingelSalesQuoteHead instanceof Error || getSingelSalesQuoteHead.rowsAffected < 1) {
                Evolve.Log.error("EERR#### : Error while get single sales details head ")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details head ", result: null };
                res.send(obj);
            }
            else {


                let getSingelSalesQuoteDetails = await Evolve.App.Services.eDoa.SalesQuote.SrvList.getSingelSalesQuoteDetails(req.body.EvolveSalesQuote_ID);
                if (getSingelSalesQuoteDetails instanceof Error || getSingelSalesQuoteDetails.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error while get single sales quote details ")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get single sales details", result: null };
                    res.send(obj);
                }
                else {

                    for (let i = 0; i < getSingelSalesQuoteDetails.recordset.length; i++) {


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerDiscount / 100) * getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice) + '';


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_Qty * (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice - ((getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerDiscount / 100)) * getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice) + '';

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_TotalPrice = getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_Qty * getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice;


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_Qty = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_Qty.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));


                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_CustomerUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveItem_ItemUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_TotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_TotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                        getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = (getSingelSalesQuoteDetails.recordset[i].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                    }

                    let resObj = {
                        salesQuoteHead: getSingelSalesQuoteHead.recordset,
                        salesQuoteDetails: getSingelSalesQuoteDetails.recordset,
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





}