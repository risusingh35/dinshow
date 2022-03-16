'use strict';
// const { Console } = require('winston/lib/winston/transports');
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalMatrixListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(EvolveApprovalMatrix_ID) as count  FROM EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix count "+error.message);
            return new Error(" EERR####: Error while get approval matrix count "+error.message);
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
            Evolve.Log.error(" EERR####: Error while get approval matrix list "+error.message);
            return new Error(" EERR####: Error while get approval matrix list "+error.message);
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
                .query('INSERT INTO EvolveApprovalMatrix (EvolveApprovalMatrix_Type, EvolveApprovalMatrix_Code, EvolveApprovalMatrix_Name,EvolveApprovalMatrix_Status, EvolveApprovalMatrix_IsEmailNotif ,EvolveApprovalMatrix_IsMessageNotif ,EvolveApprovalMatrix_IsQxtendReq ,EvolveApprovalMatrix_IsWPMessageNotif ,EvolveApprovalMatrix_CreatedAt, EvolveApprovalMatrix_CreatedUser, EvolveApprovalMatrix_UpdatedAt, EvolveApprovalMatrix_UpdatedUser) VALUES (@EvolveApprovalMatrix_Type, @EvolveApprovalMatrix_Code, @EvolveApprovalMatrix_Name, @EvolveApprovalMatrix_Status ,@EvolveApprovalMatrix_IsEmailNotif ,@EvolveApprovalMatrix_IsMessageNotif ,@EvolveApprovalMatrix_IsQxtendReq ,@EvolveApprovalMatrix_IsWPMessageNotif ,@EvolveApprovalMatrix_CreatedAt, @EvolveApprovalMatrix_CreatedUser, @EvolveApprovalMatrix_UpdatedAt, @EvolveApprovalMatrix_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add approval matrix "+error.message);
            return new Error(" EERR####: Erorr while add approval matrix "+error.message);
        }
    },
    getMatrixDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
                .query('SELECT * FROM  EvolveApprovalMatrix WHERE EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single matrix details "+error.message);
            return new Error(" EERR####: Error while get single matrix details "+error.message);
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
            Evolve.Log.error(" EERR####: Error while update approval matrix details "+error.message);
            return new Error(" EERR####: Error while update approval matrix details "+error.message);
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
            Evolve.Log.error(" EERR#### : Error while check approval matrix "+error.message);
            return new Error(" EERR#### : Error while check approval matrix "+error.message);
        }
    },

    getTableColumnList : async function (tableName) {
        try {
            
            let query = "SELECT COLUMN_NAME as columnName ,  TABLE_NAME as tableName FROM INFORMATION_SCHEMA.COLUMNS WHERE "+tableName 
              return await Evolve.SqlPool.request()
                .query(query)

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get table fields "+error.message);
            return new Error(" EERR#### : Error while get table fields "+error.message);
        }
    },
    checkMatrixIndex : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
              .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_Seq)

              .query(" SELECT EvolveApprovalMatrixIndex_ID FROM  EvolveApprovalMatrixIndex WHERE EvolveApprovalMatrixIndex_Seq =@EvolveApprovalMatrixIndex_Seq AND EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while check matrix index "+error.message);
            return new Error(" EERR#### : Error while check matrix index "+error.message);
        }
    },
    
    saveMatrixIndex : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_Seq)
              .input('EvolveApprovalMatrixIndex_Name', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_Name)
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)

              .input('EvolveApprovalMatrixIndex_CreatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveApprovalMatrixIndex_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveApprovalMatrixIndex_UpdatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveApprovalMatrixIndex_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .query("INSERT INTO EvolveApprovalMatrixIndex (EvolveApprovalMatrixIndex_Seq, EvolveApprovalMatrixIndex_Name,EvolveApprovalMatrix_ID, EvolveApprovalMatrixIndex_CreatedAt, EvolveApprovalMatrixIndex_CreatedUser, EvolveApprovalMatrixIndex_UpdatedAt, EvolveApprovalMatrixIndex_UpdatedUser) VALUES (@EvolveApprovalMatrixIndex_Seq, @EvolveApprovalMatrixIndex_Name ,@EvolveApprovalMatrix_ID ,@EvolveApprovalMatrixIndex_CreatedAt, @EvolveApprovalMatrixIndex_CreatedUser, @EvolveApprovalMatrixIndex_UpdatedAt, @EvolveApprovalMatrixIndex_UpdatedUser);select @@IDENTITY AS 'inserted_id'")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while save matrix index "+error.message);
            return new Error(" EERR#### : Error while save matrix index "+error.message);
        }
    },
    
    checkTableField : async function (data) {
        try {
            
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
              .input('EvolveApprovalMatrixDetails_Value', Evolve.Sql.NVarChar, data.tableField)
              .query("SELECT  * FROM EvolveApprovalMatrixDetails WHERE EvolveApprovalMatrixIndex_ID = @EvolveApprovalMatrixIndex_ID AND (EvolveApprovalMatrixDetails_Key ='field' AND EvolveApprovalMatrixDetails_Value=@EvolveApprovalMatrixDetails_Value)")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get table fields "+error.message);
            return new Error(" EERR#### : Error while get table fields "+error.message);
        }
    },
    checkTableName : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
              .input('EvolveApprovalMatrixDetails_ParentID', Evolve.Sql.Int, data.EvolveApprovalMatrixDetails_ParentID)
              .input('EvolveApprovalMatrixDetails_Value', Evolve.Sql.NVarChar, data.tableName)
              .query("SELECT  * FROM EvolveApprovalMatrixDetails WHERE EvolveApprovalMatrixIndex_ID = @EvolveApprovalMatrixIndex_ID AND (EvolveApprovalMatrixDetails_Key ='table' AND EvolveApprovalMatrixDetails_Value=@EvolveApprovalMatrixDetails_Value) AND EvolveApprovalMatrixDetails_ParentID=@EvolveApprovalMatrixDetails_ParentID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get table fields "+error.message);
            return new Error(" EERR#### : Error while get table fields "+error.message);
        }
    },
        
    saveMatrixDetails : async function (data) {
        try {
              let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
             
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
              .input('EvolveApprovalMatrixDetails_ParentID', Evolve.Sql.Int, data.EvolveApprovalMatrixDetails_ParentID)
              .input('EvolveApprovalMatrixDetails_Key', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixDetails_Key)
              .input('EvolveApprovalMatrixDetails_Value', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixDetails_Value)
              .input('EvolveApprovalMatrixDetails_IsMandatory', Evolve.Sql.Int, data.EvolveApprovalMatrixDetails_IsMandatory)
              .input('EvolveApprovalMatrixDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveApprovalMatrixDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .input('EvolveApprovalMatrixDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveApprovalMatrixDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

              .query("INSERT INTO  EvolveApprovalMatrixDetails (EvolveApprovalMatrixIndex_ID , EvolveApprovalMatrixDetails_ParentID ,EvolveApprovalMatrixDetails_Key ,EvolveApprovalMatrixDetails_Value ,EvolveApprovalMatrixDetails_IsMandatory, EvolveApprovalMatrixDetails_CreatedAt, EvolveApprovalMatrixDetails_CreatedUser, EvolveApprovalMatrixDetails_UpdatedAt, EvolveApprovalMatrixDetails_UpdatedUser) VALUES (@EvolveApprovalMatrixIndex_ID , @EvolveApprovalMatrixDetails_ParentID , @EvolveApprovalMatrixDetails_Key , @EvolveApprovalMatrixDetails_Value ,@EvolveApprovalMatrixDetails_IsMandatory ,@EvolveApprovalMatrixDetails_CreatedAt, @EvolveApprovalMatrixDetails_CreatedUser, @EvolveApprovalMatrixDetails_UpdatedAt, @EvolveApprovalMatrixDetails_UpdatedUser);select @@IDENTITY AS 'inserted_id'")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while save matrix details "+error.message);
            return new Error(" EERR#### : Error while save matrix details "+error.message);
        }
    },
    getMatrixDetailsList : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
              .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_Seq)
              .query("SELECT  * FROM EvolveApprovalMatrixDetails eapd ,  EvolveApprovalMatrixIndex eapi  WHERE eapi.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID AND eapi.EvolveApprovalMatrixIndex_Seq = @EvolveApprovalMatrixIndex_Seq AND eapd.EvolveApprovalMatrixIndex_ID = eapi.EvolveApprovalMatrixIndex_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get matrix details list "+error.message);
            return new Error(" EERR#### : Error while get matrix details list "+error.message);
        }
    },
    getruleTitleAndName : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
              .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_Seq)
              .query("SELECT  * FROM EvolveApprovalMatrixIndex WHERE EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID AND EvolveApprovalMatrixIndex_Seq=@EvolveApprovalMatrixIndex_Seq ")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get matrix details list "+error.message);
            return new Error(" EERR#### : Error while get matrix details list "+error.message);
        }
    },
    updateMatrixName : async function (data) {
        try {
              let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_Name', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_Name)
              .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_ID)
              .input('EvolveApprovalMatrixIndex_UpdatedAt', Evolve.Sql.NVarChar, datetime)
              .input('EvolveApprovalMatrixIndex_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              .query("UPDATE EvolveApprovalMatrixIndex SET EvolveApprovalMatrixIndex_Name=@EvolveApprovalMatrixIndex_Name ,EvolveApprovalMatrixIndex_UpdatedAt=@EvolveApprovalMatrixIndex_UpdatedAt ,EvolveApprovalMatrixIndex_UpdatedUser=@EvolveApprovalMatrixIndex_UpdatedUser  WHERE EvolveApprovalMatrixIndex_ID = @EvolveApprovalMatrixIndex_ID ")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while update matrix detail index "+error.message);
            return new Error(" EERR#### : Error while update matrix detail index "+error.message);
        }
    },
    deleteMatrixDetailsList : async function (EvolveApprovalMatrixIndex_ID) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.NVarChar, EvolveApprovalMatrixIndex_ID)
            
              .query("DELETE FROM EvolveApprovalMatrixDetails WHERE EvolveApprovalMatrixIndex_ID=@EvolveApprovalMatrixIndex_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while delete matrix details list "+error.message);
            return new Error(" EERR#### : Error while delete matrix details list "+error.message);
        }
    },
    getMatrixIndexList : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
            
              .query("SELECT  * FROM EvolveApprovalMatrixIndex WHERE EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while delete matrix details list "+error.message);
            return new Error(" EERR#### : Error while delete matrix details list "+error.message);
        }
    },
    getSectionList : async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("  SELECT  EvolveSection_ID , EvolveSection_Name FROM  EvolveSection ")
        } catch (error) {
          	Evolve.Log.error(" EERR####: Error while get section list "+error.message);
			      return new Error(" EERR####: Error while get section list "+error.message);
        }
    },
    getRoleList : async function () {
    try {
        return await Evolve.SqlPool.request()
        .query("  SELECT  EvolveRole_ID , EvolveRole_Name  , 'false' as isRoleSelected FROM  EvolveRole ")
    } catch (error) {
        Evolve.Log.error(" EERR####: Error while get role list "+error.message);
                return new Error(" EERR####: Error while get role list "+error.message);
    }
    },

    getUserList : async function () {
    try {
        return await Evolve.SqlPool.request()
        // .query("SELECT  eu.EvolveUser_ID , eu.EvolveUser_Name  ,erl.EvolveRole_ID , 'false' as isRoleSelected FROM  EvolveUser eu , EvolveUserRoleLink erl WHERE  eu.EvolveUser_ID = erl.EvolveUser_ID ")

        .query("  SELECT  eu.EvolveUser_Name , eu.EvolveUser_ID , er.EvolveRole_Name , er.EvolveRole_ID , euu.EvolveUserUnitLink_ID  FROM  EvolveUserUnitLink euu LEFT  JOIN  EvolveUser eu  ON euu.EvolveUser_ID = eu.EvolveUser_ID LEFT JOIN  EvolveRole er ON euu.EvolveRole_ID = er.EvolveRole_ID ")
    } catch (error) {
        Evolve.Log.error(" EERR####: Error while get user list "+error.message);
                return new Error(" EERR####: Error while get user list "+error.message);
    }
    },
    checkMatDetails : async function (data) {
    try {
        return await Evolve.SqlPool.request()
        .input('EvolveApprovalMatrixDetails_Key', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixDetails_Key)
        .input('EvolveApprovalMatrixDetails_Value', Evolve.Sql.NVarChar, data.userId)
        .input('EvolveApprovalMatrixIndex_ID', Evolve.Sql.Int, data.EvolveApprovalMatrixIndex_ID)
        .input('EvolveApprovalMatrixDetails_ParentID', Evolve.Sql.Int, data.EvolveApprovalMatrixDetails_ParentID)

        .query("SELECT EvolveApprovalMatrixDetails_ID FROM EvolveApprovalMatrixDetails WHERE EvolveApprovalMatrixDetails_Key=@EvolveApprovalMatrixDetails_Key AND EvolveApprovalMatrixDetails_Value=@EvolveApprovalMatrixDetails_Value AND EvolveApprovalMatrixIndex_ID=@EvolveApprovalMatrixIndex_ID AND  EvolveApprovalMatrixDetails_ParentID=@EvolveApprovalMatrixDetails_ParentID  ")
    } catch (error) {
        Evolve.Log.error(" EERR####: Error while check User id "+error.message);
                return new Error(" EERR####: Error while check User id "+error.message);
    }
    },
    getHighSequenceMAtDetailList : async function (data) {
    try {
            return await Evolve.SqlPool.request()
            .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
            .input('EvolveApprovalMatrixIndex_Seq', Evolve.Sql.NVarChar, data.EvolveApprovalMatrixIndex_Seq)
            .query("SELECT  eapd.*   , eapi.EvolveApprovalMatrixIndex_Name  FROM EvolveApprovalMatrixDetails eapd ,  EvolveApprovalMatrixIndex eapi  WHERE eapi.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID AND eapi.EvolveApprovalMatrixIndex_Seq = @EvolveApprovalMatrixIndex_Seq AND eapd.EvolveApprovalMatrixIndex_ID = eapi.EvolveApprovalMatrixIndex_ID")

    } catch (error) {
        Evolve.Log.error(" EERR#### : Error while get matrix details list "+error.message);
        return new Error(" EERR#### : Error while get matrix details list "+error.message);
    }
    },
    getChildsByParentId : async function (EvolveApprovalMatrixDetails_ParentID) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrixDetails_ParentID', Evolve.Sql.Int, EvolveApprovalMatrixDetails_ParentID)
              .query("SELECT * FROM EvolveApprovalMatrixDetails WHERE   EvolveApprovalMatrixDetails_ParentID = @EvolveApprovalMatrixDetails_ParentID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get child details by parent "+error.message);
            return new Error(" EERR#### : Error while get child details by parent "+error.message);
        }
    },
    getUserNameById : async function (EvolveUser_ID) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
              .query("SELECT EvolveUser_Name FROM EvolveUser WHERE   EvolveUser_ID = @EvolveUser_ID")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get userName by  id "+error.message);
            return new Error(" EERR#### : Error while get userName by  id "+error.message);
        }
    },
    isUserAvailableInMatrix : async function (data) {
        try {
              return await Evolve.SqlPool.request()
              .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
              .input('EvolveApprovalMatrixDetails_Value', Evolve.Sql.Int, data.EvolveApprovalMatrixDetails_Value)

              .query("  SELECT  eapi.EvolveApprovalMatrixIndex_Seq FROM  EvolveApprovalMatrixDetails eapd  , EvolveApprovalMatrix eap , EvolveApprovalMatrixIndex eapi  WHERE eap.EvolveApprovalMatrix_ID = eapi.EvolveApprovalMatrix_ID AND eapi.EvolveApprovalMatrixIndex_ID = eapd.EvolveApprovalMatrixIndex_ID  AND eapd.EvolveApprovalMatrixDetails_Key = 'USERID' AND eapd.EvolveApprovalMatrixDetails_Value = @EvolveApprovalMatrixDetails_Value  AND eap.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID ")

        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get userName by  id "+error.message);
            return new Error(" EERR#### : Error while get userName by  id "+error.message);
        }
    },

}