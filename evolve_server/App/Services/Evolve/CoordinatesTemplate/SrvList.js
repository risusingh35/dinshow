'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addTemplate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_Name', Evolve.Sql.NVarChar, data.EvolveCoordinatesTemplate_Name)
                .input('EvolveCoordinatesTemplate_Code', Evolve.Sql.NVarChar, data.EvolveCoordinatesTemplate_Code)
                .input('EvolveCoordinatesTemplate_Status', Evolve.Sql.Bit, data.EvolveCoordinatesTemplate_Status)

                .input('EvolveCoordinatesTemplate_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinatesTemplate_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCoordinatesTemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinatesTemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveCoordinatesTemplate (EvolveCoordinatesTemplate_Name, EvolveCoordinatesTemplate_Code, EvolveCoordinatesTemplate_Status,EvolveCoordinatesTemplate_CreatedAt, EvolveCoordinatesTemplate_CreatedUser, EvolveCoordinatesTemplate_UpdatedAt, EvolveCoordinatesTemplate_UpdatedUser)VALUES(@EvolveCoordinatesTemplate_Name, @EvolveCoordinatesTemplate_Code, @EvolveCoordinatesTemplate_Status, @EvolveCoordinatesTemplate_CreatedAt, @EvolveCoordinatesTemplate_CreatedUser, @EvolveCoordinatesTemplate_UpdatedAt, @EvolveCoordinatesTemplate_UpdatedUser)select @@IDENTITY AS \'inserted_id\'");

        } catch (error) {
            Evolve.Log.error(" EERR1206: Error while adding template "+error.message);
            return new Error(" EERR1206: Error while adding template "+error.message);
        }
    },

    getTemplateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(EvolveCoordinatesTemplate_ID) AS count FROM EvolveCoordinatesTemplate WHERE EvolveCoordinatesTemplate_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1207: Error while getting Template List Count "+error.message);
            return new Error(" EERR1207: Error while getting Template List Count "+error.message);
        }
    },

    getTemplateList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveCoordinatesTemplate WHERE EvolveCoordinatesTemplate_Name LIKE @search ORDER BY EvolveCoordinatesTemplate_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1208: Error while getting Template List "+error.message);
            return new Error(" EERR1208: Error while getting Template List "+error.message);
        }
    },
    getSingleTemplate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .query("SELECT * FROM EvolveCoordinatesTemplate WHERE EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1209: Error while getting Single Template "+error.message);
            return new Error(" EERR1209: Error while getting Single Template "+error.message);
        }
    },
    updateTemplate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .input('EvolveCoordinatesTemplate_Name', Evolve.Sql.NVarChar, data.EvolveCoordinatesTemplate_Name)
                .input('EvolveCoordinatesTemplate_Code', Evolve.Sql.NVarChar, data.EvolveCoordinatesTemplate_Code)
                .input('EvolveCoordinatesTemplate_Status', Evolve.Sql.Bit, data.EvolveCoordinatesTemplate_Status)

                .input('EvolveCoordinatesTemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinatesTemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveCoordinatesTemplate SET EvolveCoordinatesTemplate_Name = @EvolveCoordinatesTemplate_Name, EvolveCoordinatesTemplate_Code = @EvolveCoordinatesTemplate_Code, EvolveCoordinatesTemplate_Status = @EvolveCoordinatesTemplate_Status, EvolveCoordinatesTemplate_UpdatedAt = @EvolveCoordinatesTemplate_UpdatedAt, EvolveCoordinatesTemplate_UpdatedUser = @EvolveCoordinatesTemplate_UpdatedUser WHERE EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1210: Error while updating Template "+error.message);
            return new Error(" EERR1210: Error while updating Template "+error.message);
        }
    },

     addCoordinate: async function (data, table) {
        try {
            console.log("table",table)
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, table.EvolveCoordinatesTemplate_ID)
                .input('EvolveCoordinates_Name', Evolve.Sql.NVarChar, table.EvolveCoordinates_Name)
                .input('EvolveCoordinates_Code', Evolve.Sql.NVarChar, table.EvolveCoordinates_Code)
                .input('EvolveCoordinates_X', Evolve.Sql.NVarChar, table.EvolveCoordinates_X)
                .input('EvolveCoordinates_Y', Evolve.Sql.NVarChar, table.EvolveCoordinates_Y)
                .input('EvolveCoordinates_MinX', Evolve.Sql.NVarChar, table.EvolveCoordinates_MinX)
                .input('EvolveCoordinates_MaxX', Evolve.Sql.NVarChar, table.EvolveCoordinates_MaxX)
                .input('EvolveCoordinates_IsMultiple', Evolve.Sql.Bit, table.EvolveCoordinates_IsMultiple)
                .input('EvolveCoordinates_DiffWithLineNumber', Evolve.Sql.NVarChar, (table.EvolveCoordinates_IsMultiple == true) ? table.EvolveCoordinates_DiffWithLineNumber : "0")
                .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, table.EvolveCoordinates_ExtraText)
                .input('EvolveCoordinates_Status', Evolve.Sql.Bit, table.EvolveCoordinates_Status)
                .input('EvolveCoordinates_InvoiceFeild', Evolve.Sql.NVarChar, table.EvolveCoordinates_InvoiceFeild)
                .input('EvolveCoordinates_InvoiceItemFeild', Evolve.Sql.NVarChar, table.EvolveCoordinates_InvoiceItemFeild)

                .input('EvolveCoordinates_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveCoordinates (EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name,EvolveCoordinates_Code, EvolveCoordinates_X,EvolveCoordinates_Y, EvolveCoordinates_MinX, EvolveCoordinates_MaxX,EvolveCoordinates_IsMultiple, EvolveCoordinates_DiffWithLineNumber , EvolveCoordinates_ExtraText,EvolveCoordinates_Status,EvolveCoordinates_CreatedAt, EvolveCoordinates_CreatedUser, EvolveCoordinates_UpdatedAt, EvolveCoordinates_UpdatedUser, EvolveCoordinates_InvoiceFeild, EvolveCoordinates_InvoiceItemFeild)VALUES(@EvolveCoordinatesTemplate_ID, @EvolveCoordinates_Name, @EvolveCoordinates_Code, @EvolveCoordinates_X,  @EvolveCoordinates_Y, @EvolveCoordinates_MinX, @EvolveCoordinates_MaxX, @EvolveCoordinates_IsMultiple , @EvolveCoordinates_DiffWithLineNumber , @EvolveCoordinates_ExtraText, @EvolveCoordinates_Status, @EvolveCoordinates_CreatedAt, @EvolveCoordinates_CreatedUser, @EvolveCoordinates_UpdatedAt, @EvolveCoordinates_UpdatedUser, @EvolveCoordinates_InvoiceFeild, @EvolveCoordinates_InvoiceItemFeild)");

        } catch (error) {
            Evolve.Log.error(" EERR1200: Error while adding Coordinate "+error.message);
            return new Error(" EERR1200: Error while adding Coordinate "+error.message);
        }
    },



}