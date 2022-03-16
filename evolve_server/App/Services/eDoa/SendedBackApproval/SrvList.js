'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getApprovalListCount: async function (search ,EvolveUser_ID) {
        try {
            let query  ;
         
              query =  "SELECT COUNT(eap.EvolveApprovalProcess_ID) as count FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm     WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_IsOnGroundLevel=1  AND eap.EvolveApprovalProcess_CreatedUser=@EvolveUser_ID "

            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)

            .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix count "+error.message);
            return new Error(" EERR####: Error while get approval matrix count "+error.message);
        }
    },

    getApprovalList: async function (start, length ,search , EvolveUser_ID )  {
        try {

            let query  ;


            query =  "SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm  , EvolveSalesQuote esq    WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_IsOnGroundLevel=1 AND esq.EvolveSalesQuote_ID = eap.EvolveApprovalProcess_PrimaryID AND esq.EvolveSalesQuote_Status != 'SAVED'  AND eap.EvolveApprovalProcess_CreatedUser=@EvolveUser_ID  ORDER BY eap.EvolveApprovalProcess_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)


                .query(query);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix list "+error.message);
            return new Error(" EERR####: Error while get approval matrix list "+error.message);
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
            
                .input('EvolveApprovalProcess_ID', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_Status', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_Status)
                .input('EvolveApprovalProcess_CurrentIndex', Evolve.Sql.Int, data.EvolveApprovalProcess_CurrentIndex)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_CurrentIndex=@EvolveApprovalProcess_CurrentIndex , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt , EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser  WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details "+error.message);
            return new Error(" EERR####: Erorr while add approval process details "+error.message);
        }
    },
    updateProcesStatusToError: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveApprovalProcess_ID', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ID)
                .input('EvolveApprovalProcess_ErrorCode', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ErrorCode)
                .input('EvolveApprovalProcess_ErrorDetails', Evolve.Sql.NVarChar, data.EvolveApprovalProcess_ErrorDetails)
                .input('EvolveApprovalProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_ErrorCode=@EvolveApprovalProcess_ErrorCode ,EvolveApprovalProcess_ErrorDetails=@EvolveApprovalProcess_ErrorDetails , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt , EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser  WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID");

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval process details "+error.message);
            return new Error(" EERR####: Erorr while add approval process details "+error.message);
        }
    },
    getUserNameById: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query('SELECT EvolveUser_Name  FROM  EvolveUser WHERE EvolveUser_ID=@EvolveUser_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user name by id "+error.message);
            return new Error(" EERR####: Error while get user name by id "+error.message);
        }
    },
    getItemDetails: async function (EvolveItem_ID) {
        try {
              return await Evolve.SqlPool.request()
                
                .input('EvolveItem_ID', Evolve.Sql.NVarChar, EvolveItem_ID)
                .query('SELECT  EvolveItem_Code , EvolveItem_Desc FROM  EvolveItem WHERE EvolveItem_ID =@EvolveItem_ID ')

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get item details "+error.message);
            return new Error(" EERR#### : Error while get item details "+error.message);
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
    getUserListOfMatrixIndex: async function (data) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_Seq)
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)

                .query("   SELECT eapmd.EvolveApprovalMatrixDetails_Value as EvolveUser_ID  , eu.EvolveUser_Name FROM   EvolveApprovalMatrixDetails eapmd , EvolveApprovalMatrixIndex eapi ,EvolveUser eu  WHERE eapmd.EvolveApprovalMatrixIndex_ID = eapi.EvolveApprovalMatrixIndex_ID   AND eapi.EvolveApprovalMatrixIndex_Seq =@EvolveApprovalMatrixIndex_Seq AND eapi.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID AND eapmd.EvolveApprovalMatrixDetails_Key ='USERID' AND eapmd.EvolveApprovalMatrixDetails_Value = eu.EvolveUser_ID")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get index user list "+error.message);
            return new Error(" EERR#### : Error while get index user list "+error.message);
        }
    },
    getLastProcesDetail: async function (EvolveApprovalProcess_ID) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, EvolveApprovalProcess_ID)

                .query(" SELECT  TOP(1) * FROM EvolveApprovalProcessDetails WHERE EvolveApprovalProcess_ID =  @EvolveApprovalProcess_ID ORDER BY  EvolveApprovalProcessDetails_UpdatedAt DESC")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get last process detail "+error.message);
            return new Error(" EERR#### : Error while get last process detail "+error.message);
        }
    },
    getsalesQuoteDetails: async function (EvolveSalesQuote_ID) {
        try {
              return await Evolve.SqlPool.request()
                
                .input('EvolveSalesQuote_ID', Evolve.Sql.NVarChar, EvolveSalesQuote_ID)
                .query('  SELECT esq.EvolveSalesQuote_Serial  , ec.EvolveCustomer_name FROM  EvolveSalesQuote esq , EvolveCustomer ec WHERE esq.EvolveSalesQuote_ID = @EvolveSalesQuote_ID  AND esq.EvolveSalesQuote_Customer_ID = ec.EvolveCustomer_ID ')

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while sales quote details "+error.message);
            return new Error(" EERR#### : Error while sales quote details "+error.message);
        }
    },




}