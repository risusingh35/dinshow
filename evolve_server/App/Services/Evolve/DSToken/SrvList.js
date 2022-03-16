'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDSTokenListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveDSToken_ID) as count FROM EvolveDSToken dst, EvolveUser eu WHERE dst.EvolveUser_ID = eu.EvolveUser_ID AND (EvolveDSToken_Name LIKE @search OR EvolveDSToken_Code LIKE @search OR EvolveUser_Name LIKE @search)")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
      getDSTokenList: async function  (start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT dst.*, eu.EvolveUser_Name FROM EvolveDSToken dst, EvolveUser eu  WHERE dst.EvolveUser_ID = eu.EvolveUser_ID AND (EvolveDSToken_Name LIKE @search OR EvolveDSToken_Code LIKE @search OR EvolveUser_Name LIKE @search) ORDER BY EvolveDSToken_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1443: Error while geting DS Token list "+error.message);
            return new Error(" EERR1443: Error while geting DS Token list "+error.message);
        }
    },
    getUserList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveUser");
        } catch (error) {
            Evolve.Log.error(" EERR1444: Error while getting User List "+error.message);
            return new Error(" EERR1444: Error while getting User List "+error.message);
        }
    },  
   
    deleteSection: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSection WHERE EvolveSection_ID =@EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1445: Error while deleting Section "+error.message);
            return new Error(" EERR1445: Error while deleting Section "+error.message);
        }
    },

    updateDSToken: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        let dt = data.EvolveDSToken_ExpiryDate.split("/")
        let EvolveDSToken_ExpiryDate = dt[2] + "-" + dt[1] + "-" + dt[0];
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveDSToken_ID', Evolve.Sql.Int, data.EvolveDSToken_ID)
            .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser)
            .input('EvolveDSToken_Name', Evolve.Sql.NVarChar, data.EvolveDSToken_Name)
            .input('EvolveDSToken_Code', Evolve.Sql.NVarChar, data.EvolveDSToken_Code)
            .input('EvolveDSToken_Pin', Evolve.Sql.NVarChar, data.EvolveDSToken_Pin)
            .input('EvolveDSToken_Token', Evolve.Sql.NVarChar, data.EvolveDSToken_Token)
            .input('EvolveDSToken_Desc', Evolve.Sql.NVarChar, data.EvolveDSToken_Desc)
            .input('EvolveDSToken_ExpiryDate', Evolve.Sql.NVarChar, EvolveDSToken_ExpiryDate)
            
        
            .input('EvolveDSToken_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveDSToken_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .query("UPDATE EvolveDSToken SET EvolveUser_ID = @EvolveUser_ID, EvolveDSToken_Name = @EvolveDSToken_Name, EvolveDSToken_Code = @EvolveDSToken_Code, EvolveDSToken_Pin = @EvolveDSToken_Pin ,EvolveDSToken_Token=@EvolveDSToken_Token ,  EvolveDSToken_Desc=@EvolveDSToken_Desc, EvolveDSToken_UpdatedUser = @EvolveDSToken_UpdatedUser, EvolveDSToken_UpdatedAt = @EvolveDSToken_UpdatedAt, EvolveDSToken_ExpiryDate = @EvolveDSToken_ExpiryDate WHERE EvolveDSToken_ID = @EvolveDSToken_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1446: Error while updating DS Token "+error.message);
            return new Error(" EERR1446: Error while updating DS Token "+error.message);
        }
    },


    addDSToken: async function (data) {
        try {
            let dt = data.EvolveDSToken_ExpiryDate.split("/")
            let EvolveDSToken_ExpiryDate = dt[2] + "-" + dt[1] + "-" + dt[0];
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser)
                .input('EvolveDSToken_Name', Evolve.Sql.NVarChar, data.EvolveDSToken_Name)
                .input('EvolveDSToken_Code', Evolve.Sql.NVarChar, data.EvolveDSToken_Code)
                .input('EvolveDSToken_Pin', Evolve.Sql.NVarChar, data.EvolveDSToken_Pin)
                .input('EvolveDSToken_Token', Evolve.Sql.NVarChar, data.EvolveDSToken_Token)
                .input('EvolveDSToken_Desc', Evolve.Sql.NVarChar, data.EvolveDSToken_Desc)
                .input('EvolveDSToken_ExpiryDate', Evolve.Sql.NVarChar, EvolveDSToken_ExpiryDate)
            
                .input('EvolveDSToken_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDSToken_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDSToken_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDSToken_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveDSToken (EvolveUser_ID,EvolveDSToken_Name,EvolveDSToken_Code,EvolveDSToken_Pin,EvolveDSToken_Token,EvolveDSToken_Desc, EvolveDSToken_CreatedUser,EvolveDSToken_CreatedAt,EvolveDSToken_UpdatedUser,EvolveDSToken_UpdatedAt, EvolveDSToken_ExpiryDate) VALUES (@EvolveUser_ID,@EvolveDSToken_Name,@EvolveDSToken_Code,@EvolveDSToken_Pin,@EvolveDSToken_Token,@EvolveDSToken_Desc,@EvolveDSToken_CreatedUser,@EvolveDSToken_CreatedAt,@EvolveDSToken_UpdatedUser,@EvolveDSToken_UpdatedAt, @EvolveDSToken_ExpiryDate)');

           
        } catch (error) {
            Evolve.Log.error(" EERR1449: Error while creating DS Token "+error.message);
            return new Error(" EERR1449: Error while creating DS Token "+error.message);
        }
    },

    getSingleDSToken: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveDSToken_ID', Evolve.Sql.Int, data.EvolveDSToken_ID)
            .query("SELECT * From EvolveDSToken WHERE EvolveDSToken_ID = @EvolveDSToken_ID")
            
        } catch (error) {
            Evolve.Log.error(" EERR1450: Error while selecting Single DS Token "+error.message);
            return new Error(" EERR1450: Error while selecting Single DS Token "+error.message);
        }
    },
    


}