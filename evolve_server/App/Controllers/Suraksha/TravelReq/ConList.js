'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    // addTravelRequest: async function (req, res) {
    //     try {
    //         let error = false ;
    //         let notify = true ;
    //         let errorMessage = '';
    //             let dravelRequest = req.body.evolve_travel_request;

    //             let date1 = new Date(dravelRequest.EvolveTravelReq_startDate); 
    //             let date2 = new Date(dravelRequest.EvolveTravelReq_endDate); 
    //             dravelRequest.EvolveTravelReq_startDate = date1 ;
    //             dravelRequest.EvolveTravelReq_endDate = date2 ;


    //             let Difference_In_Time = date2.getTime() - date1.getTime(); 
    //             let diff = Difference_In_Time / (1000 * 3600 * 24);
    //             if(diff < 0) throw { message: 'Please enter correct leave date' }
    //              req.body.evolve_travel_request.EvolveUser_id = req.EvolveUser_ID;

    //         let  getStartTripStatusId = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getStartTripStatusId()
    //         if (getStartTripStatusId instanceof Error || getStartTripStatusId.rowsAffected < 1) {

    //             error = true ;

    //         }else{
    //             req.body.evolve_travel_request.EvolveTravelReq_TripStatusID = getStartTripStatusId.recordset[0].EvolveStatusCodeMstr_Id
    //             let addreq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addTravelRequest(req.body.evolve_travel_request)
    //             if (addreq instanceof Error || addreq.rowsAffected < 1) {
    //                 error = true;
    //                 errorMessage = 'Error while add travel request'
    //             }else{
    //                 req.body.evolve_travel_request_details.EvolveUser_ID  = req.EvolveUser_ID
    //             let addApproveStatus = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalStatus( req.body.evolve_travel_request_details,addreq.recordset[0].inserted_id,diff)   
    //                 if (addApproveStatus == true) {
    //                 error = true;
    //                 errorMessage = 'Error while add approval status'
    //                 }else{
    //                     let addres = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.addRequestDetails(req.body.evolve_travel_request_details , addreq.recordset[0].inserted_id)
    //                     if (addres == true) {
    //                         error = true;
    //                         errorMessage = 'Error while add request details'

    //                     }else{
    //                         req.body.med_history.EvolveTravelReq_id = addreq.recordset[0].inserted_id;
    //                         let addtravelReqMedDetail = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.addTravelReqMedDetails(req.body.med_history, addreq.recordset[0].inserted_id)
    //                         if (addtravelReqMedDetail instanceof Error || addtravelReqMedDetail.rowsAffected < 1) {
    //                         error = true;
    //                         errorMessage = 'Error while add travel request details'
    //                       }else{


    //                         if(notify == true){

    //                         let travelReqDetails  = await Evolve.App.Services.Common.SrvCommon.getTravelReqDetails(addreq.recordset[0].inserted_id);

    //                         if(travelReqDetails.headDetails.length  != 0 ){
    //                         let sentToLoggedUser = true ;
    //                             // for(let i=0 ; i<travelReqDetails.headDetails.length ; i++){

    //                                 // if(travelReqDetails.headDetails[i] == 0){
    //                                 let data  = {
    //                                     loggedUserID  : req.EvolveUser_ID ,
    //                                     headUserId : travelReqDetails.headDetails[0].EvolveApproval_primaryUser_id ,
    //                                     notifCode : 'RAISE',
    //                                     notifType : 'REQUEST',
    //                                     EvolveTravelReq_id : addreq.recordset[0].inserted_id ,
    //                                     sentToLoggedUser : sentToLoggedUser  ,


    //                                 }
    //                                 let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

    //                                 data.headUserId  = travelReqDetails.headDetails[0].EvolveApproval_secondUser_id
    //                                 data.sentToLoggedUser = false ;
    //                                 sentToLoggedUser  = false


    //                                  sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

    //                                 data.headUserId  = travelReqDetails.headDetails[0].EvolveApproval_tertiaryUser_id
    //                                  sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data);
    //                         }
    //                             // }
    //                             // }
    //                     }
    //                  }
    //                     }
    //                 }
    //             }
    //         }
    //          if(error == false){                
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "Travel Request Added Successfully !",
    //                 result: null
    //             };
    //             res.send(obj);
    //          }else{
    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "Error While Add Travel Request ",
    //                 result: '',
    //             };
    //             res.send(obj);   
    //          }
    //     } catch (error) {
    //         Evolve.Log.error(error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },

    addTravelRequest: async function (req, res) {
        try {

            req.body.EvolveApprovalMatrix_ID = 0;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.evolve_travel_request.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.EvolveApprovalProcessDetails_Status = '';
            let error = false;
            let notify = true;
            let errorMessage = '';
            let dravelRequest = req.body.evolve_travel_request;

            let date1 = new Date(dravelRequest.EvolveTravelReq_startDate);
            let date2 = new Date(dravelRequest.EvolveTravelReq_endDate);
            dravelRequest.EvolveTravelReq_startDate = date1;
            dravelRequest.EvolveTravelReq_endDate = date2;

            let Difference_In_Time = date2.getTime() - date1.getTime();
            let diff = Difference_In_Time / (1000 * 3600 * 24);

            req.body.evolve_travel_request.EvolveTravelReq_Days = parseInt(diff);
            if (diff < 0) throw { message: 'Please enter correct leave date' }
            req.body.evolve_travel_request.EvolveUser_id = req.EvolveUser_ID;

            let getStartTripStatusId = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getStartTripStatusId()
            if (getStartTripStatusId instanceof Error || getStartTripStatusId.rowsAffected < 1) {

                error = true;

            } else {
                req.body.evolve_travel_request.EvolveTravelReq_TripStatusID = getStartTripStatusId.recordset[0].EvolveStatusCodeMstr_Id;
                let addreq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addTravelRequest(req.body.evolve_travel_request)
                if (addreq instanceof Error || addreq.rowsAffected < 1) {
                    error = true;
                    errorMessage = 'Error while add travel request'
                } else {

                    req.body.EvolveTravelReq_id = addreq.recordset[0].inserted_id;

                    let matrixList = await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixRootDetails('TRAVELREQUEST');
                    if (matrixList instanceof Error) {

                        error = true;

                    } else {

                        for (let i = 0; i < matrixList.length; i++) {

                            if (matrixList[i].roolList.length == 0) {

                                req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                            } else {
                                let queryStr = "";
                                for (let j = 0; j < matrixList[i].roolList.length; j++) {


                                    if (matrixList[i].roolList[j].case == "==") {
                                        matrixList[i].roolList[j].case = "=";
                                    }

                                    // matrixList[i].roolList[j].caseValue
                                    let caseValueList = matrixList[i].roolList[j].caseValue.split(',');

                                    queryStr += " AND (";

                                    for (let k = 0; k < caseValueList.length; k++) {


                                        if (k == caseValueList.length - 1) {

                                            queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] + ' ) ';

                                        } else {

                                            queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] + ' OR ';


                                        }




                                    }
                                }

                                let details = {


                                    EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                    queryStr: queryStr,
                                }


                                let matchSqDetaiks = await Evolve.App.Services.Suraksha.TravelReq.SrvList.matchReqeDtails(details);

                                if (matchSqDetaiks instanceof Error) {

                                    error = true;
                                    errorMessage = 'Error While Assign Approval Matrix'

                                } else if (matchSqDetaiks.rowsAffected > 0) {

                                    req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                                }
                            }

                        }

                        if (req.body.EvolveApprovalMatrix_ID != 0) {

                            let checkProcess = await Evolve.App.Services.Suraksha.TravelReq.SrvList.checkApprovalProcess(req.body);

                            if (checkProcess instanceof Error) {


                                error = true;

                            } else if (checkProcess.rowsAffected > 0) {
                                req.body.EvolveApprovalProcess_ID = checkProcess.recordset[0].EvolveApprovalProcess_ID
                                let updateSeq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.updateApprovalProcessSeq(req.body);
                                if (updateSeq instanceof Error || updateSeq.rowsAffected < 1) {
                                    error = true;
                                } else {

                                    req.body.EvolveApprovalProcess_ID = req.body.EvolveApprovalProcess_ID;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'RESUBMITED'

                                    let addProcessDetails = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            } else {

                                let result = await Evolve.App.Services.Suraksha.TravelReq.SrvList.submitToApprovelProcess(req.body);
                                if (result instanceof Error || result.rowsAffected < 1) {
                                    error = true;
                                } else {


                                    req.body.EvolveApprovalProcess_ID = result.recordset[0].inserted_id;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'SUBMITED'


                                    let addProcessDetails = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            }
                        } else {

                            await Evolve.App.Services.Suraksha.TravelReq.SrvList.deleteTravelReq(req.body.EvolveTravelReq_id);

                            error = true;
                            errorMessage = 'No Approval Matrix Matched Travel Request'

                        }
                    }
                    if (error == false) {
                        req.body.evolve_travel_request_details.EvolveUser_ID = req.EvolveUser_ID
                        // let addApproveStatus = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalStatus( req.body.evolve_travel_request_details,addreq.recordset[0].inserted_id,diff)   
                        //     if (addApproveStatus == true) {
                        //     error = true;
                        //     errorMessage = 'Error while add approval status'
                        //     }else{
                        let addres = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.addRequestDetails(req.body.evolve_travel_request_details, req.body.EvolveTravelReq_id)
                        if (addres == true) {
                            error = true;
                            errorMessage = 'Error while add request details'

                        } else {
                            req.body.med_history.EvolveTravelReq_id = req.body.EvolveTravelReq_id;
                            let addtravelReqMedDetail = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.addTravelReqMedDetails(req.body.med_history, req.body.EvolveTravelReq_id)
                            if (addtravelReqMedDetail instanceof Error || addtravelReqMedDetail.rowsAffected < 1) {
                                error = true;
                                errorMessage = 'Error while add travel request details'
                            } else {
                                if (notify == true) {
                                    let approverUserDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqApproverUserDetails(req.body.EvolveTravelReq_id);

                                    if (approverUserDetails.recordset.length != 0) {
                                        let sentToLoggedUser = true;

                                        let data = {
                                            loggedUserID: req.EvolveUser_ID,
                                            headUserId: '',
                                            notifCode: 'RAISE',
                                            notifType: 'REQUEST',
                                            EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                            sentToLoggedUser: sentToLoggedUser,
                                        }
                                        for (let i = 0; i < approverUserDetails.recordset.length; i++) {

                                            data.headUserId = approverUserDetails.recordset[i].EvolveUser_ID;

                                            let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                                            data.sentToLoggedUser = false;

                                        }
                                    }
                                }
                            }
                        }
                    }


                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Request Added Successfully !",
                    result: null
                };

                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: '',
                };


                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    upateTravelRequest: async function (req, res) {
        try {

            req.body.EvolveApprovalMatrix_ID = 0;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.evolve_travel_request.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.EvolveApprovalProcessDetails_Status = '';
            let error = false;
            let notify = true;
            let errorMessage = '';
            let dravelRequest = req.body.evolve_travel_request;

            let date1 = new Date(dravelRequest.EvolveTravelReq_startDate);
            let date2 = new Date(dravelRequest.EvolveTravelReq_endDate);
            dravelRequest.EvolveTravelReq_startDate = date1;
            dravelRequest.EvolveTravelReq_endDate = date2;

            let Difference_In_Time = date2.getTime() - date1.getTime();
            let diff = Difference_In_Time / (1000 * 3600 * 24);

            req.body.evolve_travel_request.EvolveTravelReq_Days = parseInt(diff);
            if (diff < 0) throw { message: 'Please enter correct leave date' }
            req.body.evolve_travel_request.EvolveUser_id = req.EvolveUser_ID;

            let getStartTripStatusId = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getStartTripStatusId()
            if (getStartTripStatusId instanceof Error || getStartTripStatusId.rowsAffected < 1) {

                error = true;

            } else {
                req.body.evolve_travel_request.EvolveTravelReq_TripStatusID = getStartTripStatusId.recordset[0].EvolveStatusCodeMstr_Id;
                let addreq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.upateTravelRequest(req.body.evolve_travel_request)
                if (addreq instanceof Error || addreq.rowsAffected < 1) {
                    error = true;
                    errorMessage = 'Error while add travel request'
                } else {

                    // req.body.EvolveTravelReq_id = addreq.recordset[0].inserted_id;

                    let matrixList = await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixRootDetails('TRAVELREQUEST');
                    if (matrixList instanceof Error) {

                        error = true;

                    } else {

                        for (let i = 0; i < matrixList.length; i++) {

                            if (matrixList[i].roolList.length == 0) {

                                req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                            } else {
                                let queryStr = "";
                                for (let j = 0; j < matrixList[i].roolList.length; j++) {


                                    if (matrixList[i].roolList[j].case == "==") {
                                        matrixList[i].roolList[j].case = "=";
                                    }

                                    // matrixList[i].roolList[j].caseValue
                                    let caseValueList = matrixList[i].roolList[j].caseValue.split(',');

                                    queryStr += " AND (";

                                    for (let k = 0; k < caseValueList.length; k++) {


                                        if (k == caseValueList.length - 1) {

                                            queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] + ' ) ';

                                        } else {

                                            queryStr += matrixList[i].roolList[j].tableField + " " + matrixList[i].roolList[j].case + " " + caseValueList[k] + ' OR ';
                                        }
                                    }
                                }

                                let details = {


                                    EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                    queryStr: queryStr,
                                }


                                let matchSqDetaiks = await Evolve.App.Services.Suraksha.TravelReq.SrvList.matchReqeDtails(details);

                                if (matchSqDetaiks instanceof Error) {

                                    error = true;
                                    errorMessage = 'Error While Assign Approval Matrix'

                                } else if (matchSqDetaiks.rowsAffected > 0) {

                                    req.body.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                                }
                            }

                        }

                        if (req.body.EvolveApprovalMatrix_ID != 0) {

                            let checkProcess = await Evolve.App.Services.Suraksha.TravelReq.SrvList.checkApprovalProcess(req.body);

                            if (checkProcess instanceof Error) {


                                error = true;

                            } else if (checkProcess.rowsAffected > 0) {
                                req.body.EvolveApprovalProcess_ID = checkProcess.recordset[0].EvolveApprovalProcess_ID
                                let updateSeq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.updateApprovalProcessSeq(req.body);
                                if (updateSeq instanceof Error || updateSeq.rowsAffected < 1) {
                                    error = true;
                                } else {

                                    req.body.EvolveApprovalProcess_ID = req.body.EvolveApprovalProcess_ID;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'RESUBMITED'

                                    let addProcessDetails = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            } else {

                                let result = await Evolve.App.Services.Suraksha.TravelReq.SrvList.submitToApprovelProcess(req.body);
                                if (result instanceof Error || result.rowsAffected < 1) {
                                    error = true;
                                } else {


                                    req.body.EvolveApprovalProcess_ID = result.recordset[0].inserted_id;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'SUBMITED'


                                    let addProcessDetails = await Evolve.App.Services.Suraksha.TravelReq.SrvList.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            }
                        } else {

                            await Evolve.App.Services.Suraksha.TravelReq.SrvList.deleteTravelReq(req.body.EvolveTravelReq_id);

                            error = true;
                            errorMessage = 'No Approval Matrix Matched Travel Request'

                        }
                    }
                    if (error == false) {
                        req.body.evolve_travel_request_details.EvolveUser_ID = req.EvolveUser_ID

                        let deleteReqDetails = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.deleteRequestDetails(req.body.EvolveTravelReq_id)
                        if (deleteReqDetails instanceof Error) {

                            error = true;
                            errorMessage = 'Error while delete old travel req details'

                        } else {
                            let addres = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.addRequestDetails(req.body.evolve_travel_request_details, req.body.EvolveTravelReq_id)
                            if (addres == true) {
                                error = true;
                                errorMessage = 'Error while add request details'

                            } else {
                                req.body.med_history.EvolveTravelReq_id = req.body.EvolveTravelReq_id;

                                let deleteMedDetails = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.deleteTravelReqMedDetails(req.body.EvolveTravelReq_id)
                                if (deleteMedDetails instanceof Error) {

                                    error = true;
                                    errorMessage = 'Error while delete travel request medical details'

                                } else {
                                    let addtravelReqMedDetail = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.addTravelReqMedDetails(req.body.med_history, req.body.EvolveTravelReq_id)
                                    if (addtravelReqMedDetail instanceof Error || addtravelReqMedDetail.rowsAffected < 1) {
                                        error = true;
                                        errorMessage = 'Error while add travel request details'
                                    } else {
                                        if (notify == true) {
                                            let approverUserDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqApproverUserDetails(req.body.EvolveTravelReq_id);

                                            if (approverUserDetails.recordset.length != 0) {
                                                let sentToLoggedUser = true;

                                                let data = {
                                                    loggedUserID: req.EvolveUser_ID,
                                                    headUserId: '',
                                                    notifCode: 'RAISE',
                                                    notifType: 'REQUEST',
                                                    EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                                    sentToLoggedUser: sentToLoggedUser,
                                                }
                                                for (let i = 0; i < approverUserDetails.recordset.length; i++) {

                                                    data.headUserId = approverUserDetails.recordset[i].EvolveUser_ID;

                                                    let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                                                    data.sentToLoggedUser = false;

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Request Updated  Successfully !",
                    result: null
                };

                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: '',
                };


                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllTravelRequest: async function (req, res) {
        try {
            req.query.EvolveUser_ID = req.EvolveUser_ID;
            let getAllRequest = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getAllTravelRequest(req.query)
            if (getAllRequest instanceof Error || getAllRequest.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Travel Requests",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "All Travel Request",
                    result: getAllRequest
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTravelRequestDetailsById: async function (req, res) {
        try {
            let getTravelReqById = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getTravelRequestDetailsById(req.body)


            if (getTravelReqById instanceof Error || getTravelReqById.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Travel Request Details",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Requests",
                    result: getTravelReqById
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteTravelRequest: async function (req, res) {
        try {
            let deleteReq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.deleteTravelRequest(req.query)
            if (deleteReq instanceof Error || deleteReq.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Delete Travel Request",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Requests",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateTravelReq: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateReq = await Evolve.App.Services.Suraksha.TravelReq.SrvList.updateTravelReq(req.body)
            if (updateReq instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Updated Travel Request ",
                    result: null,
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Request Updated Successfully !",
                    result: updateReq
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAprovalTravelRequest: async function (req, res) {
        try {
            let checkUserRole = await Evolve.App.Services.Suraksha.TravelReq.SrvList.checkUserRole(req.EvolveUser_ID)
            if (checkUserRole instanceof Error || checkUserRole.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check  User Role",
                    result: null
                }
                res.send(obj)
            } else if ((checkUserRole.recordset[0].EvolveRole_Name).toLowerCase() == 'medic') {

                let completedTrips = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getCompletedTrips()


                if (completedTrips instanceof Error) {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "fail",
                        result: null
                    };
                    res.send(obj)

                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Approval Travel Request",
                        result: completedTrips
                    };
                    res.send(obj)
                }
            } else {
                let details = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getAprovalTravelRequest(req.EvolveUser_ID)

                for (let i = 0; i < details.length; i++) {

                    details[i].request.lastSequence = details[i].indexList[details[i].indexList.length - 1].EvolveApprovalMatrixIndex_Seq;


                }
                if (details instanceof Error) {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "fail",
                        result: null
                    };
                    res.send(obj)
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Success",
                        result: details
                    };
                    res.send(obj)
                }
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTravelStatus: async function (req, res) {
        try {
            let travelStatus = await Evolve.App.Services.Suraksha.TravelReq.SrvList.getTravelStatus(req.body)

            if (travelStatus instanceof Error || travelStatus.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error get travel status",
                    result: '',
                };
                res.send(obj);
            } else {
                if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'NOT STARTED') {

                    travelStatus.recordset[0].approvalStatus = 'PENDING'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'PENDING'

                } else if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'APPROVED') {

                    travelStatus.recordset[0].approvalStatus = 'APPROVED'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'APPROVED'

                } else if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'SENDBACK') {


                    travelStatus.recordset[0].approvalStatus = 'APPROVED'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'APPROVED'


                } else if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'CLOSED') {
                    travelStatus.recordset[0].approvalStatus = 'CLOSED'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'CLOSED'
                } else if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'CANCELLED') {

                    travelStatus.recordset[0].approvalStatus = 'CANCELLED'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'CANCELLED'

                } else if (travelStatus.recordset[0].EvolveStatusCodeMstr_Code == 'COMPLETED') {


                    travelStatus.recordset[0].approvalStatus = 'COMPLETED'
                    travelStatus.recordset[0].EvolveStatusCodeMstr_Code = 'COMPLETED'

                }
                let obj = {
                    statusCode: 200,
                    status: "Sucess",
                    message: "Travel Status",
                    result: travelStatus.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCovidStatus: async function (req, res) {
        try {
            let latlng = req.body.latlng;//'23.552060,72.746160'
            let addressDetails = await Evolve.Axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyBoWUUa_DrB7d3J8IRNBTbjj-BftB1Uakk', {

                "method": "GET",
                "scheme": "https",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
            });
            addressDetails = addressDetails.data.results[0].address_components
            let district = '';
            let state = '';
            for (let i = 0; i < addressDetails.length; i++) {
                if (addressDetails[i].types[0] == 'administrative_area_level_2') {
                    district += addressDetails[i].long_name
                } else if (addressDetails[i].types[0] == 'administrative_area_level_1') {
                    state += addressDetails[i].long_name
                }
            }
            let covidData = await Evolve.Axios.get('https://api.covid19india.org/state_district_wise.json', {

                "method": "GET",
                "scheme": "https",

                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
            });
            covidData = covidData.data
            let distData = {}
            if (covidData[state] == undefined) {
                distData.state = state;
                distData.district = district;


                let response = {
                    statusCode: 200,
                    status: "success",
                    message: "Covid Data",
                    result: distData
                };
                res.send(response)
            } else {

                if (covidData[state].districtData != undefined) {
                    let stateData = covidData[state].districtData;


                    distData = stateData[district];
                    distData.state = state;
                    distData.district = district;
                } else {
                    let stateData = covidData[state];
                    distData = stateData;
                    distData.state = state;
                    distData.district = district;

                }
                let response = {
                    statusCode: 200,
                    status: "success",
                    message: "Covid Data",
                    result: distData
                };
                res.send(response)
            }
        } catch (error) {
            Evolve.Log.error("Error while get  covid status " + error.message);
            let response = {
                statusCode: 400,
                status: "fail",
                message: "Error While Get Covid Data",
                result: distData
            };
            res.send(response)

        }
    },

}