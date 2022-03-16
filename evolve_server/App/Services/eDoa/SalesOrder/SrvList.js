'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSalesQuoteListCount: async function (search , subQuery ,releasedSq) {
        try {
            let condition = '' ;

            if(releasedSq){

                condition = " AND esq.EvolveSO_Status = 'QADRELEASED' "

            }else{


                condition = " AND esq.EvolveSO_Status != 'QADRELEASED' "

            }
            subQuery += condition ;
            let query = "SELECT  COUNT(EvolveSO_ID) as count  FROM EvolveSO esq, EvolveCustomer ec WHERE esq.EvolveSO_Customer_ID = ec.EvolveCustomer_ID  "+subQuery+" AND EvolveSO_Serial LIKE @search" ;
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

            .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales quote list count "+error.message);
            return new Error(" EERR####: Error while get sales quote list count "+error.message);
        }
    },

    getSalesQuoteList : async function (start, length ,search ,subQuery ,releasedSq) {
        try {
            let condition = '' ;

            if(releasedSq){

                condition = " AND esq.EvolveSO_Status = 'QADRELEASED' "

            }else{


                condition = " AND esq.EvolveSO_Status != 'QADRELEASED' "

            }

            subQuery += condition ;
            let query = "  SELECT  esq.*, ec.EvolveCustomer_Code , ec.EvolveCustomer_name , convert(varchar, esq.EvolveSO_CreatedAt, 103)  as dateCreated , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),   CONVERT(DATETIME, esq.EvolveSO_CreatedAt), 22), 10, 5) +  RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, esq.EvolveSO_CreatedAt), 22), 3)) as timeCreated ,convert(varchar, esq.EvolveSO_SubmitDate, 103)   as dateSubmited , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, esq.EvolveSO_SubmitDate), 22), 10, 5) +  RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, esq.EvolveSO_SubmitDate), 22), 3)) as timeSunbmited  , eu.EvolveUser_Name  FROM  EvolveSO esq, EvolveCustomer ec,EvolveUser eu    WHERE esq.EvolveSO_Customer_ID = ec.EvolveCustomer_ID   AND esq.EvolveSO_CreatedUser = eu.EvolveUser_ID"+subQuery+" AND EvolveSO_Serial LIKE @search ORDER BY EvolveSO_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales quote list "+error.message);
            return new Error(" EERR####: Error while get sales quote list "+error.message);
        }
    },

    submitToApprovelProcess : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
            .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
            .input('EvolveApprovalProcess_PrimaryID', Evolve.Sql.Int, data.EvolveSO_ID)
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
            Evolve.Log.error(" EERR####: Error while sales quote submit to approvel process "+error.message);
            return new Error(" EERR####: Error while sales quote submit to approvel process "+error.message);
        }
    },

    
    addApprovalProcessetails : async function (data) {
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
            Evolve.Log.error(" EERR####: Error while add approval process details "+error.message);
            return new Error(" EERR####: Error while add approval process details "+error.message);
        }
    },

    updateSalesQuoteStatus : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
            .input('EvolveSO_ID', Evolve.Sql.Int, data.EvolveSO_ID)
            .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, parseInt(data.EvolveApprovalMatrix_ID))

            .input('EvolveSO_Status', Evolve.Sql.NVarChar, data.EvolveSO_Status )
            .input('EvolveSO_SubmitDate', Evolve.Sql.NVarChar, datetime)

            .input('EvolveSO_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveSO_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query(' UPDATE EvolveSO SET EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID , EvolveSO_Status = @EvolveSO_Status,EvolveSO_SubmitDate=@EvolveSO_SubmitDate, EvolveSO_UpdatedAt = @EvolveSO_UpdatedAt, EvolveSO_UpdatedUser = @EvolveSO_UpdatedUser WHERE EvolveSO_ID = @EvolveSO_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update sale quote status "+error.message);
            return new Error(" EERR####: Error while update sale quote status "+error.message);
        }
    },
    checkApprovalProcess : async function (data) {
        try {

            return await Evolve.SqlPool.request()
            .input('EvolveApprovalProcess_PrimaryID', Evolve.Sql.Int, data.EvolveSO_ID)
           
            .query("SELECT  eap.* , eapm.EvolveApprovalMatrix_Type FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_PrimaryID AND  eapm.EvolveApprovalMatrix_Type = 'SALESQUOTE'");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check Approval Process "+error.message);
            return new Error(" EERR####: Error while check Approval Process "+error.message);
        }
    },

    updateApprovalProcessSeq : async function (data) {
        try {

            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();


            return await Evolve.SqlPool.request()
            .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)
            .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, 2)
            .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
            .input('EvolveApprovalProcess_ErrorCode', Evolve.Sql.NVarChar, '')
            .input('EvolveApprovalProcess_ErrorDetails', Evolve.Sql.NVarChar, '')
            .input('EvolveApprovalMatrix_ID', Evolve.Sql.NVarChar,data.EvolveApprovalMatrix_ID)
            .input('EvolveApprovalProcess_IsOnGroundLevel', Evolve.Sql.Int, 0)
            .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
           
            .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_CurrentIndex = @EvolveApprovalProcess_CurrentIndex ,EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_ErrorCode=@EvolveApprovalProcess_ErrorCode ,EvolveApprovalProcess_ErrorDetails=@EvolveApprovalProcess_ErrorDetails, EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID ,EvolveApprovalProcess_IsOnGroundLevel=@EvolveApprovalProcess_IsOnGroundLevel , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt ,EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update approval process seq "+error.message);
            return new Error(" EERR####: Error while update approval process seq "+error.message);
        }
    },
    getUserUnitDetails: async function (EvolveUser_ID) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveUser_ID', Evolve.Sql.NVarChar, EvolveUser_ID)
  
          .query("SELECT  eunit.* FROM   EvolveUnit eunit  ,  EvolveUserUnitLink eul   WHERE eunit.EvolveUnit_ID = eul.EvolveUnit_ID     AND eul.EvolveUser_ID = @EvolveUser_ID");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get User Details "+error.message);
          return new Error(" EERR####: Error While Get User Details "+error.message);
        }
      },

      matchSqDetails: async function (data) {
        try {
            let query = "  SELECT  EvolveSO_ID  FROM  EvolveSO  WHERE  EvolveSO_ID= @EvolveSO_ID "+data.queryStr

          return await Evolve.SqlPool.request()
          .input('EvolveSO_ID', Evolve.Sql.Int, data.EvolveSO_ID)
          .query(query);
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Assign Matrix Details "+error.message);
          return new Error(" EERR####: Error While Assign Matrix Details "+error.message);
        }
      },
      // getCustomerDetails: async function (EvolveCustomer_Code) {
      //   try {
      //     // return await Evolve.SqlPool.request()
      //     // .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, EvolveCustomer_Code)
      //     // .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)

      //     // .query("SELECT  EvolveCustomer_ID FROM  EvolveCustomer WHERE EvolveCustomer_Code=@EvolveCustomer_Code AND  EvolveUnit_ID=@EvolveUnit_ID");


      //     return await Evolve.SqlPool.request()
      //     .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, EvolveCustomer_Code)

      //     .query("SELECT  * FROM  EvolveCustomer WHERE EvolveCustomer_Code=@EvolveCustomer_Code");
      //   } catch (error) {
    
      //     Evolve.Log.error(" EERR####: Error While Get Customer ID "+error.message);
      //     return new Error(" EERR####: Error While Get Customer ID "+error.message);
      //   }
      // },

      getCustomerDetails: async function (EvolveCustomer_Code) {
        try {      
            return await Evolve.SqlPool.request()
            .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, EvolveCustomer_Code)
            .query("SELECT ecust.EvolveCustomer_ID ,esalesp.EvolveSalesPerson_Code , esalesp.EvolveSalesPerson_ID ,esp.* , ecust.EvolveTaxClass_ID ,ecust.EvolveCustomer_ShipTo  ,  ecust.EvolveCustomer_BillTo  , ecust.EvolveSalesPerson_ID ,ecust.EvolveCustomer_name , ecust.EvolveCustomer_code ,  ecust.EvolveCreditTerms_ID FROM    EvolveShipTo esp , EvolveCustomer ecust   LEFT  JOIN    EvolveSalesPerson esalesp ON  ecust.EvolveSalesPerson_ID = esalesp.EvolveSalesPerson_ID WHERE ecust.EvolveCustomer_Code =@EvolveCustomer_Code AND ecust.EvolveCustomer_BillTo = esp.EvolveShipTo_ID ");
        } catch (error) {

            Evolve.Log.error(" EERR####: Error While Get Customer Details "+error.message);
            return new Error(" EERR####: Error While Get Customer Details "+error.message);
        }
    },

      getBillToShipToID: async function (EvolveShipTo_Code) {
        try {


          return await Evolve.SqlPool.request()
          .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, EvolveShipTo_Code)
          .query("SELECT  EvolveShipTo_ID FROM  EvolveShipTo WHERE EvolveShipTo_Code=@EvolveShipTo_Code ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Bill-To ID "+error.message);
          return new Error(" EERR####: Error While Get Bill-To ID "+error.message);
        }
      },
      getChannelId: async function (EvolveGenericCodeMaster_Value) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, EvolveGenericCodeMaster_Value.trim())
          .query("SELECT  EvolveGenericCodeMaster_ID FROM  EvolveGenericCodeMaster WHERE CONVERT(varchar(100), EvolveGenericCodeMaster_Value) = @EvolveGenericCodeMaster_Value AND EvolveGenericCodeMaster_Key = 'Channel' ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Channel Id "+error.message);
          return new Error(" EERR####: Error While Get Channel Id "+error.message);
        }
      },
      getTaxClassID: async function (EvolveTaxClass_Code) {
        try {


          return await Evolve.SqlPool.request()
          .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, EvolveTaxClass_Code)
          .query("SELECT  EvolveTaxClass_ID FROM  EvolveTaxClass WHERE EvolveTaxClass_Code=@EvolveTaxClass_Code  ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Tax Class Id"+error.message);
          return new Error(" EERR####: Error While Get Tax Class Id"+error.message);
        }
      },
      getCreditTermsID: async function (EvolveCreditTerms_Code) {
        try {


          return await Evolve.SqlPool.request()
          .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, EvolveCreditTerms_Code)
          .query("SELECT  EvolveCreditTerms_ID FROM  EvolveCreditTerms WHERE EvolveCreditTerms_Code=@EvolveCreditTerms_Code  ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Credit Terms ID"+error.message);
          return new Error(" EERR####: Error While Get Credit Terms ID"+error.message);
        }
      },
      getTaxEnvID: async function (EvolveGenericCodeMaster_Value) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, EvolveGenericCodeMaster_Value.trim())
          .query("SELECT  EvolveGenericCodeMaster_ID FROM  EvolveGenericCodeMaster WHERE CONVERT(varchar(100), EvolveGenericCodeMaster_Value) = @EvolveGenericCodeMaster_Value AND EvolveGenericCodeMaster_Key = 'Taxenv' ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Tax Env Id "+error.message);
          return new Error(" EERR####: Error While Get Tax Env Id "+error.message);
        }
      },
      getItemID: async function (EvolveItem_Code) {
        try {

          // return await Evolve.SqlPool.request()
          // .input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)
          // .input('EvolveUnit_ID', Evolve.Sql.Int
          // , EvolveUnit_ID)

          // .query("SELECT  EvolveItem_ID , EvolveTaxClass_ID FROM  EvolveItem WHERE EvolveItem_Code=@EvolveItem_Code  AND EvolveUnit_ID=@EvolveUnit_ID");

           return await Evolve.SqlPool.request()
          .input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)
 

          .query("SELECT  EvolveItem_ID , EvolveTaxClass_ID FROM  EvolveItem WHERE EvolveItem_Code=@EvolveItem_Code");
        } catch (error) {

  


          if(error.message.includes("Timeout: Request failed to complete")){
            Evolve.Log.error(" EERR####: Error While Get Item ID "+error.message);
            return Evolve.App.Services.eDoa.SalesQuote.SrvList.getItemID(EvolveItem_Code ) ;
          }else{

            Evolve.Log.error(" EERR####: Error While Get Item ID "+error.message);
            return new Error(" EERR####: Error While Get Item ID "+error.message);
          }
    
          
        }
      },
      getProjectId: async function (EvolveProject_Code ) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveProject_Code', Evolve.Sql.NVarChar, EvolveProject_Code.trim())
          .query("SELECT  EvolveProject_ID FROM  EvolveProject WHERE EvolveProject_Code=@EvolveProject_Code");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Project ID"+error.message);
          return new Error(" EERR####: Error While Get Project ID"+error.message);
        }
      },
      getSalesPersonId: async function (EvolveSalesPerson_Code ) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, EvolveSalesPerson_Code)
          .query("SELECT  EvolveSalesPerson_ID , EvolveSalesPerson_Code , EvolveSalesPerson_Email  FROM  EvolveSalesPerson WHERE EvolveSalesPerson_Code=@EvolveSalesPerson_Code");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Sales Person ID"+error.message);
          return new Error(" EERR####: Error While Get Sales Person ID"+error.message);
        }
      },
      getModeOfDelivery: async function (EvolveGenericCodeMaster_Value) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveGenericCodeMaster_Value', Evolve.Sql.NVarChar, EvolveGenericCodeMaster_Value.trim())
          .query("SELECT  EvolveGenericCodeMaster_ID FROM  EvolveGenericCodeMaster WHERE CONVERT(varchar(100), EvolveGenericCodeMaster_Value) = @EvolveGenericCodeMaster_Value AND EvolveGenericCodeMaster_Key = 'MOD' ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get MOD "+error.message);
          return new Error(" EERR####: Error While Get MOD "+error.message);
        }
      },
      getUnitStateCode : async function (EvolveUnit_ID) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
          .query("SELECT  * FROM  EvolveUnit WHERE EvolveUnit_ID=@EvolveUnit_ID ");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Unit State Code "+error.message);
          return new Error(" EERR####: Error While Get Unit State Code "+error.message);
        }
      },
      getApprovalProccessDetails: async function (data) {
        try {
          console.log("EvolveSO_ID" , data.EvolveSO_ID)
          console.log("data.EvolveApprovalMatrix_Type" , data.EvolveApprovalMatrix_Type)

            let query ;
            // if(displayAll){
                query = " SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm     WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_PrimaryID AND eapm.EvolveApprovalMatrix_Type = @EvolveApprovalMatrix_Type"
            // }else{
            //     query ="SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm     WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID AND  eap.EvolveApprovalProcess_IsOnGroundLevel !=1 AND eap.EvolveApprovalProcess_CreatedUser = @EvolveUser_ID AND (eap.EvolveApprovalProcess_ID LIKE @search OR eapm.EvolveApprovalMatrix_Type LIKE @search) ORDER BY eap.EvolveApprovalProcess_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY"
            // }
            return await Evolve.SqlPool.request()
              
                .input('EvolveApprovalProcess_PrimaryID', Evolve.Sql.Int, data.EvolveSO_ID)
                .input('EvolveApprovalMatrix_Type', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Type)

                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Approval Proccess Details "+error.message);
            return new Error(" EERR####: Error while get Approval Proccess Details "+error.message);
        }
    },
    getMatrixIndexList: async function (EvolveApprovalMatrix_ID) {
      try {
            return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, EvolveApprovalMatrix_ID)
              .query('SELECT * FROM  EvolveApprovalMatrixIndex WHERE EvolveApprovalMatrix_ID =@EvolveApprovalMatrix_ID AND EvolveApprovalMatrixIndex_Seq != 1')

  
      } catch (error) {
          Evolve.Log.error(" EERR#### : Error while get matrix index list "+error.message);
          return new Error(" EERR#### : Error while get matrix index list "+error.message);
      }
  },
  deleteSQHeadDetails: async function (EvolveSO_ID) {
    try {
          return await Evolve.SqlPool.request()
            .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
            .query('Delete FROM  EvolveSO  WHERE EvolveSO_ID =@EvolveSO_ID ')


    } catch (error) {
        Evolve.Log.error(" EERR#### : Error while Delete SQ Head Details "+error.message);
        return new Error(" EERR#### : Error while Delete SQ Head Details "+error.message);
    }
},
deleteSQLineDetails: async function (EvolveSO_ID) {
  try {
        return await Evolve.SqlPool.request()
          .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
          .query('Delete FROM  EvolveSODetails  WHERE EvolveSO_ID =@EvolveSO_ID ')


  } catch (error) {
      Evolve.Log.error(" EERR#### : Error while Delete SQ Line Details "+error.message);
      return new Error(" EERR#### : Error while Delete SQ Line Details "+error.message);
  }
},
getSingelSalesQuoteHead : async function (EvolveSO_ID) {
  try {
    return await Evolve.SqlPool.request()
    .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
    .query("SELECT esq.*   , (SELECT  esp.EvolveShipTo_Code FROM  EvolveShipTo esp  ,  EvolveSO esqi	WHERE esqi.EvolveSO_ShipTo = esp.EvolveShipTo_ID 	AND esqi.EvolveSO_ID = @EvolveSO_ID)  as shipTo ,(SELECT  esp.EvolveShipTo_Code FROM  EvolveShipTo esp  ,  EvolveSO esqi 	WHERE esqi.EvolveSO_BillTo = esp.EvolveShipTo_ID AND esqi.EvolveSO_ID = @EvolveSO_ID)  as billTo  ,		(SELECT egcm.EvolveGenericCodeMaster_Value  FROM EvolveGenericCodeMaster egcm , EvolveSO esqi	WHERE egcm.EvolveGenericCodeMaster_Key ='Channel' 	AND egcm.EvolveGenericCodeMaster_ID = esqi.EvolveSO_Channel_ID AND 	esqi.EvolveSO_ID = @EvolveSO_ID) 	as channel , (SELECT egcm.EvolveGenericCodeMaster_Value  FROM EvolveGenericCodeMaster egcm , EvolveSO esqi	WHERE egcm.EvolveGenericCodeMaster_Key ='Taxenv' 	AND egcm.EvolveGenericCodeMaster_ID = esqi.EvolveSO_TaxEnv_ID AND 	esqi.EvolveSO_ID = @EvolveSO_ID) as taxEnv ,	(SELECT egcm.EvolveGenericCodeMaster_Value  FROM EvolveGenericCodeMaster egcm , EvolveSO esqi	WHERE egcm.EvolveGenericCodeMaster_Key ='MOD'  	AND egcm.EvolveGenericCodeMaster_ID = esqi.EvolveSO_Channel_ID	AND esqi.EvolveSO_ID = @EvolveSO_ID) as modeOfDelivery 	, convert(varchar, getdate(), 105) as currentDate ,	convert(varchar,esq.EvolveSO_ReleaseDate, 105) as releaseDate  ,	convert(varchar,esq.EvolveSO_UpdatedAt, 105) as updatedDate , 	convert(varchar,esq.EvolveSO_SubmitDate, 105) as submitDate ,	eu.EvolveUnit_Code , ec.EvolveCustomer_Code , ec.EvolveCustomer_Name , ec.EvolveCustomer_Currency ,  ect.EvolveCreditTerms_Code   , ep.EvolveProject_Code , etc.EvolveTaxClass_Code		FROM    EvolveUnit eu , EvolveCustomer ec  ,  EvolveCreditTerms ect    ,EvolveProject ep   , EvolveSO esq  LEFT JOIN   EvolveTaxClass etc  ON  esq.EvolveSO_TaxClass_ID = etc.EvolveTaxClass_ID	WHERE EvolveSO_ID = @EvolveSO_ID 	AND esq.EvolveUnit_ID = eu.EvolveUnit_ID 		AND esq.EvolveSO_Customer_ID = ec.EvolveCustomer_ID	AND esq.EvolveCreditTerms_ID = ect.EvolveCreditTerms_ID AND esq.EvolveSO_Project_ID = 	ep.EvolveProject_ID");
  } catch (error) {
    Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
    return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
  }
},
getSingelSalesQuoteDetails : async function (EvolveSO_ID) {
  try {
    return await Evolve.SqlPool.request()
    .input('EvolveSO_ID', Evolve.Sql.Int, EvolveSO_ID)
    // .query("  SELECT esqd.*, convert(varchar, esqd.EvolveSODetails_ReqdDate, 103)  as reqDate ,   convert(varchar, esqd.EvolveSODetails_PromiseDate, 103)  as promiseDate,   convert(varchar, esqd.EvolveSODetails_DueDate, 103)  as dueDate  , ei.EvolveItem_Code ,ei.EvolveItem_ItemUnitPrice  FROM EvolveSODetails  esqd , EvolveItem ei  WHERE esqd.EvolveSO_ID = @EvolveSO_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");

    .query("  SELECT esqd.EvolveSODetails_ItemUnitPrice as EvolveItem_ItemUnitPrice , esqd.EvolveSODetails_ID , esqd.EvolveSO_ID ,esqd.EvolveSODetails_LineNo ,esqd.EvolveSODetails_TaxEnv_ID , esqd.EvolveItem_ID ,esqd.EvolveSODetails_Qty,esqd.EvolveSODetails_CustomerUnitPrice ,esqd.EvolveSODetails_CustomerDiscount,esqd.EvolveTaxClass_ID ,esqd.EvolveSODetails_Comments , convert(varchar, esqd.EvolveSODetails_ReqdDate, 105)  as EvolveSODetails_ReqdDate ,   convert(varchar, esqd.EvolveSODetails_PromiseDate, 105)  as EvolveSODetails_PromiseDate,   convert(varchar, esqd.EvolveSODetails_DueDate, 105)  as EvolveSODetails_DueDate  , ei.EvolveItem_Code FROM EvolveSODetails  esqd , EvolveItem ei  WHERE esqd.EvolveSO_ID = @EvolveSO_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");
  } catch (error) {
    Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
    return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
  }
},





      






 



}