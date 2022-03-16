'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getUserRole : async function (EvolveUser_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
        .query(" SELECT EvolveRole_ID FROM EvolveUserRoleLink  WHERE EvolveUser_ID=@EvolveUser_ID")
      } catch (error) {
        Evolve.Log.error(" EERR2520: Error while get user role "+error.message);
        return new Error(" EERR2520: Error while get user role "+error.message);
      }
    },
  getUserList : async function () {
      try {
        return await Evolve.SqlPool.request()
          .query("   SELECT  eu.EvolveUser_ID , eu.EvolveUser_Name ,eur.EvolveRole_ID FROM EvolveUser eu ,EvolveUserRoleLink eur WHERE eu.EvolveUser_ID=eur.EvolveUser_ID ORDER BY EvolveUser_ID ")
      } catch (error) {
        Evolve.Log.error(" EERR2521: Error while get user list "+error.message);
      return new Error(" EERR2521: Error while get user list "+error.message);
      }
    },
  getAppList : async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("  SELECT EvolveApp_ID , EvolveApp_Name FROM EvolveApp")
    } catch (error) {
      Evolve.Log.error(" EERR2522: Error while get app list "+error.message);
      return new Error(" EERR2522: Error while get app list "+error.message);
    }
  },
  getMenuList: async function (data) {
      try {
          return await Evolve.SqlPool.request()
              .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
              .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
              .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Name  ,(SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID =  @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned FROM EvolveMenu em INNER JOIN  EvolveRoleToMenu erm ON  erm.EvolveMenu_ID  = em.EvolveMenu_Id INNER JOIN   EvolveUserRoleLink eul ON  erm.EvolveRole_ID = eul.EvolveRole_ID  WHERE   eul.EvolveUser_ID =  @EvolveUser_ID AND  erm.EvolveApp_ID=  @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')
      } catch (error) {
          Evolve.Log.error(" EERR2523: Error while get menu list "+error.message);
          return new Error(" EERR2523: Error while get menu list "+error.message);
      }
  },

  getPageConfigs : async function (EvolveMeu_Id) {
      try {
          console.log("EvolveMeu_Id??>>>  ",  EvolveMeu_Id)
        return await Evolve.SqlPool.request()
        .input('EvolveMeu_Id', Evolve.Sql.Int, EvolveMeu_Id)

          .query("SELECT  EvolvePageConfig_ID , EvolvePageConfig_Key , EvolvePageConfig_Value FROM EvolvePageConfig WHERE  EvolveMenu_Id=@EvolveMeu_Id")
      } catch (error) {
        Evolve.Log.error(" EERR2524: Error while get page configs "+error.message);
        return new Error(" EERR2524: Error while get page configs "+error.message);
      }
    },
  checkExistRights: async function (data ,type) {
      try {
        if(type == 'INSERT'){
            return await Evolve.SqlPool.request()
            .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
            .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
            .query("SELECT * FROM  EvolveUserPageRights  WHERE  EvolvePageConfig_ID=@EvolvePageConfig_ID AND EvolveUser_ID=@EvolveUser_ID AND EvolveMenu_Id=@EvolveMenu_Id  ");
        }else{
          return await Evolve.SqlPool.request()
          .input('EvolveUserPageRights_ID', Evolve.Sql.Int, data.EvolveUserPageRights_ID)
          .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
          .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
          .query("SELECT * FROM  EvolveUserPageRights  WHERE  EvolvePageConfig_ID=@EvolvePageConfig_ID AND EvolveUser_ID=@EvolveUser_ID AND EvolveMenu_Id=@EvolveMenu_Id  AND EvolveUserPageRights_ID !=@EvolveUserPageRights_ID ");
        }
      } catch (error) {
          Evolve.Log.error(" EERR2525: Error while check existing rights "+error.message);
          return new Error(" EERR2525: Error while check existing rights "+error.message);
      }
  },
  addRights: async function (data) {
      try {
          let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          return await Evolve.SqlPool.request()
              
              .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
              .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
              .input('EvolveUserPageRights_Value', Evolve.Sql.NVarChar, data.EvolveUserPageRights_Value)  
              .input('EvolveUserPageRights_Desc', Evolve.Sql.NVarChar, data.EvolveUserPageRights_Desc)
              .input('EvolveUserPageRights_CreatedAt', Evolve.Sql.NVarChar, dataTime)  
              .input('EvolveUserPageRights_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
              .input('EvolveUserPageRights_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveUserPageRights_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveUserPageRights (EvolvePageConfig_ID, EvolveUser_ID, EvolveMenu_Id , EvolveUserPageRights_Value,EvolveUserPageRights_Desc,EvolveUserPageRights_CreatedAt,EvolveUserPageRights_UpdatedAt,EvolveUserPageRights_CreatedUser,EvolveUserPageRights_UpdatedUser)VALUES(@EvolvePageConfig_ID, @EvolveUser_ID, @EvolveMenu_Id,@EvolveUserPageRights_Value,@EvolveUserPageRights_Desc,@EvolveUserPageRights_CreatedAt,@EvolveUserPageRights_UpdatedAt,@EvolveUserPageRights_CreatedUser,@EvolveUserPageRights_UpdatedUser)");

      } catch (error) {
          Evolve.Log.error(" EERR2526: Error while add user rights "+error.message);
          return new Error(" EERR2526: Error while add user rights "+error.message);
      }
  },
  updateRights: async function (data) {
    try {
        let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
            
            .input('EvolveUserPageRights_ID', Evolve.Sql.Int, data.EvolveUserPageRights_ID)
            .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
            .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
            .input('EvolveUserPageRights_Value', Evolve.Sql.NVarChar, data.EvolveUserPageRights_Value)  
            .input('EvolveUserPageRights_Desc', Evolve.Sql.NVarChar, data.EvolveUserPageRights_Desc)
            .input('EvolveUserPageRights_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveUserPageRights_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveUserPageRights SET EvolvePageConfig_ID=@EvolvePageConfig_ID , EvolveUser_ID=@EvolveUser_ID , EvolveMenu_Id=@EvolveMenu_Id ,EvolveUserPageRights_Value=@EvolveUserPageRights_Value ,  EvolveUserPageRights_Desc=@EvolveUserPageRights_Desc ,EvolveUserPageRights_UpdatedAt=@EvolveUserPageRights_UpdatedAt ,EvolveUserPageRights_CreatedUser=@EvolveUserPageRights_CreatedUser WHERE EvolveUserPageRights_ID=@EvolveUserPageRights_ID ");

    } catch (error) {
        Evolve.Log.error(" EERR2527: Error while update user rights "+error.message);
        return new Error(" EERR2527: Error while update user rights "+error.message);
    }
},
  getUserRightsCount : async function (search) {
    try {
      return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
        .query(" SELECT COUNT(epr.EvolveUserPageRights_ID) as count  FROM  EvolveUserPageRights epr , EvolvePageConfig epg , EvolveUser eu , EvolveMenu em    WHERE epr.EvolveMenu_Id = em.EvolveMenu_Id AND epr.EvolveUser_ID = eu.EvolveUser_ID AND epr.EvolvePageConfig_ID = epg.EvolvePageConfig_ID AND eu.EvolveUser_Name LIKE @search")
    } catch (error) {
      Evolve.Log.error(" EERR2528: Error while get rights count "+error.message);
      return new Error(" EERR2528: Error while get rights count "+error.message);
    }
  },
  getUserRights: async function (start ,length,search) {
    try {
      return await Evolve.SqlPool.request()
        .input('start',Evolve.Sql.Int,start)
        .input('length',Evolve.Sql.Int,length)
        .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
        .query("  SELECT epr.EvolveUserPageRights_ID , epr.EvolveUserPageRights_Value , epr.EvolveUserPageRights_Desc  , eu.EvolveUser_Name , em.EvolveMenu_Name , epg.EvolvePageConfig_Key  FROM  EvolveUserPageRights epr , EvolvePageConfig epg , EvolveUser eu , EvolveMenu em     WHERE epr.EvolveMenu_Id = em.EvolveMenu_Id AND epr.EvolveUser_ID = eu.EvolveUser_ID AND epr.EvolvePageConfig_ID = epg.EvolvePageConfig_ID AND eu.EvolveUser_Name LIKE @search ORDER BY epr.EvolveUserPageRights_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
    } catch (error) {
      Evolve.Log.error(" EERR2529: Error while get user rights "+error.message);
      return new Error(" EERR2529: Error while get user rights "+error.message);
    }
  },
  getSingleRightsData: async function (data) {
      try {
          return await Evolve.SqlPool.request()
              .input('EvolveUserPageRights_ID', Evolve.Sql.Int, data.EvolveUserPageRights_ID)
              .query(' SELECT epr.EvolveUserPageRights_ID ,   epr.EvolvePageConfig_ID  ,epr.EvolveUser_ID  ,epr.EvolveMenu_Id  ,epr.EvolveUserPageRights_Value  ,epr.EvolveUserPageRights_Desc  , em.EvolveMenu_AppId   FROM EvolveUserPageRights epr ,EvolveMenu em   WHERE EvolveUserPageRights_ID=@EvolveUserPageRights_ID AND epr.EvolveMenu_Id = em.EvolveMenu_Id')
      } catch (error) {
          Evolve.Log.error(" EERR2530: Error while Get Single Rights Data "+error.message);
          return new Error(" EERR2530: Error while Get Single Rights Data "+error.message);
      }
  },
}