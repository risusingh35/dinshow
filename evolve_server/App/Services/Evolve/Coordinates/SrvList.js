'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addCoordinate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            if(data.EvolveCoordinates_IsCordRequired == true){
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .input('EvolveCoordinates_Name', Evolve.Sql.NVarChar, data.EvolveCoordinates_Name)
                .input('EvolveCoordinates_Code', Evolve.Sql.NVarChar, data.EvolveCoordinates_Code)
                .input('EvolveCoordinates_X', Evolve.Sql.NVarChar, data.EvolveCoordinates_X)
                .input('EvolveCoordinates_Y', Evolve.Sql.NVarChar, data.EvolveCoordinates_Y)
                .input('EvolveCoordinates_MinX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinX)
                .input('EvolveCoordinates_MaxX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxX)
                .input('EvolveCoordinates_MinY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinY)
                .input('EvolveCoordinates_MaxY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxY)
                .input('EvolveCoordinates_IsMultiple', Evolve.Sql.Bit, data.EvolveCoordinates_IsMultiple)
                .input('EvolveCoordinates_DiffWithLineNumber', Evolve.Sql.NVarChar, (data.EvolveCoordinates_IsMultiple == true) ? data.EvolveCoordinates_DiffWithLineNumber : "0")
                .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, data.EvolveCoordinates_ExtraText)
                .input('EvolveCoordinates_Status', Evolve.Sql.Bit, data.EvolveCoordinates_Status)
                .input('EvolveCoordinates_InvoiceFeild', Evolve.Sql.NVarChar, data.EvolveCoordinates_InvoiceFeild)
                .input('EvolveCoordinates_InvoiceItemFeild', Evolve.Sql.NVarChar, data.EvolveCoordinates_InvoiceItemFeild)
                .input('EvolveCoordinates_IsCordRequired', Evolve.Sql.Bit, data.EvolveCoordinates_IsCordRequired)

                .input('EvolveCoordinates_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveCoordinates (EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name,EvolveCoordinates_Code, EvolveCoordinates_X,EvolveCoordinates_Y, EvolveCoordinates_MinX, EvolveCoordinates_MaxX,EvolveCoordinates_IsMultiple, EvolveCoordinates_DiffWithLineNumber , EvolveCoordinates_ExtraText,EvolveCoordinates_Status,EvolveCoordinates_CreatedAt, EvolveCoordinates_CreatedUser, EvolveCoordinates_UpdatedAt, EvolveCoordinates_UpdatedUser, EvolveCoordinates_InvoiceFeild, EvolveCoordinates_InvoiceItemFeild, EvolveCoordinates_IsCordRequired, EvolveCoordinates_MinY, EvolveCoordinates_MaxY)VALUES(@EvolveCoordinatesTemplate_ID, @EvolveCoordinates_Name, @EvolveCoordinates_Code, @EvolveCoordinates_X,  @EvolveCoordinates_Y, @EvolveCoordinates_MinX, @EvolveCoordinates_MaxX, @EvolveCoordinates_IsMultiple , @EvolveCoordinates_DiffWithLineNumber , @EvolveCoordinates_ExtraText, @EvolveCoordinates_Status, @EvolveCoordinates_CreatedAt, @EvolveCoordinates_CreatedUser, @EvolveCoordinates_UpdatedAt, @EvolveCoordinates_UpdatedUser, @EvolveCoordinates_InvoiceFeild, @EvolveCoordinates_InvoiceItemFeild, @EvolveCoordinates_IsCordRequired, @EvolveCoordinates_MinY, @EvolveCoordinates_MaxY)");
            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .input('EvolveCoordinates_Name', Evolve.Sql.NVarChar, data.EvolveCoordinates_Name)
                .input('EvolveCoordinates_Code', Evolve.Sql.NVarChar, data.EvolveCoordinates_Code)
                .input('EvolveCoordinates_IsMultiple', Evolve.Sql.Bit, data.EvolveCoordinates_IsMultiple)
                .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, data.EvolveCoordinates_ExtraText)
                .input('EvolveCoordinates_Status', Evolve.Sql.Bit, data.EvolveCoordinates_Status)
                .input('EvolveCoordinates_IsCordRequired', Evolve.Sql.Bit, data.EvolveCoordinates_IsCordRequired)

                .input('EvolveCoordinates_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveCoordinates (EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name,EvolveCoordinates_Code, EvolveCoordinates_IsMultiple, EvolveCoordinates_ExtraText,EvolveCoordinates_Status,EvolveCoordinates_CreatedAt, EvolveCoordinates_CreatedUser, EvolveCoordinates_UpdatedAt, EvolveCoordinates_UpdatedUser, EvolveCoordinates_IsCordRequired)VALUES(@EvolveCoordinatesTemplate_ID, @EvolveCoordinates_Name, @EvolveCoordinates_Code, @EvolveCoordinates_IsMultiple, @EvolveCoordinates_ExtraText, @EvolveCoordinates_Status, @EvolveCoordinates_CreatedAt, @EvolveCoordinates_CreatedUser, @EvolveCoordinates_UpdatedAt, @EvolveCoordinates_UpdatedUser,  @EvolveCoordinates_IsCordRequired)");
            }
        } catch (error) {
            Evolve.Log.error(" EERR1200: Error while adding Coordinate "+error.message);
            return new Error(" EERR1200: Error while adding Coordinate "+error.message);
        }
    },

    getCoordinateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(ec.EvolveCoordinates_ID) AS count FROM EvolveCoordinates ec, EvolveCoordinatesTemplate ect WHERE ec.EvolveCoordinatesTemplate_ID = ect.EvolveCoordinatesTemplate_ID AND (ect.EvolveCoordinatesTemplate_Name LIKE @search OR EvolveCoordinates_Name LIKE @search OR EvolveCoordinates_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR1201: Error while getting Coordinate List Count "+error.message);
            return new Error(" EERR1201: Error while getting Coordinate List Count "+error.message);
        }
    },

    getCoordinateList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT ec.*, ect.EvolveCoordinatesTemplate_Name FROM EvolveCoordinates ec, EvolveCoordinatesTemplate ect WHERE ec.EvolveCoordinatesTemplate_ID = ect.EvolveCoordinatesTemplate_ID AND (ect.EvolveCoordinatesTemplate_Name LIKE @search OR EvolveCoordinates_Name LIKE @search OR EvolveCoordinates_Code LIKE @search) ORDER BY EvolveCoordinates_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1202: Error while getting Coordinate List "+error.message);
            return new Error(" EERR1202: Error while getting Coordinate List "+error.message);
        }
    },
    getSingleCoordinate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                .query("SELECT * FROM EvolveCoordinates WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1203: Error while getting Single Coordinate "+error.message);
            return new Error(" EERR1203: Error while getting Single Coordinate "+error.message);
        }
    },
    updateCoordinate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            if(data.EvolveCoordinates_IsCordRequired == true){
                return await Evolve.SqlPool.request()
                .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                    .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                    .input('EvolveCoordinates_Name', Evolve.Sql.NVarChar, data.EvolveCoordinates_Name)
                    .input('EvolveCoordinates_Code', Evolve.Sql.NVarChar, data.EvolveCoordinates_Code)
                    .input('EvolveCoordinates_X', Evolve.Sql.NVarChar, data.EvolveCoordinates_X)
                    .input('EvolveCoordinates_Y', Evolve.Sql.NVarChar, data.EvolveCoordinates_Y)
                    .input('EvolveCoordinates_MinX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinX)
                    .input('EvolveCoordinates_MaxX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxX)
                    .input('EvolveCoordinates_MinY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinY)
                    .input('EvolveCoordinates_MaxY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxY)
                    .input('EvolveCoordinates_IsMultiple', Evolve.Sql.Bit, data.EvolveCoordinates_IsMultiple)
                    .input('EvolveCoordinates_DiffWithLineNumber', Evolve.Sql.NVarChar, (data.EvolveCoordinates_IsMultiple == true) ? data.EvolveCoordinates_DiffWithLineNumber : "0")
                    .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, data.EvolveCoordinates_ExtraText)
                    .input('EvolveCoordinates_Status', Evolve.Sql.Bit, data.EvolveCoordinates_Status)
                    .input('EvolveCoordinates_InvoiceFeild', Evolve.Sql.NVarChar, data.EvolveCoordinates_InvoiceFeild)
                    .input('EvolveCoordinates_InvoiceItemFeild', Evolve.Sql.NVarChar, data.EvolveCoordinates_InvoiceItemFeild)
                    .input('EvolveCoordinates_IsCordRequired', Evolve.Sql.Bit, data.EvolveCoordinates_IsCordRequired)
                   
                    .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                    .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("UPDATE EvolveCoordinates SET EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name = @EvolveCoordinates_Name, EvolveCoordinates_Code = @EvolveCoordinates_Code, EvolveCoordinates_X = @EvolveCoordinates_X, EvolveCoordinates_Y = @EvolveCoordinates_Y, EvolveCoordinates_MinX = @EvolveCoordinates_MinX, EvolveCoordinates_MaxX = @EvolveCoordinates_MaxX, EvolveCoordinates_ExtraText = @EvolveCoordinates_ExtraText, EvolveCoordinates_Status = @EvolveCoordinates_Status, EvolveCoordinates_IsMultiple = @EvolveCoordinates_IsMultiple , EvolveCoordinates_DiffWithLineNumber = @EvolveCoordinates_DiffWithLineNumber , EvolveCoordinates_UpdatedAt =@EvolveCoordinates_UpdatedAt, EvolveCoordinates_UpdatedUser = @EvolveCoordinates_UpdatedUser, EvolveCoordinates_InvoiceFeild = @EvolveCoordinates_InvoiceFeild, EvolveCoordinates_InvoiceItemFeild = @EvolveCoordinates_InvoiceItemFeild, EvolveCoordinates_MinY = @EvolveCoordinates_MinY, EvolveCoordinates_MaxY = @EvolveCoordinates_MaxY WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");
                }else{
                    return await Evolve.SqlPool.request()
                    .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                    .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                    .input('EvolveCoordinates_Name', Evolve.Sql.NVarChar, data.EvolveCoordinates_Name)
                    .input('EvolveCoordinates_Code', Evolve.Sql.NVarChar, data.EvolveCoordinates_Code)
                    .input('EvolveCoordinates_IsMultiple', Evolve.Sql.Bit, data.EvolveCoordinates_IsMultiple)
                    .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, data.EvolveCoordinates_ExtraText)
                    .input('EvolveCoordinates_Status', Evolve.Sql.Bit, data.EvolveCoordinates_Status)
                    .input('EvolveCoordinates_IsCordRequired', Evolve.Sql.Bit, data.EvolveCoordinates_IsCordRequired)
    
                    .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                    .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("UPDATE EvolveCoordinates SET EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name = @EvolveCoordinates_Name, EvolveCoordinates_Code = @EvolveCoordinates_Code, EvolveCoordinates_ExtraText = @EvolveCoordinates_ExtraText, EvolveCoordinates_Status = @EvolveCoordinates_Status, EvolveCoordinates_IsMultiple = @EvolveCoordinates_IsMultiple, EvolveCoordinates_UpdatedAt =@EvolveCoordinates_UpdatedAt, EvolveCoordinates_UpdatedUser = @EvolveCoordinates_UpdatedUser, EvolveCoordinates_IsCordRequired = @EvolveCoordinates_IsCordRequired WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");
                }
        } catch (error) {
            Evolve.Log.error(" EERR1204: Error while updating Coordinate "+error.message);
            return new Error(" EERR1204: Error while updating Coordinate "+error.message);
        }
    },

    getCoordinateTempList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCoordinatesTemplate");
        } catch (error) {
            Evolve.Log.error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
            return new Error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
        }
    }, 
    getInvoiceFilds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'EvolveEinvoice'");
        } catch (error) {
            Evolve.Log.error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
            return new Error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
        }
    },
    getInvoiceItemFilds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'EvolveEinvoiceItemList'");
        } catch (error) {
            Evolve.Log.error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
            return new Error(" EERR1205: Error while getting Coordinate Temp List "+error.message);
        }
    },    
    deleteCoordinates: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                 .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                .query("DELETE FROM EvolveCoordinates WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1205: Error while DELETE COORDINATES "+error.message);
            return new Error(" EERR1205: Error while DELETE COORDINATES "+error.message);
        }
    },



}