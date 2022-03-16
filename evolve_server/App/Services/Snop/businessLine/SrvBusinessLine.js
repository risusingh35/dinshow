'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  addBusinessLine: async function (data) {
    try {


      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveBusinessLine_Name', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Name)
        .input('EvolveBusinessLine_Code', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Code)
        .input('EvolveBusinessLine_Desc', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Desc)
        .input('EvolveBusinessLine_Status', Evolve.Sql.NVarChar, 'Active')
        .input('EvolveBusinessLine_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveBusinessLine_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessLine_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessLine_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query('INSERT INTO EvolveBusinessLine (EvolveBusinessLine_Name , EvolveBusinessLine_Code ,EvolveBusinessLine_Desc , EvolveBusinessLine_Status,EvolveBusinessLine_CreatedUser, EvolveBusinessLine_CreatedAt , EvolveBusinessLine_UpdatedAt,EvolveBusinessLine_UpdatedUser ) VALUES(@EvolveBusinessLine_Name , @EvolveBusinessLine_Code, @EvolveBusinessLine_Desc ,@EvolveBusinessLine_Status,@EvolveBusinessLine_CreatedUser,@EvolveBusinessLine_CreatedAt , @EvolveBusinessLine_UpdatedAt , @EvolveBusinessLine_UpdatedUser)')
    } catch (error) {
      Evolve.Log.error(" EERR2037: Error while adding business line "+error.message);
      return new Error(" EERR2037: Error while adding business line "+error.message);
    }
  },

  getbusinessLineListCount: async function (search) {
    try {
      return await Evolve.SqlPool.request()
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

        .query("SELECT  COUNT(EvolveBusinessLine_ID) as count FROM EvolveBusinessLine WHERE EvolveBusinessLine_Name LIKE @search OR EvolveBusinessLine_Code LIKE @search")
    } catch (error) {
      Evolve.Log.error(" EERR2038: Error getting business Line List Count "+error.message);
      return new Error(" EERR2038: Error getting business Line List Count "+error.message);
    }
  },

  getbusinessLineList: async function (start,length,search) {
    try {
      return await Evolve.SqlPool.request()
        .input('start',Evolve.Sql.Int,start)
        .input('length',Evolve.Sql.Int,length)
        .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

        .query("SELECT  * FROM EvolveBusinessLine WHERE EvolveBusinessLine_Name LIKE @search OR EvolveBusinessLine_Code LIKE @search ORDER BY EvolveBusinessLine_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
    } catch (error) {
      Evolve.Log.error(" EERR2039: Error while getting business Line List "+error.message);
      return new Error(" EERR2039: Error while getting business Line List "+error.message);
    }
  },

  getSingleBusinessLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT  * FROM EvolveBusinessLine WHERE EvolveBusinessLine_ID =" + data.EvolveBusinessLine_ID)
    } catch (error) {
      Evolve.Log.error(" EERR2040: Error while getting Single Business Line "+error.message);
      return new Error(" EERR2040: Error while getting Single Business Line "+error.message);
    }
  },

  updateBusinessLine: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()

        .input('EvolveBusinessLine_ID', Evolve.Sql.Int, data.EvolveBusinessLine_ID)

        .input('EvolveBusinessLine_Name', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Name)
        .input('EvolveBusinessLine_Code', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Code)
        .input('EvolveBusinessLine_Desc', Evolve.Sql.NVarChar, data.EvolveBusinessLine_Desc)


        .input('EvolveBusinessLine_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessLine_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .query('UPDATE EvolveBusinessLine SET EvolveBusinessLine_Name=@EvolveBusinessLine_Name,EvolveBusinessLine_Code=@EvolveBusinessLine_Code,EvolveBusinessLine_Desc=@EvolveBusinessLine_Desc,EvolveBusinessLine_UpdatedAt=@EvolveBusinessLine_UpdatedAt,EvolveBusinessLine_UpdatedUser=@EvolveBusinessLine_UpdatedUser WHERE  EvolveBusinessLine_ID = @EvolveBusinessLine_ID');

    } catch (error) {
      Evolve.Log.error(" EERR2041: Error while updating Business Line "+error.message);
      return new Error(" EERR2041: Error while updating Business Line "+error.message);
    }
  },
  deleteBusinessLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("UPDATE EvolveBusinessLine SET EvolveBusinessLine_Status ='DeActive' WHERE EvolveBusinessLine_ID=" + data.id)
    } catch (error) {
      Evolve.Log.error(" EERR2042: Error while deleting Business Line "+error.message);
      return new Error(" EERR2042: Error while deleting Business Line "+error.message);
    }
  },
}