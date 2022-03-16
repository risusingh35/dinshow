'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	addTravelStatusTrans : async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
	
			return await Evolve.SqlPool.request()
			  .input('EvolveApprovalStatus_id', Evolve.Sql.Int, data.EvolveApprovalStatus_id)
			  .input('EvolveReason_id', Evolve.Sql.Int, data.EvolveReason_ID)
			  .input('EvolveStatus_id', Evolve.Sql.Int, data.EvolveStatus_id)
			  .input('EvolveApprovalStatus_comments', Evolve.Sql.NVarChar, data.EvolveApprovalStatus_comments)
			  .input('EvolveApproval_CreatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveApproval_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .input('EvolveApproval_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveApproval_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .input('EvolveUser_id', Evolve.Sql.Int, data.EvolveUser_ID)

				.query('INSERT INTO EvolveApprovalTrans (  EvolveApprovalStatus_id,EvolveReason_id , EvolveStatus_id,EvolveApprovalStatus_comments, EvolveApproval_CreatedAt ,EvolveApproval_CreatedUser , EvolveApproval_UpdatedAt , EvolveApproval_UpdatedUser ,EvolveUser_id )  VALUES ( @EvolveApprovalStatus_id,@EvolveReason_id ,@EvolveStatus_id, @EvolveApprovalStatus_comments , @EvolveApproval_CreatedAt ,@EvolveApproval_CreatedUser , @EvolveApproval_UpdatedAt , @EvolveApproval_UpdatedUser ,@EvolveUser_id) ;');
		} catch (error) {
			Evolve.Log.error("  Error while add Request "+error.message);
			return new Error("  Error while add Request "+error.message);
		}
    },
    checkTravelApprovedStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.query("SELECT  (SELECT COUNT(EvolveApprovalStatus_id)+1  FROM EvolveApprovalStatus WHERE EvolveTravelReq_id=@EvolveTravelReq_id ) as 'approvalCount' , etr.EvolveTRavelReq_currApvlSeq FROM  EvolveTravelReq etr WHERE EvolveTravelReq_id = @EvolveTravelReq_id");
	
		} catch (error) {
			Evolve.Log.error(" Error while check approval status "+error.message);
			return new Error(" Error while check approval status "+error.message);
		}
	},
    getStatusCodeForStartTrip: async function (data) {
		try {
            return await Evolve.SqlPool.request()
				.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'TRIP' AND  EvolveStatusCodeMstr_Code = 'IN TRANSIT'");
		} catch (error) {
			Evolve.Log.error(" Error while delete Travel Mode "+error.message);
			return new Error(" Error while delete Travel Mode "+error.message);
		}
	},
	updateTravelReqStatus: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveTravelReq_TripStatusID)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveTravelReq SET EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID , EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt , EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser WHERE EvolveTravelReq_id=@EvolveTravelReq_id  ");
        } catch (error) {
            Evolve.Log.error(" Error while update travel request status " + error.message);
            return new Error(" Error while update travel request status " + error.message);
        }
	},
	checkStatus: async function (EvolveStatus_id) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, EvolveStatus_id)
			
                .query(" SELECT   * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Id = @EvolveStatusCodeMstr_Id ");
        } catch (error) {
            Evolve.Log.error(" Error while check status " + error.message);
            return new Error(" Error while check status " + error.message);
        }
	},
	updateTravelReq: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			if(data.status == 'CLOSED'){
				return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTRavelReq_currApvlSeq', Evolve.Sql.Int, data.seq)
			.input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveStatus_id)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveTravelReq SET  EvolveTRavelReq_currApvlSeq = EvolveTRavelReq_currApvlSeq+@EvolveTRavelReq_currApvlSeq ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt ,EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser ,EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID WHERE EvolveTravelReq_id=@EvolveTravelReq_id ");

			}else{
				return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTRavelReq_currApvlSeq', Evolve.Sql.Int, data.seq)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveTravelReq SET  EvolveTRavelReq_currApvlSeq = EvolveTRavelReq_currApvlSeq+@EvolveTRavelReq_currApvlSeq ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt ,EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser  WHERE EvolveTravelReq_id=@EvolveTravelReq_id ");
			}
        } catch (error) {
            Evolve.Log.error(" Error while update travel request details " + error.message);
            return new Error(" Error while update travel request details " + error.message);
        }
	},
	checkTripCurrentStatus: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			
                .query("  SELECT estc.*	FROM EvolveTravelReq etr , EvolveStatusCodeMstr estc	WHERE  etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id AND etr.EvolveTravelReq_id = @EvolveTravelReq_id");
        } catch (error) {
            Evolve.Log.error(" Error while check status " + error.message);
            return new Error(" Error while check status " + error.message);
        }
	},
	getCancelTripStatusId: async function () {
        try {
			return await Evolve.SqlPool.request()
                .query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'TRIP' AND  EvolveStatusCodeMstr_Code = 'CANCELLED'");
        } catch (error) {
            Evolve.Log.error(" Error while get cancel trip status id " + error.message);
            return new Error(" Error while get cancel trip status id " + error.message);
        }
	},
	cancelTravelTrip: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveTravelReq_TripStatusID)
			.query("UPDATE EvolveTravelReq SET EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt ,EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser  WHERE EvolveTravelReq_id=@EvolveTravelReq_id  ");
        } catch (error) {
            Evolve.Log.error(" Error while cancel trip " + error.message);
            return new Error(" Error while cancel trip " + error.message);
        }
	},
	getReasonListByType: async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveReason_Type', Evolve.Sql.NVarChar, data.EvolveReason_Type)
			.query("SELECT * FROM EvolveReason WHERE EvolveReason_Type =@EvolveReason_Type");
	
		} catch (error) {
			Evolve.Log.error(" Error while get all request "+error.message);
			return new Error(" Error while get all request "+error.message);
		}
	},
	getStatusId: async function (data) {
		try {
			let type = ''
			if(data.status == 'CLOSED'){
				type = 'TRIP'
			}else{
				type = 'APPROVAL'
			}
			return await Evolve.SqlPool.request()
			.input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.status.trim())
			.input('EvolveStatusCodeMstr_Type', Evolve.Sql.NVarChar, type.trim())

			.query("SELECT * FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code =@EvolveStatusCodeMstr_Code AND EvolveStatusCodeMstr_Type = @EvolveStatusCodeMstr_Type");
	
		} catch (error) {
			Evolve.Log.error(" Error while get all request "+error.message);
			return new Error(" Error while get all request "+error.message);
		}
	},
	getCompeteTripStatusId: async function () {
        try {
			let details ={};
			let Tripstatus =  await Evolve.SqlPool.request()
				.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'TRIP' AND  EvolveStatusCodeMstr_Code = 'COMPLETED'");

			details.tripStatusId = null
			details.tripStatusId = Tripstatus.recordset[0].EvolveStatusCodeMstr_Id				
			let medicStatus =  await Evolve.SqlPool.request()
				.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND  EvolveStatusCodeMstr_Code = 'ON REVIEW'");	
			details.medicStatusId = null
			details.medicStatusId = medicStatus.recordset[0].EvolveStatusCodeMstr_Id
			return details

        } catch (error) {
            Evolve.Log.error(" Error while get comlete trip status id " + error.message);
            return new Error(" Error while get comlete trip status id " + error.message);
        }
	},
	completeTravelTrip: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, data.EvolveTravelReq_TripStatusID)
			.input('EvolveTRavelReq_MedicStatusId', Evolve.Sql.Int, data.EvolveTRavelReq_MedicStatusId)

			.query("UPDATE EvolveTravelReq SET EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID ,EvolveTRavelReq_MedicStatusId=@EvolveTRavelReq_MedicStatusId ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt ,EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser  WHERE EvolveTravelReq_id=@EvolveTravelReq_id  ");
        } catch (error) {
            Evolve.Log.error(" Error while cancel trip " + error.message);
            return new Error(" Error while cancel trip " + error.message);
        }
	},


	getCompletedTrips: async function () {
        try {
			
			let retData =[]
			let completedTrips   =  await await Evolve.SqlPool.request()
			.query("SELECT etr.* , eu.EvolveUser_Name   , er.EvolveReason_Name  FROM  EvolveTravelReq etr ,  EvolveStatusCodeMstr est , EvolveUser eu , EvolveReason er WHERE etr.EvolveUser_id = eu.EvolveUser_ID   AND etr.EvolveReason_id = er.EvolveReason_ID AND   est.EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND est.EvolveStatusCodeMstr_Code = 'ON REVIEW' AND etr.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id ");

			let result = completedTrips.recordset;
			for (let i = 0; i < result.length; i++) {
				const object = result[i];
				var data = {};
				data.request = object

				let EvolveTravelReq_id = data.request.EvolveTravelReq_id

				let userDetsils = await  Evolve.SqlPool.request().query("SELECT eu.EvolveUser_Name , etr.EvolveTravelReq_CreatedAt  FROM EvolveUser eu   ,EvolveTravelReq etr WHERE eu.EvolveUser_ID = etr.EvolveTravelReq_CreatedUser AND etr.EvolveTravelReq_id ="+EvolveTravelReq_id);

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

				// var approvalStatusQuery =  await Evolve.SqlPool.request()
				// .query("SELECT eu1.EvolveUser_Name as primary_name,eu1.EvolveUser_login as primary_login,	eu2.EvolveUser_Name as secondary_name,eu2.EvolveUser_login as secondary_login,eu3.EvolveUser_Name as tertiary_name,eu3.EvolveUser_login as tertiary_login, approvedBy.EvolveUser_Name as approval_name,EvolveApprovalTrans.EvolveApproval_UpdatedAt,EvolveApprovalTrans.EvolveApprovalStatus_comments,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code,EvolveReason.EvolveReason_name,EvolveApproval.EvolveApproval_primaryUser_id, EvolveApproval.EvolveApproval_secondUser_id, EvolveApproval.EvolveApproval_tertiaryUser_id ,er.EvolveRole_Name FROM EvolveApprovalStatus 	LEFT JOIN EvolveApprovalTrans ON EvolveApprovalStatus.EvolveApprovalStatus_id = EvolveApprovalTrans.EvolveApprovalStatus_id	LEFT JOIN EvolveStatusCodeMstr ON EvolveApprovalTrans.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id LEFT JOIN EvolveReason ON EvolveApprovalTrans.EvolveReason_id = EvolveReason.EvolveReason_id Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id	Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id	Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id	Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id	Left JOIN EvolveUser approvedBy ON approvedBy.EvolveUser_ID = EvolveApprovalTrans.EvolveUser_ID 	Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id	LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID where EvolveTravelReq_id ="+EvolveTravelReq_id)

				// data.status = approvalStatusQuery.recordset;

				let reqDetsils   =  await Evolve.SqlPool.request()
				.query("SELECT EvolveTravelReqDetails.*,EvolveTravelModes.EvolveTravelModes_name FROM EvolveTravelReqDetails	Left JOIN EvolveTravelModes ON EvolveTravelModes.EvolveTravelModes_id = EvolveTravelReqDetails.EvolveTravelModes_id where EvolveTravelReq_id = "+EvolveTravelReq_id);
				data.destinations = reqDetsils.recordset

				
				let hisQuery   =  await Evolve.SqlPool.request()
				.query("SELECT EvolveTravelHistory.*,EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code FROM EvolveTravelHistory	LEFT JOIN EvolveStatusCodeMstr ON EvolveTravelHistory.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id	WHERE EvolveTravelReq_id = "+EvolveTravelReq_id+"  ORDER BY EvolveTravelHistory_id desc");

				data.history = hisQuery.recordset

				let medQuery   =  await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = "+EvolveTravelReq_id);
				data.medical = medQuery.recordset
				if( data.medical.length != 0){

					let medicalDetails = JSON.parse(data.medical[0].EvolveTravelReqMedDetails_MedDetails)
					
				  for(let i =0 ; i<medicalDetails.length ; i++){
					  var questionNAme = await  Evolve.SqlPool.request().query("SELECT  * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = "+medicalDetails[i].EvolveMedQuests_id);
					  medicalDetails[i].EvolveMedQuests_Name = questionNAme.recordset[0].EvolveMedQuests_Name;
				  }
					 data.medical[0].EvolveTravelReqMedDetails_MedDetails = JSON.stringify(medicalDetails)
		  
				  }
				  retData.push(data);
			}
			return retData;

        } catch (error) {
            Evolve.Log.error(" Error while get completed travel trips " + error.message);
            return new Error(" Error while get completed travel trips " + error.message);
        }
	},

	approvedByMe: async function (EvolveUser_ID) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
			.query("  SELECT  DISTINCT etr.EvolveStatus_id , etr.EvolveApprovalStatus_id , etr.EvolveUser_id  FROM  EvolveApprovalTrans etr , EvolveStatusCodeMstr est	WHERE etr.EvolveUser_id =  @EvolveUser_ID  AND etr.EvolveStatus_id = est.EvolveStatusCodeMstr_Id AND est.EvolveStatusCodeMstr_Code = 'APPROVED' AND est.EvolveStatusCodeMstr_Type = 'APPROVAL'");
        } catch (error) {
            Evolve.Log.error(" Error while get approved my me count " + error.message);
            return new Error(" Error while get approved my me count " + error.message);
        }
	},

	getMyApprovalTrans: async function (data) {
        try {

			let query  = "SELECT  DISTINCT  COUNT(eapd.EvolveApprovalProcessDetails_ID) as count FROM  EvolveApprovalProcessDetails  eapd , EvolveApprovalProcess eap , EvolveApprovalMatrix eam WHERE eap.EvolveApprovalProcess_ID = eap.EvolveApprovalProcess_ID AND eap.EvolveApprovalMatrix_ID = eam.EvolveApprovalMatrix_ID  AND eam.EvolveApprovalMatrix_Type = 'TRAVELREQUEST' AND eapd.EvolveApprovalProcessDetails_Status = @EvolveApprovalProcessDetails_Status" ;

			if(data.EvolveUser_ID != '' || data.EvolveUser_ID != undefined || data.EvolveUser_ID != null ){

				query += " AND  eapd.EvolveUser_ID =@EvolveUser_ID"
			}
			
	
			if(data.days = "week"){
				query += " AND eapd.EvolveApprovalProcessDetails_UpdatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND eapd.EvolveApprovalProcessDetails_UpdatedAt < DATEADD(week,datediff(week,0,getdate()),0)"

			}else if(data.days = "month"){
				query += " AND DATEPART(m, eapd.EvolveApprovalProcessDetails_UpdatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, eapd.EvolveApprovalProcessDetails_UpdatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate()))"


			}else if(data.days = "year"){
				query += " AND YEAR(eapd.EvolveApprovalProcessDetails_UpdatedAt) = YEAR(GETDATE()) - 1 "


			}else if(ata.days = "today"){


				query += " AND DAY(eapd.EvolveApprovalProcessDetails_UpdatedAt) = DAY(GETDATE())"

			
			}	
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			.input('EvolveApprovalProcessDetails_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Status)


			.query(query);
        } catch (error) {
            Evolve.Log.error(" Error while get my approval transaction dashboar details " + error.message);
            return new Error(" Error while get my approval transaction dashboar details " + error.message);
        }
	},


	

	travelReqRaised: async function (data) {
        try {

			let query  = "SELECT COUNT(EvolveTravelReq_id) as count FROM  EvolveTravelReq WHERE "

			if(data.days = "week"){
				query += " EvolveTravelReq_CreatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND EvolveTravelReq_CreatedAt < DATEADD(week,datediff(week,0,getdate()),0)"

			}else if(data.days = "month"){
				query += "  DATEPART(m, EvolveTravelReq_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, EvolveTravelReq_CreatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate()))"


			}else if(data.days = "year"){
				query += " YEAR(EvolveTravelReq_CreatedAt) = YEAR(GETDATE()) - 1 "


			}else if(data.days = "today"){

				query += " DAY(EvolveTravelReq_CreatedAt) = DAY(GETDATE())  "


			}

			return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" Error while get my approval transaction dashboar details " + error.message);
            return new Error(" Error while get my approval transaction dashboar details " + error.message);
        }
	},

	
	underMedicReview: async function (data) {
        try {

			let query  = " SELECT COUNT(etr.EvolveTravelReq_id) as count FROM  EvolveTravelReq etr ,  EvolveStatusCodeMstr est WHERE est.EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND est.EvolveStatusCodeMstr_Code = 'ON REVIEW' AND etr.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id "

			if(data.days = "week"){
				query += " AND etr.EvolveTravelReq_UpdatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND etr.EvolveTravelReq_UpdatedAt < DATEADD(week,datediff(week,0,getdate()),0)"

			}else if(data.days = "month"){
				query += " AND  DATEPART(m, etr.EvolveTravelReq_UpdatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, etr.EvolveTravelReq_UpdatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate()))"

			}else if(data.days = "3days"){

				query += " AND  etr.EvolveTravelReq_UpdatedAt >= DATEADD(day,-3, GETDATE())"


			}

			return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" Error while get medic approval count  " + error.message);
            return new Error(" Error while get medic approval count  " + error.message);
        }
	},


	reqWaitingForMyApproval: async function (data) {
 

        try {
            let query  ;

			query =  "SELECT  COUNT(eap.EvolveApprovalProcess_ID) as count FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd  ,  EvolveUser eu  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID    AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcess_CurrentIndex   AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID'   AND  eap.EvolveApprovalProcess_IsOnGroundLevel != 1 AND eu.EvolveUser_ID  =  eapmd.EvolveApprovalMatrixDetails_Value  AND eu.EvolveUser_ID = @EvolveUser_ID AND eapm.EvolveApprovalMatrix_Type = 'TRAVELREQUEST'"
			 if(data.days == '3days'){

				query += " AND  eap.EvolveApprovalProcess_UpdatedAt >= DATEADD(day,-3, GETDATE())"

			}else if(data.days == 'week'){

				query += " AND  eap.EvolveApprovalProcess_UpdatedAt >= DATEADD(day,-7, GETDATE())"


			}else if(data.days == 'month'){

				query += " AND  eap.EvolveApprovalProcess_UpdatedAt >= DATEADD(day,-30, GETDATE())"


			}
            return await Evolve.SqlPool.request()
            .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)

            .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get req which  waiting for my  approval "+error.message);
            return new Error(" EERR####: Error while get req which  waiting for my  approval "+error.message);
        }
    },

	
	rejectedByMe: async function (EvolveUser_ID) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
			.query("  SELECT  DISTINCT etr.EvolveStatus_id , etr.EvolveApprovalStatus_id , etr.EvolveUser_id  FROM  EvolveApprovalTrans etr , EvolveStatusCodeMstr est	WHERE etr.EvolveUser_id =  @EvolveUser_ID  AND etr.EvolveStatus_id = est.EvolveStatusCodeMstr_Id AND est.EvolveStatusCodeMstr_Code = 'REJECT' AND est.EvolveStatusCodeMstr_Type = 'APPROVAL'");
        } catch (error) {
            Evolve.Log.error(" Error while reject my me count " + error.message);
            return new Error(" Error while reject my me count " + error.message);
        }
	},
	sendBackByMe: async function (EvolveUser_ID) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
			.query("  SELECT  DISTINCT etr.EvolveStatus_id , etr.EvolveApprovalStatus_id , etr.EvolveUser_id  FROM  EvolveApprovalTrans etr , EvolveStatusCodeMstr est	WHERE etr.EvolveUser_id =  @EvolveUser_ID  AND etr.EvolveStatus_id = est.EvolveStatusCodeMstr_Id AND est.EvolveStatusCodeMstr_Code = 'SENDBACK' AND est.EvolveStatusCodeMstr_Type = 'APPROVAL'");
        } catch (error) {
            Evolve.Log.error(" Error while send back my me count " + error.message);
            return new Error(" Error while send back my me count " + error.message);
        }
	},
	waitingForMyApproval : async function (EvolveUser_ID) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
			.query("  SELECT EvolveTravelReq.EvolveTravelReq_id  FROM EvolveApprovalStatus 	JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id	JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id	where (EvolveApproval.EvolveApproval_primaryUser_id = @EvolveUser_ID	OR EvolveApproval.EvolveApproval_secondUser_id =  @EvolveUser_ID	OR EvolveApproval.EvolveApproval_tertiaryUser_id = @EvolveUser_ID)  	AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq)");
        } catch (error) {
            Evolve.Log.error(" Error while waiting for my approval count " + error.message);
            return new Error(" Error while waiting for my approval count " + error.message);
        }
	},
	getInTransitCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT  COUNT(EvolveTravelReq_id) as count FROM  EvolveTravelReq etr  ,  EvolveStatusCodeMstr est WHERE etr.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id AND	est.EvolveStatusCodeMstr_Code = 'IN TRANSIT'  AND est.EvolveStatusCodeMstr_Type = 'TRIP' ");
        } catch (error) {
            Evolve.Log.error(" Error while get in trans employee count " + error.message);
            return new Error(" Error while get in trans employee count " + error.message);
        }
	},
	getMyTravelReq: async function (EvolveUser_ID) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)

			.query("SELECT  * FROM EvolveTravelReq WHERE EvolveUser_id = @EvolveUser_id");
        } catch (error) {
            Evolve.Log.error(" Error while  get my travel req details " + error.message);
            return new Error(" Error while  get my travel req details " + error.message);
        }
	},
	checkApprovalStatus: async function (EvolveTravelReq_id) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, EvolveTravelReq_id)

			.query("SELECT (SELECT COUNT(EvolveApprovalStatus_id)+1  FROM EvolveApprovalStatus WHERE EvolveTravelReq_id=@EvolveTravelReq_id ) as 'approvalCount' ,etr.EvolveTRavelReq_currApvlSeq ,est.EvolveStatusCodeMstr_Code  FROM  EvolveStatusCodeMstr est ,  EvolveTravelReq etr  WHERE  etr.EvolveTravelReq_TripStatusID = est.EvolveStatusCodeMstr_Id AND etr.EvolveTravelReq_id = @EvolveTravelReq_id");
        } catch (error) {
            Evolve.Log.error(" Error while  get my travel req details " + error.message);
            return new Error(" Error while  get my travel req details " + error.message);
        }
	},
	getStatusListByType: async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveStatusCodeMstr_Type', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Type)
			.query("SELECT * FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type =@EvolveStatusCodeMstr_Type");

		} catch (error) {
			Evolve.Log.error(" Error while get status list "+error.message);
			return new Error(" Error while get status list "+error.message);
		}
	},
	updateTravelReqByMedic: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			if(data.status == 'JOIN'){

			let	closedStatusId  = await Evolve.SqlPool.request()
			.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type ='TRIP' AND EvolveStatusCodeMstr_Code='CLOSED'");

			let statusId = closedStatusId.recordset[0].EvolveStatusCodeMstr_Id

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTRavelReq_MedicStatusId', Evolve.Sql.Int, data.EvolveTRavelReq_MedicStatusId)
			.input('EvolveTravelReq_TripStatusID', Evolve.Sql.Int, statusId)
			.input('EvolveTRavelReq_MedicComments', Evolve.Sql.NVarChar, data.EvolveTRavelReq_MedicComments)
			.input('EvolveTravelReq_QuarDays', Evolve.Sql.Int, data.EvolveTravelReq_QuarDays)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

			.query("Update EvolveTravelReq SET  EvolveTRavelReq_MedicStatusId = @EvolveTRavelReq_MedicStatusId  , EvolveTRavelReq_MedicComments =@EvolveTRavelReq_MedicComments ,EvolveTravelReq_QuarDays=@EvolveTravelReq_QuarDays ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt , EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser ,EvolveTravelReq_TripStatusID=@EvolveTravelReq_TripStatusID  WHERE  EvolveTravelReq_id=@EvolveTravelReq_id;select @@IDENTITY AS \'inserted_id\'");
			}else{

				return await Evolve.SqlPool.request()
				.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
				.input('EvolveTRavelReq_MedicStatusId', Evolve.Sql.Int, data.EvolveTRavelReq_MedicStatusId)
				.input('EvolveTRavelReq_MedicComments', Evolve.Sql.NVarChar, data.EvolveTRavelReq_MedicComments)
				.input('EvolveTravelReq_QuarDays', Evolve.Sql.Int, data.EvolveTravelReq_QuarDays)
				.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	
				.query("Update EvolveTravelReq SET  EvolveTRavelReq_MedicStatusId = @EvolveTRavelReq_MedicStatusId  , EvolveTRavelReq_MedicComments =@EvolveTRavelReq_MedicComments ,EvolveTravelReq_QuarDays=@EvolveTravelReq_QuarDays ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt , EvolveTravelReq_UpdatedUser=@EvolveTravelReq_UpdatedUser  WHERE  EvolveTravelReq_id=@EvolveTravelReq_id;select @@IDENTITY AS \'inserted_id\'");

			}

		} catch (error) {
			Evolve.Log.error(" Error while update travel req details "+error.message);
			return new Error(" Error while update travel req details "+error.message);
		}
	},
	getCovidEmployeeCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT  COUNT(EvolveTravelReq_id) as count FROM  EvolveTravelReq etr  ,  EvolveStatusCodeMstr est WHERE etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND	est.EvolveStatusCodeMstr_Code = 'COVIDTEST'  AND est.EvolveStatusCodeMstr_Type = 'MEDICAL' ");
        } catch (error) {
            Evolve.Log.error(" Error while get in trans employee count " + error.message);
            return new Error(" Error while get in trans employee count " + error.message);
        }
	},
	getsevenDaysQuar: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT  COUNT(EvolveTravelReq_id) as count FROM  EvolveTravelReq etr  ,  EvolveStatusCodeMstr est WHERE etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND	est.EvolveStatusCodeMstr_Code = 'QUARANTINE'  AND est.EvolveStatusCodeMstr_Type = 'MEDICAL' AND EvolveTravelReq_QuarDays = 7 ");
        } catch (error) {
            Evolve.Log.error(" Error while get in trans employee count " + error.message);
            return new Error(" Error while get in trans employee count " + error.message);
        }
	},
	getFourteenDaysQuar: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT  COUNT(EvolveTravelReq_id) as count FROM  EvolveTravelReq etr  ,  EvolveStatusCodeMstr est WHERE etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND	est.EvolveStatusCodeMstr_Code = 'QUARANTINE'  AND est.EvolveStatusCodeMstr_Type = 'MEDICAL' AND EvolveTravelReq_QuarDays = 14 ");
        } catch (error) {
            Evolve.Log.error(" Error while get in trans employee count " + error.message);
            return new Error(" Error while get in trans employee count " + error.message);
        }
	},
	getTime: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT CONVERT(VARCHAR(5), GETDATE(), 108) as time");
        } catch (error) {
            Evolve.Log.error(" Error while get current time" + error.message);
            return new Error(" Error while get current time" + error.message);
        }
	},
	getQuarEmp: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT etr.EvolveTravelReq_id ,etr.EvolveTravelReq_UpdatedAt ,etr.EvolveTravelReq_QuarDays FROM   EvolveTravelReq etr ,EvolveStatusCodeMstr est  WHERE etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND est.EvolveStatusCodeMstr_Type = 'MEDICAL' AND est.EvolveStatusCodeMstr_Code = 'QUARANTINE' ");
        } catch (error) {
            Evolve.Log.error(" Error while get quarantinr employee details" + error.message);
            return new Error(" Error while get quarantinr employee details" + error.message);
        }
	},
	getReviewStatusId: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND  EvolveStatusCodeMstr_Code = 'QUARCOMP' ");
        } catch (error) {
            Evolve.Log.error(" Error while get medic review status id" + error.message);
            return new Error(" Error while get medic review status id" + error.message);
        }
	},
	changeReqToReview: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTRavelReq_MedicStatusId', Evolve.Sql.Int, data.EvolveTRavelReq_MedicStatusId)
			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)

			.query("Update EvolveTravelReq SET  EvolveTRavelReq_MedicStatusId = @EvolveTRavelReq_MedicStatusId  ,EvolveTravelReq_UpdatedAt=@EvolveTravelReq_UpdatedAt   WHERE  EvolveTravelReq_id=@EvolveTravelReq_id");

        } catch (error) {
            Evolve.Log.error(" Error while change quar status to medic review" + error.message);
            return new Error(" Error while change quar status to medic review" + error.message);
        }
	},
	locStatus: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTemp_Data', Evolve.Sql.NVarChar, JSON.stringify(data))
			.query(" INSERT INTO  EvolveTemp (EvolveTemp_Data) VALUES (@EvolveTemp_Data)");
        } catch (error) {
            Evolve.Log.error(" Error while get approved my me count " + error.message);
            return new Error(" Error while get approved my me count " + error.message);
        }
	},
	getStatusCodeById: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveTRavelReq_MedicStatusId)

			.query("SELECT EvolveStatusCodeMstr_Code  FROM EvolveStatusCodeMstr WHERE  EvolveStatusCodeMstr_Id=@EvolveStatusCodeMstr_Id");
        } catch (error) {
            Evolve.Log.error(" Error while get approved my me count " + error.message);
            return new Error(" Error while get approved my me count " + error.message);
        }
	},
	updateUserDeviceId: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			.input('EvolveUser_DeviceID', Evolve.Sql.NVarChar, data.EvolveUser_DeviceID)
			.query("UPDATE 	EvolveUser  SET  EvolveUser_DeviceID =@EvolveUser_DeviceID WHERE EvolveUser_ID=@EvolveUser_ID ");
        } catch (error) {
            Evolve.Log.error(" Error while update user devicec id " + error.message);
            return new Error(" Error while update user devicec id " + error.message);
        }
	},
	isCovidTestReq: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			.query("SELECT  etr.EvolveTravelReq_id  FROM  EvolveTravelReq etr ,  EvolveStatusCodeMstr est WHERE  etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND (est.EvolveStatusCodeMstr_Code = 'QUARCOMP' OR est.EvolveStatusCodeMstr_Code = 'COVIDTEST' ) AND EvolveUser_id =@EvolveUser_ID");
        } catch (error) {
            Evolve.Log.error(" Error while check is covid test req or not " + error.message);
            return new Error(" Error while check is covid test req or not " + error.message);
        }
	},
	updateTravelReqCovidDetails: async function (data) {
        try {

			let medicStatus =  await Evolve.SqlPool.request()
			.query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type = 'MEDICALRESULT' AND  EvolveStatusCodeMstr_Code = 'ON REVIEW'");	
			let medicStatusId = null
			medicStatusId = medicStatus.recordset[0].EvolveStatusCodeMstr_Id
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveTravelReq_CovidDetails', Evolve.Sql.NVarChar, JSON.stringify(data))
			.input('EvolveTRavelReq_MedicStatusId', Evolve.Sql.Int,medicStatusId )

			.input('EvolveTravelReq_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveTravelReq_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.query("UPDATE EvolveTravelReq SET  EvolveTravelReq_CovidDetails=@EvolveTravelReq_CovidDetails ,EvolveTRavelReq_MedicStatusId=@EvolveTRavelReq_MedicStatusId WHERE EvolveTravelReq_id=@EvolveTravelReq_id");
        } catch (error) {
            Evolve.Log.error(" Error while update covid details " + error.message);
            return new Error(" Error while update covid details " + error.message);
        }
	},
	getInTrasitTravelReq: async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_id', Evolve.Sql.Int, data.EvolveUser_ID)
			.query("  SELECT  EvolveTravelReq_id , EvolveUser_id , EvolveTravelReq_TripStatusID FROM  EvolveTravelReq etr  ,  EvolveStatusCodeMstr est  WHERE  etr.EvolveTravelReq_TripStatusID  = est.EvolveStatusCodeMstr_Id AND est.EvolveStatusCodeMstr_Code = 'IN TRANSIT'AND est.EvolveStatusCodeMstr_Type = 'TRIP' AND EvolveUser_id =@EvolveUser_id");
	
		} catch (error) {
			Evolve.Log.error(" Error while get in transit  travel  req "+error.message);
			return new Error(" Error while get in transit  travel  req "+error.message);
		}
	},
	userDetailsByTravelReq : async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.query("SELECT  EvolveUser_id  FROM EvolveTravelReq WHERE EvolveTravelReq_id = @EvolveTravelReq_id ");
	
		} catch (error) {
			Evolve.Log.error(" Error while get userd details of travel req "+error.message);
			return new Error(" Error while get userd details of travel req "+error.message);
		}
	},
	getUserNotificationList : async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			.query("SELECT  *  FROM EvolveNotifDetails WHERE EvolveUser_ID = @EvolveUser_ID ORDER BY  EvolveNotifDetails_ID DESC");
	
		} catch (error) {
			Evolve.Log.error(" Error while get user notif list "+error.message);
			return new Error(" Error while get user notif list "+error.message);
		}
	},
	upadateNotificationStatus : async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
			.input('EvolveNotifDetails_ID', Evolve.Sql.Int, data.EvolveNotifDetails_ID)
			.input('EvolveNotifDetails_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.input('EvolveNotifDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			.query("UPDATE EvolveNotifDetails SET  EvolveNotifDetails_Read= 1  ,EvolveNotifDetails_UpdatedAt=@EvolveNotifDetails_UpdatedAt ,EvolveNotifDetails_UpdatedUser=@EvolveNotifDetails_UpdatedUser  WHERE EvolveNotifDetails_ID =@EvolveNotifDetails_ID ");
	
		} catch (error) {
			Evolve.Log.error(" Error While update notification  status "+error.message);
			return new Error(" Error While update notification  status "+error.message);
		}
	},
	covidTestReqList: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT  etr.*  FROM  EvolveTravelReq etr ,  EvolveStatusCodeMstr est WHERE  etr.EvolveTRavelReq_MedicStatusId = est.EvolveStatusCodeMstr_Id AND (est.EvolveStatusCodeMstr_Code = 'QUARCOMP' OR est.EvolveStatusCodeMstr_Code = 'COVIDTEST' ) ");
        } catch (error) {
            Evolve.Log.error(" Error while get covid test required req list " + error.message);
            return new Error(" Error while get covid test required req list " + error.message);
        }
	},

	getLastApprovalTrans: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
			.input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Code)


			.query("SELECT TOP(1) EvolveApprovalTrans.EvolveUser_id  FROM EvolveApprovalStatus            	LEFT JOIN EvolveApprovalTrans ON EvolveApprovalStatus.EvolveApprovalStatus_id = EvolveApprovalTrans.EvolveApprovalStatus_id	LEFT JOIN EvolveStatusCodeMstr ON EvolveApprovalTrans.EvolveStatus_id = EvolveStatusCodeMstr.EvolveStatusCodeMstr_Id	LEFT JOIN EvolveReason ON EvolveApprovalTrans.EvolveReason_id = EvolveReason.EvolveReason_id	Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id	Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id	Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id	Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id	Left JOIN EvolveUser approvedBy ON approvedBy.EvolveUser_ID = EvolveApprovalTrans.EvolveUser_ID 	Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id	LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID	where EvolveTravelReq_id = @EvolveTravelReq_id  AND EvolveStatusCodeMstr.EvolveStatusCodeMstr_Code = @EvolveStatusCodeMstr_Code ORDER BY EvolveApprovalTrans_id DESC  ");
        } catch (error) {
            Evolve.Log.error(" Error while get covid test required req list " + error.message);
            return new Error(" Error while get covid test required req list " + error.message);
        }
	},


	underApprovalReqCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(EvolveTravelReq.EvolveTravelReq_id) as count   FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus    JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id   JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where   (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' ORDER BY  EvolveTravelReq.EvolveTravelReq_id DESC ");
        } catch (error) {
            Evolve.Log.error(" Error while get under approval travel req " + error.message);
            return new Error(" Error while get under approval travel req " + error.message);
        }
	},
	reqRaiseByTodayCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT COUNT(EvolveTravelReq_id) as count  FROM EvolveTravelReq  WHERE  convert(varchar, EvolveTravelReq_CreatedAt, 2) =  convert(varchar, getdate(), 2) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's raised request " + error.message);
            return new Error(" Error while get count  of today's raised request " + error.message);
        }
	},
	reqRaiseByLastWeekCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("Select  COUNT(EvolveTravelReq_id) as count  FROM EvolveTravelReq  Where EvolveTravelReq_CreatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND EvolveTravelReq_CreatedAt < DATEADD(week,datediff(week,0,getdate()),0) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's raised request " + error.message);
            return new Error(" Error while get count  of today's raised request " + error.message);
        }
	},
	reqRaiseByLastMonthCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("	SELECT COUNT(EvolveTravelReq_id) as count  FROM EvolveTravelReq WHERE DATEPART(m, EvolveTravelReq_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, EvolveTravelReq_CreatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate())) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's raised request " + error.message);
            return new Error(" Error while get count  of today's raised request " + error.message);
        }
	},

	reqRaiseByLastYearCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("Select  COUNT(EvolveTravelReq_id) as count  FROM EvolveTravelReq  	Where YEAR(EvolveTravelReq_CreatedAt) = YEAR(GETDATE()) - 1 ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's raised request " + error.message);
            return new Error(" Error while get count  of today's raised request " + error.message);
        }
	},
	reqRejectedByTodayCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("   SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'REJECT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND   convert(varchar, etr.EvolveTravelReq_CreatedAt, 2) =  convert(varchar, getdate(), 2) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's reject request " + error.message);
            return new Error(" Error while get count  of today's reject request " + error.message);
        }
	},
	reqRejectedByLastWeekCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'REJECT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  etr.EvolveTravelReq_CreatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND etr.EvolveTravelReq_CreatedAt < DATEADD(week,datediff(week,0,getdate()),0) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last week reject request " + error.message);
            return new Error(" Error while get count  of last week reject request " + error.message);
        }
	},
	reqRejectedByLastMonthCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("	 SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'REJECT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  DATEPART(m, etr.EvolveTravelReq_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, etr.EvolveTravelReq_CreatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate())) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last month reject request " + error.message);
            return new Error(" Error while get count  of last month reject request " + error.message);
        }
	},

	reqRejectedByLastYearCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'REJECT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  YEAR(etr.EvolveTravelReq_CreatedAt) = YEAR(GETDATE()) - 1 ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last year reject request " + error.message);
            return new Error(" Error while get count  of last year reject request " + error.message);
        }
	},
	reqCompletedByTodayCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("   SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'COMPLETED' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND   convert(varchar, etr.EvolveTravelReq_CreatedAt, 2) =  convert(varchar, getdate(), 2) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of today's reject request " + error.message);
            return new Error(" Error while get count  of today's reject request " + error.message);
        }
	},
	reqCompletedByLastWeekCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'COMPLETED' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  etr.EvolveTravelReq_CreatedAt >= DATEADD(WEEK,-1,DATEADD(week,datediff(week,0,getdate()),0)) AND etr.EvolveTravelReq_CreatedAt < DATEADD(week,datediff(week,0,getdate()),0) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last week reject request " + error.message);
            return new Error(" Error while get count  of last week reject request " + error.message);
        }
	},
	reqCompletedByLastMonthCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("	 SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'COMPLETED' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  DATEPART(m, etr.EvolveTravelReq_CreatedAt) = DATEPART(m, DATEADD(m, -1, getdate())) AND DATEPART(yyyy, etr.EvolveTravelReq_CreatedAt) = DATEPART(yyyy, DATEADD(m, -1, getdate())) ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last month reject request " + error.message);
            return new Error(" Error while get count  of last month reject request " + error.message);
        }
	},

	reqCompletedByLastYearCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'COMPLETED' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id  AND  YEAR(etr.EvolveTravelReq_CreatedAt) = YEAR(GETDATE()) - 1 ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  of last year reject request " + error.message);
            return new Error(" Error while get count  of last year reject request " + error.message);
        }
	},

	currentlyInTransitCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query(" SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'IN TRANSIT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id ");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},

	tripWillComplteINNextThreeDaysCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc WHERE estc.EvolveStatusCodeMstr_Code = 'IN TRANSIT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id 	AND  DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) <=3 AND DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) > 0;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},

	tripWillComplteINNextOneWeekCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc WHERE estc.EvolveStatusCodeMstr_Code = 'IN TRANSIT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id 	AND  DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) <=7 AND DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) > 0;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},

	tripWillComplteINNextTwoWeekCount: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc WHERE estc.EvolveStatusCodeMstr_Code = 'IN TRANSIT' AND etr.EvolveTravelReq_TripStatusID = estc.EvolveStatusCodeMstr_Id 	AND  DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) <=14 AND DATEDIFF(day,getDate(), etr.EvolveTravelReq_endDate ) > 0;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},

	employeeInSevenDayQuar: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'QUARANTINE' AND etr.EvolveTRavelReq_MedicStatusId = estc.EvolveStatusCodeMstr_Id  	AND etr.EvolveTravelReq_QuarDays =7 ;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},
	employeeInFourteenDayQuar: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc	WHERE estc.EvolveStatusCodeMstr_Code = 'QUARANTINE' AND etr.EvolveTRavelReq_MedicStatusId = estc.EvolveStatusCodeMstr_Id  	AND etr.EvolveTravelReq_QuarDays =14 ;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},
	employeeCompleteQuarInNextWeek: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("  SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc		WHERE estc.EvolveStatusCodeMstr_Code = 'QUARANTINE' AND etr.EvolveTRavelReq_MedicStatusId = estc.EvolveStatusCodeMstr_Id  AND  DATEDIFF(day,getDate(), etr.EvolveTravelReq_UpdatedAt+EvolveTravelReq_QuarDays )  >= 0 AND DATEDIFF(day,getDate(), etr.EvolveTravelReq_UpdatedAt+EvolveTravelReq_QuarDays )  <= 7  ;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},
	employeeCompleteQuarInNextTwoWeek: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc WHERE estc.EvolveStatusCodeMstr_Code = 'QUARANTINE' AND etr.EvolveTRavelReq_MedicStatusId = estc.EvolveStatusCodeMstr_Id  AND  DATEDIFF(day,getDate(), etr.EvolveTravelReq_UpdatedAt+EvolveTravelReq_QuarDays )  >= 0 AND DATEDIFF(day,getDate(), etr.EvolveTravelReq_UpdatedAt+EvolveTravelReq_QuarDays )  <= 14;");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},

	employeeRequiredCovidTest: async function () {
        try {
			return await Evolve.SqlPool.request()
			.query("SELECT COUNT(etr.EvolveTravelReq_id) as count  FROM EvolveTravelReq  etr , EvolveStatusCodeMstr estc WHERE estc.EvolveStatusCodeMstr_Code = 'COVIDTEST' AND etr.EvolveTRavelReq_MedicStatusId = estc.EvolveStatusCodeMstr_Id");
        } catch (error) {
            Evolve.Log.error(" Error while get count  in transit employees " + error.message);
            return new Error(" Error while get count  in transit employees " + error.message);
        }
	},



	// Personal  DashBoard

	// employeeRequiredCovidTest: async function (data) {
    //     try {
	// 		return await Evolve.SqlPool.request()
	// 		.query(`
	// 		SELECT EvolveTravelReq.*  ,  EvolveApprovalStatus.EvolveApprovalStatus_id , EvolveReason.EvolveReason_name FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
	// 				  JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
	// 				  JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id = ${data.EvolveTravelReq_id}
	// 				  OR EvolveApproval.EvolveApproval_secondUser_id =  ${data.EvolveTravelReq_id}
	// 				  OR EvolveApproval.EvolveApproval_tertiaryUser_id = ${data.EvolveTravelReq_id})  
	// 				  AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED'`);
    //     } catch (error) {
    //         Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
    //         return new Error(" Error while get req count waiting for my  approval " + error.message);
    //     }
	// },


	ReqUnderMyApproval : async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.query(`
			SELECT EvolveTravelReq.*  ,  EvolveApprovalStatus.EvolveApprovalStatus_id , EvolveReason.EvolveReason_name FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
					  JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
					  JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id = ${data.EvolveTravelReq_id}
					  OR EvolveApproval.EvolveApproval_secondUser_id =  ${data.EvolveTravelReq_id}
					  OR EvolveApproval.EvolveApproval_tertiaryUser_id = ${data.EvolveTravelReq_id})  
					  AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED'`);
        } catch (error) {
            Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
            return new Error(" Error while get req count waiting for my  approval " + error.message);
        }
	},

	ReqUnderMyApprovalFromLastThreeDays : async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.query(` SELECT COUNT(EvolveTravelReq.EvolveTravelReq_id) as count FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
			JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
			JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id =  ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_secondUser_id =   ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_tertiaryUser_id =  ${data.EvolveTravelReq_id})  
			AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  
			estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' AND DATEDIFF(day, EvolveTravelReq.EvolveTravelReq_UpdatedAt  ,getDate() ) >=3 `);
        } catch (error) {
            Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
            return new Error(" Error while get req count waiting for my  approval " + error.message);
        }
	},

	ReqUnderMyApprovalFromLastWeek : async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.query(` SELECT COUNT(EvolveTravelReq.EvolveTravelReq_id) as count FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
					  JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
					  JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id =  ${data.EvolveTravelReq_id}
					  OR EvolveApproval.EvolveApproval_secondUser_id =   ${data.EvolveTravelReq_id}
					  OR EvolveApproval.EvolveApproval_tertiaryUser_id =  ${data.EvolveTravelReq_id})  
					  AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  
					  estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' AND DATEDIFF(day, EvolveTravelReq.EvolveTravelReq_UpdatedAt  ,getDate() ) >=7`);
        } catch (error) {
            Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
            return new Error(" Error while get req count waiting for my  approval " + error.message);
        }
	},

	ReqUnderMyApprovalFromLastMonth : async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.query(` SELECT COUNT(EvolveTravelReq.EvolveTravelReq_id) as count FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
			JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
			JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id =  ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_secondUser_id =   ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_tertiaryUser_id =  ${data.EvolveTravelReq_id})  
			AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  
			estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' AND DATEDIFF(day, EvolveTravelReq.EvolveTravelReq_UpdatedAt  ,getDate() ) >=30`);
        } catch (error) {
            Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
            return new Error(" Error while get req count waiting for my  approval " + error.message);
        }
	},

	
	ReqSendBackByMeInLastOneWeek : async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.query(` SELECT COUNT(EvolveTravelReq.EvolveTravelReq_id) as count FROM  EvolveStatusCodeMstr estcm , EvolveReason ,  EvolveApprovalStatus 
			JOIN EvolveTravelReq ON EvolveTravelReq.EvolveTravelReq_id = EvolveApprovalStatus.EvolveTravelReq_id
			JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id   where (EvolveApproval.EvolveApproval_primaryUser_id =  ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_secondUser_id =   ${data.EvolveTravelReq_id}
			OR EvolveApproval.EvolveApproval_tertiaryUser_id =  ${data.EvolveTravelReq_id})  
			AND (EvolveApproval.EvolveApproval_seq = EvolveTravelReq.EvolveTRavelReq_currApvlSeq) AND EvolveTravelReq.EvolveReason_id = EvolveReason.EvolveReason_id AND estcm.EvolveStatusCodeMstr_Id = EvolveTravelReq.EvolveTravelReq_TripStatusID AND  
			estcm.EvolveStatusCodeMstr_Code = 'NOT STARTED' AND DATEDIFF(day, EvolveTravelReq.EvolveTravelReq_UpdatedAt  ,getDate() ) >=30`);
        } catch (error) {
            Evolve.Log.error(" Error while get req count waiting for my  approval " + error.message);
            return new Error(" Error while get req count waiting for my  approval " + error.message);
        }
	},
	addApprovalProcessDetails: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Status)
                .input('EvolveApprovalProcessDetails_Remarks', Evolve.Sql.NVarChar, data.EvolveApprovalProcessDetails_Remarks)
                .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
                .input('EvolveApprovalProcessDetails_TargetedUserID', Evolve.Sql.Int, data.EvolveApprovalProcessDetails_TargetedUserID)
                .input('EvolveApprovalProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveApprovalProcessDetails (EvolveApprovalProcess_ID, EvolveUser_ID, EvolveApprovalProcessDetails_Status,EvolveApprovalProcessDetails_Remarks, EvolveApprovalMatrixIndex_ID ,EvolveApprovalProcessDetails_TargetedUserID  ,EvolveApprovalProcessDetails_CreatedAt, EvolveApprovalProcessDetails_CreatedUser, EvolveApprovalProcessDetails_UpdatedAt, EvolveApprovalProcessDetails_UpdatedUser) VALUES (@EvolveApprovalProcess_ID, @EvolveUser_ID, @EvolveApprovalProcessDetails_Status, @EvolveApprovalProcessDetails_Remarks ,@EvolveApprovalMatrixIndex_ID ,@EvolveApprovalProcessDetails_TargetedUserID  ,@EvolveApprovalProcessDetails_CreatedAt, @EvolveApprovalProcessDetails_CreatedUser, @EvolveApprovalProcessDetails_UpdatedAt, @EvolveApprovalProcessDetails_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details "+error.message);
            return new Error(" EERR####: Erorr while add approval process details "+error.message);
        }
    },
	
    updateProcessStatus: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int
				, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_Status)
                .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, data.EvolveApprovalProcess_CurrentIndex)
                .input('EvolveApprovalProcess_IsOnGroundLevel', Evolve.Sql.Int, data.EvolveApprovalProcess_IsOnGroundLevel)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_CurrentIndex=@EvolveApprovalProcess_CurrentIndex , EvolveApprovalProcess_IsOnGroundLevel=@EvolveApprovalProcess_IsOnGroundLevel ,EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt , EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser  WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID ; SELECT  * FROM EvolveApprovalProcess WHERE  EvolveApprovalProcess_ID =@EvolveApprovalProcess_ID");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details "+error.message);
            return new Error(" EERR####: Erorr while add approval process details "+error.message);
        }
    },

	getApprovedTripStatusID : async function (EvolveStatusCodeMstr_Code) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, EvolveStatusCodeMstr_Code)

			.query("SELECT  EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code = @EvolveStatusCodeMstr_Code");
        } catch (error) {
            Evolve.Log.error(" Error while get Approved status code id " + error.message);
            return new Error(" Error while get Approved status code id " + error.message);
        }
	},












    


}