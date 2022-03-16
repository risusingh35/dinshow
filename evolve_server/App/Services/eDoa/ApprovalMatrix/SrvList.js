'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalMatrixListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(EvolveApprovalMatrix_ID) as count  FROM EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR3037: Error while get approval matrix count "+error.message);
            return new Error(" EERR3037: Error while get approval matrix count "+error.message);
        }
    },

    getApprovalMatrixList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query('SELECT * FROM  EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Name LIKE @search ORDER BY EvolveApprovalMatrix_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR3038: Error while get approval matrix list "+error.message);
            return new Error(" EERR3038: Error while get approval matrix list "+error.message);
        }
    },
    addApprovalMatrix: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveApprovalMatrix_Type', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Type)
                .input('EvolveApprovalMatrix_Code', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Code)
                .input('EvolveApprovalMatrix_Name', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Name)
                .input('EvolveApprovalMatrix_Status', Evolve.Sql.Int, data.EvolveApprovalMatrix_Status)
                .input('EvolveApprovalMatrix_IsEmailNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsEmailNotif)
                .input('EvolveApprovalMatrix_IsMessageNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsMessageNotif)
                .input('EvolveApprovalMatrix_IsWPMessageNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsWPMessageNotif)
                .input('EvolveApprovalMatrix_IsQxtendReq', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsQxtendReq)
                .input('EvolveApprovalMatrix_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalMatrix_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApprovalMatrix_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalMatrix_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveApprovalMatrix (EvolveApprovalMatrix_Type, EvolveApprovalMatrix_Code, EvolveApprovalMatrix_Name,EvolveApprovalMatrix_Status, EvolveApprovalMatrix_IsEmailNotif ,EvolveApprovalMatrix_IsMessageNotif ,EvolveApprovalMatrix_IsQxtendReq ,EvolveApprovalMatrix_IsWPMessageNotif ,EvolveApprovalMatrix_CreatedAt, EvolveApprovalMatrix_CreatedUser, EvolveApprovalMatrix_UpdatedAt, EvolveApprovalMatrix_UpdatedUser) VALUES (@EvolveApprovalMatrix_Type, @EvolveApprovalMatrix_Code, @EvolveApprovalMatrix_Name, @EvolveApprovalMatrix_Status ,@EvolveApprovalMatrix_IsEmailNotif ,@EvolveApprovalMatrix_IsMessageNotif ,@EvolveApprovalMatrix_IsQxtendReq ,@EvolveApprovalMatrix_IsWPMessageNotif ,@EvolveApprovalMatrix_CreatedAt, @EvolveApprovalMatrix_CreatedUser, @EvolveApprovalMatrix_UpdatedAt, @EvolveApprovalMatrix_UpdatedUser); select @@IDENTITY AS \'inserted_id\'');

        } catch (error) {
            Evolve.Log.error(" EERR3039: Erorr while add approval matrix "+error.message);
            return new Error(" EERR3039: Erorr while add approval matrix "+error.message);
        }
    },
    getSingleMatrixDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
                .query('SELECT * FROM  EvolveApprovalMatrix WHERE EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR3040: Error while get single matrix details "+error.message);
            return new Error(" EERR3040: Error while get single matrix details "+error.message);
        }
    },

    updateApprovalMatrixDetails: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
                .input('EvolveApprovalMatrix_Type', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Type)
                .input('EvolveApprovalMatrix_Code', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Code)
                .input('EvolveApprovalMatrix_Name', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Name)
                .input('EvolveApprovalMatrix_Status', Evolve.Sql.Int, data.EvolveApprovalMatrix_Status)
                .input('EvolveApprovalMatrix_IsEmailNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsEmailNotif)
                .input('EvolveApprovalMatrix_IsMessageNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsMessageNotif)
                .input('EvolveApprovalMatrix_IsWPMessageNotif', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsWPMessageNotif)
                .input('EvolveApprovalMatrix_IsQxtendReq', Evolve.Sql.Int, data.EvolveApprovalMatrix_IsQxtendReq)
                .input('EvolveApprovalMatrix_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApprovalMatrix_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveApprovalMatrix SET  EvolveApprovalMatrix_Type = @EvolveApprovalMatrix_Type,EvolveApprovalMatrix_Code = @EvolveApprovalMatrix_Code, EvolveApprovalMatrix_Name = @EvolveApprovalMatrix_Name, EvolveApprovalMatrix_Status = @EvolveApprovalMatrix_Status, EvolveApprovalMatrix_IsEmailNotif = @EvolveApprovalMatrix_IsEmailNotif , EvolveApprovalMatrix_IsMessageNotif=@EvolveApprovalMatrix_IsMessageNotif ,EvolveApprovalMatrix_IsWPMessageNotif=@EvolveApprovalMatrix_IsWPMessageNotif , EvolveApprovalMatrix_IsQxtendReq=@EvolveApprovalMatrix_IsQxtendReq , EvolveApprovalMatrix_UpdatedAt=@EvolveApprovalMatrix_UpdatedAt , EvolveApprovalMatrix_UpdatedUser=@EvolveApprovalMatrix_UpdatedUser WHERE EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID');
        } catch (error) {
            Evolve.Log.error(" EERR3041: Error while update approval matrix details "+error.message);
            return new Error(" EERR3041: Error while update approval matrix details "+error.message);
        }
    },
    checkStatusCode: async function (data , type) {
        try {
            if(type == 'INSERT')
            {
              return await Evolve.SqlPool.request()
                
                .input('EvolveApprovalMatrix_Code', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Code)
                .query('SELECT  * FROM  EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Code =@EvolveApprovalMatrix_Code ')

            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
                .input('EvolveApprovalMatrix_Code', Evolve.Sql.NVarChar, data.EvolveApprovalMatrix_Code)
                .query('SELECT  * FROM  EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Code =@EvolveApprovalMatrix_Code AND EvolveApprovalMatrix_ID != @EvolveApprovalMatrix_ID ')
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR3042 : Error while check approval matrix "+error.message);
            return new Error(" EERR3042 : Error while check approval matrix "+error.message);
        }
    },


}