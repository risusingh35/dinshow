'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getTemplateListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT count(EvolveEDITemplate_ID) as count FROM EvolveEDITemplate WHERE EvolveEDITemplate_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting getting EDI Template Count" + error.message);
            return new Error(" EERR####: Error while getting getting EDI Template Count" + error.message);
        }
    },

    getTemplateList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT * FROM EvolveEDITemplate WHERE EvolveEDITemplate_Code LIKE @search ORDER BY EvolveEDITemplate_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting getting EDI Template " + error.message);
            return new Error(" EERR####: Error while getting getting EDI Template " + error.message);
        }
    },

    addEdiTemplate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplate_Code)
                .input('EvolveEDITemplate_FileType', Evolve.Sql.NVarChar, data.EvolveEDITemplate_FileType)
                .input('EvolveEDITemplate_Type', Evolve.Sql.NVarChar, data.EvolveEDITemplate_Type)
                .input('EvolveEDITemplate_Status', Evolve.Sql.Bit, data.EvolveEDITemplate_Status)

                .input('EvolveEDITemplate_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplate_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDITemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveEDITemplate ( EvolveEDITemplate_Code , EvolveEDITemplate_FileType,EvolveEDITemplate_Type, EvolveEDITemplate_Status, EvolveEDITemplate_CreatedAt, EvolveEDITemplate_CreatedUser, EvolveEDITemplate_UpdatedAt, EvolveEDITemplate_UpdatedUser) VALUES(@EvolveEDITemplate_Code,@EvolveEDITemplate_FileType,@EvolveEDITemplate_Type, @EvolveEDITemplate_Status, @EvolveEDITemplate_CreatedAt, @EvolveEDITemplate_CreatedUser, @EvolveEDITemplate_UpdatedAt, @EvolveEDITemplate_UpdatedUser)')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding EDI Template " + error.message);
            return new Error(" EERR####: Error while adding EDI Template" + error.message);
        }
    },

    updateEdiTemplate : async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .input('EvolveEDITemplate_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplate_Code)
                .input('EvolveEDITemplate_FileType', Evolve.Sql.NVarChar, data.EvolveEDITemplate_FileType)
                .input('EvolveEDITemplate_Type', Evolve.Sql.NVarChar, data.EvolveEDITemplate_Type)
                .input('EvolveEDITemplate_Status', Evolve.Sql.Bit, data.EvolveEDITemplate_Status)
                .input('EvolveEDITemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('UPDATE EvolveEDITemplate SET EvolveEDITemplate_Code = @EvolveEDITemplate_Code , EvolveEDITemplate_FileType = @EvolveEDITemplate_FileType , EvolveEDITemplate_Type = @EvolveEDITemplate_Type , EvolveEDITemplate_Status = @EvolveEDITemplate_Status , EvolveEDITemplate_UpdatedAt = @EvolveEDITemplate_UpdatedAt , EvolveEDITemplate_UpdatedUser = @EvolveEDITemplate_UpdatedUser WHERE EvolveEDITemplate_ID = @EvolveEDITemplate_ID')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating EDI Template " + error.message);
            return new Error(" EERR####: Error while updating EDI Template " + error.message);
        }
    },

    checkAttributesCode : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .query("SELECT EGA.EvolveEDITemplateAttributes_ID AS eGID,EGA.EvolveEDITemplateAttributes_Datatype AS eGDT,  EGA.EvolveEDITemplateAttributes_Default AS eGDV, EGA.EvolveEDITemplateAttributes_Parent AS eGP,EGA.EvolveEDITemplateAttributes_Code AS eCD FROM EvolveEDITemplateAttributes EGA WHERE  EGA.EvolveEDITemplate_ID =@EvolveEDITemplate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check attributes code" + error.message);
            return new Error(" EERR####: Error while check attributes code" + error.message);
        }
    } 
}