'use strict';
const Evolve = require('../../../../Boot/Evolve');
const { date } = require('joi');
module.exports = {

    
    getReasonParentList : async function () {
        try {
          return await Evolve.SqlPool.request()
          .query("select EvolveReason_ID,EvolveReason_Name,EvolveReason_Type from EvolveReason where EvolveReason_IsParent='1'")
        } catch (error) {
          Evolve.Log.error(" EERR3153: Error while getting parent List"+error.message);
          return new Error(" EERR3153: Error while getting parent List "+error.message);
        }
      },

      getReasonTypeChildList: async function(data){
            try{
                return await Evolve.SqlPool.request()
                
                .input('EvolveReason_Type',Evolve.Sql.NVarChar, data.EvolveReason_Type)
                .query("SELECT EvolveReason_ID,EvolveReason_Type,EvolveReason_Name FROM EvolveReason WHERE EvolveReason_Type=@EvolveReason_Type AND EvolveReason_IsParent='0'")

          }catch(error){
                Evolve.Log.error(" EERR3154: Error while getReasonTypeChildList "+error.message);
                return new Error(" EERR3154: Error while getReasonTypeChildList "+error.message);
            
        }
      },

      insertSubReason: async function (data) {
        
        try {
          let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveSubReason_ActualReason_ID', Evolve.Sql.Int, data.EvolveSubReason_ActualReason_ID)
                .input('EvolveSubReason_SubReason_ID', Evolve.Sql.Int, data.EvolveSubReason_SubReason_ID)
                .input('EvolveSubReason_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveSubReason_CreateUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveSubReason_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveSubReason_UpdateUser',Evolve.Sql.NVarChar,data.EvolveUser_ID)
                .query('INSERT INTO EvolveSubReason(EvolveSubReason_ActualReason_ID,EvolveSubReason_SubReason_ID,EvolveSubReason_CreatedAt,EvolveSubReason_CreateUser,EvolveSubReason_UpdatedAt,EvolveSubReason_UpdateUser) values(@EvolveSubReason_ActualReason_ID,@EvolveSubReason_SubReason_ID,@EvolveSubReason_CreatedAt,@EvolveSubReason_CreateUser,@EvolveSubReason_UpdatedAt,@EvolveSubReason_UpdateUser) ');
        } catch (error) {
            Evolve.Log.error(" EERR3155: Error while inserting Sub Reason "+error.message);
            return new Error(" EERR3155: Error while updating Section "+error.message);
        }
     
    },

    checkSubReasons: async function(data){
      try{
        return await Evolve.SqlPool.request()
        .input('EvolveSubReason_ActualReason_ID',Evolve.Sql.Int, data.EvolveSubReason_ActualReason_ID)
        .input('EvolveSubReason_SubReason_ID',Evolve.Sql.Int, data.EvolveSubReason_SubReason_ID)
        .query("select COUNT (EvolveSubReason_ID) as count from EvolveSubReason where EvolveSubReason_ActualReason_ID=@EvolveSubReason_ActualReason_ID AND EvolveSubReason_SubReason_ID=@EvolveSubReason_SubReason_ID ")
      }catch(e){
        Evolve.Log.error(" EERR3156: Error while checking subreasons "+error.message);
        return new Error(" EERR3156: Error while checking subreasons "+error.message);
      }
    },

    getAllSubReasonCount: async function (search) {
      try {
          return await Evolve.SqlPool.request()
              .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
              .query('SELECT COUNT (esr.EvolveSubReason_ID) as count from EvolveReason er, EvolveSubReason esr WHERE esr.EvolveSubReason_ActualReason_ID=er.EvolveReason_ID AND er.EvolveReason_Name LIKE @search');
      } catch (error) {
          Evolve.Log.error(" EERR3157 : Error while get subreason count " + error.message);
          return new Error(" EERR3157 : Error while get subreason count " + error.message);
      }
  },

    getSubReasonFinalList : async function (start, length,search) {
      try {
        return await Evolve.SqlPool.request()
        .input('start', Evolve.Sql.Int, start)
        .input('length', Evolve.Sql.Int, length)
        .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
        .query("   SELECT  esb.EvolveSubReason_ID , er.EvolveReason_Name AS EvolveReason_Name ,(SELECT EvolveReason_Name FROM EvolveReason WHERE   EvolveReason_ID = esb.EvolveSubReason_SubReason_ID) AS subReason   FROM EvolveSubReason esb , EvolveReason er WHERE er.EvolveReason_ID = esb.EvolveSubReason_ActualReason_ID AND EvolveReason_Name LIKE @search")
      } catch (error) {
        Evolve.Log.error("EERR3158 : Error while get subreason final list "+error.message);
        return new Error("EERR3158 : Error while get subreason final list "+error.message);
      }
    },

    updateSubReasons: async function (data) {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      try {
          return await Evolve.SqlPool.request()
          .input('EvolveSubReason_ID', Evolve.Sql.Int, data.EvolveSubReason_ID)
          .input('EvolveSubReason_ActualReason_ID', Evolve.Sql.Int, data.EvolveSubReason_ActualReason_ID)
          .input('EvolveSubReason_SubReason_ID', Evolve.Sql.Int, data.EvolveSubReason_SubReason_ID)
          .input('EvolveSubReason_CreatedAt', Evolve.Sql.NVarChar, dataTime)
          .input('EvolveSubReason_CreateUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
          .input('EvolveSubReason_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
          .input('EvolveSubReason_UpdateUser',Evolve.Sql.NVarChar,data.EvolveUser_ID)

          .query("UPDATE EvolveSubReason SET EvolveSubReason_ActualReason_ID=@EvolveSubReason_ActualReason_ID,EvolveSubReason_SubReason_ID=@EvolveSubReason_SubReason_ID,EvolveSubReason_CreatedAt=@EvolveSubReason_CreatedAt,EvolveSubReason_CreateUser=@EvolveSubReason_CreateUser,EvolveSubReason_UpdatedAt=@EvolveSubReason_UpdatedAt WHERE EvolveSubReason_ID=@EvolveSubReason_ID ")
      } catch (error) {
          Evolve.Log.error(" EERR3159: Error while updating SubReason "+error.message);
          return new Error(" EERR3159: Error while updating SubReason "+error.message);
      }
  },
  checkSubReasonsEdit: async function (data) {
    try{
      return await Evolve.SqlPool.request()
      .input('EvolveSubReason_ActualReason_ID',Evolve.Sql.Int, data.EvolveSubReason_ActualReason_ID)
      .input('EvolveSubReason_SubReason_ID',Evolve.Sql.Int, data.EvolveSubReason_SubReason_ID)
      .query("select COUNT (EvolveSubReason_ID) as count from EvolveSubReason where EvolveSubReason_ActualReason_ID=@EvolveSubReason_ActualReason_ID AND EvolveSubReason_SubReason_ID=@EvolveSubReason_SubReason_ID ")
    }catch(e){
      Evolve.Log.error(" EERR3160: Error while checking duplicacy "+error.message);
      return new Error(" EERR3160: Error while checking duplicacy "+error.message);
    }
},
// selectSingleSubReason: async function(data){
     
//     try{
//       return await Evolve.SqlPool.request()
//       .input('EvolveSubReason_ID',Evolve.Sql.Int, data.EvolveSubReason_ID)
//       .query("Select EvolveSubReason_ActualReason_ID, EvolveSubReason_SubReason_ID from EvolveSubReason where EvolveSubReason_ID=@EvolveSubReason_ID")
//     }catch(error){
//       Evolve.Log.error(" Error while updating Section "+error.message);
//       return new Error(" Error while updating Section "+error.message);
//     }
//   },
  selectSingleSubReason: async function(data){
      try{
  
        return await Evolve.SqlPool.request()
        .input('EvolveSubReason_ID',Evolve.Sql.Int, data.EvolveSubReason_ID)
        .query("Select EvolveSubReason_ActualReason_ID, EvolveSubReason_SubReason_ID from EvolveSubReason where EvolveSubReason_ID=@EvolveSubReason_ID")
      }catch(error){
        Evolve.Log.error(" EERR3161: Error while selecting single reason "+error.message);
        return new Error(" EERR3161: Error while selecting single reason "+error.message);
      }
    },
    delete_SubReason:async function(data){
     
      try{
        return await Evolve.SqlPool.request()
        .input('EvolveSubReason_ID',Evolve.Sql.Int, data.EvolveSubReason_ID)
        .query("DELETE FROM EvolveSubReason where EvolveSubReason_ID=@EvolveSubReason_ID")
      }catch(error){
        Evolve.Log.error(" EERR3161: Error while deleting  Section "+error.message);
        return new Error(" EERR3161: Error while deleting Section "+error.message);
      }

    }

    
 


}

