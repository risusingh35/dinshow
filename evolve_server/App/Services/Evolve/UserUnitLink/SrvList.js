'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMdiIconList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT DISTINCT EvolveMenu_Icon FROM EvolveMenu')
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while Assign Role To Menu " + error.message);
            return new Error(" EERR#### Error while Assign Role To Menu " + error.message);
        }
    },

    getUserUnitListCount: async function (search,condition) {
        try {
            console.log("condition",condition);
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT  COUNT(euserunit.EvolveUserUnitLink_ID) as count FROM EvolveUserUnitLink euserunit ,  EvolveUser eu , EvolveUnit eunit , EvolveRole er  WHERE euserunit.EvolveUser_ID = eu.EvolveUser_ID AND   euserunit.EvolveUnit_ID = eunit.EvolveUnit_ID AND euserunit.EvolveRole_ID = er.EvolveRole_ID   AND  EvolveUser_Name LIKE @search '+condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user unit Count "+error.message);
            return new Error(" EERR####: Error while get user unit Count "+error.message);
        }
    },

    getUserUnitList: async function (start, length ,search,condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('  SELECT  er.EvolveRole_ID , er.EvolveRole_Name , er.EvolveRole_Description ,  euserunit.*, eu.EvolveUser_Name ,eu.EvolveUser_login   ,eu.EvolveUser_EmailID ,   eunit.EvolveUnit_Code   ,  eunit.EvolveUnit_Name , eunit.EvolveUnit_Description   FROM EvolveUserUnitLink euserunit ,  EvolveUser eu , EvolveUnit eunit , EvolveRole er  WHERE euserunit.EvolveUser_ID = eu.EvolveUser_ID AND   euserunit.EvolveUnit_ID = eunit.EvolveUnit_ID AND euserunit.EvolveRole_ID = er.EvolveRole_ID  AND   EvolveUser_Name LIKE @search '+condition+' ORDER BY euserunit.EvolveUserUnitLink_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get user unit list"+error.message);
            return new Error(" EERR####: Error while get user unit list"+error.message);
        }
    },

    getUserList: async function (data) {
        try {
           let query = " SELECT TOP(20) EvolveUser_Name + ' - '+EvolveUser_login  as title, EvolveUser_ID as id FROM    EvolveUser WHERE    (EvolveUser_Name  LIKE '%" + data.search + "%'  OR EvolveUser_login  LIKE '%" + data.search + "%' )"
          return await Evolve.SqlPool.request()
          // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .query(query);
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get User List "+error.message);
          return new Error(" EERR####: Error While Get User List "+error.message);
        }
    },

    
    // getRoleList: async function (data) {
    //     try {
    //        let query = " SELECT TOP(20) EvolveRole_Name   as title, EvolveRole_ID as id FROM    EvolveRole WHERE    (EvolveRole_Name  LIKE '%" + data.search + "%')"
    //       return await Evolve.SqlPool.request()
    //       // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
    //       .query(query);
    //     } catch (error) {
    
    //       Evolve.Log.error(" EERR####: Error While Get Role List "+error.message);
    //       return new Error(" EERR####: Error While Get Role List "+error.message);
    //     }
    // },

    getRoleList: async function () {
        try {
           let query = "SELECT  0 as isSelected , EvolveRole_ID , EvolveRole_Name ,  EvolveRole_Description FROM EvolveRole "
          return await Evolve.SqlPool.request()
          // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .query(query);
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Role List "+error.message);
          return new Error(" EERR####: Error While Get Role List "+error.message);
        }
    },


    
    getUnitList: async function (data) {
        try {
           let query = " SELECT TOP(20) EvolveUnit_Code + ' - '+EvolveUnit_Name  as title, EvolveUnit_ID as id FROM    EvolveUnit WHERE    (EvolveUnit_Code  LIKE '%" + data.search + "%'  OR EvolveUnit_Name  LIKE '%" + data.search + "%' )"
          return await Evolve.SqlPool.request()
          // .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
          .query(query);
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Unit List "+error.message);
          return new Error(" EERR####: Error While Get Unit List "+error.message);
        }
    },
  

  

    getSingleMenuTypeDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('SELECT * FROM EvolveMenuType WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single menu type details "+error.message);
            return new Error(" EERR####: Error while get single menu type details "+error.message);
        }
    },
    
    getSeqenceId: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT  MAX(EvolveApp_SEQ)+1 as EvolveApp_SEQ FROM  EvolveApp');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting sequence id "+error.message);
            return new Error(" EERR####: Error while getting sequence id "+error.message);
        }
    },

    
    checkUserUnitLink: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
                .input('EvolveRole_ID', Evolve.Sql.NVarChar, data.EvolveRole_ID)

                .query('SELECT  EvolveUserUnitLink_ID FROM EvolveUserUnitLink  WHERE EvolveUser_ID=@EvolveUser_ID AND EvolveUnit_ID=@EvolveUnit_ID AND EvolveRole_ID=@EvolveRole_ID'+data.condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Check Existing User Unit Link "+error.message);
            return new Error(" EERR####: Error while Check Existing User Unit Link "+error.message);
        }
    },



    adNEwUserUnitLink: async function (data) {

        console.log('data/????  final data ?? ,  ' ,  data)
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
                .input('EvolveRole_ID', Evolve.Sql.NVarChar, data.EvolveRole_ID)
                .input('EvolveUserUnitLink_IsActive', Evolve.Sql.Int, 1)
                .input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveUserUnitLink (EvolveRole_ID , EvolveUser_ID, EvolveUnit_ID,EvolveUserUnitLink_IsActive , EvolveUserUnitLink_CreatedAt, EvolveUserUnitLink_CreatedUser, EvolveUserUnitLink_UpdatedAt, EvolveUserUnitLink_UpdatedUser) VALUES (@EvolveRole_ID , @EvolveUser_ID, @EvolveUnit_ID,@EvolveUserUnitLink_IsActive , @EvolveUserUnitLink_CreatedAt, @EvolveUserUnitLink_CreatedUser, @EvolveUserUnitLink_UpdatedAt, @EvolveUserUnitLink_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Create User To Unit Link "+error.message);
            return new Error(" EERR####: Error while Create User To Unit Link "+error.message);
        }
    },

    
    activeDeactiveLink: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveUserUnitLink_IsActive', Evolve.Sql.Int, data.EvolveUserUnitLink_IsActive)
                .input('EvolveUserUnitLink_ID', Evolve.Sql.Int, data.EvolveUserUnitLink_ID)
                .input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveUserUnitLink SET EvolveUserUnitLink_UpdatedAt=@EvolveUserUnitLink_UpdatedAt ,EvolveUserUnitLink_UpdatedUser=@EvolveUserUnitLink_UpdatedUser  ,EvolveUserUnitLink_IsActive=@EvolveUserUnitLink_IsActive WHERE  EvolveUserUnitLink_ID=@EvolveUserUnitLink_ID  ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update User To Unit Link Status "+error.message);
            return new Error(" EERR####: Error while update User To Unit Link Status "+error.message);
        }
    },




   


    checkSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.Int, EvolveApp_SEQ)
                .query(' SELECT * FROM EvolveApp WHERE EvolveApp_SEQ = @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while checking sequence number "+error.message);
            return new Error(" EERR####: Error while checking sequence number "+error.message);
        }
    },

    updateSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.NVarChar, EvolveApp_SEQ)
            .query(' UPDATE EvolveApp set EvolveApp_SEQ = EvolveApp_SEQ+1 WHERE EvolveApp_SEQ >= @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating seq number "+error.message);
            return new Error(" EERR####: Error while updating seq number "+error.message);
        }
    },

    updateApp: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_ID', Evolve.Sql.NVarChar, data.EvolveApp_ID)
            .input('EvolveApp_Code', Evolve.Sql.NVarChar, data.EvolveApp_Code)
            .input('EvolveApp_Name', Evolve.Sql.NVarChar, data.EvolveApp_Name)
            .input('EvolveApp_Description', Evolve.Sql.NVarChar, data.EvolveApp_Description)
            .input('EvolveApp_Url', Evolve.Sql.NVarChar, data.EvolveApp_Url)
            .input('EvolveApp_SEQ', Evolve.Sql.Int, data.EvolveApp_SEQ)
            .input('EvolveApp_Status', Evolve.Sql.NVarChar, data.EvolveApp_Status)
            .input('EvolveApp_Icon', Evolve.Sql.NVarChar, data.EvolveApp_Icon)
            .input('EvolveApp_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveApp_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveApp SET EvolveApp_Code = @EvolveApp_Code, EvolveApp_Name = @EvolveApp_Name, EvolveApp_Description = @EvolveApp_Description, EvolveApp_Url = @EvolveApp_Url, EvolveApp_SEQ = @EvolveApp_SEQ, EvolveApp_Status = @EvolveApp_Status, EvolveApp_Icon = @EvolveApp_Icon, EvolveApp_UpdatedAt = @EvolveApp_UpdatedAt, EvolveApp_UpdatedUser = @EvolveApp_UpdatedUser WHERE EvolveApp_ID = @EvolveApp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating App "+error.message);
            return new Error(" EERR####: Error while updating App "+error.message);
        }
    },
    deleteMenuType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('DELETE FROM EvolveMenuType WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete  menu type details "+error.message);
            return new Error(" EERR####: Error while delete  menu type details "+error.message);
        }
    },

    checkMenuLinkedToType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('SELECT  EvolveMenu_Id  FROM EvolveMenu  WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check menu  linked with  the item type "+error.message);
            return new Error(" EERR####: Error while check menu  linked with  the item type "+error.message);
        }
    },

    
    getAssignedRoleList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('   SELECT  * FROM EvolveUserUnitLink WHERE EvolveUnit_ID  = @EvolveUnit_ID AND  EvolveUser_ID = @EvolveUser_ID AND EvolveUserUnitLink_IsActive = 1');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check assigned role "+error.message);
            return new Error(" EERR####: Error while check assigned role "+error.message);
        }
    },

    deleteCurrentLink: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('DELETE  FROM EvolveUserUnitLink WHERE EvolveUnit_ID  = @EvolveUnit_ID AND  EvolveUser_ID = @EvolveUser_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete existing  user unit link "+error.message);
            return new Error(" EERR####: Error while delete existing  user unit link "+error.message);
        }
    },




}