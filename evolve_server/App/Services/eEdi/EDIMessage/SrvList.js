'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMessageListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('   SELECT  COUNT(edm.EvolveEDIMessage_ID) as count  FROM  EvolveEDIMessage edm  ,  EvolveEDITemplate edt  WHERE edm.EvolveEDIMessage_InTemplateID = edt.EvolveEDITemplate_ID  AND (EvolveEDIMessage_Name LIKE @search OR  EvolveEDIMessage_Code LIKE @search) ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EDI message count "+error.message);
            return new Error(" EERR####: Error while get EDI message count "+error.message);
        }
    },

    getMessageList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query(' SELECT  edm.*,  edt.EvolveEDITemplate_Code , (SELECT    edt.EvolveEDITemplate_Code   FROM   EvolveEDITemplate edt  WHERE edm.EvolveEDIMessage_OutTemplateID= edt.EvolveEDITemplate_ID  ) as outTemplate  FROM  EvolveEDIMessage edm  ,  EvolveEDITemplate edt  WHERE edm.EvolveEDIMessage_InTemplateID = edt.EvolveEDITemplate_ID  AND  (EvolveEDIMessage_Name LIKE @search OR  EvolveEDIMessage_Code LIKE @search) ORDER BY EvolveEDIMessage_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EDI message list "+error.message);
            return new Error(" EERR####: Error while get EDI message list "+error.message);
        }
    },
    addmessage: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveEDIMessage_Name', Evolve.Sql.NVarChar, data.EvolveEDIMessage_Name)
                .input('EvolveEDIMessage_Code', Evolve.Sql.NVarChar, data.EvolveEDIMessage_Code)
                .input('EvolveEDIMessage_InTemplateID', Evolve.Sql.Int, data.EvolveEDIMessage_InTemplateID)
                .input('EvolveEDIMessage_OutTemplateID', Evolve.Sql.Int, data.EvolveEDIMessage_OutTemplateID)
                .input('EvolveEDIMessage_IsMailRequired', Evolve.Sql.Int, data.EvolveEDIMessage_IsMailRequired)
                .input('EvolveEDIMessage_MatchField', Evolve.Sql.NVarChar, data.EvolveEDIMessage_MatchField)
                .input('EvolveEDIMessage_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEDIMessage_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDIMessage_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEDIMessage_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveEDIMessage (EvolveEDIMessage_Name, EvolveEDIMessage_Code, EvolveEDIMessage_InTemplateID,EvolveEDIMessage_OutTemplateID, EvolveEDIMessage_IsMailRequired ,EvolveEDIMessage_MatchField ,EvolveEDIMessage_CreatedAt, EvolveEDIMessage_CreatedUser, EvolveEDIMessage_UpdatedAt, EvolveEDIMessage_UpdatedUser) VALUES (@EvolveEDIMessage_Name, @EvolveEDIMessage_Code, @EvolveEDIMessage_InTemplateID, @EvolveEDIMessage_OutTemplateID,@EvolveEDIMessage_IsMailRequired ,@EvolveEDIMessage_MatchField ,@EvolveEDIMessage_CreatedAt, @EvolveEDIMessage_CreatedUser, @EvolveEDIMessage_UpdatedAt, @EvolveEDIMessage_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add EDI message "+error.message);
            return new Error(" EERR####: Erorr while add EDI message "+error.message);
        }
    },
    getSingleMessageDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDIMessage_ID', Evolve.Sql.Int, data.EvolveEDIMessage_ID)
                .query('SELECT * FROM  EvolveEDIMessage WHERE EvolveEDIMessage_ID=@EvolveEDIMessage_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single code details "+error.message);
            return new Error(" EERR####: Error while get single code details "+error.message);
        }
    },
    getEDITemplateList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveEDITemplate_ID , EvolveEDITemplate_Code , EvolveEDITemplate_Type  FROM  EvolveEDITemplate');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single code details "+error.message);
            return new Error(" EERR####: Error while get single code details "+error.message);
        }
    },

    updateMessageDetails: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDIMessage_ID', Evolve.Sql.NVarChar, data.EvolveEDIMessage_ID)

                .input('EvolveEDIMessage_Name', Evolve.Sql.NVarChar, data.EvolveEDIMessage_Name)
                .input('EvolveEDIMessage_Code', Evolve.Sql.NVarChar, data.EvolveEDIMessage_Code)
                .input('EvolveEDIMessage_InTemplateID', Evolve.Sql.Int, data.EvolveEDIMessage_InTemplateID)
                .input('EvolveEDIMessage_OutTemplateID', Evolve.Sql.Int, data.EvolveEDIMessage_OutTemplateID)
                .input('EvolveEDIMessage_IsMailRequired', Evolve.Sql.Int, data.EvolveEDIMessage_IsMailRequired)
                .input('EvolveEDIMessage_MatchField', Evolve.Sql.NVarChar, data.EvolveEDIMessage_MatchField)
                .input('EvolveEDIMessage_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEDIMessage_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDIMessage_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEDIMessage_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveEDIMessage SET  EvolveEDIMessage_Name = @EvolveEDIMessage_Name,EvolveEDIMessage_Code = @EvolveEDIMessage_Code, EvolveEDIMessage_InTemplateID = @EvolveEDIMessage_InTemplateID, EvolveEDIMessage_OutTemplateID = @EvolveEDIMessage_OutTemplateID, EvolveEDIMessage_IsMailRequired  = @EvolveEDIMessage_IsMailRequired  ,EvolveEDIMessage_MatchField=@EvolveEDIMessage_MatchField ,EvolveEDIMessage_CreatedAt=@EvolveEDIMessage_CreatedAt ,EvolveEDIMessage_CreatedUser=@EvolveEDIMessage_CreatedUser ,EvolveEDIMessage_UpdatedAt=@EvolveEDIMessage_UpdatedAt ,  EvolveEDIMessage_UpdatedUser=@EvolveEDIMessage_UpdatedUser  WHERE EvolveEDIMessage_ID = @EvolveEDIMessage_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update EDI message details "+error.message);
            return new Error(" EERR####: Error while update EDI message details "+error.message);
        }
    },
    deleteMessageDetails: async function (data) {
        
        try {
            console.log("Entered in delete api " ,  data )
            return await Evolve.SqlPool.request()
            .input('EvolveEDIMessage_ID', Evolve.Sql.Int, data.EvolveEDIMessage_ID)

                .query('DELETE FROM EvolveEDIMessage WHERE EvolveEDIMessage_ID=@EvolveEDIMessage_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete message details "+error.message);
            return new Error(" EERR####: Error while delete message details "+error.message);
        }
    },
 


}