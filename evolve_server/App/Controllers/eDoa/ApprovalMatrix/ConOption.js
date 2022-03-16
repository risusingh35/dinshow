'use strict';
const { format } = require('winston');
const Evolve = require('../../../../Boot/Evolve');
module.exports = {



    getMatrixDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getMatrixDetails(req.body);
            
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while get approval matrix details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval matrix details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "approval matrix details",
                    result: details.recordset[0]
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single approval matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single approval matrix details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTableColumnList : async function (req, res) {
        try {
                let tableName =''
                for(let i=0 ; i<req.body.tablesList.length ; i++){
                    if(i == (req.body.tablesList.length-1)){

                        tableName += " TABLE_NAME = '"+req.body.tablesList[i]+"'"
                    
                    }else{
                        tableName += " TABLE_NAME = '"+req.body.tablesList[i]+"' OR "  ;
                    }

                }
                 let list = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getTableColumnList(tableName);
                    if (list instanceof Error || list.rowsAffected < 1) {
                        Evolve.Log.error(" EERR####: Error while get  table fields ");
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR#### : Error while get  table fields " ,
                            result: null 
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Field List",
                            result: list.recordset
                        };
                        res.send(obj);
                    }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get table fields "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get table fields  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    saveMatrixDetails : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let details =  req.body ;
            details.EvolveUser_ID = req.EvolveUser_ID;
            let error = false ;
            let errorMessage = '' ;


            if(details.EvolveApprovalMatrixIndex_Seq == 1){

                // console.log("req.EvolveApprovalMatrixDetails" ,  req.body.EvolveApprovalMatrixDetails)
                if(details.EvolveApprovalMatrixIndex_ID == null){

                let checkMatrixIndex =  await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkMatrixIndex(details);
                if (checkMatrixIndex instanceof Error) {

                    error = true;

                }else
                if(checkMatrixIndex.rowsAffected >0){

                    details.EvolveApprovalMatrixIndex_ID = checkMatrixIndex.recordset[0].EvolveApprovalMatrixIndex_ID


                }else{

                let addMatSeq = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixIndex(details);
                if (addMatSeq instanceof Error || addMatSeq.rowsAffected < 1) {

                    error = true

                
                }else{

                    details.EvolveApprovalMatrixIndex_ID = addMatSeq.recordset[0].inserted_id

                }

                }
                }else{
                        let editMatrixName = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.updateMatrixName(details);

                        if (editMatrixName instanceof Error){
                            error = true;
                        }else{

                        let deleteDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.deleteMatrixDetailsList(details.EvolveApprovalMatrixIndex_ID);
                        if (deleteDetails instanceof Error){

                            error = true;
                        }
                        }
                }
            

                if(error == false){
            
                    for(let i=0 ; i<details.EvolveApprovalMatrixDetails.length ; i++){

                        console.log("details.EvolveApprovalMatrixDetails.>>>" ,  details.EvolveApprovalMatrixDetails[i])

                        if(error == false){
                            let parentId = 0
                            details.EvolveApprovalMatrixDetails[i].EvolveApprovalMatrixIndex_ID =  details.EvolveApprovalMatrixIndex_ID
                            let checkTableField = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkTableField(details.EvolveApprovalMatrixDetails[i]);

                            if (checkTableField instanceof Error) {
                                
                                error = true

                            }else if(checkTableField.rowsAffected < 1){


                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'field' ,
                                    EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].tableField ,
                                    EvolveApprovalMatrixDetails_IsMandatory : null ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                console.log("matDetails?????" , matDetails)

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }else{

                                    parentId = saveMatDetails.recordset[0].inserted_id

                                }
                            }else{
                                parentId = checkTableField.recordset[0].EvolveApprovalMatrixDetails_ID
                            }
                            if(error == false){
                                
                                details.EvolveApprovalMatrixDetails[i].EvolveApprovalMatrixDetails_ParentID = parentId ; 
                                let checkTableName = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkTableName(details.EvolveApprovalMatrixDetails[i]);
                                if (checkTableName instanceof Error) {
                                    error = true
                                }else if(checkTableName.rowsAffected < 1){


                                    let matDetails = {

                                        EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                        EvolveApprovalMatrixDetails_ParentID : parentId,
                                        EvolveApprovalMatrixDetails_Key : 'table' ,
                                        EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].tableName ,
                                        EvolveApprovalMatrixDetails_IsMandatory :null,
                                        EvolveUser_ID : req.EvolveUser_ID
                                        
                                    }
        
                                    let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                    if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {
                                        error = true
                                    }




                                }

                            }
                            if(error == false){

                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'case' ,
                                    EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].case ,
                                    EvolveApprovalMatrixDetails_IsMandatory : details.EvolveApprovalMatrixDetails[i].isMandatory == true ? 1 : 0 ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }else{

                                    parentId = saveMatDetails.recordset[0].inserted_id

                                }


                            }
                            if(error == false){

                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'value' ,
                                    EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].caseValue ,
                                    EvolveApprovalMatrixDetails_IsMandatory : details.EvolveApprovalMatrixDetails[i].isMandatory == true ? 1 : 0 ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }


                            }


                        }
                    }
                }
            }else{

                if(details.EvolveApprovalMatrixIndex_ID == null){
                    
                    let checkMatrixIndex =  await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkMatrixIndex(details);
                    if (checkMatrixIndex instanceof Error) {
    
                        error = true;
    
                    }else 
                    if(checkMatrixIndex.rowsAffected >0){
    
                        details.EvolveApprovalMatrixIndex_ID = checkMatrixIndex.recordset[0].EvolveApprovalMatrixIndex_ID
    
    
                    }else{
    
                    let addMatSeq = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixIndex(details);
                    if (addMatSeq instanceof Error || addMatSeq.rowsAffected < 1) {
    
                        error = true
    
                    
                    }else{
    
                        details.EvolveApprovalMatrixIndex_ID = addMatSeq.recordset[0].inserted_id
    
                    }
    
                    }

                }else{
                    let editMatrixName = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.updateMatrixName(details);

                    if (editMatrixName instanceof Error){
                        error = true;
                    }else{

                    let deleteDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.deleteMatrixDetailsList(details.EvolveApprovalMatrixIndex_ID);
                    if (deleteDetails instanceof Error){

                        error = true;
                    }
                    }


                }
                if(error == false){


                    if(details.EvolveApprovalMatrixDetails.length == 0){

                        error = true ;

                        errorMessage = 'Please Add Atleast One Approver'

                        
                    }else{

                    

                    for(let i=0  ; i<details.EvolveApprovalMatrixDetails.length ; i++){

                            let chekkDetails = {
                                
                                EvolveApprovalMatrix_ID : details.EvolveApprovalMatrix_ID ,
                                EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].userId ,

                                 
                                
                            } ;

                             let  isUserAvialble =  await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.isUserAvailableInMatrix(chekkDetails);
                             if( (!(isUserAvialble instanceof Error)) &&  isUserAvialble.rowsAffected > 0){

                                error = true ;
                                errorMessage += details.EvolveApprovalMatrixDetails[i].userName+" Is Alreay Assigned In Sequence "+ (isUserAvialble.recordset[0].EvolveApprovalMatrixIndex_Seq -1) 
                             }



                    }
                }
                }

           
                if(error == false){
            
                    for(let i=0 ; i<details.EvolveApprovalMatrixDetails.length ; i++){

                        if(error == false){

                            let parentId = 0 ;
                            let userPrimaryKey = 0 ;
                            
                            let matDetails = {
                                EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                EvolveApprovalMatrixDetails_ParentID : 0,
                                EvolveApprovalMatrixDetails_Key : 'USERID' ,
                                EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].userId ,
                                
                            }
                            let  checkUserId =  await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkMatDetails(matDetails);


                            if (checkUserId instanceof Error) {
                                error = true
                            }else if(checkUserId.rowsAffected < 1){

                                        let matDetails = {

                                        EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                        EvolveApprovalMatrixDetails_ParentID : 0,
                                        EvolveApprovalMatrixDetails_Key : 'USERID' ,
                                        EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].userId ,
                                        EvolveApprovalMatrixDetails_IsMandatory :null,
                                        EvolveUser_ID : req.EvolveUser_ID
                                        
                                    }
        
                                    let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);

                                    if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected < 1) {
                                        error = true
                                    }else{
                                        parentId = saveMatDetails.recordset[0].inserted_id;
                                        userPrimaryKey = saveMatDetails.recordset[0].inserted_id ;

                                        let matDetails = {

                                            EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                            EvolveApprovalMatrixDetails_ParentID : parentId,
                                            EvolveApprovalMatrixDetails_Key : 'SEQUENCE' ,
                                            EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].sequence ,
                                            EvolveApprovalMatrixDetails_IsMandatory :null,
                                            EvolveUser_ID : req.EvolveUser_ID
                                            
                                        }
            
                                        let saveSequence = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);

                                        if (saveSequence instanceof Error || saveSequence.rowsAffected < 1) {
                                            error = true
                                        }
                                    }

                            }else{

                                parentId = checkUserId.recordset[0].EvolveApprovalMatrixDetails_ID;
                                userPrimaryKey = checkUserId.recordset[0].EvolveApprovalMatrixDetails_ID ;

                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'SEQUENCE' ,
                                    EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].userId ,
                                    
                                }
                                let  checkSequence =  await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkMatDetails(matDetails);

                                if (checkSequence instanceof Error ) {
                                    error = true;

                                }else if(checkSequence.rowsAffected < 1){

                                    let matDetails = {

                                        EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                        EvolveApprovalMatrixDetails_ParentID : parentId,
                                        EvolveApprovalMatrixDetails_Key : 'SEQUENCE' ,
                                        EvolveApprovalMatrixDetails_Value : details.EvolveApprovalMatrixDetails[i].sequence ,
                                        EvolveApprovalMatrixDetails_IsMandatory :null,
                                        EvolveUser_ID : req.EvolveUser_ID
                                        
                                    }
        
                                    let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);

                                    if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected < 1) {
                                        error = true
                                    }
                                }

                            }

                            let ruleDetailList = details.EvolveApprovalMatrixDetails[i].ruleDetails

                            for(let j = 0 ; j<ruleDetailList.length ; j++){

                            ruleDetailList[j].EvolveApprovalMatrixIndex_ID =  details.EvolveApprovalMatrixIndex_ID
                            let checkTableField = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkTableField(ruleDetailList[j]);

                            if (checkTableField instanceof Error) {
                                
                                error = true

                            }else if(checkTableField.rowsAffected < 1){


                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : userPrimaryKey,
                                    EvolveApprovalMatrixDetails_Key : 'field' ,
                                    EvolveApprovalMatrixDetails_Value : ruleDetailList[j].tableField ,
                                    EvolveApprovalMatrixDetails_IsMandatory : null ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }else{

                                    parentId = saveMatDetails.recordset[0].inserted_id
                                    

                                }
                            }else{
                                parentId = checkTableField.recordset[0].EvolveApprovalMatrixDetails_ID
                            }
                            if(error == false){
                                
                                ruleDetailList[j].EvolveApprovalMatrixDetails_ParentID = parentId ; 
                                let checkTableName = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.checkTableName(ruleDetailList[j]);
                                if (checkTableName instanceof Error) {
                                    error = true
                                }else if(checkTableName.rowsAffected < 1){


                                    let matDetails = {

                                        EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                        EvolveApprovalMatrixDetails_ParentID : parentId,
                                        EvolveApprovalMatrixDetails_Key : 'table' ,
                                        EvolveApprovalMatrixDetails_Value : ruleDetailList[j].tableName ,
                                        EvolveApprovalMatrixDetails_IsMandatory :null,
                                        EvolveUser_ID : req.EvolveUser_ID
                                        
                                    }
        
                                    let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                    if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {
                                        error = true
                                    }

                                }

                            }
                            if(error == false){

                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'case' ,
                                    EvolveApprovalMatrixDetails_Value : ruleDetailList[j].case ,
                                    EvolveApprovalMatrixDetails_IsMandatory : ruleDetailList[j].isMandatory == true ? 1 : 0 ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }else{

                                    parentId = saveMatDetails.recordset[0].inserted_id

                                }


                            }
                            if(error == false){

                                let matDetails = {

                                    EvolveApprovalMatrixIndex_ID : details.EvolveApprovalMatrixIndex_ID ,   
                                    EvolveApprovalMatrixDetails_ParentID : parentId,
                                    EvolveApprovalMatrixDetails_Key : 'value' ,
                                    EvolveApprovalMatrixDetails_Value : ruleDetailList[j].caseValue ,
                                    EvolveApprovalMatrixDetails_IsMandatory : ruleDetailList[j].isMandatory == true ? 1 : 0 ,
                                    EvolveUser_ID : req.EvolveUser_ID
                                    
                                }

                                let saveMatDetails = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.saveMatrixDetails(matDetails);
                                if (saveMatDetails instanceof Error || saveMatDetails.rowsAffected <1) {

                                    error = true; 

                                }
                            }
                            }


                        }
                    }
                }
            }
            if(error == false){

                
				Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixList({

                    ACTION : 'ADDUPDATE',
                    EvolveApprovalMatrix_ID : details.EvolveApprovalMatrix_ID ,

                });

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Matrix Details Added Successfully",
                    result: null
                };
                res.send(obj);


            }else{ 

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage == "" ? "Error While Add Matrix Details" : errorMessage ,
                    result: null
                };
                res.send(obj);


            }
        

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add matrix details  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMatrixDetailsList: async function (req, res) {
        try {
            let ruleTitleAndName = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getruleTitleAndName(req.body);

            if (ruleTitleAndName instanceof Error ) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Get Matrix Details",
                        result: null
                    };
                     res.send(obj);

            }else{

                let ruleTitle =ruleTitleAndName.recordset[0].EvolveApprovalMatrixIndex_Name;
                let matrixIndexId =ruleTitleAndName.recordset[0].EvolveApprovalMatrixIndex_ID;
                let details = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getMatrixDetailsList(req.body);

                if (details instanceof Error ) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Get Matrix Details",
                        result: null
                    };
                res.send(obj);
                }else{
                    let array = details.recordset;
                    let currentField ;
                    let currentTable ;

                    let resultArray = [];
                    let arrayIndexData = {
                        tableField : '',
                        isMandatory : '',
                        case : '',
                        caseValue : '',
                        tableName : '',
                    }
        
                    for(let i =0 ; i<array.length ; i++){

            
                            if(array[i].EvolveApprovalMatrixDetails_Key == 'field'){

                                currentField = array[i].EvolveApprovalMatrixDetails_Value ;
                                
                                

                            }else if(array[i].EvolveApprovalMatrixDetails_Key == 'case'){

                                arrayIndexData.isMandatory =  array[i].EvolveApprovalMatrixDetails_IsMandatory == 1 ? true : false
                                arrayIndexData.case =  array[i].EvolveApprovalMatrixDetails_Value ;


                                let findIndex = array.findIndex(x=>x.EvolveApprovalMatrixDetails_ID == array[i].EvolveApprovalMatrixDetails_ParentID);

                                    currentField = array[findIndex].EvolveApprovalMatrixDetails_Value;
                            

                            }else if(array[i].EvolveApprovalMatrixDetails_Key == 'value'){

                                arrayIndexData.caseValue =  array[i].EvolveApprovalMatrixDetails_Value


                            }else if(array[i].EvolveApprovalMatrixDetails_Key == 'table'){

                                currentTable = array[i].EvolveApprovalMatrixDetails_Value
                            }
                            if(currentField != '' && currentField != null && currentField != undefined  ){

                                arrayIndexData.tableField =  currentField ;


                            }
                            if(currentTable != '' && currentTable != null && currentTable != undefined  ){

                                arrayIndexData.tableName =  currentTable ;


                            }

                            if(i == array.length-1){
                            }

                            if(arrayIndexData.tableField !== '' && arrayIndexData.isMandatory !== '' && arrayIndexData.case !== '' && arrayIndexData.caseValue !== '' && arrayIndexData.tableName !== ''){
                            resultArray.push({

                                    tableField : arrayIndexData.tableField,
                                    isMandatory : arrayIndexData.isMandatory,
                                    case : arrayIndexData.case,
                                    caseValue : arrayIndexData.caseValue,
                                    tableName : arrayIndexData.tableName
                                })

                            arrayIndexData.tableField =  '';
                            arrayIndexData.isMandatory =  '';
                            arrayIndexData.case =  '';
                            arrayIndexData.caseValue =  '';
                            arrayIndexData.tableName =  '';

                            }
            
                    }
                    let matDetails = {};
                    matDetails.resultArray =resultArray;
                    
                    matDetails.ruleTitle =ruleTitle;
                    matDetails.matrixIndexId =matrixIndexId;

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "approval matrix details",
                        result: matDetails
                    };
                res.send(obj);
                }
            }
        
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single approval matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single approval matrix details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMatrixIndexList: async function (req, res) {
        try {
            let details = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getMatrixIndexList(req.body);
            
            if (details instanceof Error) {
                Evolve.Log.error(" EERR####: Error while get approval matrix index details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval matrix index details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "approval matrix index details",
                    result: details.recordset
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single approval matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single approval matrix details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSectionList: async function (req, res) {
        try {
          let sectionList = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getSectionList();
          if (sectionList instanceof Error) {
            Evolve.Log.error(' EERR####: Error on get Section list ');
            let obj = { statusCode: 400, status: "fail", message: "Error on get Section list", result: null };
            res.send(obj);
          } else {
            let obj = { statusCode: 200, status: "success", message: "Get Section list", result: sectionList.recordset };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR####: Error while getting Section list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting Section list "+error.message, result: null };
          res.send(obj);
        }
    },
    getRoleList: async function (req, res) {
    try {
        let roleList = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getRoleList();
        if (roleList instanceof Error) {
        Evolve.Log.error(' EERR####: Error while get role list ');
        let obj = { statusCode: 400, status: "fail", message: "Error while get role list", result: null };
        res.send(obj);
        } else {
        let obj = { statusCode: 200, status: "success", message: "Role list", result: roleList.recordset };
        res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(" EERR####: Error while get role list "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get role list "+error.message, result: null };
        res.send(obj);
    }
    },

    getUserList: async function (req, res) {
    try {
        let userList = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getUserList();
        if (userList instanceof Error) {
        Evolve.Log.error(' EERR####: Error while get user list by role ');
        let obj = { statusCode: 400, status: "fail", message: "Error while get user list by role", result: null };
        res.send(obj);
        } else {
        let obj = { statusCode: 200, status: "success", message: "Role list", result: userList.recordset };
        res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(" EERR####: Error while get user list by role "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get user list by role "+error.message, result: null };
        res.send(obj);
    }
    },
    getHighSequenceMAtDetailList: async function (req, res) {
    try {
        let result = {

            EvolveApprovalMatrixIndex_ID : '',
            EvolveApprovalMatrixIndex_Name : '',
            userRuleDetailList : []
        };
        let details = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getHighSequenceMAtDetailList(req.body);



        if (details instanceof Error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Get Matrix Details",
                result: null
            };
            res.send(obj);

        }else if(details.rowsAffected <1){

            let obj = {
                statusCode: 200,
                status: "fail",
                message: "No Details Found",
                result: result
            };
            res.send(obj);

        }else{

            result.EvolveApprovalMatrixIndex_ID = details.recordset[0].EvolveApprovalMatrixIndex_ID ;
            result.EvolveApprovalMatrixIndex_Name = details.recordset[0].EvolveApprovalMatrixIndex_Name ;


            let userRuleDetailList = [];
            let detailList = details.recordset ;
            

            for(let i=0 ; i< detailList.length ; i++){


                if(detailList [i].EvolveApprovalMatrixDetails_Key == 'USERID'){

                    userRuleDetailList.push({

                        userName : '',
                        userId : detailList [i].EvolveApprovalMatrixDetails_Value,
                        sequence : '',
                        ruleDetails : []
                    })
                    let userChilds = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getChildsByParentId(detailList [i].EvolveApprovalMatrixDetails_ID);

                    for(let  j = 0 ; j<userChilds.recordset.length ; j++){


                        if(userChilds.recordset[j].EvolveApprovalMatrixDetails_Key == 'SEQUENCE'){

                            userRuleDetailList[userRuleDetailList.length-1].sequence = userChilds.recordset[j].EvolveApprovalMatrixDetails_Value
                        }
                        if(userChilds.recordset[j].EvolveApprovalMatrixDetails_Key == 'field'){

                            userRuleDetailList[userRuleDetailList.length-1].ruleDetails.push({

                                tableField : userChilds.recordset[j].EvolveApprovalMatrixDetails_Value,
                                tableName : "",
                                case : "",
                                caseValue : ""


                            }) 

                            let fieldChilds = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getChildsByParentId(userChilds.recordset[j].EvolveApprovalMatrixDetails_ID);

                            let isFirstCase = true

                            for(let  k = 0 ; k<fieldChilds.recordset.length ; k++){
                                
                                if(fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Key == 'table'){

                                    userRuleDetailList[userRuleDetailList.length-1].ruleDetails[(userRuleDetailList[userRuleDetailList.length-1].ruleDetails).length -1].tableName = fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Value

                                }
                                
                                if(fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Key == 'case'){

                                    if(isFirstCase == true){

                                        userRuleDetailList[userRuleDetailList.length-1].ruleDetails[(userRuleDetailList[userRuleDetailList.length-1].ruleDetails).length -1].case = fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Value ;

                                        isFirstCase = false ;
                                    }else{

                                        userRuleDetailList[userRuleDetailList.length-1].ruleDetails.push({

                                            
                                        tableField : userChilds.recordset[j].EvolveApprovalMatrixDetails_Value,
                                        tableName : fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Value,
                                        case : fieldChilds.recordset[k].EvolveApprovalMatrixDetails_Value,
                                        caseValue : ""

                                        })

                                    }

                                        let caseChilds = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getChildsByParentId(fieldChilds.recordset[k].EvolveApprovalMatrixDetails_ID);

                                        for(let l=0 ; l<caseChilds.recordset.length ; l++){

                                        if(caseChilds.recordset[l].EvolveApprovalMatrixDetails_Key == 'value'){

                                        userRuleDetailList[userRuleDetailList.length-1].ruleDetails[(userRuleDetailList[userRuleDetailList.length-1].ruleDetails).length -1].caseValue = caseChilds.recordset[l].EvolveApprovalMatrixDetails_Value ;

                                    }
                                    }
                                }

                            }
                        }
                    }

                }

            }

            for(let i=0 ; i<userRuleDetailList.length ; i++){

                let  getUserNameById = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvOption.getUserNameById(userRuleDetailList[i].userId);

                userRuleDetailList[i].userName = getUserNameById.recordset[0].EvolveUser_Name
            }

            result.userRuleDetailList = userRuleDetailList ;

            let obj = {
                statusCode: 200,
                status: "success",
                message: "success",
                result: result
            };
            res.send(obj);

        }
    

    } catch (error) {
        Evolve.Log.error(" EERR####: Error while get single approval matrix details "+error.message);
        let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR####: Error while get single approval matrix details "+error.message,
            result: null
        };
        res.send(obj);
    }
    },




}