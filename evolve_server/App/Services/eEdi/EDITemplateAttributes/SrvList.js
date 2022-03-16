'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEDITempateList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveEDITemplate_ID, EvolveEDITemplate_Code FROM EvolveEDITemplate");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting EDI Template List" + error.message);
            return new Error(" EERR####: Error while getting EDI Template List" + error.message);
        }
    },

    getEDITemplateAttributesListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT count(ea.EvolveEDITemplateAttributes_ID) AS count FROM EvolveEDITemplateAttributes ea, EvolveEDITemplate edit WHERE ea.EvolveEDITemplate_ID = edit.EvolveEDITemplate_ID AND (ea.EvolveEDITemplateAttributes_Code LIKE @search OR edit.EvolveEDITemplate_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting EDI Template Attributes List Count " + error.message);
            return new Error(" EERR####: Error while getting EDI Template Attributes List Count " + error.message);
        }
    },
    getEDITemplateAttributesList: async function (start, length, search) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT ea.*, edit.EvolveEDITemplate_Code, (select ea1.EvolveEDITemplateAttributes_Code from EvolveEDITemplateAttributes ea1 where ea.EvolveEDITemplateAttributes_Parent = ea1.EvolveEDITemplateAttributes_ID) as parentAttribute FROM EvolveEDITemplateAttributes ea, EvolveEDITemplate edit WHERE ea.EvolveEDITemplate_ID = edit.EvolveEDITemplate_ID AND (ea.EvolveEDITemplateAttributes_Code LIKE @search OR edit.EvolveEDITemplate_Code LIKE @search) ORDER BY ea.EvolveEDITemplateAttributes_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting EDI Template Attributes List " + error.message);
            return new Error(" EERR####: Error while getting EDI Template Attributes List " + error.message);
        }
    },
    addEDITemplateAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .input('EvolveEDITemplateAttributes_Parent', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_Parent)
                .input('EvolveEDITemplateAttributes_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Code)
                // .input('EvolveEDITemplateAttributes_Type', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Type)
                .input('EvolveEDITemplateAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Datatype)
                .input('EvolveEDITemplateAttributes_Rules', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Rules)

                .input('EvolveEDITemplateAttributes_Default', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Default)
                // .input('EvolveEDITemplateAttributes_Group', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Group)
                .input('EvolveEDITemplateAttributes_Status', Evolve.Sql.Bit, data.EvolveEDITemplateAttributes_Status)
                .input('EvolveEDITemplateAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveEDITemplateAttributes_IsDefault)

                .input('EvolveEDITemplateAttributes_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplateAttributes_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDITemplateAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplateAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveEDITemplateAttributes (EvolveEDITemplate_ID , EvolveEDITemplateAttributes_Parent ,EvolveEDITemplateAttributes_Code , EvolveEDITemplateAttributes_Datatype, EvolveEDITemplateAttributes_Rules ,EvolveEDITemplateAttributes_Default, EvolveEDITemplateAttributes_Status, EvolveEDITemplateAttributes_CreatedAt, EvolveEDITemplateAttributes_CreatedUser, EvolveEDITemplateAttributes_UpdatedAt, EvolveEDITemplateAttributes_UpdatedUser, EvolveEDITemplateAttributes_IsDefault) VALUES(@EvolveEDITemplate_ID , @EvolveEDITemplateAttributes_Parent, @EvolveEDITemplateAttributes_Code ,@EvolveEDITemplateAttributes_Datatype,@EvolveEDITemplateAttributes_Rules, @EvolveEDITemplateAttributes_Default, @EvolveEDITemplateAttributes_Status, @EvolveEDITemplateAttributes_CreatedAt, @EvolveEDITemplateAttributes_CreatedUser, @EvolveEDITemplateAttributes_UpdatedAt, @EvolveEDITemplateAttributes_UpdatedUser, @EvolveEDITemplateAttributes_IsDefault)')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding EDI Template Attributes" + error.message);
            return new Error(" EERR####: Error while adding EDI Template Attributes" + error.message);
        }
    },

    getSingleEDITemplateAttributesData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .query("SELECT * FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_ID = @EvolveEDITemplateAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Single EDI Template Attributes " + error.message);
            return new Error(" EERR####: Error while getting Single EDI Template Attributes " + error.message);
        }
    },


    updateEDITemplateAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .input('EvolveEDITemplateAttributes_Parent', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_Parent)
                .input('EvolveEDITemplateAttributes_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Code)
                // .input('EvolveEDITemplateAttributes_Type', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Type)
                .input('EvolveEDITemplateAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Datatype)
                .input('EvolveEDITemplateAttributes_Rules', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Rules)

                .input('EvolveEDITemplateAttributes_Default', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Default)
                // .input('EvolveEDITemplateAttributes_Group', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Group)
                .input('EvolveEDITemplateAttributes_Status', Evolve.Sql.Bit, data.EvolveEDITemplateAttributes_Status)
                .input('EvolveEDITemplateAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveEDITemplateAttributes_IsDefault)


                .input('EvolveEDITemplateAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEDITemplateAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)


                .query('UPDATE EvolveEDITemplateAttributes SET EvolveEDITemplate_ID = @EvolveEDITemplate_ID , EvolveEDITemplateAttributes_Parent = @EvolveEDITemplateAttributes_Parent, EvolveEDITemplateAttributes_Code = @EvolveEDITemplateAttributes_Code, EvolveEDITemplateAttributes_Datatype = @EvolveEDITemplateAttributes_Datatype, EvolveEDITemplateAttributes_Default = @EvolveEDITemplateAttributes_Default,EvolveEDITemplateAttributes_Status = @EvolveEDITemplateAttributes_Status, EvolveEDITemplateAttributes_UpdatedAt = @EvolveEDITemplateAttributes_UpdatedAt, EvolveEDITemplateAttributes_UpdatedUser = @EvolveEDITemplateAttributes_UpdatedUser, EvolveEDITemplateAttributes_IsDefault = @EvolveEDITemplateAttributes_IsDefault ,EvolveEDITemplateAttributes_Rules=@EvolveEDITemplateAttributes_Rules  WHERE EvolveEDITemplateAttributes_ID = @EvolveEDITemplateAttributes_ID')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating EDI Template Attributes " + error.message);
            return new Error(" EERR####: Error while updating EDI Template Attributes" + error.message);
        }
    },

    checkAttributesCode: async function (data) {
        try {
            if (data.EvolveEDITemplateAttributes_ID != '') {
                return await Evolve.SqlPool.request()
                    .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                    .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                    .input('EvolveEDITemplateAttributes_Parent', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_Parent)
                    .input('EvolveEDITemplateAttributes_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Code)
                    .query("SELECT EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_Code = @EvolveEDITemplateAttributes_Code  AND EvolveEDITemplateAttributes_Parent = @EvolveEDITemplateAttributes_Parent AND EvolveEDITemplate_ID = @EvolveEDITemplate_ID AND EvolveEDITemplateAttributes_ID != @EvolveEDITemplateAttributes_ID");
            } else {
                return await Evolve.SqlPool.request()
                    .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                    .input('EvolveEDITemplateAttributes_Parent', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_Parent)
                    .input('EvolveEDITemplateAttributes_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Code)
                    .query("SELECT EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_Code = @EvolveEDITemplateAttributes_Code AND EvolveEDITemplateAttributes_Parent = @EvolveEDITemplateAttributes_Parent AND EvolveEDITemplate_ID = @EvolveEDITemplate_ID");
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check code " + error.message);
            return new Error(" EERR####: Error while check code " + error.message);
        }
    },
    checkAttributesCodeUpdate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .input('EvolveEDITemplateAttributes_Parent', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_Parent)
                .input('EvolveEDITemplateAttributes_Code', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Code)
                .query("SELECT EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_Parent = @EvolveEDITemplateAttributes_Parent AND EvolveEDITemplateAttributes_Code = @EvolveEDITemplateAttributes_Code AND EvolveEDITemplate_ID = @EvolveEDITemplate_ID AND EvolveEDITemplateAttributes_ID != @EvolveEDITemplateAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Single Template details " + error.message);
            return new Error(" EERR####: Error while getting Single Template details " + error.message);
        }
    },
    getParentAttributeList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplate_ID', Evolve.Sql.Int, data.EvolveEDITemplate_ID)
                // .input('EvolveEDITemplateAttributes_Group', Evolve.Sql.NVarChar, data.EvolveEDITemplateAttributes_Group)
                .query("SELECT EvolveEDITemplateAttributes_ID, EvolveEDITemplateAttributes_Code FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplate_ID = @EvolveEDITemplate_ID  AND (EvolveEDITemplateAttributes_Datatype = 'OBJECT' OR EvolveEDITemplateAttributes_Datatype = 'ARRAY' OR EvolveEDITemplateAttributes_Datatype = 'LIST' OR EvolveEDITemplateAttributes_Datatype = 'TAG')");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting template Parent  Attributes " + error.message);
            return new Error(" EERR####: Error while getting template Parent  Attributes " + error.message);
        }
    },
    checkChildExits: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .query("SELECT * FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_Parent = @EvolveEDITemplateAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Check EDI Template Attributes " + error.message);
            return new Error(" EERR####: Error while getting Check EDI Template Attributes " + error.message);
        }
    },
    deleteEDITemplateAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDITemplateAttributes_ID', Evolve.Sql.Int, data.EvolveEDITemplateAttributes_ID)
                .query("DELETE FROM EvolveEDITemplateAttributes WHERE EvolveEDITemplateAttributes_ID = @EvolveEDITemplateAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Delete EDI Template Attributes " + error.message);
            return new Error(" EERR####: Error while Delete EDI Template Attributes " + error.message);
        }
    },


}