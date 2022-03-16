'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalListCount: async function () {
        try {
            return await Evolve.SqlPool.request()
            // .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

            .query("SELECT COUNT(eap.EvolveApprovalProcessHistory_ID) as count FROM EvolveApprovalProcessHistory eap  ,  EvolveApprovalMatrix eapm     WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix count "+error.message);
            return new Error(" EERR####: Error while get approval matrix count "+error.message);
        }
    },

    getApprovalList: async function (start, length ) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                // .input('search', Evolve.Sql.NVarChar, '%'+search+'%')


                // .query("SELECT eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq , eapi.EvolveApprovalMatrixIndex_ID ,  eapi.EvolveApprovalMatrixIndex_Seq FROM EvolveApprovalProcessHistory eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd   WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID   AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcessHistory_CurrentIndex AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID'  ORDER BY eap.EvolveApprovalProcessHistory_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

                .query("SELECT eap.* , convert(varchar, eap.EvolveApprovalProcessHistory_UpdatedAt , 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, eap.EvolveApprovalProcessHistory_UpdatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, eap.EvolveApprovalProcessHistory_UpdatedAt), 22), 3)) as time  , eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,  eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcessHistory eap  ,  EvolveApprovalMatrix eapm     WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  ORDER BY eap.EvolveApprovalProcessHistory_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix list "+error.message);
            return new Error(" EERR####: Error while get approval matrix list "+error.message);
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





}