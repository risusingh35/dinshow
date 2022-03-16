'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemGroupListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
          .query("SELECT COUNT(EvolveItemGroup_ID) as count FROM EvolveItemGroup WHERE EvolveItemGroup_Name LIKE @search OR EvolveItemGroup_Code LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getItemGroupList: async function (start ,length,search) {
        try {
             return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("  SELECT  EvolveItemGroup_ID , EvolveItemGroup_Name  , EvolveItemGroup_Code , EvolveItemGroup_Desc FROM  EvolveItemGroup WHERE EvolveItemGroup_Name LIKE @search OR EvolveItemGroup_Code LIKE @search ORDER BY EvolveItemGroup_ID  DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY  "); 
        } catch (error) {
            Evolve.Log.error(" EERR1260: Error while getting Item Group List "+error.message);
            return new Error(" EERR1260: Error while getting Item Group List "+error.message);
        }
    },
    addItemGroup: async function (data) {
        try {
          
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
               
                .input('EvolveItemGroup_Name', Evolve.Sql.NVarChar, data.EvolveItemGroup_Name)
                .input('EvolveItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveItemGroup_Code)
                .input('EvolveItemGroup_Desc', Evolve.Sql.NVarChar, data.EvolveItemGroup_Desc)
                .input('EvolveItemGroup_CreatedAt', Evolve.Sql.NVarChar, dataTime)  
                .input('EvolveItemGroup_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveItemGroup_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveItemGroup_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                
                    .query("INSERT INTO EvolveItemGroup (EvolveItemGroup_Name, EvolveItemGroup_Code, EvolveItemGroup_Desc , EvolveItemGroup_CreatedAt,EvolveItemGroup_UpdateAt,EvolveItemGroup_CreatedUser,EvolveItemGroup_UpdateUser)VALUES(@EvolveItemGroup_Name, @EvolveItemGroup_Code, @EvolveItemGroup_Desc,@EvolveItemGroup_CreatedAt,@EvolveItemGroup_UpdateAt,@EvolveItemGroup_CreatedUser,@EvolveItemGroup_UpdateUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1261: Error while adding Item Group "+error.message);
            return new Error(" EERR1261: Error while adding Item Group "+error.message);
        }
    },
    getSingleGroupData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
                .query('SELECT EvolveItemGroup_ID , EvolveItemGroup_Name  , EvolveItemGroup_Code , EvolveItemGroup_Desc FROM EvolveItemGroup WHERE EvolveItemGroup_ID = @EvolveItemGroup_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1262: Error while getting Single Group Data "+error.message);
            return new Error(" EERR1262: Error while getting Single Group Data "+error.message);
        }
    },

    updateItemGroup: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
                .input('EvolveItemGroup_Name', Evolve.Sql.NVarChar, data.EvolveItemGroup_Name)
                .input('EvolveItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveItemGroup_Code)
                .input('EvolveItemGroup_Desc', Evolve.Sql.NVarChar, data.EvolveItemGroup_Desc)
                .input('EvolveItemGroup_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveItemGroup_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveItemGroup SET EvolveItemGroup_Name = @EvolveItemGroup_Name, EvolveItemGroup_Code = @EvolveItemGroup_Code, EvolveItemGroup_Desc = @EvolveItemGroup_Desc , EvolveItemGroup_UpdateAt = @EvolveItemGroup_UpdateAt  , EvolveItemGroup_UpdateUser = @EvolveItemGroup_UpdateUser  WHERE EvolveItemGroup_ID = @EvolveItemGroup_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1263: Error while updating Item Group "+error.message);
            return new Error(" EERR1263: Error while updating Item Group "+error.message);
        }
    },

    checkCodeExist: async function (data , action) {
        try {
            if(action == "add")
            {
           
            return await Evolve.SqlPool.request()
                .input('EvolveItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveItemGroup_Code)
                .query('SELECT EvolveItemGroup_ID FROM EvolveItemGroup WHERE EvolveItemGroup_Code=@EvolveItemGroup_Code')
            }
            else{
                return await Evolve.SqlPool.request()
                .input('EvolveItemGroup_Code', Evolve.Sql.NVarChar, data.EvolveItemGroup_Code)
                .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)

                .query('SELECT EvolveItemGroup_ID FROM EvolveItemGroup WHERE EvolveItemGroup_Code=@EvolveItemGroup_Code AND EvolveItemGroup_ID!=@EvolveItemGroup_ID ')
            }
        } catch (error) {
            Evolve.Log.error(" EERR1264: Error while checking Code Exist "+error.message);
            return new Error(" EERR1264: Error while checking Code Exist "+error.message);
        }
    },
}