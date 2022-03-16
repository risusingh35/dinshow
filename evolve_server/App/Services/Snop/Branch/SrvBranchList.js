'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
  addBranch: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveBranch_Name', Evolve.Sql.NVarChar, data.EvolveBranch_Name)
        .input('EvolveBranch_Name', Evolve.Sql.NVarChar, data.EvolveBranch_Name)
        .input('EvolveBranch_Code', Evolve.Sql.NVarChar, data.EvolveBranch_Code)
        .input('EvolveBranch_Desc', Evolve.Sql.NVarChar, data.EvolveBranch_Desc)
        .input('EvolveBranch_City', Evolve.Sql.NVarChar, data.EvolveBranch_City)
        .input('EvolveBranch_State', Evolve.Sql.NVarChar, data.EvolveBranch_State)
        .input('EvolveBranch_Address', Evolve.Sql.NVarChar, data.EvolveBranch_Address)
        .input('EvolveBranch_Pin', Evolve.Sql.NVarChar, data.EvolveBranch_Pin)
        .input('EvolveBranch_GST', Evolve.Sql.NVarChar, data.EvolveBranch_GST)
        .input('EvolveBranch_Email', Evolve.Sql.NVarChar, data.EvolveBranch_Email)
        .input('EvolveBranch_Phone', Evolve.Sql.NVarChar, data.EvolveBranch_Phone)
        .input('EvolveBranch_Region', Evolve.Sql.NVarChar, data.EvolveBranch_Region)
        .input('EvolveBranch_Status', Evolve.Sql.NVarChar, "Active")
        .input('EvolveBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveBranch_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBranch_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .query("INSERT INTO EvolveBranch (EvolveBranch_Name , EvolveBranch_Code ,EvolveBranch_Desc , EvolveBranch_City,EvolveBranch_CreatedUser, EvolveBranch_CreatedAt , EvolveBranch_UpdatedAt,EvolveBranch_UpdatedUser,EvolveBranch_State,EvolveBranch_Address,EvolveBranch_Pin,EvolveBranch_GST,EvolveBranch_Email,EvolveBranch_Phone,EvolveBranch_Region ,EvolveBranch_Status) VALUES(@EvolveBranch_Name , @EvolveBranch_Code, @EvolveBranch_Desc ,@EvolveBranch_City,@EvolveBranch_CreatedUser,@EvolveBranch_CreatedAt , @EvolveBranch_UpdatedAt , @EvolveBranch_UpdatedUser,@EvolveBranch_State,@EvolveBranch_Address,@EvolveBranch_Pin,@EvolveBranch_GST,@EvolveBranch_Email,@EvolveBranch_Phone,@EvolveBranch_Region,@EvolveBranch_Status)select @@IDENTITY AS \'inserted_id\'")
    } catch (error) {
      Evolve.Log.error(" EERR2009: Error while adding Branch "+error.message);
      return new Error(" EERR2009: Error while adding Branch "+error.message);
    }
  },

  updateBranch: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveBranch_ID', Evolve.Sql.NVarChar, data.EvolveBranch_ID)

        .input('EvolveBranch_Name', Evolve.Sql.NVarChar, data.EvolveBranch_Name)
        .input('EvolveBranch_Code', Evolve.Sql.NVarChar, data.EvolveBranch_Code)
        .input('EvolveBranch_Desc', Evolve.Sql.NVarChar, data.EvolveBranch_Desc)
        .input('EvolveBranch_City', Evolve.Sql.NVarChar, data.EvolveBranch_City)

        .input('EvolveBranch_State', Evolve.Sql.NVarChar, data.EvolveBranch_State)
        .input('EvolveBranch_Address', Evolve.Sql.NVarChar, data.EvolveBranch_Address)
        .input('EvolveBranch_Pin', Evolve.Sql.NVarChar, data.EvolveBranch_Pin)

        .input('EvolveBranch_GST', Evolve.Sql.NVarChar, data.EvolveBranch_GST)
        .input('EvolveBranch_Email', Evolve.Sql.NVarChar, data.EvolveBranch_Email)
        .input('EvolveBranch_Phone', Evolve.Sql.NVarChar, data.EvolveBranch_Phone)
        .input('EvolveBranch_Region', Evolve.Sql.NVarChar, data.EvolveBranch_Region)
        // .input('EvolveBranch_Status', Evolve.Sql.NVarChar, 'Active')

        // .input('EvolveBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        // .input('EvolveBranch_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBranch_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

        .query(' UPDATE EvolveBranch SET  EvolveBranch_Name=@EvolveBranch_Name , EvolveBranch_Code=@EvolveBranch_Code , EvolveBranch_Desc = @EvolveBranch_Desc , EvolveBranch_City = @EvolveBranch_City , EvolveBranch_State =@EvolveBranch_State , EvolveBranch_Address =@EvolveBranch_Address , EvolveBranch_Pin = @EvolveBranch_Pin , EvolveBranch_GST = @EvolveBranch_GST ,EvolveBranch_Email =@EvolveBranch_Email ,EvolveBranch_Phone =@EvolveBranch_Phone ,  EvolveBranch_Region =@EvolveBranch_Region , EvolveBranch_UpdatedAt =@EvolveBranch_UpdatedAt ,  EvolveBranch_UpdatedUser =@EvolveBranch_UpdatedUser WHERE EvolveBranch_ID =@EvolveBranch_ID')
    } catch (error) {
      Evolve.Log.error(" EERR2010: Error while updating Branch "+error.message);
      return new Error(" EERR2010: Error while updating Branch "+error.message);
    }
  }, 

  getbusinessLineList: async function (start,length) {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT * FROM EvolveBusinessLine")
    } catch (error) {
      Evolve.Log.error(" EERR2011: Error while getting business Line List "+error.message);
      return new Error(" EERR2011: Error while getting business Line List "+error.message);
    }
  },

  getBranchListCount : async function (search) {
    try {
      return await Evolve.SqlPool.request()
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
      .query("SELECT COUNT(EvolveBranch_ID) as count FROM EvolveBranch WHERE EvolveBranch_Name LIKE @search OR EvolveBranch_Code LIKE @search  ")
    } catch (error) {
      Evolve.Log.error(" EERR2012: Error while getting Branch List Count "+error.message);
      return new Error(" EERR2012: Error while getting Branch List Count "+error.message);
    }
  },


  getBranchList: async function (start ,length,search) {
    try {
      return await Evolve.SqlPool.request()
        .input('start',Evolve.Sql.Int,start)
        .input('length',Evolve.Sql.Int,length)
        .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

        .query("SELECT * FROM EvolveBranch WHERE EvolveBranch_Name LIKE @search OR EvolveBranch_Code LIKE @search ORDER BY EvolveBranch_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
    } catch (error) {
      Evolve.Log.error(" EERR2013: Error while getting Branch List "+error.message);
      return new Error(" EERR2013: Error while getting Branch List "+error.message);
    }
  },

  selectSingleBranch: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT eb.* FROM EvolveBranch eb WHERE eb.EvolveBranch_ID =  " + data.EvolveBranch_ID)

      //  AND eb.EvolveBranch_ID ="+data.EvolveBranch_ID+AND ebl.EvolveBranch_ID=+EvolveBranch_ID )
    } catch (error) {
      Evolve.Log.error(" EERR2014: Error while selecting Single Branch "+error.message);
      return new Error(" EERR2014: Error while selecting Single Branch "+error.message);
    }
  },


  selectAssignMent: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT ebbl.EvolveBusinessLine_ID , ebl.EvolveBusinessLine_Code  FROM EvolveBusinessBranchLink ebbl , EvolveBusinessLine ebl WHERE EvolveBranch_ID =" + data.EvolveBranch_ID + "AND ebl.EvolveBusinessLine_ID = ebbl.EvolveBusinessLine_ID")




      //  AND eb.EvolveBranch_ID ="+data.EvolveBranch_ID+AND ebl.EvolveBranch_ID=+EvolveBranch_ID )
    } catch (error) {
      Evolve.Log.error(" EERR2015: Error while selecting AssignMent "+error.message);
      return new Error(" EERR2015: Error while selecting AssignMent "+error.message);
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
      Evolve.Log.error(" EERR2016: Error while updating Business Line "+error.message);
      return new Error(" EERR2016: Error while updating Business Line "+error.message);
    }
  },


  deleteSingleBranch: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("UPDATE EvolveBranch SET EvolveBranch_Status ='DeActive' WHERE EvolveBranch_ID=" + data.id)
    } catch (error) {
      Evolve.Log.error(" EERR2017: Error while deleting Single Branch "+error.message);
      return new Error(" EERR2017: Error while deleting Single Branch "+error.message);
    }
  },

  deActiveAssignMent: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("UPDATE EvolveBusinessBranchLink SET EvolveBusinessBranchLink_Status ='DeActive' WHERE EvolveBranch_ID=" + data.id)
    } catch (error) {
      Evolve.Log.error(" EERR2018: Error in deActive AssignMent "+error.message);
      return new Error(" EERR2018: Error in deActive AssignMent "+error.message);
    }
  },

  assignLineToBranch: async function (EvolveBranch_ID, userid, EvolveBusinessLine_ID) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveBusinessLine_ID', Evolve.Sql.Int, EvolveBusinessLine_ID)
        .input('EvolveBranch_ID', Evolve.Sql.Int, EvolveBranch_ID)

        .input('EvolveBusinessBranchLink_Status', Evolve.Sql.NVarChar, "Active")
        .input('EvolveBusinessBranchLink_CreatedUser', Evolve.Sql.Int, userid)
        .input('EvolveBusinessBranchLink_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessBranchLink_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessBranchLink_UpdatedUser', Evolve.Sql.Int, userid)

        .query("INSERT INTO EvolveBusinessBranchLink (EvolveBusinessLine_ID , EvolveBranch_ID , EvolveBusinessBranchLink_CreatedUser, EvolveBusinessBranchLink_CreatedAt , EvolveBusinessBranchLink_UpdatedAt,EvolveBusinessBranchLink_UpdatedUser ,EvolveBusinessBranchLink_Status) VALUES(@EvolveBusinessLine_ID , @EvolveBranch_ID, @EvolveBusinessBranchLink_CreatedUser,@EvolveBusinessBranchLink_CreatedAt , @EvolveBusinessBranchLink_UpdatedAt , @EvolveBusinessBranchLink_UpdatedUser ,@EvolveBusinessBranchLink_Status)")
    } catch (error) {
      Evolve.Log.error(" EERR2019: Error while assigning Line To Branch "+error.message);
      return new Error(" EERR2019: Error while assigning Line To Branch "+error.message);
    }
  },

  updateBusinessLineToBranch: async function (EvolveBranch_ID, EvolveUser_ID, EvolveBusinessLine_ID) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input('EvolveBusinessLine_ID', Evolve.Sql.Int, EvolveBusinessLine_ID)
        .input('EvolveBranch_ID', Evolve.Sql.Int, EvolveBranch_ID)

        .input('EvolveBusinessBranchLink_Status', Evolve.Sql.NVarChar, "Active")
        .input('EvolveBusinessBranchLink_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
        .input('EvolveBusinessBranchLink_CreatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessBranchLink_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
        .input('EvolveBusinessBranchLink_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)

        .query("INSERT INTO EvolveBusinessBranchLink (EvolveBusinessLine_ID , EvolveBranch_ID , EvolveBusinessBranchLink_CreatedUser, EvolveBusinessBranchLink_CreatedAt , EvolveBusinessBranchLink_UpdatedAt,EvolveBusinessBranchLink_UpdatedUser ,EvolveBusinessBranchLink_Status) VALUES(@EvolveBusinessLine_ID , @EvolveBranch_ID, @EvolveBusinessBranchLink_CreatedUser,@EvolveBusinessBranchLink_CreatedAt , @EvolveBusinessBranchLink_UpdatedAt , @EvolveBusinessBranchLink_UpdatedUser ,@EvolveBusinessBranchLink_Status)")
    } catch (error) {
      Evolve.Log.error(" EERR2020: Error while updating Business Line To Branch "+error.message);
      return new Error(" EERR2020: Error while updating Business Line To Branch "+error.message);
    }
  },


  deleteLineToBranch: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .query("DELETE  FROM EvolveBusinessBranchLink WHERE EvolveBranch_ID = " + data)
    } catch (error) {
      Evolve.Log.error(" EERR2021: Error while deleting Line To Branch "+error.message);
      return new Error(" EERR2021: Error while deleting Line To Branch "+error.message);
    }
  },
}