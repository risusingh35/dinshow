'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    // addTravelStatusTrans: async function (req, res) {
    //     try {
    //         req.body.EvolveUser_ID = req.EvolveUser_ID
    //         let error = false;
    //         let errorMessege ;
    //             if(req.body.status == 'APPROVAL'){
    //                 req.body.seq = 1
    //                 req.body.status = 'APPROVED' 
    //                 req.body.notifCode = 'APPROVED'  


    //             }else if(req.body.status == 'SEND BACK'){
    //                 req.body.seq = (-1)
    //                 req.body.status = 'SENDBACK'  
    //                 req.body.notifCode = 'SENDBACK'  


    //             }else if(req.body.status == 'REJECT'){
    //                 req.body.status = 'CLOSED'
    //                 req.body.notifCode = 'REJECTED'  

    //                 req.body.seq = 0
    //             }
    //             let getStatusId =  await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getStatusId(req.body);
    //             if (getStatusId instanceof Error || getStatusId.rowsAffected < 1) {
    //                 error  =true ;
    //                 errorMessege = "Error While Get Status Id"
    //             }else{
    //                 req.body.EvolveStatus_id = getStatusId.recordset[0].EvolveStatusCodeMstr_Id;
    //                 let addTravelStatusTrans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.addTravelStatusTrans(req.body)
    //                 if (addTravelStatus(Trans instanceof Error) || addTravelStatusTrans.rowsAffected < 1) {

    //                     error  =true ;
    //                     errorMessege = "Error While Add Travel Status Trans"

    //                 }else{

    //                     let updateTravelReq = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateTravelReq(req.body)
    //                     if (updateTravelReq instanceof Error) {
    //                         error  =true ;
    //                         errorMessege = "Error While Update Travel Request Details"
    //                     }

    //                 }
    //         }
    //         if(error == false){

    //             let details = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.userDetailsByTravelReq(req.body)

    //                 let data  = {
    //                     headUserId  : req.EvolveUser_ID,   
    //                     loggedUserID : details.recordset[0].EvolveUser_id,
    //                     notifCode : req.body.notifCode,
    //                     notifType : 'APROVAL',
    //                     EvolveTravelReq_id : req.body.EvolveTravelReq_id  ,
    //                     isHeadSend : false


    //                 }
    //                 await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data) 

    //                 let reqDetails  = await Evolve.App.Services.Common.SrvCommon.getTravelReqDetails(req.body.EvolveTravelReq_id);

    //                 if(req.body.notifCode == 'APPROVED')
    //                 {    
    //                     // if()         
    //                     let  index  =   reqDetails.travelReqDetails.EvolveTRavelReq_currApvlSeq-1 ;  

    //                     // console.log("reqDetails.travelReqDetails.EvolveTRavelReq_currApvlSeq>>" , reqDetails.travelReqDetails.EvolveTRavelReq_currApvlSeq)

    //                     // console.log("index>>>" , index)

    //                     // console.log("reqDetails.headDetails[index]>>>" , reqDetails.headDetails[index])

    //                     // console.log("reqDetails.headDetails>>>" , reqDetails.headDetails)


    //                     if(reqDetails.headDetails[index] != undefined){


    //                         data  = { 
    //                             loggedUserID :  parseInt(req.EvolveUser_ID) ,
    //                             headUserId : parseInt(reqDetails.headDetails[index].EvolveApproval_primaryUser_id ),
    //                             notifCode : req.body.notifCode,
    //                             notifType : 'HEADNOTIF',
    //                             EvolveTravelReq_id : req.body.EvolveTravelReq_id

    //                         }
    //                         await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

    //                         data.headUserId =  parseInt(reqDetails.headDetails[index].EvolveApproval_secondUser_id)

    //                         await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)


    //                         data.headUserId =  parseInt(reqDetails.headDetails[index].EvolveApproval_tertiaryUser_id)

    //                         await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
    //                     }

    //                 }else if(req.body.notifCode == 'SENDBACK'){


    //                     let appDetails = {

    //                         EvolveTravelReq_id : req.body.EvolveTravelReq_id  ,
    //                         EvolveStatusCodeMstr_Code : 'APPROVED'
    //                     }
    //                     let lastApprovalUser = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getLastApprovalTrans(appDetails)

    //                     if(lastApprovalUser.rowsAffected > 0){
    //                         data  = { 
    //                             loggedUserID :  parseInt(req.EvolveUser_ID) ,
    //                             headUserId : lastApprovalUser.recordset[0].EvolveUser_id,
    //                             notifCode : req.body.notifCode,
    //                             notifType : 'HEADNOTIF',
    //                             EvolveTravelReq_id : req.body.EvolveTravelReq_id

    //                         }
    //                         await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
    //                     }

    //                 }else if(req.body.notifCode == 'REJECTED'){

    //                     if(reqDetails.headDetails.length  != 0 ){
    //                         let sentToLoggedUser = true ;
    //                         for(let i =0 ; i<reqDetails.headDetails.length ; i++){

    //                                 let data  = {
    //                                     loggedUserID  : req.EvolveUser_ID ,
    //                                     headUserId : reqDetails.headDetails[i].EvolveApproval_primaryUser_id ,
    //                                     notifCode : 'REJECTED',
    //                                     notifType : 'APROVAL',
    //                                     EvolveTravelReq_id :req.body.EvolveTravelReq_id ,
    //                                     sentToLoggedUser : sentToLoggedUser  ,
    //                                     isHeadSend : true ,


    //                                 }
    //                                 if(data.loggedUserID != data.headUserId ){
    //                                      await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
    //                                 }

    //                                 data.headUserId  = reqDetails.headDetails[i].EvolveApproval_secondUser_id
    //                                 data.sentToLoggedUser = false ;
    //                                 sentToLoggedUser  = false

    //                                 if(data.loggedUserID != data.headUserId ){

    //                                   await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
    //                                 }
    //                                 data.headUserId  = reqDetails.headDetails[i].EvolveApproval_tertiaryUser_id
    //                                 if(data.loggedUserID != data.headUserId ){

    //                                   await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data);
    //                                 }
    //                         }
    //                     }
    //                 }

    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "Success",
    //                 result: '',
    //             };
    //             res.send(obj);
    //         }else{

    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: errorMessege,
    //                 result: '',
    //             };
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("Error While change approval status " + error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: "Error While change approval status " + error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },


    addTravelStatusTrans: async function (req, res) {
        try {

            console.log("req<<<<< ", req)
            let isGroundSendBack = false;
            let error = false;
            let errorMessage = '';
            let notification = true;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let data = req.body;
            if (data.EvolveApprovalProcessDetails_Status == 'APPROVE') {

                if (data.currentSeq == data.lastSeq) {
                    data.EvolveApprovalProcessDetails_Status = 'APPROVED'
                    data.EvolveApprovalProcess_Status = 'APPROVED'
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
            } else if (data.EvolveApprovalProcessDetails_Status == 'GROUNDLEVELSENDBACK') {
                isGroundSendBack = true;

                data.EvolveApprovalProcess_Status = 'SENDBACK'
                data.EvolveApprovalProcessDetails_Status = 'SENDBACK'
                data.EvolveApprovalProcess_CurrentIndex = data.currentSeq;
                data.EvolveApprovalProcess_IsOnGroundLevel = 1;



            }
            if (data.EvolveApprovalProcess_Status == 'APPROVED' || data.EvolveApprovalProcess_Status == 'REJECTED') {



                let statusCode = data.EvolveApprovalProcess_Status == 'APPROVED' ? 'APPROVED' : 'CLOSED'



                let statusCodeId = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getApprovedTripStatusID(statusCode);

                if (statusCodeId instanceof Error || statusCodeId.rowsAffected < 1) {

                    erorr = true;
                    errorMessage = "Status Code not found for " + statusCode + " status"


                } else {
                    data.EvolveTravelReq_TripStatusID = statusCodeId.recordset[0].EvolveStatusCodeMstr_Id;
                }
            }
            if (!error) {

                let addProcessDetails = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.addApprovalProcessDetails(data);
                if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                    error = true
                    errorMessage = "Error While Add Approval Process Details"

                } else {

                    let updateProcess = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateProcessStatus(data);
                    if (updateProcess instanceof Error || updateProcess.rowsAffected < 1) {
                        erorr = true;
                        errorMessage = "Error While Update Approval Process Status"
                    } else {
                        data.EvolveTravelReq_id = updateProcess.recordset[0].EvolveApprovalProcess_PrimaryID;
                        if (data.EvolveApprovalProcess_Status == 'APPROVED' || data.EvolveApprovalProcess_Status == 'REJECTED') {

                            let changeTravelTripStatus = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateTravelReqStatus(data);
                            if (changeTravelTripStatus instanceof Error || changeTravelTripStatus.rowsAffected < 1) {

                                erorr = true;
                                errorMessage = "Error While Update Travel Req Status"
                            }
                        }
                    }
                }
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            } else {
                if (notification) {
                    if (data.EvolveApprovalProcess_Status == 'PROCESS') {
                        data.EvolveApprovalProcess_Status = 'APPROVED'
                    }
                    let details = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.userDetailsByTravelReq(req.body)

                    let notifDetails = {
                        headUserId: req.EvolveUser_ID,
                        loggedUserID: details.recordset[0].EvolveUser_id,
                        notifCode: data.EvolveApprovalProcess_Status,
                        notifType: 'APROVAL',
                        EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                        isHeadSend: false


                    }

                    await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(notifDetails)



                    if ((data.EvolveApprovalProcess_Status == 'APPROVED' || data.EvolveApprovalProcess_Status == 'SENDBACK')) {



                        let approverUserDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqApproverUserDetails(req.body.EvolveTravelReq_id);

                        notifDetails = {
                            loggedUserID: parseInt(req.EvolveUser_ID),
                            headUserId: '',
                            notifCode: data.EvolveApprovalProcess_Status,
                            notifType: 'HEADNOTIF',
                            EvolveTravelReq_id: req.body.EvolveTravelReq_id

                        }


                        for (let i = 0; i < approverUserDetails.recordset.length; i++) {

                            notifDetails.headUserId = approverUserDetails.recordset[i].EvolveUser_ID;

                            let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(notifDetails)


                        }
                    } else {

                        let approverDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqAllSequenceApproverUserDetails(req.body.EvolveTravelReq_id);


                        if (approverDetails.recordset.length != 0) {
                            notifDetails = {
                                loggedUserID: req.EvolveUser_ID,
                                headUserId: '',
                                notifCode: data.EvolveApprovalProcess_Status,
                                notifType: 'APROVAL',
                                EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                sentToLoggedUser: true,
                                isHeadSend: true,


                            }
                            for (let i = 0; i < approverDetails.recordset.length; i++) {

                                data.headUserId = approverDetails.recordset[i].EvolveUser_ID;
                                if (data.loggedUserID != data.headUserId) {
                                    await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                                }
                                data.sentToLoggedUser = false;

                            }
                        }

                    }
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
    startTrip: async function (req, res) {
        try {

            let notify = true;
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let startedTripCount = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getInTrasitTravelReq(req.body)

            if (startedTripCount instanceof Error) {
                Evolve.Log.error("Error While Start Trip");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While Start Trip',
                    result: null
                };
                res.send(obj);

            } else if (startedTripCount.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'On Trip Is Already  Started Please Complete It First',
                    result: null
                };
                res.send(obj);
            } else {


                // let approvalStatus = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.checkTravelApprovedStatus(req.body)

                // if (approvalStatus instanceof Error || approvalStatus.rowsAffected < 1) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error While Check Travel trip Status",
                //         result: '',
                //     };
                //     res.send(obj);
                // } else {

                // if (approvalStatus.recordset[0].approvalCount == approvalStatus.recordset[0].EvolveTRavelReq_currApvlSeq) {
                let statusCode = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getStatusCodeForStartTrip(req.body)
                if (statusCode instanceof Error || statusCode.rowsAffected < 1) {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Check Status Code",
                        result: '',
                    };
                    res.send(obj);
                } else {
                    req.body.EvolveTravelReq_TripStatusID = statusCode.recordset[0].EvolveStatusCodeMstr_Id;
                    let updateTravelReq = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateTravelReqStatus(req.body)
                    if (updateTravelReq instanceof Error || updateTravelReq.rowsAffected < 1) {

                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error While Update Travel Request Status",
                            result: '',
                        };
                        res.send(obj);

                    } else {

                        if (notify == true) {

                            let approverUserDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqAllSequenceApproverUserDetails(req.body.EvolveTravelReq_id);

                            let notifDetails = {
                                loggedUserID: req.EvolveUser_ID,
                                headUserId: '',
                                notifCode: 'TRIPSTARTED',
                                notifType: 'TRAVEL',
                                EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                sentToLoggedUser: true

                            }


                            for (let i = 0; i < approverUserDetails.recordset.length; i++) {

                                notifDetails.headUserId = approverUserDetails.recordset[i].EvolveUser_ID;

                                await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(notifDetails)

                                notifDetails.sentToLoggedUser = false;


                            }

                            // let travelReqDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqDetails(req.body.EvolveTravelReq_id);

                            // let sentToLoggedUser = true;

                            // for (let i = 0; i < travelReqDetails.headDetails.length; i++) {

                            //     let data = {
                            //         loggedUserID: req.EvolveUser_ID,
                            //         headUserId: travelReqDetails.headDetails[i].EvolveApproval_primaryUser_id,
                            //         notifCode: 'TRIPSTARTED',
                            //         notifType: 'TRAVEL',
                            //         EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                            //         sentToLoggedUser: sentToLoggedUser

                            //     }
                            //     let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                            //     data.headUserId = travelReqDetails.headDetails[i].EvolveApproval_secondUser_id
                            //     sentToLoggedUser = false;
                            //     data.sentToLoggedUser = false;
                            //     sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                            //     data.headUserId = travelReqDetails.headDetails[i].EvolveApproval_tertiaryUser_id
                            //     sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data);
                            // }
                        }

                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Trip Started Successfully",
                            result: '',
                        };
                        res.send(obj);
                    }

                }
                // } else {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Travel Request Not Approved !",
                //         result: '',
                //     };
                //     res.send(obj);
                // }
                // }
            }
        } catch (error) {
            Evolve.Log.error("Error While Start Trip " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Start Trip',
                result: null
            };
            res.send(obj);
        }
    },
    cancelTrip: async function (req, res) {
        try {
            let notify = true;
            let error = false;
            let errorMessege = '';
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let tripStatus = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.checkTripCurrentStatus(req.body);
            if (tripStatus instanceof Error || tripStatus.rowsAffected < 1) {
                error = true;
                errorMessege = "Error While Check Trip Status"

            } else if (tripStatus.recordset[0].EvolveStatusCodeMstr_Type == 'TRIP' && tripStatus.recordset[0].EvolveStatusCodeMstr_Code == 'NOT STARTED') {

                let statusID = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCancelTripStatusId();
                if (statusID instanceof Error || statusID.rowsAffected < 1) {

                    error = true;
                    errorMessege = "Error while Get Cancel Trip Status"

                } else {
                    req.body.EvolveTravelReq_TripStatusID = statusID.recordset[0].EvolveStatusCodeMstr_Id;

                    let cancelTrip = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.cancelTravelTrip(req.body);
                    if (cancelTrip instanceof Error || cancelTrip.rowsAffected < 1) {

                        error = true;
                        errorMessege = "Error while Get Cancel Trip"
                    } else {

                        if (notify == true) {

                            let approverUserDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqAllSequenceApproverUserDetails(req.body.EvolveTravelReq_id);

                            let notifDetails = {
                                loggedUserID: req.EvolveUser_ID,
                                headUserId: '',
                                notifCode: 'TRIPCANCELLED',
                                notifType: 'TRAVEL',
                                EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                sentToLoggedUser: true

                            }


                            for (let i = 0; i < approverUserDetails.recordset.length; i++) {

                                notifDetails.headUserId = approverUserDetails.recordset[i].EvolveUser_ID;

                                await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(notifDetails)

                                notifDetails.sentToLoggedUser = false;


                            }

                            // let travelReqDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqDetails(req.body.EvolveTravelReq_id);
                            // let sentToLoggedUser = true;

                            // for (let i = 0; i < travelReqDetails.headDetails.length; i++) {

                            //     let data = {
                            //         loggedUserID: req.EvolveUser_ID,
                            //         headUserId: travelReqDetails.headDetails[i].EvolveApproval_primaryUser_id,
                            //         notifCode: 'TRIPCANCELLED',
                            //         notifType: 'TRAVEL',
                            //         EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                            //         sentToLoggedUser: sentToLoggedUser

                            //     }
                            //     let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                            //     sentToLoggedUser = false;
                            //     data.sentToLoggedUser = false;


                            //     data.headUserId = travelReqDetails.headDetails[i].EvolveApproval_secondUser_id


                            //     sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                            //     data.headUserId = travelReqDetails.headDetails[i].EvolveApproval_tertiaryUser_id

                            //     sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data);
                            // }
                        }
                    }
                }

            } else {
                error = true;
                errorMessege = "Trip Can't Be Cancelled Now"
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessege,
                    result: null
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "Sucess",
                    message: 'Trip Cancelled Successfully',
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("Error While Cancel Trip " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Cancel Trip',
                result: null
            };
            res.send(obj);
        }
    },
    getReasonListByType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getReasonListByType(req.body);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While get Reason List',
                    result: null
                };
                res.send(obj);

            } else if (list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'No Reason Found',
                    result: null
                };
                res.send(obj);

            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: 'ReasonList',
                    result: list.recordset
                };
                res.send(obj);

            }


        } catch (error) {
            Evolve.Log.error("Error While Get Reason List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Get Reason List',
                result: null
            };
            res.send(obj);
        }
    },
    completeTrip: async function (req, res) {
        try {
            let notify = true;
            let error = false;
            let errorMessege = '';
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let tripStatus = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.checkTripCurrentStatus(req.body);
            if (tripStatus instanceof Error || tripStatus.rowsAffected < 1) {
                error = true;
                errorMessege = "Error While Check Trip Status"

            } else if (tripStatus.recordset[0].EvolveStatusCodeMstr_Type == 'TRIP' && tripStatus.recordset[0].EvolveStatusCodeMstr_Code == 'IN TRANSIT') {

                let statusID = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCompeteTripStatusId();
                if (statusID instanceof Error || statusID.tripStatusId == null || statusID.medicStatusId == null || statusID.tripStatusId == undefined || statusID.medicStatusId == undefined) {

                    error = true;
                    errorMessege = "Error while Get Complete Trip Status Code Id"

                } else {
                    req.body.EvolveTravelReq_TripStatusID = statusID.tripStatusId;
                    req.body.EvolveTRavelReq_MedicStatusId = statusID.medicStatusId;
                    let completeTrip = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.completeTravelTrip(req.body);
                    if (completeTrip instanceof Error || completeTrip.rowsAffected < 1) {

                        error = true;
                        errorMessege = "Error while Complete Trip"
                    } else {

                        if (notify == true) {


                            let data = {
                                headUserId: 1,
                                loggedUserID: req.EvolveUser_ID,
                                notifCode: 'TRIPENDED',
                                notifType: 'APROVAL',
                                EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                isHeadSend: false,

                            }
                            await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                            let getMedicUsers = await Evolve.App.Services.Common.SrvCommon.getMedicUsersList();

                            let list = getMedicUsers.recordset;
                            for (let i = 0; i < list.length; i++) {


                                let data = {
                                    headUserId: list[i].EvolveUser_ID,
                                    loggedUserID: req.EvolveUser_ID,
                                    notifCode: 'TRIPENDED',
                                    notifType: 'APROVAL',
                                    EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                    isHeadSend: true,

                                }
                                await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                            }
                        }
                    }
                }

            } else {
                error = true;
                errorMessege = "Trip Can't Be Complete"
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessege,
                    result: null
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Trip Complete Successfully',
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("Error While Complete Trip " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Complete Trip',
                result: null
            };
            res.send(obj);
        }
    },
    getCompletedTrips: async function (req, res) {
        try {
            let trips = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCompletedTrips();
            if (trips instanceof Error) {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While get completed trips',
                    result: trips
                };
                res.send(obj);


            } else {

                let obj = {
                    statusCode: 200,
                    status: "Sucess",
                    message: 'Completed Trips',
                    result: trips
                };
                res.send(obj);
            }



        } catch (error) {
            Evolve.Log.error("Error While Complete Trip  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Complete Trip',
                result: null
            };
            res.send(obj);
        }
    },

    getDashboardDetails: async function (req, res) {
        try {
            let error = false;
            let errorMessege = '';
            let dashboard = {};
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let approved = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.approvedByMe(req.EvolveUser_ID);
            if (approved instanceof Error) {

                error = true;
                errorMessege = 'Error While Get Approved By Me Count'

            } else {
                dashboard.approvedByMe = approved.rowsAffected[0];
                let rejected = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.rejectedByMe(req.EvolveUser_ID);
                if (rejected instanceof Error) {

                    error = true;
                    errorMessege = 'Error While Get Reject By Me Count'

                } else {
                    dashboard.rejectByMe = rejected.rowsAffected[0];
                    let sendBack = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.sendBackByMe(req.EvolveUser_ID);
                    if (sendBack instanceof Error) {

                        error = true;
                        errorMessege = 'Error While Get Send Back By Me Count'

                    } else {
                        dashboard.sendBackByMe = sendBack.rowsAffected[0];
                        let waitApproval = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.waitingForMyApproval(req.EvolveUser_ID);
                        if (waitApproval instanceof Error) {
                            error = true;
                            errorMessege = 'Error While Get Waiting for my approval Me Count'

                        } else {

                            dashboard.waitingForMyApproval = waitApproval.rowsAffected[0];
                            let inTransit = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getInTransitCount();
                            if (inTransit instanceof Error) {

                                error = true;
                                errorMessege = 'Error While Get In Transit Employee Count'

                            }
                            else {
                                dashboard.inTransitCount = inTransit.recordset[0].count;
                                let myTravelReq = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyTravelReq(req.EvolveUser_ID);
                                if (myTravelReq instanceof Error) {

                                    error = true;
                                    errorMessege = 'Error While Get My Pending Approval Count'

                                } else {

                                    let myReqts = myTravelReq.recordset;
                                    let pendinfApproval = 0;
                                    for (let i = 0; i < myReqts.length; i++) {

                                        let appStatus = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.checkApprovalStatus(myReqts[i].EvolveTravelReq_id);
                                        if (appStatus instanceof Error) {
                                            error = true;
                                            errorMessege = 'Error While Check Approval Status'
                                        } else if (appStatus.rowsAffected != 0) {

                                            if (appStatus.recordset[0].approvalCount != appStatus.recordset[0].EvolveTRavelReq_currApvlSeq) {
                                                pendinfApproval++;

                                            }


                                        }
                                    }

                                    dashboard.myPendingApprovalCount = pendinfApproval;
                                    let covidCount = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCovidEmployeeCount();
                                    if (covidCount instanceof Error) {

                                        error = true;
                                        errorMessege = 'Error While Get Covid Employee Count'

                                    } else {
                                        dashboard.covidCount = covidCount.recordset[0].count;
                                        let sevenDaysQuar = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getsevenDaysQuar();
                                        if (sevenDaysQuar instanceof Error) {
                                            error = true;
                                            errorMessege = 'Error While Get Seven Days Quar Count'

                                        } else {
                                            dashboard.sevenDaysQuar = sevenDaysQuar.recordset[0].count;
                                            let fourteenDaysQuar = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getFourteenDaysQuar();
                                            if (fourteenDaysQuar instanceof Error) {
                                                error = true;
                                                errorMessege = 'Error While Get Seven Days Quar Count'

                                            } else {
                                                dashboard.fourteenDaysQuar = fourteenDaysQuar.recordset[0].count;
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
                    status: "Sucess",
                    message: 'Dashboard Data',
                    result: dashboard
                };
                res.send(obj);

            } else {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessege,
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("Error While Get Dashboard Details  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Get Dashboard Details',
                result: null
            };
            res.send(obj);
        }
    },
    getStatusListByType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getStatusListByType(req.body);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While get Status List',
                    result: null
                };
                res.send(obj);

            } else if (list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Status Code Not Found',
                    result: null
                };
                res.send(obj);

            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: 'Status List',
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error While Get Status List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Get Status List',
                result: null
            };
            res.send(obj);
        }
    },
    updateTravelReqByMedic: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID

            let statusCode = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getStatusCodeById(req.body);
            if (statusCode instanceof Error || statusCode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While Get Status Code',
                    result: null
                };
                res.send(obj);
            } else {
                req.body.status = statusCode.recordset[0].EvolveStatusCodeMstr_Code

                let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateTravelReqByMedic(req.body);
                if (list instanceof Error || list.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: 'Error While Update Travel Req Details',
                        result: null
                    };
                    res.send(obj);
                } else {

                    let details = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.userDetailsByTravelReq(req.body)

                    let data = {
                        headUserId: req.EvolveUser_ID,
                        loggedUserID: details.recordset[0].EvolveUser_id,
                        notifCode: req.body.status,
                        notifType: 'APROVAL',
                        EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                        isHeadSend: false,

                    }
                    let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)



                    let approverDetails = await Evolve.App.Services.Common.SrvCommon.getTravelReqAllSequenceApproverUserDetails(req.body.EvolveTravelReq_id);

                    if (req.body.status == 'JOIN' || req.body.status == 'QUARANTINE' || req.body.status == 'COVIDTEST') {

                        if (approverDetails.recordset.length != 0) {
                            data = {
                                loggedUserID: req.EvolveUser_ID,
                                headUserId: '',
                                notifCode: req.body.status,
                                notifType: 'APROVAL',
                                EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                                sentToLoggedUser: true,
                                reqUserId: details.recordset[0].EvolveUser_id,
                                isHeadSend: true,
                                quarDays: details.recordset[0].EvolveTravelReq_QuarDays


                            }
                            for (let i = 0; i < approverDetails.recordset.length; i++) {

                                data.headUserId = approverDetails.recordset[i].EvolveUser_ID;



                                if (data.loggedUserID != data.headUserId) {
                                    await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                                }
                                data.sentToLoggedUser = false;

                            }
                        }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: 'Updated Successfully',
                        result: list.recordset
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error("Error While Update Travel Req Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Update Travel Req Details',
                result: null
            };
            res.send(obj);
        }
    },
    changeQuarStatus: async function (req, res) {
        try {
            let currentTime = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getTime();
            if (currentTime.recordset[0].time == '00:05') {

                let quarEmp = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getQuarEmp();
                if (quarEmp instanceof Error) {
                    Evolve.Log.error("Error While get quarantine eployee details ");
                } else {

                    for (let i = 0; i < quarEmp.recordset.length; i++) {

                        let date1 = new Date(quarEmp.recordset[i].EvolveTravelReq_UpdatedAt);
                        let date2 = new Date();
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let diff = Difference_In_Time / (1000 * 3600 * 24);
                        if (diff >= quarEmp.recordset[i].EvolveTravelReq_QuarDays) {

                            let statusId = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getReviewStatusId();
                            if (statusId instanceof Error) {
                                Evolve.Log.error("Error While medic review status id ");
                            } else {
                                quarEmp.recordset[i].EvolveTRavelReq_MedicStatusId = statusId.recordset[0].EvolveStatusCodeMstr_Id
                                let changeReqToReview = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.changeReqToReview(quarEmp.recordset[i]);
                                if (changeReqToReview instanceof Error) {
                                    Evolve.Log.error("Error While change quar status to medic review ");
                                }
                            }


                        }
                    }
                }
            }
            setTimeout(function () {

                Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.changeQuarStatus();

            }, 1000);
        } catch (error) {
            Evolve.Log.error("Error While Update Travel Req Details " + error.message);
        }
    },
    locStatus: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.locStatus(req.body);

            res.send('success')

        } catch (error) {
            Evolve.Log.error("Error While Update Travel Req Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Update Travel Req Details',
                result: null
            };
            res.send(obj);
        }
    },
    updateUserDeviceId: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateUserDeviceId(req.body);
            if (list instanceof Error || list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While Update User Device ID',
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: 'Device Id updated succesfully',
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error While Update User Device ID " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Update User Device ID',
                result: null
            };
            res.send(obj);
        }
    },
    isCovidTestReq: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.isCovidTestReq(req.body);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While check covid test  required or not ',
                    result: null
                };
                res.send(obj);
            } else {
                let response = {
                    isCovideTestReq: false,
                    EvolveTravelReq_id: null
                };
                if (list.rowsAffected > 0) {
                    response.isCovideTestReq = true;
                    response.EvolveTravelReq_id = list.recordset[0].EvolveTravelReq_id
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'covidtest',
                    result: response
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("Error While check covid test  required or not " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While check covid test  required or not',
                result: null
            };
            res.send(obj);
        }
    },
    addCovidTestImage: async function (req, res) {
        try {
            let error = false;
            let errorMessege = '';
            let imagesName = [];
            req.body.EvolveUser_ID = req.EvolveUser_ID;


            for (let i = 0; i < req.body.images.length; i++) {

                let flag = true;


                let base64Data = req.body.images[i]

                var daeTime = new Date();

                daeTime = daeTime.getUTCDate() + '_' + daeTime.getUTCHours() + '_' + daeTime.getUTCMinutes() + '_' + daeTime.getUTCSeconds();

                let fileName = req.EvolveUser_ID + '_' + i + '_' + daeTime + '.' + 'png';

                await Evolve.Fs.writeFile(
                    Evolve.Config.imageUploadPath + fileName,
                    base64Data,
                    "base64",
                    function (err) {
                        if (err) {
                            console.log(err);
                            error = true;
                            errorMessege = "Error while upload photo"
                            // res.json(0);
                        } else {
                            error = false;

                        }
                    })
                if (!error) {
                    imagesName.push({

                        fileName: fileName

                    }
                    )
                }

            }
            if (error == false) {
                delete req.body.images
                req.body.imagesName = imagesName;

                // let 


                let updateDetails = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.updateTravelReqCovidDetails(req.body);
                if (updateDetails instanceof Error || updateDetails.rowsAffected < 1) {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while update covid details",
                        result: ''
                    };
                    res.send(obj);


                } else {

                    let getMedicUsers = await Evolve.App.Services.Common.SrvCommon.getMedicUsersList();

                    let list = getMedicUsers.recordset;
                    for (let i = 0; i < list.length; i++) {
                        let data = {
                            headUserId: list[i].EvolveUser_ID,
                            loggedUserID: req.EvolveUser_ID,
                            notifCode: 'COVIDTESTUPLOAD',
                            notifType: 'APROVAL',
                            EvolveTravelReq_id: req.body.EvolveTravelReq_id,
                            isHeadSend: true,

                        }
                        let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)

                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Images Uploaded Successfully",
                        result: ''
                    };
                    res.send(obj);

                }

            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessege,
                    result: ''
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error("Error While Complete Trip  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Complete Trip',
                result: null
            };
            res.send(obj);
        }
    },

    getInTrasitTravelReq: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let details = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getInTrasitTravelReq(req.body);
            if (details instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While Get In Transit  Travel Req',
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'In Transit Travel req',
                    result: details.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error While Get In Transit  Travel Req " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Get In Transit  Travel Req',
                result: null
            };
            res.send(obj);
        }
    },


    getUserNotificationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getUserNotificationList(req.body);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While get user notification list',
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Notification List',
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error While get user notification list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While get user notification list',
                result: null
            };
            res.send(obj);
        }
    },


    upadateNotificationStatus: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.upadateNotificationStatus(req.body);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Error While update notification status',
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Notificatio status updated',
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error While update notification status " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While update notification status',
                result: null
            };
            res.send(obj);
        }
    },

    covidTestUploadRemider: async function (req, res) {
        try {
            let currentTime = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getTime();
            if (currentTime.recordset[0].time == '12:00') {

                let list = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.covidTestReqList();
                let coividList = list.recordset
                for (let i = 0; i < coividList; i++) {


                    let data = {
                        loggedUserID: coividList[i].EvolveUser_id,
                        headUserId: null,
                        notifCode: 'SUBMITCOVIDTEST',
                        notifType: 'REMINDER',
                        EvolveTravelReq_id: coividList[i].EvolveTravelReq_id

                    }
                    let sendNotif = await Evolve.App.Controllers.Common.ConCommon.sendNotificationToUser(data)
                }

            }
            setTimeout(function () {

                Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.covidTestUploadRemider();

            }, 1000);
        } catch (error) {
            Evolve.Log.error("Error While Set  Reminder " + error.message);
        }
    },

    getBDetails: async function (req, res) {
        try {
            let dashboard = {
                personalDetails: {},
                orgDetails: {},

            };
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveApprovalProcessDetails_Status = "APPROVED";

            req.body.days = "week";
            //Dashboard Details of User
            let trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);


            if (!(trans instanceof Error)) {


                // console.log("Enteredd in if conditiomn:")

                dashboard.personalDetails.reqApprovedByMeInLastWeek = trans.recordset[0].count


            }


            // console.log("dashboard>> " , dashboard)
            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqApprovedByMeInLastMonth = trans.recordset[0].count


            }
            req.body.days = "year";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqApprovedByMeInLastYear = trans.recordset[0].count


            }

            req.body.EvolveApprovalProcessDetails_Status = "SENDBACK";

            req.body.days = "week";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqSendBackByMeInLastWeek = trans.recordset[0].count


            }


            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqSendBackByMeInLastMonth = trans.recordset[0].count


            }


            req.body.days = "year";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqSendBackByMeInLastYear = trans.recordset[0].count


            }

            req.body.EvolveApprovalProcessDetails_Status = "REJECTED";

            req.body.days = "week";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqRejectedByMeInLastWeek = trans.recordset[0].count


            }


            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqRejectedByMeInLastMonth = trans.recordset[0].count


            }


            req.body.days = "year";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqRejectedByMeInLastYear = trans.recordset[0].count


            }


            req.body.days = "current";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqWaitingForMyApproval(req.body);

            // console.log("currenr>>>>>" , trans)

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.currentReqWaitingForMyApproval = trans.recordset[0].count


            }

            req.body.days = "3ays";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqWaitingForMyApproval(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqWaitingForMyApprovalFrom3Days = trans.recordset[0].count


            }

            req.body.days = "week";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqWaitingForMyApproval(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqWaitingForMyApprovalFromWeek = trans.recordset[0].count


            }
            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqWaitingForMyApproval(req.body);

            if (!(trans instanceof Error)) {

                dashboard.personalDetails.reqWaitingForMyApprovalFromMonth = trans.recordset[0].count


            }

            // //Dashboard Details of Organization


            req.body.days = "today";

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.travelReqRaised(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRaisedByToday = trans.recordset[0].count


            }
            req.body.days = "week";

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.travelReqRaised(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRaisedByLastWeek = trans.recordset[0].count


            }
            req.body.days = "month";

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.travelReqRaised(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRaisedByLastMonth = trans.recordset[0].count


            }
            req.body.days = "year";

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.travelReqRaised(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRaisedByLastYear = trans.recordset[0].count
            }
            req.body.EvolveUser_ID = null;
            req.body.EvolveApprovalProcessDetails_Status = "REJECTED";

            req.body.days = "week";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRejectedByLastWeek = trans.recordset[0].count


            }
            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRejectedByLastMonth = trans.recordset[0].count


            }
            req.body.days = "year";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRejectedByLastYear = trans.recordset[0].count

            }

            req.body.days = "today";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getMyApprovalTrans(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqRejectedByToday = trans.recordset[0].count


            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getInTransitCount();
            if (!(trans instanceof Error)) {

                dashboard.orgDetails.inTransitCount = trans.recordset[0].count;
            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCovidEmployeeCount();
            if (!(trans instanceof Error)) {

                dashboard.orgDetails.covidCount = trans.recordset[0].count;
            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getsevenDaysQuar();

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.sevenDaysQuar = trans.recordset[0].count;

            }

            // trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getFourteenDaysQuar();
            // if (!(trans instanceof Error)) {
            //     dashboard.orgDetails.fourteenDaysQuar = trans.recordset[0].count;
            // }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getCovidEmployeeCount();
            if (!(trans instanceof Error)) {

                dashboard.orgDetails.covidCount = trans.recordset[0].count;
            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getsevenDaysQuar();
            if (!(trans instanceof Error)) {

                dashboard.orgDetails.sevenDaysQuar = trans.recordset[0].count;

            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.getFourteenDaysQuar();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.fourteenDaysQuar = trans.recordset[0].count;


            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqCompletedByTodayCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.reqCombletedByToay = trans.recordset[0].count;
            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqCompletedByLastWeekCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.reqCombletedByLastWeeK = trans.recordset[0].count;
            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqCompletedByLastMonthCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.reqCombletedByLastMonth = trans.recordset[0].count;


            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.reqCompletedByLastYearCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.reqCombletedByLastYear = trans.recordset[0].count;
            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.tripWillComplteINNextThreeDaysCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.tripWillComplteINNextThreeDays = trans.recordset[0].count;
            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.tripWillComplteINNextOneWeekCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.tripWillComplteINNextOneWeek = trans.recordset[0].count;


            }
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.tripWillComplteINNextTwoWeekCount();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.tripWillComplteINNextTwoWeek = trans.recordset[0].count;
            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.employeeCompleteQuarInNextWeek();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.employeeCompleteQuarInNextWeek = trans.recordset[0].count;


            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.employeeCompleteQuarInNextTwoWeek();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.employeeCompleteQuarInNextTwoWeek = trans.recordset[0].count;


            }

            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.employeeRequiredCovidTest();
            if (!(trans instanceof Error)) {
                dashboard.orgDetails.employeeRequiredCovidTest = trans.recordset[0].count;


            }

            req.body.days = "week";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.underMedicReview(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqUnderMedicReviewbyLastWeek = trans.recordset[0].count


            }


            req.body.days = "month";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.underMedicReview(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqUnderMedicReviewbyLastMonth = trans.recordset[0].count


            }

            req.body.days = "3days";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.underMedicReview(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqUnderMedicReviewby3days = trans.recordset[0].count


            }

            req.body.days = "";
            trans = await Evolve.App.Services.Suraksha.TravelStatusTrans.SrvList.underMedicReview(req.body);

            if (!(trans instanceof Error)) {

                dashboard.orgDetails.reqUnderMedicReviewCurrently = trans.recordset[0].count

            }
            let obj = {
                statusCode: 200,
                status: "success",
                message: 'success',
                result: dashboard
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("Error While Get Dashboard Details  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While Get Dashboard Details',
                result: null
            };
            res.send(obj);
        }
    },
    getAarogyaSetuResponse: async function (req, res) {
        try {
            Evolve.Fs.writeFile(Evolve.Config.ASRESPONSE + "/" + "ASTESt" + new Date().getMilliseconds() + ".txt", (JSON.stringify(req.body)), function (err) {
                if (err) {
                    Evolve.Log.error('Error While create aarogya setu  response txt file', err)

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: 'Error',
                        result: null
                    };
                    res.send(obj);

                }
                else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: 'Succcessfully got it',
                        result: null
                    };
                    res.send(obj);

                }
            });




        } catch (error) {
            Evolve.Log.error("Error While get aarogya setu  response " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While get aarogya setu  response',
                result: null
            };
            res.send(obj);
        }
    },
    //AAROGYA SETU
    sendrequestToAs: async function (req, res) {
        try {
            if (req.body.mobile != undefined) {


                // let config = {
                //     headers: {
                //         "accept": "application/json",
                //         "Authorization": Evolve.SurakshaToken,
                //         "x-api-key": "WYkIfMNnAH7WAI2ir7M895krA9NYyVg03yWGf5TP",
                //         "Content-Type": "application/json",

                //     }
                // }
                // let body = {
                //     "phone_number": req.body.mobile,
                //     "trace_id": "evolve" + new Date(),
                //     "reason": "Teting .......",
                //     "start_date": "",
                //     "end_date": ""
                // }
                // let responce = await Evolve.Axios.post("https://api.aarogyasetu.gov.in/userstatus", body, config);

                // if (responce.status == 200) {
                //     let isMobileAvailble = false;

                //     for (let i = 0; i < Evolve.Suraksha.length; i++) {


                //         if (Evolve.Suraksha[i].mobile == req.body.mobile) {

                //             Evolve.Suraksha[i].reqId = responce.data.requestId;

                //             isMobileAvailble = true;


                //         }
                //     }
                //     if (isMobileAvailble == false) {

                //         Evolve.Suraksha.push({

                //             mobile: req.body.mobile,

                //             reqId: responce.data.requestId,

                //         })


                //     }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Request Sent Successfully',
                    result: null
                };
                res.send(obj);
                // } else {

                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: 'Error While Sent Request',
                //         result: null
                //     };
                //     res.send(obj);
                // }
            } else {


                Evolve.Log.error("Please Enter Mobile Number ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Please Enter Mobile Number',
                    result: null
                };
                res.send(obj);



            }
        } catch (error) {
            Evolve.Log.error("Error While send request to aarogya setu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error While send request to aarogya setu',
                result: null
            };
            res.send(obj);
        }
    },

    getUserArogyaSetuStatus: async function (req, res) {
        try {
            if (req.body.mobile != undefined) {

                let name = '';
                let status = '';


                if (req.body.mobile == '+918153084730') {

                    name = "Ravatrajsinh Chauhan"

                    status = "safe"



                } else if (req.body.mobile == '+919998000756') {

                    name = "Himanshu Raval"

                    status = "safe"


                } else if (req.body.mobile == '+918849648981') {

                    name = "Vivek Prajapati"

                    status = "safe"


                } else if(req.body.mobile == '+919930318957') {

                    name = "Ansel"

                    status = "not safe"

                }else{

                    name = ""

                    status = "unknown"



                }




                // let isReqIFound = false;
                // let reqId = '';

                // for (let i = 0; i < Evolve.Suraksha.length; i++) {

                //     if (Evolve.Suraksha[i].mobile == req.body.mobile) {

                //         isReqIFound = true;

                //         reqId = Evolve.Suraksha[i].reqId;




                //     }
                // }
                // if (isReqIFound) {

                //     let config = {
                //         headers: {
                //             "accept": "application/json",
                //             "Authorization": Evolve.SurakshaToken,
                //             "x-api-key": "WYkIfMNnAH7WAI2ir7M895krA9NYyVg03yWGf5TP",
                //             "Content-Type": "application/json",
                //         }
                //     }
                //     let body =
                //     {
                //         "requestId": reqId
                //     }
                //     let responce = await Evolve.Axios.post("https://api.aarogyasetu.gov.in/userstatusbyreqid", body, config);
                //     if (responce.status == 200) {

                //         if (responce.data.request_status == 'Pending') {

                //             let obj = {
                //                 statusCode: 400,
                //                 status: "fail",
                //                 message: "User did't approved request it is on pending mode",
                //                 result: null
                //             };
                //             res.send(obj);

                //         } else if (responce.data.request_status == 'Approved') {

                //             try {

                //                 var decoded = Evolve.Jwt.verify(responce.data.as_status, 'EvloveSurakshaAliter@12345');
                let result = {

                    message: name + " (" + req.body.mobile + ") status is " + status,
                    mobile_no: req.body.mobile,
                    name: name,
                    covidStatus : status ,

                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Status fetched Successfully',
                    result: result
                };
                res.send(obj);




                //             } catch (err) {

                //                 let obj = {
                //                     statusCode: 400,
                //                     status: "fail",
                //                     message: 'Error while decode the record',
                //                     result: null
                //                 };
                //                 res.send(obj);

                //             }

                //         } else {

                //             let obj = {
                //                 statusCode: 400,
                //                 status: "fail",
                //                 message: 'User denied the request',
                //                 result: null
                //             };
                //             res.send(obj);

                //         }
                //     } else {

                //         let obj = {
                //             statusCode: 400,
                //             status: "fail",
                //             message: 'Error While get user record',
                //             result: null
                //         };
                //         res.send(obj);

                //     }
                // } else {

                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: 'Request Id Not Found Please Send Request To User For Access',
                //         result: null
                //     };
                //     res.send(obj);
                // }
            } else {
                Evolve.Log.error("Enter mobile number");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Enter mobile number",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error("Error while get user status " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error while get user status',
                result: null
            };
            res.send(obj);
        }
    },

    //COWIN 


    generateOtpOfCowin: async function (req, res) {
        try {
            if (req.body.mobile != undefined) {
                let config = {
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "application/json",
                    }
                }
                let body =
                {
                    "mobile": req.body.mobile
                }

                let response = await Evolve.Axios.post("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", body, config).then(details => {


                    let isAvailble = false;
                    for (let i = 0; i < Evolve.SurakshaCowin.length; i++) {

                        if (Evolve.SurakshaCowin.mobile == req.body.mobile) {

                            Evolve.SurakshaCowin.txnId = responce.data.txnId;
                            Evolve.SurakshaCowin.token = '';

                            isAvailble = true;


                        }
                    }

                    if (!isAvailble) {

                        Evolve.SurakshaCowin.push({
                            mobile: req.body.mobile,
                            txnId: details.data.txnId,
                            token: ''


                        })
                    }


                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: 'Otp generated successfully',
                        result: null
                    };
                    res.send(obj);
                }).catch(error => {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: error.response.data,
                        result: null
                    };
                    res.send(obj);
                })
            } else {
                Evolve.Log.error("Enter Mobile Number ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: 'Enter Mobile Number',
                    result: null
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error("Error while generate otp please tyr after some time " + error);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error while generate otp please tyr after some time',
                result: null
            };
            res.send(obj);
        }
    },
    generateUserTokenCowin: async function (req, res) {
        try {
            let errorMessage = '';

            if (req.body.mobile != undefined && req.body.mobile != '' && req.body.mobile != null && req.body.otp != undefined && req.body.otp != '' && req.body.otp != null) {


                let txnId = '';
                let index;
                for (let i = 0; i < Evolve.SurakshaCowin.length; i++) {

                    if (Evolve.SurakshaCowin[i].mobile == req.body.mobile) {

                        txnId = Evolve.SurakshaCowin[i].txnId;
                        index = i;


                    }
                }

                if (txnId == '') {

                    errorMessage = 'Transaction  Not Found'

                } else {

                    let Otp = Evolve.Crypto.createHash('sha256').update(req.body.otp).digest('hex');
                    let config = {
                        headers: {
                            "accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    }
                    let body =
                    {
                        "otp": Otp,
                        "txnId": txnId
                    }
                    let response = await Evolve.Axios.post("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP", body, config).then(details => {


                        Evolve.SurakshaCowin[index].token = details.data.token;


                    }).catch(error => {

                        errorMessage = error.response.data;

                    })

                }
            } else {

                errorMessage = 'Please enter mobile number and otp'

            }

            if (errorMessage == '') {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Otp Verified Successfully',
                    result: null
                };
                res.send(obj);


            } else {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error("Error While get token" + error);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While verify otp",
                result: null
            };
            res.send(obj);
        }
    },
    // getVaccinationDocument: async function (req, res) {
    //     try {
    //         let isVaccinated = false ;
    //         let documentPath = '' ;

    //         if(req.body.mobile != undefined){


    //             // if(req.body.mobile == '+911')
    //             isVaccinated = true ;
    //             documentPath = '/vaccanation_certy.pdf'


    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: 'Details fetched Successfully',
    //                 result: {
    
    //                     isVaccinated : isVaccinated ,
    //                     documentPath : documentPath ,
    //                 }
    //             };
    //             res.send(obj);
    



    //         }else{

    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: 'Please Enter Mobile Number',
    //                 // result: {
    
    //                 //     isVaccinated : true ,
    //                 //     documentPath : '/vaccanation_certy.pdf' ,
    //                 // }

    //                 result : null
    //             };
    //             res.send(obj);



    //         }



    //         // let obj = {
    //         //     statusCode: 200,
    //         //     status: "success",
    //         //     message: 'Details fetched Successfully',
    //         //     result: {

    //         //         isVaccinated : true ,
    //         //         documentPath : '/vaccanation_certy.pdf' ,
    //         //     }
    //         // };
    //         // res.send(obj);













    //         // console.log("body  ata <>>>  ", req.body)
    //         // console.log("Evvolve.SurakshaCowin", Evolve.SurakshaCowin)


    //         // Evolve.SurakshaCowin = [
    //         //     {
    //         //       mobile: '9427008276',
    //         //       txnId: '1f80d568-fdc4-4a19-a6eb-a079a2be1102',
    //         //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkMjkwZmM5ZS0zYzhkLTQ4NjctYjU2NC1mMDBhNThmZGYxZmUiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiJkMjkwZmM5ZS0zYzhkLTQ4NjctYjU2NC1mMDBhNThmZGYxZmUiLCJtb2JpbGVfbnVtYmVyIjo5NDI3MDA4Mjc2LCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjExMTYwMzM1NTMyMTkyLCJ0eG5JZCI6IjFmODBkNTY4LWZkYzQtNGExOS1hNmViLWEwNzlhMmJlMTEwMiIsImlhdCI6MTYyMDYyMzYzNiwiZXhwIjoxNjIwNjI0NTM2fQ.j1QVGVxEMjYKnoaI6bRr3ocQP-3zo0L82q4qSp1lCko'
    //         //     }
    //         //   ]

    //         // console.log("Evolve.SurakshaCowin<<<<<< ", Evolve.SurakshaCowin)





    //         // if (req.body.beneficiaryRefId != undefined && req.body.beneficiaryRefId != '' && req.body.beneficiaryRefId != null && req.body.mobile != undefined && req.body.mobile != '' && req.body.mobile != null) {
    //         // } else {

    //         //     let obj = {
    //         //         statusCode: 400,
    //         //         status: "fail",
    //         //         message: 'Please enter beneficiary reference id',
    //         //         result: null
    //         //     };
    //         //     res.send(obj);


    //         // }
    //         // if (req.body.mobile != undefined) {

    //         // let isReqIFound = false;
    //         // let token = '';

    //         // for (let i = 0; i < Evolve.SurakshaCowin.length; i++) {

    //         //     if (Evolve.SurakshaCowin[i].mobile == req.body.mobile) {

    //         //         isReqIFound = true;

    //         //         token = Evolve.SurakshaCowin[i].token;




    //         //     }
    //         // }
    //         // if (isReqIFound) {


    //         // console.log("token>>>>" ,  token)
    //         // let token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJtb2JpbGVfbnVtYmVyIjo5NzE0NzIzNjU2LCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjExNzcwODM1NTk1OTE2LCJ0eG5JZCI6IjVhNDQ3Yjk1LWNhZjYtNGJhNC1hY2Y5LWUxOWM4NWEyZmFkZiIsImlhdCI6MTYyMDYyNjM1OSwiZXhwIjoxNjIwNjI3MjU5fQ.wHxPRz3blyUukXjP3meA1z_cMmysqqCLvg5s5GKz3YA'
    //         // let config = {

    //         //     // crossDomain: true ,
    //         //     //        "async": true,
    //         // //     "crossDomain": true,

    //         //     headers: {
    //         //         // 'Connection': 'keep-alive',
    //         // 		// 'Content-Type': 'application/json',
    //         //         "accept": "application/pdf",
    //         //         //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJtb2JpbGVfbnVtYmVyIjo5NzE0NzIzNjU2LCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjExNzcwODM1NTk1OTE2LCJ0eG5JZCI6IjVhNDQ3Yjk1LWNhZjYtNGJhNC1hY2Y5LWUxOWM4NWEyZmFkZiIsImlhdCI6MTYyMDYyNjM1OSwiZXhwIjoxNjIwNjI3MjU5fQ.wHxPRz3blyUukXjP3meA1z_cMmysqqCLvg5s5GKz3YA"
    //         //         Authorization: `Bearer ${token}`,

    //         //     }
    //         // }
    //         // let body =
    //         // {
    //         //     "requestId": reqId
    //         // }
    //         // let responce = await Evolve.Axios.get("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=11770835595916", config);

    //         // console.log("responce.>>>" ,  responce)

    //         // let response = await Evolve.Axios.get("http://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=11770835595916", config).then(data => {
    //         //     // let obj = { statusCode: 200, status: "success", message: "IO Config Updated successfully", result: null };
    //         //     // res.send(obj);


    //         //     console.log("Data<<<<<<<<<<<<<<<<<<,,", data)
    //         // }).catch(error => {

    //         //     console.log("error<<<<<<<<<<<<<<<<<<,,", error.response)

    //         //     // let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
    //         //     // res.send(obj);
    //         // })


    //         // var settings = {
    //         //     "async": true,
    //         //     "crossDomain": true,
    //         //     "url": "http://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=11770835595916",
    //         //     "method": "GET",
    //         //     "headers": {
    //         //       "accept": "application/pdf",
    //         //       "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJ1c2VyX3R5cGUiOiJCRU5FRklDSUFSWSIsInVzZXJfaWQiOiI0Mjk0NjgyZi03MGU4LTQ3MzgtOWJlZi1kNjA3YmQwZmRjOGEiLCJtb2JpbGVfbnVtYmVyIjo5NzE0NzIzNjU2LCJiZW5lZmljaWFyeV9yZWZlcmVuY2VfaWQiOjExNzcwODM1NTk1OTE2LCJ0eG5JZCI6IjVhNDQ3Yjk1LWNhZjYtNGJhNC1hY2Y5LWUxOWM4NWEyZmFkZiIsImlhdCI6MTYyMDYyNjM1OSwiZXhwIjoxNjIwNjI3MjU5fQ.wHxPRz3blyUukXjP3meA1z_cMmysqqCLvg5s5GKz3YA",
    //         //       "cache-control": "no-cache",
    //         //     }
    //         //   }

    //         // //   console.log("settings" ,  settings) ;

    //         // let response = await Evolve.Axios(settings).then(data => {
    //         //     // let obj = { statusCode: 200, status: "success", message: "IO Config Updated successfully", result: null };
    //         //     // res.send(obj);


    //         //     console.log("Cowrin >>>>>>>>>>>>   vaccanation>>>>", data)
    //         // }).catch(error => {

    //         //     console.log("error<<<<<<<<<<<<<<<<<<,,", error)

    //         //     // let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
    //         //     // res.send(obj);
    //         // })




















    //         // if (responce.status == 200) {

    //         //     if (responce.data.request_status == 'Pending') {

    //         //         let obj = {
    //         //             statusCode: 400,
    //         //             status: "fail",
    //         //             message: "User did't approved request it is on pending mode",
    //         //             result: null
    //         //         };
    //         //         res.send(obj);

    //         //     } else if (responce.data.request_status == 'Approved') {

    //         //         try {

    //         //             var decoded = Evolve.Jwt.verify(responce.data.as_status, 'EvloveSurakshaAliter@12345');
    //         //             let result = {

    //         //                 message: decoded.as_status.message,
    //         //                 mobile_no: decoded.as_status.mobile_no,
    //         //                 name: decoded.as_status.name,

    //         //             }

    //         //             let obj = {
    //         //                 statusCode: 200,
    //         //                 status: "success",
    //         //                 message: result,
    //         //                 result: null
    //         //             };
    //         //             res.send(obj);
    //         //         } catch (err) {

    //         //             let obj = {
    //         //                 statusCode: 400,
    //         //                 status: "fail",
    //         //                 message: 'Error while decode the record',
    //         //                 result: null
    //         //             };
    //         //             res.send(obj);

    //         //         }

    //         //     } else {

    //         //         let obj = {
    //         //             statusCode: 400,
    //         //             status: "fail",
    //         //             message: 'User denied the request',
    //         //             result: null
    //         //         };
    //         //         res.send(obj);

    //         //     }
    //         // } else {

    //         //     let obj = {
    //         //         statusCode: 400,
    //         //         status: "fail",
    //         //         message: 'Error While get user record',
    //         //         result: null
    //         //     };
    //         //     res.send(obj);

    //         // }
    //         // } else {

    //         //     let obj = {
    //         //         statusCode: 400,
    //         //         status: "fail",
    //         //         message: 'Request Id Not Found Please Send Request To User For Access',
    //         //         result: null
    //         //     };
    //         //     res.send(obj);
    //         // }
    //         // }

    //     } catch (error) {
    //         Evolve.Log.error("Error vaccination status " + error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: 'Error vaccination status',
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },


    getVaccinationDocument: async function (req, res) {
        try {

            let errorMessage = '';

            if (req.body.beneficiaryRefId != undefined && req.body.beneficiaryRefId != '' && req.body.beneficiaryRefId != null && req.body.mobile != undefined && req.body.mobile != '' && req.body.mobile != null) {

                let isReqIFound = false;
                let token = '';

                for (let i = 0; i < Evolve.SurakshaCowin.length; i++) {

                    if (Evolve.SurakshaCowin[i].mobile == req.body.mobile) {

                        isReqIFound = true;

                        token = Evolve.SurakshaCowin[i].token;
                    }
                }
                if (isReqIFound) {
                    let config = {
                        headers: {
                            "accept": "application/pdf",
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
                            Authorization: `Bearer ${token}`,
                            "Content-type": "application/pdf"
                        },
                        responseType: 'arraybuffer'
                    }

                    let response = await Evolve.Axios.get("http://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=" + req.body.beneficiaryRefId, config).then(details => {


                        if (details.status == 200) {


                            let pdfBinaryData = details.data;
                            let writeStream = Evolve.Fs.createWriteStream('./public/test_' + req.body.beneficiaryRefId + '.pdf');
                            writeStream.write(pdfBinaryData, 'binary');
                            writeStream.on('finish', () => {
                                console.log('wrote all data to file');
                            });

                            writeStream.on("error", function (err) {

                                errorMessage = "Error While Download File";

                            });
                            writeStream.end();
                        } else {
                            errorMessage = "Request  Failed With  Status code !" + details.status

                        }

                    }).catch(error => {


                        errorMessage = "Error while download vaccanation document please check mobile number and beneficiary reference id  !"



                    })
                } else {

                    errorMessage = "Transaction Not Found !"
                }

            } else {

                errorMessage = 'Please Enter Mobile Number and  beneficiary reference id'

            }
            if (errorMessage == '') {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: 'Details fetched Successfully',
                    result: {

                        isVaccinated: true,
                        documentPath: '/test_' + req.body.beneficiaryRefId + '.pdf',
                    }
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error("Error while get vacanation document status  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'Error while get vacanation document status ',
                result: null
            };
            res.send(obj);
        }
    },
}