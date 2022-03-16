'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalInProcessList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code LIKE @search ORDER BY EvolveStatusCodeMstr_Id DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR3038: Error while get status code list "+error.message);
            return new Error(" EERR3038: Error while get status code list "+error.message);
        }
    },
    addStatusCode: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveStatusCodeMstr_Type', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Type)
                .input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Code)
                .input('EvolveStatusCodeMstr_Desc', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Desc)
                .input('EvolveStatusCodeMstr_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStatusCodeMstr_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStatusCodeMstr_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStatusCodeMstr_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveStatusCodeMstr (EvolveStatusCodeMstr_Type, EvolveStatusCodeMstr_Code, EvolveStatusCodeMstr_Desc, EvolveStatusCodeMstr_CreatedAt, EvolveStatusCodeMstr_CreatedUser, EvolveStatusCodeMstr_UpdatedAt, EvolveStatusCodeMstr_UpdatedUser) VALUES (@EvolveStatusCodeMstr_Type, @EvolveStatusCodeMstr_Code, @EvolveStatusCodeMstr_Desc, @EvolveStatusCodeMstr_CreatedAt, @EvolveStatusCodeMstr_CreatedUser, @EvolveStatusCodeMstr_UpdatedAt, @EvolveStatusCodeMstr_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR3039: Erorr while add status code "+error.message);
            return new Error(" EERR3039: Erorr while add status code "+error.message);
        }
    },
    getSingleCodeDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveStatusCodeMstr_Id)
                .query('SELECT * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Id=@EvolveStatusCodeMstr_Id ');
        } catch (error) {
            Evolve.Log.error(" EERR3040: Error while get single code details "+error.message);
            return new Error(" EERR3040: Error while get single code details "+error.message);
        }
    },

    updateCodeDetails: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveStatusCodeMstr_Id)
                .input('EvolveStatusCodeMstr_Type', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Type)
                .input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Code)
                .input('EvolveStatusCodeMstr_Desc', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Desc)
                 .input('EvolveStatusCodeMstr_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStatusCodeMstr_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveStatusCodeMstr SET  EvolveStatusCodeMstr_Type = @EvolveStatusCodeMstr_Type,EvolveStatusCodeMstr_Code = @EvolveStatusCodeMstr_Code, EvolveStatusCodeMstr_Desc = @EvolveStatusCodeMstr_Desc, EvolveStatusCodeMstr_UpdatedAt = @EvolveStatusCodeMstr_UpdatedAt, EvolveStatusCodeMstr_UpdatedUser = @EvolveStatusCodeMstr_UpdatedUser WHERE EvolveStatusCodeMstr_Id = @EvolveStatusCodeMstr_Id');
        } catch (error) {
            Evolve.Log.error(" EERR3041: Error while update status code details "+error.message);
            return new Error(" EERR3041: Error while update status code details "+error.message);
        }
    },
    checkStatusCode: async function (data , type) {
        try {
            if(type == 'INSERT')
            {
              return await Evolve.SqlPool.request()
                
                .input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Code)
                .query('SELECT  * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code =@EvolveStatusCodeMstr_Code ')

            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveStatusCodeMstr_Id)
                .input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Code)
                .query('SELECT  * FROM  EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code =@EvolveStatusCodeMstr_Code AND EvolveStatusCodeMstr_Id != @EvolveStatusCodeMstr_Id ')
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR3042 : Error while check status code "+error.message);
            return new Error(" EERR3042 : Error while check status code "+error.message);
        }
    },

    
  


}