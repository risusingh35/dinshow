'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {



    addTravelRequest: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            if (data.EvolveTravelReq_otherMembers.length == 0) {

                data.EvolveTravelReq_otherMembers = '';


            } else {

                data.EvolveTravelReq_otherMembers = JSON.stringify(data.EvolveTravelReq_otherMembers);

            }

            return await Evolve.SqlPool.request()

                .input('EvolveUser_id', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_startDate', (data.EvolveTravelReq_startDate))
                .input('EvolveTravelReq_endDate', (data.EvolveTravelReq_endDate))
                .input('EvolveReason_id', Evolve.Sql.Int, data.EvolveReason_id)
                .input('EvolveTravelReq_reasonDetails', Evolve.Sql.NVarChar, data.EvolveTravelReq_reasonDetails)
                .input('EvolveTravelReq_otherMembers', Evolve.Sql.NVarChar, data.EvolveTravelReq_otherMembers)
                .input('EvolveTravelReq_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveTravelReq_CreatedUser', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_uuid', Evolve.Sql.NVarChar, data.EvolveTravelReq_uuid)
                .input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveTravelReq_TripStatusID)
                .input('EvolveTRavelReq_currApvlSeq', Evolve.Sql.Int, 1)
                .input('EvolveTravelReq_Days', Evolve.Sql.Int, data.EvolveTravelReq_Days)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)


                .input('EvolveTravelReq_accomodDetails', Evolve.Sql.NVarChar, JSON.stringify(data.EvolveTravelReq_accomodDetails))


                .query('INSERT INTO EvolveTravelReq (EvolveUser_id,EvolveTravelReq_startDate,  EvolveTravelReq_endDate ,EvolveReason_id ,EvolveTravelReq_reasonDetails ,EvolveTravelReq_otherMembers , EvolveTravelReq_uuid ,EvolveTravelReq_CreatedAt,EvolveTravelReq_CreatedUser,EvolveTravelReq_UpdatedAt,EvolveTravelReq_UpdatedUser,EvolveTravelReq_TripStatusID,EvolveTRavelReq_currApvlSeq,EvolveTravelReq_accomodDetails , EvolveTravelReq_Days,EvolveUnit_ID)  VALUES ( @EvolveUser_id, @EvolveTravelReq_startDate, @EvolveTravelReq_endDate ,@EvolveReason_id,@EvolveTravelReq_reasonDetails,@EvolveTravelReq_otherMembers,@EvolveTravelReq_uuid,@EvolveTravelReq_CreatedAt,@EvolveTravelReq_CreatedUser,@EvolveTravelReq_UpdatedAt,@EvolveTravelReq_UpdatedUser,@EvolveTravelReq_TripStatusID,@EvolveTRavelReq_currApvlSeq,@EvolveTravelReq_accomodDetails , @EvolveTravelReq_Days,@EvolveUnit_ID);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error("  Error while add travel request" + error.message);
            return new Error("  Error while add travel request" + error.message);
        }
    },

    upateTravelRequest: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            if (data.EvolveTravelReq_otherMembers.length == 0) {

                data.EvolveTravelReq_otherMembers = '';


            } else {

                data.EvolveTravelReq_otherMembers = JSON.stringify(data.EvolveTravelReq_otherMembers);

            }

            return await Evolve.SqlPool.request()
                .input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
                .input('EvolveUser_id', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_startDate', (data.EvolveTravelReq_startDate))
                .input('EvolveTravelReq_endDate', (data.EvolveTravelReq_endDate))
                .input('EvolveReason_id', Evolve.Sql.Int, data.EvolveReason_id)
                .input('EvolveTravelReq_reasonDetails', Evolve.Sql.NVarChar, data.EvolveTravelReq_reasonDetails)
                .input('EvolveTravelReq_otherMembers', Evolve.Sql.NVarChar, data.EvolveTravelReq_otherMembers)
                .input('EvolveTravelReq_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveTravelReq_CreatedUser', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_id)
                .input('EvolveTravelReq_uuid', Evolve.Sql.NVarChar, data.EvolveTravelReq_uuid)
                .input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveTravelReq_TripStatusID)
                .input('EvolveTRavelReq_currApvlSeq', Evolve.Sql.Int, 1)
                .input('EvolveTravelReq_Days', Evolve.Sql.Int, data.EvolveTravelReq_Days)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)


                .input('EvolveTravelReq_accomodDetails', Evolve.Sql.NVarChar, JSON.stringify(data.EvolveTravelReq_accomodDetails))


                // .query('INSERT INTO EvolveTravelReq (EvolveUser_id,EvolveTravelReq_startDate,  EvolveTravelReq_endDate ,EvolveReason_id ,EvolveTravelReq_reasonDetails ,EvolveTravelReq_otherMembers , EvolveTravelReq_uuid ,EvolveTravelReq_CreatedAt,EvolveTravelReq_CreatedUser,EvolveTravelReq_UpdatedAt,EvolveTravelReq_UpdatedUser,EvolveTravelReq_TripStatusID,EvolveTRavelReq_currApvlSeq,EvolveTravelReq_accomodDetails , EvolveTravelReq_Days,EvolveUnit_ID)  VALUES ( @EvolveUser_id, @EvolveTravelReq_startDate, @EvolveTravelReq_endDate ,@EvolveReason_id,@EvolveTravelReq_reasonDetails,@EvolveTravelReq_otherMembers,@EvolveTravelReq_uuid,@EvolveTravelReq_CreatedAt,@EvolveTravelReq_CreatedUser,@EvolveTravelReq_UpdatedAt,@EvolveTravelReq_UpdatedUser,@EvolveTravelReq_TripStatusID,@EvolveTRavelReq_currApvlSeq,@EvolveTravelReq_accomodDetails , @EvolveTravelReq_Days,@EvolveUnit_ID);select @@IDENTITY AS \'inserted_id\'');

                .query(' (UPDATE EvolveTravelReq SET EvolveUser_id=@EvolveUser_id , EvolveTravelReq_startDate=@EvolveTravelReq_startDate ,EvolveTravelReq_endDate=@EvolveTravelReq_endDate ,EvolveReason_id=@EvolveReason_id ,EvolveTravelReq_reasonDetails=@EvolveTravelReq_reasonDetails ,  EvolveTravelReq_otherMembers=@EvolveTravelReq_otherMembers ,  EvolveTravelReq_uuid=@EvolveTravelReq_uuid , EvolveTravelReq_CreatedAt=@EvolveTravelReq_CreatedAt , EvolveTravelReq_CreatedUser=@EvolveTravelReq_CreatedUser ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt , EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser , EvolveUnit_ID=@EvolveUnit_ID  ,EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID ,EvolveTRavelReq_currApvlSeq=@EvolveTRavelReq_currApvlSeq ,EvolveTravelReq_Days=@EvolveTravelReq_Days  ,EvolveTravelReq_accomodDetails=@EvolveTravelReq_accomodDetails WHERE EvolveTravelReq_id=@EvolveTravelReq_id )');

                
        } catch (error) {
            Evolve.Log.error("  Error while update travel request" + error.message);
            return new Error("  Error while update travel request" + error.message);
        }
    },

    addApprovalStatus: async function (body, id, diff) {
        try {
            let EvolveUser_ID = body.EvolveUser_ID
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            const insertQuery = `INSERT INTO EvolveApprovalStatus (
                    EvolveTravelReq_id,
                    EvolveApproval_id ,
                    EvolveApproval_CreatedAt,                    
                    EvolveApproval_CreatedUser,
                    EvolveApproval_UpdatedAt,                    
                    EvolveApproval_UpdatedUser                    
    
                )
                VALUES (
                    @EvolveTravelReq_id,
                    @EvolveApproval_id,
                    @EvolveApproval_CreatedAt,                    
                    @EvolveApproval_CreatedUser,
                    @EvolveApproval_UpdatedAt,                    
                    @EvolveApproval_UpdatedUser                     
    
                );`
            var query = `SELECT EvolveApproval_id FROM [EvolveApproval]
            INNER JOIN EvolveRole ON [EvolveApproval].[EvolveRole_id] = EvolveRole.[EvolveRole_id]
            WHERE [EvolveApproval_param] <= ${diff + 5}  AND EvolveApproval_name = 'Travel'`


            var result = await Evolve.SqlPool.request()
                .query(query);

            var resultArray = result['recordset'];

            let erroStatus = false;
            if (result.rowsAffected > 0) {
                for (let index = 0; index < resultArray.length; index++) {
                    body = resultArray[index];
                    const element = await Evolve.SqlPool.request()
                        .input('EvolveTravelReq_id', id)
                        .input('EvolveApproval_id', body.EvolveApproval_id)
                        .input('EvolveApproval_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                        .input('EvolveApproval_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                        .input('EvolveApproval_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                        .input('EvolveApproval_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                        .query(insertQuery);
                    if (element instanceof Error || element.rowsAffected < 1) {
                        erroStatus = true;
                    }
                }
            }
            return erroStatus;
        } catch (error) {
            Evolve.Log.error(error);
            throw error;
        }
    },


    // getAllTravelRequest: async function (data) {
    // 	let id  = data.EvolveUser_ID;
    // 	 var retData = [];
    // 	try {
    // 	var requestQuery =`SELECT  EvolveTravelReq.*,EvolveReason.EvolveReason_name , est.EvolveStatusCodeMstr_Code as currentStatus FROM EvolveStatusCodeMstr est  , EvolveTravelReq
    //     Left JOIN EvolveReason ON  EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id
    //     where EvolveUser_id =  ${id} AND EvolveTravelReq.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id ORDER BY  EvolveTravelReq.EvolveTravelReq_id DESC`
    //     var res = await Evolve.SqlPool.request().query(requestQuery);
    //     var result = res.recordset;

    //     for (let index = 0; index < result.length; index++) {
    //         const object = result[index];
    //         var data = {};
    //         data.request = object;

    //     var evolveTravelReqId = object.EvolveTravelReq_id;

    //     let userDetsils = await  Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id ="+evolveTravelReqId);

    //     data.request.userDetsils = userDetsils.recordset[0];

    //     var approvalStatusQuery = `SELECT eu1.EvolveUser_Name as primary_name,eu1.EvolveUser_login as primary_login,
    //     eu2.EvolveUser_Name as secondary_name,eu2.EvolveUser_login as secondary_login,
    //     eu3.EvolveUser_Name as tertiary_name,eu3.EvolveUser_login as tertiary_login, 
    //     approvedBy.EvolveUser_Name as approval_name,EvolveApprovalTrans.EvolveApproval_UpdatedAt,
    //     EvolveApprovalTrans.EvolveApprovalStatus_comments,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code,EvolveReason.EvolveReason_name,
    //     EvolveApproval.EvolveApproval_primaryUser_id, EvolveApproval.EvolveApproval_secondUser_id, EvolveApproval.EvolveApproval_tertiaryUser_id ,er.EvolveRole_Name
    //             FROM EvolveApprovalStatus            
    //             LEFT JOIN EvolveApprovalTrans ON EvolveApprovalStatus.EvolveApprovalStatus_id = EvolveApprovalTrans.EvolveApprovalStatus_id
    //             LEFT JOIN EvolveStatusCodeMstr ON EvolveApprovalTrans.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
    //             LEFT JOIN EvolveReason ON EvolveApprovalTrans.EvolveReason_id = EvolveReason.EvolveReason_id
    //             Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id
    //             Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id
    //             Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id
    //             Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id
    //             Left JOIN EvolveUser approvedBy ON approvedBy.EvolveUser_ID = EvolveApprovalTrans.EvolveUser_ID 
    // 			Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id
    // 			LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID
    //             where EvolveTravelReq_id = ${evolveTravelReqId} ORDER BY  EvolveApproval_UpdatedAt`;//AND EvolveApprovalStatus.EvolveStatus_id IS NULL
    //     var approvalStatus = await  Evolve.SqlPool.request().query(approvalStatusQuery);

    //     let nullIndex = [];

    //     data.status = approvalStatus.recordset;
    //     let  finalArray = [] ;

    //     for(let i=0 ; i<data.status.length ; i++){

    //         if(data.status[i].EvolveApproval_UpdatedAt == null){

    //             nullIndex.push(i) ;


    //         }else{

    //             finalArray.push(data.status[i]) ;

    //         }
    //     }
    //     for(let i = 0 ; i<nullIndex.length ; i++){

    //         finalArray.push(data.status[i]) ;

    //     }
    //     data.status = finalArray ;


    //     var desQuery = `SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails
    //     Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id
    //      where EvolveTravelReq_id = ${evolveTravelReqId}`;
    //     var destinations = await  Evolve.SqlPool.request().query(desQuery);
    //     data.destinations = destinations.recordset

    //     var hisQuery = `SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory
    //     LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
    //     WHERE EvolveTravelReq_id = ${evolveTravelReqId} ORDER BY EvolveTravelHistory_id desc`

    //     var history = await  Evolve.SqlPool.request().query(hisQuery);
    //     data.history = history.recordset
    //     var medQuery = `SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = ${evolveTravelReqId} 
    //     ORDER BY EvolveTravelReq_id desc`
    //     var medical = await  Evolve.SqlPool.request().query(medQuery);
    //     data.medical = medical.recordset

    //     if( data.medical.length != 0){
    //     for(let j = 0 ; j<data.medical.length ; j++)
    //     {

    //       let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)


    //     for(let i =0 ; i<medicalDetails.length ; i++){
    //         var questionNAme = await  Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = "+medicalDetails[i].EvolveMedQuests_id);
    //         medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[0].EvolveMedQuests_Name;
    //     }
    //        data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

    //     }   

    //     }
    //         retData.push(data);
    //     }
    // 		return retData;


    // 	} catch (error) {
    // 		Evolve.Log.error("  Error while get all travel request "+error);
    // 		return new Error("  Error while get all travel request "+error);
    // 	}
    // },


    getAllTravelRequest: async function (data) {
        let id = data.EvolveUser_ID;


        let erorr = true;
        let errorMessage = ""

        var retData = [];
        try {
            var requestQuery = `SELECT  EvolveTravelReq.*,EvolveReason.EvolveReason_name , est.EvolveStatusCodeMstr_Code as currentStatus FROM EvolveStatusCodeMstr est  , EvolveTravelReq
        Left JOIN EvolveReason ON  EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id
        where EvolveUser_id =  ${id} AND EvolveTravelReq.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id ORDER BY  EvolveTravelReq.EvolveTravelReq_id DESC`
            var res = await Evolve.SqlPool.request().query(requestQuery);
            var result = res.recordset;

            for (let index = 0; index < result.length; index++) {
                const object = result[index];
                var data = {};
                data.request = object;

                var evolveTravelReqId = object.EvolveTravelReq_id;

                let userDetsils = await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id =" + evolveTravelReqId);

                data.request.userDetsils = userDetsils.recordset[0];
                data.status = [];
                data.approvalHistory  = [];

                var approvalStatusQuery = `SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND  eap.EvolveApprovalProcess_PrimaryID = ${evolveTravelReqId}`;
                var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);
                if (approvalStatus instanceof Error || approvalStatus.rowsAffected < 1) {


                    erorr = true;
                    errorMessage = "Error While Get Approval Process Details"


                } else {

                    data.EvolveApprovalProcess_ID = approvalStatus.recordset[0].EvolveApprovalProcess_ID
                    data.EvolveApprovalProcess_CurrentIndex = approvalStatus.recordset[0].EvolveApprovalProcess_CurrentIndex

                    
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(approvalStatus.recordset[0].EvolveApprovalMatrix_ID);
                    if (indexList instanceof Error) {

                        erorr = true;
                        errorMessage = "Error While Get Index List"


                    } else {
                        data.indexList = indexList.recordset;

                        if (indexList.rowsAffected > 0) {

                            for (let j = 0; j < indexList.recordset.length; j++) {
                                let ApproverDetails = "";
                                let approverList = [];

                                let getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if (getUserDetails instanceof Error) {

                                    error = true;
                                    errorMessage = "Error While Get Approvers User List"
                                } else {

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < data.EvolveApprovalProcess_CurrentIndex) {

                                        ApproverDetails = "APPROVED"


                                    } else {

                                        ApproverDetails = "TO BE APPROVED"

                                    }
                                    for (let k = 0; k < getUserDetails.recordset.length; k++) {

                                        approverList.push(getUserDetails.recordset[k])
                                    }
                                }

                                data.indexList[j].ApproverDetails = {} ;

                                data.indexList[j].ApproverDetails.status = ApproverDetails;
                                data.indexList[j].ApproverDetails.approverList = approverList;
                            }
                        }

                        data.status = data.indexList; 
                        var approvalHistory = `SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu      WHERE epd.EvolveApprovalProcessDetails_CreatedUser = eu.EvolveUser_ID  AND epd.EvolveApprovalProcess_ID = ${data.EvolveApprovalProcess_ID}  ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC`;//AND 
                        approvalHistory = await Evolve.SqlPool.request().query(approvalHistory);
                        
                        if (approvalHistory instanceof Error) {

                            erorr = true;
                            errorMessage = "Error While Approval History"



                        }else{
                            data.approvalHistory = approvalHistory.recordset ;
                        }
                    }

                    
                }




                var desQuery = `SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails
        Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id
         where EvolveTravelReq_id = ${evolveTravelReqId}`;
                var destinations = await Evolve.SqlPool.request().query(desQuery);
                data.destinations = destinations.recordset

                var hisQuery = `SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory
        LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
        WHERE EvolveTravelReq_id = ${evolveTravelReqId} ORDER BY EvolveTravelHistory_id desc`

                var history = await Evolve.SqlPool.request().query(hisQuery);
                data.history = history.recordset
                var medQuery = `SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = ${evolveTravelReqId} 
        ORDER BY EvolveTravelReq_id desc`
                var medical = await Evolve.SqlPool.request().query(medQuery);
                data.medical = medical.recordset

                if (data.medical.length != 0) {
                    for (let j = 0; j < data.medical.length; j++) {

                        let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)


                        for (let i = 0; i < medicalDetails.length; i++) {
                            var questionNAme = await Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = " + medicalDetails[i].EvolveMedQuests_id);
                            medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[0].EvolveMedQuests_Name;
                        }
                        data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

                    }

                }
                retData.push(data);
            }
            return retData;


        } catch (error) {
            Evolve.Log.error("  Error while get all travel request " + error);
            return new Error("  Error while get all travel request " + error);
        }
    },
    getTravelRequestDetailsById: async function (body) {
        var retData = [];
        try {
            var requestQuery = `SELECT  EvolveTravelReq.*,EvolveReason.EvolveReason_name , est.EvolveStatusCodeMstr_Code as currentStatus FROM EvolveStatusCodeMstr est  , EvolveTravelReq
        Left JOIN EvolveReason ON  EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id
        where EvolveTravelReq_id =  ${body.EvolveTravelReq_id} AND EvolveTravelReq.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id`
            var res = await Evolve.SqlPool.request().query(requestQuery);

            if (res.rowsAffected > 0) {
                var data = {};
                data.request = res.recordset[0];

                let userDetsils = await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id =" + body.EvolveTravelReq_id);

                data.request.userDetsils = userDetsils.recordset[0];

                data.status = [];
                data.approvalHistory  = [];

                var approvalStatusQuery = `SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND  eap.EvolveApprovalProcess_PrimaryID = ${evolveTravelReqId}`;
                var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);
                if (approvalStatus instanceof Error || approvalStatus.rowsAffected < 1) {


                    erorr = true;
                    errorMessage = "Error While Get Approval Process Details"


                } else {

                    data.EvolveApprovalProcess_ID = approvalStatus.recordset[0].EvolveApprovalProcess_ID
                    data.EvolveApprovalProcess_CurrentIndex = approvalStatus.recordset[0].EvolveApprovalProcess_CurrentIndex

                    
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(approvalStatus.recordset[0].EvolveApprovalMatrix_ID);
                    if (indexList instanceof Error) {

                        erorr = true;
                        errorMessage = "Error While Get Index List"


                    } else {
                        data.indexList = indexList.recordset;

                        if (indexList.rowsAffected > 0) {

                            for (let j = 0; j < indexList.recordset.length; j++) {
                                let ApproverDetails = "";
                                let approverList = [];

                                let getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if (getUserDetails instanceof Error) {

                                    error = true;
                                    errorMessage = "Error While Get Approvers User List"
                                } else {

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < data.EvolveApprovalProcess_CurrentIndex) {

                                        ApproverDetails = "APPROVED"


                                    } else {

                                        ApproverDetails = "TO BE APPROVED"

                                    }
                                    for (let k = 0; k < getUserDetails.recordset.length; k++) {

                                        approverList.push(getUserDetails.recordset[k])
                                    }
                                }

                                data.indexList[j].ApproverDetails = {} ;

                                data.indexList[j].ApproverDetails.status = ApproverDetails;
                                data.indexList[j].ApproverDetails.approverList = approverList;
                            }
                        }

                        data.status = data.indexList;                        
                        var approvalHistory = `SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu      WHERE epd.EvolveApprovalProcessDetails_CreatedUser = eu.EvolveUser_ID  AND epd.EvolveApprovalProcess_ID = ${data.EvolveApprovalProcess_ID}  ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC`;//AND 
                        approvalHistory = await Evolve.SqlPool.request().query(approvalHistory);
                        
                        if (approvalHistory instanceof Error) {

                            erorr = true;
                            errorMessage = "Error While Approval History"



                        }else{
                            data.approvalHistory = approvalHistory.recordset ;
                        }
                    }

                    
                }

        //         var approvalStatusQuery = `SELECT eu1.EvolveUser_Name as primary_name,eu1.EvolveUser_login as primary_login,
        // eu2.EvolveUser_Name as secondary_name,eu2.EvolveUser_login as secondary_login,
        // eu3.EvolveUser_Name as tertiary_name,eu3.EvolveUser_login as tertiary_login, 
        // approvedBy.EvolveUser_Name as approval_name,EvolveApprovalTrans.EvolveApproval_UpdatedAt,
        // EvolveApprovalTrans.EvolveApprovalStatus_comments,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code,EvolveReason.EvolveReason_name,
        // EvolveApproval.EvolveApproval_primaryUser_id, EvolveApproval.EvolveApproval_secondUser_id, EvolveApproval.EvolveApproval_tertiaryUser_id ,er.EvolveRole_Name
        //         FROM EvolveApprovalStatus            
        //         LEFT JOIN EvolveApprovalTrans ON EvolveApprovalStatus.EvolveApprovalStatus_id = EvolveApprovalTrans.EvolveApprovalStatus_id
        //         LEFT JOIN EvolveStatusCodeMstr ON EvolveApprovalTrans.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
        //         LEFT JOIN EvolveReason ON EvolveApprovalTrans.EvolveReason_id = EvolveReason.EvolveReason_id
        //         Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id
        //         Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id
        //         Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id
        //         Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id
        //         Left JOIN EvolveUser approvedBy ON approvedBy.EvolveUser_ID = EvolveApprovalTrans.EvolveUser_ID 
		// 		Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id
		// 		LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID
        //         where EvolveTravelReq_id = ${body.EvolveTravelReq_id} ORDER BY  EvolveApproval_UpdatedAt`;//AND EvolveApprovalStatus.EvolveStatus_id IS NULL
        //         var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);

        //         let nullIndex = [];

        //         data.status = approvalStatus.recordset;
        //         let finalArray = [];

        //         for (let i = 0; i < data.status.length; i++) {

        //             if (data.status[i].EvolveApproval_UpdatedAt == null) {

        //                 nullIndex.push(i);


        //             } else {

        //                 finalArray.push(data.status[i]);

        //             }
        //         }
        //         for (let i = 0; i < nullIndex.length; i++) {

        //             finalArray.push(data.status[i]);

        //         }
        //         data.status = finalArray;


                var desQuery = `SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails
        Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id
         where EvolveTravelReq_id = ${body.EvolveTravelReq_id}`;
                var destinations = await Evolve.SqlPool.request().query(desQuery);
                data.destinations = destinations.recordset

                var hisQuery = `SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory
        LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
        WHERE EvolveTravelReq_id = ${body.EvolveTravelReq_id} ORDER BY EvolveTravelHistory_id desc`

                var history = await Evolve.SqlPool.request().query(hisQuery);
                data.history = history.recordset
                var medQuery = `SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = ${body.EvolveTravelReq_id} 
        ORDER BY EvolveTravelReq_id desc`
                var medical = await Evolve.SqlPool.request().query(medQuery);
                data.medical = medical.recordset

                if (data.medical.length != 0) {
                    for (let j = 0; j < data.medical.length; j++) {

                        let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)


                        for (let i = 0; i < medicalDetails.length; i++) {
                            var questionNAme = await Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = " + medicalDetails[i].EvolveMedQuests_id);
                            medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[0].EvolveMedQuests_Name;
                        }
                        data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

                    }

                }
                retData.push(data);
            }
            return retData;


        } catch (error) {
            Evolve.Log.error("  Error while get  travel request details" + error);
            return new Error("  Error while get  travel request details" + error);
        }
    },

    // getAprovalTravelRequest: async function (EvolveUser_ID) {

    //     let id = EvolveUser_ID;
    //     var retData = [];
    //     try {

    //         // var requestQuery =`	SELECT EvolveTravelReq.*  ,  EvolveApprovalStatus.EvolveApprovalStatus_id , EvolveReason.EvolveReason_name FROM  EvolveReason ,  EvolveApprovalStatus 
    //         // JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
    //         // JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id = ${id}
    //         // OR EvolveApproval.EvolveApproval_secondUser_id =  ${id}
    //         // OR EvolveApproval.EvolveApproval_tertiaryUser_id = ${id})  
    //         // AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id   ORDER BY  EvolveTravelReq.EvolveTravelReq_id DESC `

    //         var requestQuery = `SELECT EvolveTravelReq.*  ,  EvolveApprovalStatus.EvolveApprovalStatus_id , EvolveReason.EvolveReason_name FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
    //         JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
    //         JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id = ${id}
    //         OR EvolveApproval.EvolveApproval_secondUser_id =  ${id}
    //         OR EvolveApproval.EvolveApproval_tertiaryUser_id = ${id})  
    //         AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' ORDER BY  EvolveTravelReq.EvolveTravelReq_id DESC`

    //         var res = await Evolve.SqlPool.request().query(requestQuery);
    //         var result = res.recordset;


    //         for (let index = 0; index < result.length; index++) {
    //             const object = result[index];
    //             var data = {};
    //             data.request = object;
    //             var evolveTravelReqId = object.EvolveTravelReq_id;

    //             let userDetsils = await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id =" + evolveTravelReqId);

    //             data.request.userDetsils = userDetsils.recordset[0];

    //             var approvalStatusQuery = `  SELECT eu1.EvolveUser_Name as primary_name,eu1.EvolveUser_login as primary_login,
    //         eu2.EvolveUser_Name as secondary_name,eu2.EvolveUser_login as secondary_login,
    //         eu3.EvolveUser_Name as tertiary_name,eu3.EvolveUser_login as tertiary_login, 
    //         approvedBy.EvolveUser_Name as approval_name,EvolveApprovalTrans.EvolveApproval_UpdatedAt,
    //         EvolveApprovalTrans.EvolveApprovalStatus_comments,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code,EvolveReason.EvolveReason_name,
    //         EvolveApproval.EvolveApproval_primaryUser_id, EvolveApproval.EvolveApproval_secondUser_id, EvolveApproval.EvolveApproval_tertiaryUser_id ,er.EvolveRole_Name
    //                 FROM EvolveApprovalStatus            
    //                 LEFT JOIN EvolveApprovalTrans ON EvolveApprovalStatus.EvolveApprovalStatus_id = EvolveApprovalTrans.EvolveApprovalStatus_id
    //                 LEFT JOIN EvolveStatusCodeMstr ON EvolveApprovalTrans.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id
    //                 LEFT JOIN EvolveReason ON EvolveApprovalTrans.EvolveReason_id = EvolveReason.EvolveReason_id
    //                 Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id
    //                 Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id
    //                 Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id
    //                 Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id
    //                 Left JOIN EvolveUser approvedBy ON approvedBy.EvolveUser_ID = EvolveApprovalTrans.EvolveUser_ID 
    //                 Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id
    //                 LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID
    //                 where EvolveTravelReq_id = ${evolveTravelReqId}  ORDER BY EvolveApprovalTrans_id DESC `;//AND EvolveApprovalStatus.EvolveStatus_id IS NULL

    //             var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);
    //             let nullIndex = [];

    //             data.status = approvalStatus.recordset;
    //             let finalArray = [];

    //             for (let i = 0; i < data.status.length; i++) {

    //                 if (data.status[i].EvolveApproval_UpdatedAt == null) {

    //                     nullIndex.push(i);


    //                 } else {

    //                     finalArray.push(data.status[i]);

    //                 }
    //             }
    //             for (let i = 0; i < nullIndex.length; i++) {

    //                 finalArray.push(data.status[i]);

    //             }
    //             data.status = finalArray;

    //             var desQuery = `SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails
    //         Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id
    //         where EvolveTravelReq_id = ${evolveTravelReqId}`;
    //             var destinations = await Evolve.SqlPool.request().query(desQuery);
    //             data.destinations = destinations.recordset

    //             var hisQuery = `SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory  LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id  WHERE EvolveTravelReq_id = ${evolveTravelReqId} ORDER BY EvolveTravelHistory_id desc`

    //             var history = await Evolve.SqlPool.request().query(hisQuery);
    //             data.history = history.recordset

    //             var medQuery = `SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = ${evolveTravelReqId} 
    //         ORDER BY EvolveTravelReq_id desc`
    //             var medical = await Evolve.SqlPool.request().query(medQuery);
    //             data.medical = medical.recordset

    //             if (data.medical.length != 0) {
    //                 for (let j = 0; j < data.medical.length; j++) {
    //                     let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)
    //                     for (let i = 0; i < medicalDetails.length; i++) {
    //                         var questionNAme = await Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = " + medicalDetails[i].EvolveMedQuests_id);
    //                         medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[j].EvolveMedQuests_Name;
    //                     }
    //                     data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

    //                 }
    //             }
    //             retData.push(data);
    //         }
    //         return retData;
    //     } catch (error) {
    //         Evolve.Log.error("  Error while get all travel request " + error.message);
    //         return new Error("  Error while get all travel request " + error.message);
    //     }
    // },

    getAprovalTravelRequest: async function (EvolveUser_ID) {

        try {
            let retData = [];
        
            let requestQuery = `SELECT etr.*  , EvolveReason.EvolveReason_name , eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq , eapi.EvolveApprovalMatrixIndex_ID ,  eapi.EvolveApprovalMatrixIndex_Seq FROM  EvolveStatusCodeMstr estcm , EvolveReason , EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd , EvolveTravelReq etr WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID   AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcess_CurrentIndex AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID' AND EvolveApprovalMatrixDetails_Value=${EvolveUser_ID} AND (eap.EvolveApprovalProcess_Status = 'PROCESS' OR eap.EvolveApprovalProcess_Status = 'SENDBACK' ) AND  eap.EvolveApprovalProcess_IsOnGroundLevel != 1 AND etr.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = etr.EvolveTravelReq_TripStatusID AND  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' AND  etr.EvolveTravelReq_id = eap.EvolveApprovalProcess_PrimaryID`

            let res = await Evolve.SqlPool.request().query(requestQuery);
            let result = res.recordset;


            for (let index = 0; index < result.length; index++) {
                const object = result[index];
                var data = {};
                data.request = object;
                var evolveTravelReqId = object.EvolveTravelReq_id;

                let userDetsils = await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id =" + evolveTravelReqId);

                data.request.userDetsils = userDetsils.recordset[0];
                data.status = [];
                data.approvalHistory  = [];

                var approvalStatusQuery = `SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND  eap.EvolveApprovalProcess_PrimaryID = ${evolveTravelReqId}`;
                var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);
                if (approvalStatus instanceof Error || approvalStatus.rowsAffected < 1) {


                    erorr = true;
                    errorMessage = "Error While Get Approval Process Details"


                } else {

                    data.EvolveApprovalProcess_ID = approvalStatus.recordset[0].EvolveApprovalProcess_ID
                    data.EvolveApprovalProcess_CurrentIndex = approvalStatus.recordset[0].EvolveApprovalProcess_CurrentIndex

                    
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(approvalStatus.recordset[0].EvolveApprovalMatrix_ID);
                    if (indexList instanceof Error) {

                        erorr = true;
                        errorMessage = "Error While Get Index List"


                    } else {
                        data.indexList = indexList.recordset;

                        if (indexList.rowsAffected > 0) {

                            for (let j = 0; j < indexList.recordset.length; j++) {
                                let ApproverDetails = "";
                                let approverList = [];

                                let getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if (getUserDetails instanceof Error) {

                                    error = true;
                                    errorMessage = "Error While Get Approvers User List"
                                } else {

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < data.EvolveApprovalProcess_CurrentIndex) {

                                        ApproverDetails = "APPROVED"


                                    } else {

                                        ApproverDetails = "TO BE APPROVED"

                                    }
                                    for (let k = 0; k < getUserDetails.recordset.length; k++) {

                                        approverList.push(getUserDetails.recordset[k])
                                    }
                                }

                                data.indexList[j].ApproverDetails = {} ;

                                data.indexList[j].ApproverDetails.status = ApproverDetails;
                                data.indexList[j].ApproverDetails.approverList = approverList;
                            }
                        }

                        data.status = data.indexList;                        
                        var approvalHistory = `SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu      WHERE epd.EvolveApprovalProcessDetails_CreatedUser = eu.EvolveUser_ID  AND epd.EvolveApprovalProcess_ID = ${data.EvolveApprovalProcess_ID}  ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC`;//AND 
                        approvalHistory = await Evolve.SqlPool.request().query(approvalHistory);
                        
                        if (approvalHistory instanceof Error) {

                            erorr = true;
                            errorMessage = "Error While Approval History"



                        }else{
                            data.approvalHistory = approvalHistory.recordset ;
                        }
                    }

                    
                }

                var desQuery = `SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails
            Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id
            where EvolveTravelReq_id = ${evolveTravelReqId}`;
                var destinations = await Evolve.SqlPool.request().query(desQuery);
                data.destinations = destinations.recordset

                var hisQuery = `SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory  LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id  WHERE EvolveTravelReq_id = ${evolveTravelReqId} ORDER BY EvolveTravelHistory_id desc`

                var history = await Evolve.SqlPool.request().query(hisQuery);
                data.history = history.recordset

                var medQuery = `SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = ${evolveTravelReqId} 
            ORDER BY EvolveTravelReq_id desc`
                var medical = await Evolve.SqlPool.request().query(medQuery);
                data.medical = medical.recordset

                if (data.medical.length != 0) {
                    for (let j = 0; j < data.medical.length; j++) {
                        let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)
                        for (let i = 0; i < medicalDetails.length; i++) {
                            var questionNAme = await Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = " + medicalDetails[i].EvolveMedQuests_id);
                            medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[j].EvolveMedQuests_Name;
                        }
                        data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

                    }
                }
                retData.push(data);
            }
            return retData;
        } catch (error) {
            Evolve.Log.error("  Error while get all travel request " + error.message);
            return new Error("  Error while get all travel request " + error.message);
        }
    },

    deleteTravelRequest: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTravelReq_id', data.id)
                .query('DELETE FROM  EvolveTravelReq WHERE EvolveTravelReq_id = @EvolveTravelReq_id');
        } catch (error) {
            Evolve.Log.error("  Error while delete travel request" + error.message);
            return new Error("  Error while delete travel request" + error.message);
        }
    },
  

    getStartTripStatusId: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type='TRIP' AND EvolveStatusCodeMstr_Code='NOT STARTED'");
        } catch (error) {
            Evolve.Log.error("Error while get trip travel status" + error.message);
            return new Error("Error while get trip travel status" + error.message);
        }
    },
    getTravelStatus: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTravelReq_id', data.EvolveTravelReq_id)
                .query("  SELECT (SELECT COUNT(EvolveApprovalStatus_id)+1  FROM EvolveApprovalStatus WHERE EvolveTravelReq_id=@EvolveTravelReq_id ) as 'approvalCount' , (SELECT estatus.EvolveStatusCodeMstr_Code FROM  EvolveStatusCodeMstr estatus  WHERE etr.EvolveTRavelReq_MedicStatusId = estatus.EvolveStatusCodeMstr_Id ) as medicalStatus ,     etr.EvolveTRavelReq_MedicStatusId ,etr.EvolveTRavelReq_MedicComments , etr.EvolveTravelReq_QuarDays  , etr.EvolveTRavelReq_currApvlSeq ,est.EvolveStatusCodeMstr_Code  FROM  EvolveStatusCodeMstr est ,  EvolveTravelReq etr    WHERE  etr.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id AND etr.EvolveTravelReq_id = @EvolveTravelReq_id ");
        } catch (error) {
            Evolve.Log.error("Error while get travel status" + error.message);
            return new Error("Error while get travel status" + error.message);
        }
    },
    checkUserRole: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  er.EvolveRole_Name FROM   EvolveUser eu  , EvolveUserRoleLink eur , EvolveRole er  WHERE eur.EvolveUser_ID = eu.EvolveUser_ID  AND eur.EvolveRole_ID = er.EvolveRole_ID AND eu.EvolveUser_ID =" + EvolveUser_ID);
        } catch (error) {
            Evolve.Log.error("Error while get trip travel status" + error.message);
            return new Error("Error while get trip travel status" + error.message);
        }
    },
    getCompletedTrips: async function () {
        try {
            let retData = []
            let completedTrips = await await Evolve.SqlPool.request()
                .query("SELECT etr.* , eu.EvolveUser_Name   , er.EvolveReason_name  FROM  EvolveTravelReq etr ,  EvolveStatusCodeMstr est , EvolveUser eu , EvolveReason er WHERE etr.EvolveUser_id = eu.EvolveUser_ID   AND etr.EvolveReason_id = er.EvolveReason_ID AND   est.EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND est.EvolveStatusCodeMstr_Code = 'ON REVIEW' AND etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id");

            let result = completedTrips.recordset;
            for (let i = 0; i < result.length; i++) {
                const object = result[i];
                var data = {};
                data.request = object

                let EvolveTravelReq_id = data.request.EvolveTravelReq_id

                let userDetsils = await Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id =" + EvolveTravelReq_id);

                data.request.userDetsils = userDetsils.recordset[0];
                data.status = [];
                data.approvalHistory  = [];

                var approvalStatusQuery = `SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND  eap.EvolveApprovalProcess_PrimaryID = ${EvolveTravelReq_id}`;
                var approvalStatus = await Evolve.SqlPool.request().query(approvalStatusQuery);
                if (approvalStatus instanceof Error || approvalStatus.rowsAffected < 1) {


                    erorr = true;
                    errorMessage = "Error While Get Approval Process Details"


                } else {

                    data.EvolveApprovalProcess_ID = approvalStatus.recordset[0].EvolveApprovalProcess_ID
                    data.EvolveApprovalProcess_CurrentIndex = approvalStatus.recordset[0].EvolveApprovalProcess_CurrentIndex

                    
                    let indexList = await Evolve.App.Services.eDoa.MyApproval.SrvList.getMatrixIndexList(approvalStatus.recordset[0].EvolveApprovalMatrix_ID);
                    if (indexList instanceof Error) {

                        erorr = true;
                        errorMessage = "Error While Get Index List"


                    } else {
                        data.indexList = indexList.recordset;

                        if (indexList.rowsAffected > 0) {

                            for (let j = 0; j < indexList.recordset.length; j++) {
                                let ApproverDetails = "";
                                let approverList = [];

                                let getUserDetails = await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(indexList.recordset[j].EvolveApprovalMatrixIndex_ID)
                                if (getUserDetails instanceof Error) {

                                    error = true;
                                    errorMessage = "Error While Get Approvers User List"
                                } else {

                                    if (indexList.recordset[j].EvolveApprovalMatrixIndex_Seq < data.EvolveApprovalProcess_CurrentIndex) {

                                        ApproverDetails = "APPROVED"


                                    } else {

                                        ApproverDetails = "TO BE APPROVED"

                                    }
                                    for (let k = 0; k < getUserDetails.recordset.length; k++) {

                                        approverList.push(getUserDetails.recordset[k])
                                    }
                                }

                                data.indexList[j].ApproverDetails = {} ;

                                data.indexList[j].ApproverDetails.status = ApproverDetails;
                                data.indexList[j].ApproverDetails.approverList = approverList;
                            }
                        }

                        data.status = data.indexList;                        
                        var approvalHistory = `SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu      WHERE epd.EvolveApprovalProcessDetails_CreatedUser = eu.EvolveUser_ID  AND epd.EvolveApprovalProcess_ID = ${data.EvolveApprovalProcess_ID}  ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC`;//AND 
                        approvalHistory = await Evolve.SqlPool.request().query(approvalHistory);
                        
                        if (approvalHistory instanceof Error) {

                            erorr = true;
                            errorMessage = "Error While Approval History"



                        }else{
                            data.approvalHistory = approvalHistory.recordset ;
                        }
                    }

                    
                }
                let reqDetsils = await Evolve.SqlPool.request()
                    .query("SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails	Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id where EvolveTravelReq_id = " + EvolveTravelReq_id);
                data.destinations = reqDetsils.recordset


                let hisQuery = await Evolve.SqlPool.request()
                    .query("SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory	LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id	WHERE EvolveTravelReq_id = " + EvolveTravelReq_id + "  ORDER BY EvolveTravelHistory_id desc");

                data.history = hisQuery.recordset

                var medQuery = "SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = " + EvolveTravelReq_id + "  ORDER BY EvolveTravelReq_id desc"
                var medical = await Evolve.SqlPool.request().query(medQuery);
                data.medical = medical.recordset

                if (data.medical.length != 0) {
                    for (let j = 0; j < data.medical.length; j++) {

                        let medicalDetails = JSON.parse(data.medical[j].EvolveTravelReqMedDetails_MedDetails)


                        for (let i = 0; i < medicalDetails.length; i++) {
                            var questionNAme = await Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = " + medicalDetails[i].EvolveMedQuests_id);
                            medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[0].EvolveMedQuests_Name;
                        }
                        data.medical[j].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)

                    }

                }
                retData.push(data);
            }
            return retData;

        } catch (error) {
            Evolve.Log.error(" Error while get completed travel trips " + error.message);
            return new Error(" Error while get completed travel trips " + error.message);
        }
    },
    matchReqeDtails: async function (data) {
        try {
            let query = "  SELECT  EvolveTravelReq_id  FROM  EvolveTravelReq  WHERE  EvolveTravelReq_id= @EvolveTravelReq_id " + data.queryStr

            return await Evolve.SqlPool.request()
                .input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
                .query(query);
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Approval Matrix to Travel Request " + error.message);
            return new Error(" EERR####: Error While Approval Matrix to Travel Request " + error.message);
        }
    },
    checkApprovalProcess: async function (data) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_PrimaryID', Evolve.Sql.Int, data.EvolveTravelReq_id)

                .query("SELECT  eap.* , eapm.EvolveApprovalMatrix_Type FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_PrimaryID AND  eapm.EvolveApprovalMatrix_Type = 'TRAVELREQUEST'");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check Approval Process " + error.message);
            return new Error(" EERR####: Error while check Approval Process " + error.message);
        }
    },
    updateApprovalProcessSeq: async function (data) {
        try {

            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();


            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, 2)
                .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolveApprovalProcess_ErrorCode', Evolve.Sql.NVarChar, '')
                .input('EvolveApprovalProcess_ErrorDetails', Evolve.Sql.NVarChar, '')
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_ID)
                .input('EvolveApprovalProcess_IsOnGroundLevel', Evolve.Sql.Int, 0)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_CurrentIndex = @EvolveApprovalProcess_CurrentIndex ,EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_ErrorCode=@EvolveApprovalProcess_ErrorCode ,EvolveApprovalProcess_ErrorDetails=@EvolveApprovalProcess_ErrorDetails, EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID ,EvolveApprovalProcess_IsOnGroundLevel=@EvolveApprovalProcess_IsOnGroundLevel , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt ,EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update approval process seq " + error.message);
            return new Error(" EERR####: Error while update approval process seq " + error.message);
        }
    },
    addApprovalProcessetails: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Status)
                .input('EvolveApprovalProcessDetails_Remarks', Evolve.Sql.NVarChar, '')

                .input('EvolveApprovalProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveApprovalProcessDetails (EvolveApprovalProcess_ID, EvolveUser_ID, EvolveApprovalProcessDetails_Status  ,EvolveApprovalProcessDetails_Remarks,EvolveApprovalProcessDetails_CreatedAt, EvolveApprovalProcessDetails_CreatedUser, EvolveApprovalProcessDetails_UpdatedAt, EvolveApprovalProcessDetails_UpdatedUser) VALUES (@EvolveApprovalProcess_ID, @EvolveUser_ID, @EvolveApprovalProcessDetails_Status,@EvolveApprovalProcessDetails_Remarks,@EvolveApprovalProcessDetails_CreatedAt, @EvolveApprovalProcessDetails_CreatedUser, @EvolveApprovalProcessDetails_UpdatedAt, @EvolveApprovalProcessDetails_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add approval process details " + error.message);
            return new Error(" EERR####: Error while add approval process details " + error.message);
        }
    },
    submitToApprovelProcess: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
                .input('EvolveApprovalProcess_PrimaryID', Evolve.Sql.Int, data.EvolveTravelReq_id)
                .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolveApprovalProcess_ErrorCode', Evolve.Sql.NVarChar, '')
                .input('EvolveApprovalProcess_ErrorDetails', Evolve.Sql.NVarChar, '')

                .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, 2)
                .input('EvolveApprovalProcess_IsOnGroundLevel', Evolve.Sql.Int, 0)


                .input('EvolveApprovalProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' INSERT INTO EvolveApprovalProcess (EvolveApprovalMatrix_ID, EvolveApprovalProcess_PrimaryID, EvolveApprovalProcess_Status ,EvolveApprovalProcess_ErrorCode,EvolveApprovalProcess_ErrorDetails, EvolveApprovalProcess_CurrentIndex,EvolveApprovalProcess_IsOnGroundLevel ,EvolveApprovalProcess_CreatedAt, EvolveApprovalProcess_CreatedUser, EvolveApprovalProcess_UpdatedAt, EvolveApprovalProcess_UpdatedUser ) VALUES (@EvolveApprovalMatrix_ID, @EvolveApprovalProcess_PrimaryID, @EvolveApprovalProcess_Status ,@EvolveApprovalProcess_ErrorCode , @EvolveApprovalProcess_ErrorDetails , @EvolveApprovalProcess_CurrentIndex ,@EvolveApprovalProcess_IsOnGroundLevel , @EvolveApprovalProcess_CreatedAt,@EvolveApprovalProcess_CreatedUser,@EvolveApprovalProcess_UpdatedAt, @EvolveApprovalProcess_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\' ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while sales quote submit to approvel process " + error.message);
            return new Error(" EERR####: Error while sales quote submit to approvel process " + error.message);
        }
    },
    deleteTravelReq: async function (data) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)

                .query(" DELETE  FROM  EvolveTravelReq WHERE EvolveTravelReq_id = @EvolveTravelReq_id");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete travel request " + error.message);
            return new Error(" EERR####: Error while delete travel request " + error.message);
        }
    },

}

