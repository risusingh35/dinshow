'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getApprovalList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);

            
            let error = false ;
            let errorMessage = '' ;
            let resObj ;


            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.getApprovalListCount(search ,req.EvolveUser_ID );
     
            let list = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.getApprovalList(start, length,search ,req.EvolveUser_ID);

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

                let  userTobeDelete = [];
                for(let i=0 ; i<list.recordset.length ; i++){

  
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(list.recordset[i].EvolveApprovalMatrix_ID);
                    if (list instanceof Error) {

                        erorr   = true ;
                        errorMessage = "Error While Get Inex KKist"


                    }else {
                        
                        list.recordset[i].indexList = indexList.recordset;

                        if(indexList.rowsAffected>0){
                            

                        
                            for(let j=0  ; j <indexList.recordset.length ;j++){



                                let ApproverDetails = "" ;

                            


                                let  getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if(getUserDetails instanceof Error){
                                    
                                    error = true ;
                                    errorMessage = "Error While Get Approvers User List"
                                }else{
                                    if(indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < list.recordset[i].EvolveApprovalProcess_CurrentIndex ){

                                        ApproverDetails = "Approved by "


                                   }else{

                                        ApproverDetails = "To be approved by "

                                   }
                                    
                                    // ApproverDetails = "To be approved by "
                                    for(let k=0 ; k<getUserDetails.recordset.length ;k++){

                    
                                        if(k == (getUserDetails.recordset.length -1)){

                                            ApproverDetails += getUserDetails.recordset[k].EvolveUser_EmailID ;


                                        }else{
                                        ApproverDetails += getUserDetails.recordset[k].EvolveUser_EmailID +' OR ';

                                        }
                                    }
                                }

                                list.recordset[i].indexList[j].ApproverDetails =  ApproverDetails; 
                            }
                            }
                    }


                    let details = {
                        EvolveApprovalMatrixIndex_Seq : list.recordset[i].EvolveApprovalMatrixIndex_Seq -1  ,
                        EvolveApprovalMatrix_ID : list.recordset[i].EvolveApprovalMatrix_ID,
                    }
                    let userList = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.getUserListOfMatrixIndex(details);
                    list.recordset[i].userList = userList.recordset;
                    let currentActionList = [] ;



                    if(list.recordset[i].EvolveApprovalMatrix_IsEmailNotif == true){

                        currentActionList.push({
                            key: "EMAILSEND",
                            icon: "mdi mdi-email-check",
                            action: "Email Send",
                            status : list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERROREMAILSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'EMAILSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' || list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED' || list.recordset[i].EvolveApprovalProcess_Status == 'ERRORQADSUBMIT') ? 'SUCCESS' : 'PENDING'
                        },) 

                    }
                    if(list.recordset[i].EvolveApprovalMatrix_IsMessageNotif == true){

                        currentActionList.push({
                            key: "MESSAGESEND",
                            icon: "mdi  mdi-message-text",
                            action: "Message Notification",
                            status : list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORMESSAGESEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'MESSAGESEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' || list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        },) 


                    }if(list.recordset[i].EvolveApprovalMatrix_IsWPMessageNotif == true){

                        
                        currentActionList.push({
                            key: "WHATSAPPSEND",
                            icon: "mdi mdi-whatsapp",
                            action: "Whatsapp Notification",
                            status : list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORWHATSAPPSEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'WHATSAPPSEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' || list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        },) 


                    }if(list.recordset[i].EvolveApprovalMatrix_IsQxtendReq == true){

                        currentActionList.push({
                            key: "QEXTEND",
                            icon: "mdi  mdi-cloud-upload",
                            action: "Send To QAD",
                            status : list.recordset[i].EvolveApprovalProcess_ErrorCode == 'ERRORQEXTEND' ? 'ERROR' : list.recordset[i].EvolveApprovalProcess_Status == 'QEXTEND' ? 'INPROCESS' : (list.recordset[i].EvolveApprovalProcess_Status == 'COMPLETED') ? 'SUCCESS' : 'PENDING'

                        },) 


                    }
                    list.recordset[i].currentActionList = currentActionList ;
                    if(list.recordset[i].EvolveApprovalMatrix_Type == 'ITEM'){

                        let  details =[] ;
                        let itemDetails = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.getItemDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('ITEM CODE : '+itemDetails.recordset[0].EvolveItem_Code)
                        details.push('ITEM DESC : '+itemDetails.recordset[0].EvolveItem_Desc)
                        list.recordset[i].details = details ;
                    }else if(list.recordset[i].EvolveApprovalMatrix_Type == 'SALESQUOTE'){
                        let  details =[] ;
                        let quoteDetails = await Evolve.App.Services.eDoa.SendedBackApproval.SrvOptions.getquoteDetails(list.recordset[i].EvolveApprovalProcess_PrimaryID);
                        details.push('SALE QUOTE NO : '+quoteDetails.recordset[0].EvolveSalesQuote_Serial)
                        details.push('CUSTOMER  : '+quoteDetails.recordset[0].EvolveCustomer_name)
                        list.recordset[i].details = details ;

                    }
                }
       
                let  matchIndex = [] ;

                for(let i= 0 ; i < list.recordset.length ; i++ ){
                    
                    if(list.recordset[i].details[0].includes(search)){

                            matchIndex.push(i)

                    }

                }
                let finalArray = [];

                for(let i= 0 ; i < matchIndex.length ; i++ ){

                    finalArray.push(list.recordset[matchIndex[i]])
                }
                resObj = {
                    noOfRecord: matchIndex.length,
                    records: finalArray
                }

            }
            if(error){
 
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);

            }else{


                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);



            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get approval matrix list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addApprovalProcessDetails: async function (req, res) {
        try {
            let error = false; 
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let  data = req.body ;
            if(data.EvolveApprovalProcessDetails_Status == 'APPROVE'){

                if(data.currentSeq == data.lastSeq){
                    data.EvolveApprovalProcessDetails_Status = 'APPROVED'
                    data.EvolveApprovalProcess_Status = 'EMAILSEND'
                }else{

                    data.EvolveApprovalProcessDetails_Status = 'APPROVED'
                    data.EvolveApprovalProcess_Status = 'PROCESS'

                    data.EvolveApprovalProcess_CurrentIndex = data.currentSeq+1 ;

                }
            }else if(data.EvolveApprovalProcessDetails_Status == 'SENDBACK'){

                data.EvolveApprovalProcess_Status = 'SENDBACK'
                
                data.EvolveApprovalProcess_CurrentIndex = data.currentSeq-1 ;

            }else if(data.EvolveApprovalProcessDetails_Status == 'REJECT'){

                data.EvolveApprovalProcess_Status = 'REJECTED'
                data.EvolveApprovalProcessDetails_Status = 'REJECTED'
            }
            let addProcessDetails = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.addApprovalProcessDetails(data);
            if(addProcessDetails instanceof Error || addProcessDetails.rowsAffected <1){
                error = true
                let userName  = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.getUserNameById(req.body.EvolveUser_ID);
                let details = {
                    EvolveApprovalProcess_ErrorCode : 'APPROVALERROR' ,
                    EvolveApprovalProcess_ErrorDetails : "ERROR WHILE CHANGE STATUS TO "+data.EvolveApprovalProcessDetails_Status+" BY USER "+userName.recordset[0].EvolveUser_Name ,
                    EvolveUser_ID : req.body.EvolveUser_ID
                }
                let changeStatusToError = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.updateProcesStatusToError(details);

            }else{

                let updateProcess = await Evolve.App.Services.eDoa.SendedBackApproval.SrvList.updateProcessStatus(data);
                if(updateProcess instanceof Error || updateProcess.rowsAffected <1){
                        erorr = true;
                }
            }
            if(error == true){

                let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR#### : Error while update process status ",
                result: null
                };
                res.send(obj);
            }else{   
                let obj = {
                statusCode: 200,
                status: "success",
                message: "Process Status Updated Succesfully",
                result: null
                };
                res.send(obj);          
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update process status "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update process status "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}